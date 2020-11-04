import store from "store";
import { postMessageToWin, get, logout, getContext, getHost } from "@u";
import { appendSearchParam, } from "yutils/utils";
import rootActions from 'store/root/actions';
import wrapActions from 'store/root/wrap/actions';
import {
	getServiceInfoWithDetail,
	recordLog,
	// validateLicense
} from 'store/root/wrap/api';
import { trigger } from "./componentTools";
// import { trigger as fire, on } from './queue';
import { openMess } from 'pub-comp/notification';
import { openGlobalDialog, closeGlobalDialog } from 'pub-comp/pop';
import { createLoadingFunc } from 'pub-comp/loading';
import whitelist from './whitelist';
import { enterOrTeam, crossTenantDialog, iframeElm } from "./regMessageTypeHandler.css";

const { profile } = getContext();

const {
	changeMessageType,
	hideIm,
	showDialog,
	closeDialogNew,
	openFrame,
	closeFrame,
	getUserInfo,
	requestError,
	updateGroupIm,
	unReadedIm,
} = rootActions;
const { addTabs, delTabs, updateTabs, showTabs } = wrapActions;

const handlers = {
	showTabs(data) {
		const { serviceCode } = data;
		const activeTabs = store.getState().wrap.iframeTabs.find(({ id }) => { return id === serviceCode });
		if (activeTabs) {
			store.dispatch(showTabs(activeTabs));
		}
	},
	openWin(data) {
		if (typeof data !== 'object') {
			throw new Error('data is must be a object.');
		}
		let { id: code, title, tenantId, url } = data;
		if (tenantId && code && title && url) {
			const {
				location: {
					origin,
					pathname,
				},
			} = window;
			try {
				if (window.sessionStorage.getItem('TABS_DATA')) {
					window.sessionStorage.removeItem('TABS_DATA');
				}
				const value = Date.now();
				window.localStorage.setItem("_LOSEPAYLOAD_", value);
				const openWinData = { url: url || "", title: title };
				// 将type 存储
				window.localStorage.setItem('openWinData', JSON.stringify(openWinData));
			} catch (e) {
				console.log(e);
			}
			window.location.replace(
				`${origin ? origin : ''}${pathname ? pathname : ''}?tenantId=${tenantId}&switch=true#/win/${code}`,
			);
			return false;
		}
		let type = "locale", urlInit = code;
		const openWinDatas = getStorageData("openWinData");
		if (typeof openWinDatas === "object" && Object.keys(openWinDatas).length) {
			title = openWinDatas.title;
			url = openWinDatas.url;
		}
		if (code === undefined) {
			throw new Error('id is required.');
		}
		if (title === undefined) {
			throw new Error('title is required.');
		}
		const flag = store.getState().wrap.tabs.find(({ id }) => { return id === code });
		if (!flag && store.getState().wrap.tabs.length >= 20) {
			openMess({
				title: "最多打开20个页签，请关闭不需要的页签。",
				duration: 2,
				type: 'error',
				closable: false,
			});
			return false;
		}

		if (url) {
			const urlParam = {
				refimestamp: new Date().valueOf(),
			}
			type = "url";
			try {
				urlInit = appendSearchParam(url, urlParam);
			} catch (error) {
				console.log(error)
			}
		}
		const param = Object.assign(data, { url: urlInit, title, type, hasWidget: false });
		store.dispatch(addTabs(param));
	},

	closeWin(param) {
		let data = store.getState().wrap.currItem;
		if (typeof param === "object" && param.id) {
			data = param;
		}
		store.dispatch(delTabs(data));
	},

	async openService({ serviceCode, data, type, tenantId }) {
		// if (window._IUAPPREMISESFLAG) {
		// 	try {
		// 		// 消息中心和审批中心
		// 		if (serviceCode != 'MessageCenter' && serviceCode != 'XTSPZX0001') {
		// 			let validateData = await validateLicense(serviceCode);
		// 			if (validateData && validateData.status == 0) {
		// 				serviceCode = 'licenseError';
		// 				window.licenseErrorMsg = validateData && validateData.msg || '抱歉，您没有购买此应用，请与销售代表联系'
		// 				type = '';
		// 			}
		// 		}
		// 	} catch (e) {
		// 		if (e == 'license 验证失败') {
		// 			serviceCode = 'licenseError';
		// 			type = '';
		// 		}
		// 	}
		// }
		const _arguments = arguments[0];
		if (tenantId && serviceCode) {
			get('/service/getServiceByTenantIdAndServiceCode', {
				serviceCode,
				tenantId,
			}).then((app) => {
				const { crossTenant, serveName, url } = app;
				if (!crossTenant) {
					openGlobalDialog({
						type: "warning",
						className: enterOrTeam,
						title: '切换企业',
						content: '需要切换到对应的企业查看详情，是否切换?',
						btns: [
							{
								label: '切换',
								fun: () => {
									const {
										location: {
											origin,
											pathname,
											hash,
										},
									} = window;
									try {
										if (window.sessionStorage.getItem('TABS_DATA')) {
											window.sessionStorage.removeItem('TABS_DATA');
										}
										const value = Date.now();
										window.localStorage.setItem("_LOSEPAYLOAD_", value);
										// 将type 存储
										window.localStorage.setItem('openServiceData', JSON.stringify(data));
										if (type && typeof type === 'object') {
											window.localStorage.setItem('openServiceType', JSON.stringify(type));
										}
									} catch (e) {
										console.log(e);
									}
									window.location.replace(
										`${origin ? origin : ''}${pathname ? pathname : ''}?tenantId=${tenantId}&switch=true#/service/${serviceCode}`,
									);
								},
							},
							{
								label: '不切换',
							},
						],
					});
				} else {
					openGlobalDialog({
						title: serveName,
						className: crossTenantDialog,
						content: (<iframe className={iframeElm} src={url} />),
					});
				}
			}, (err) => {
				console.log(err);
			});
		} else if (serviceCode) {
			let props = {}, mold = type, isFresh = false, isReopen = false, customTitle, customCode, customUrl;
			// 当第三个参数传递为对象的时候， 将其拆分 type data  data作为参数记录
			const openServiceType = getStorageData("openServiceType");
			if (typeof openServiceType === "object" && Object.keys(openServiceType).length) {
				props = openServiceType.data || {};  // 自定义参数
				mold = openServiceType.type;         // type放到此处了
				customTitle = openServiceType.title; // 自定义标题
				customCode = openServiceType.code;   // 应用多开， serviceCode 为这个值
				customUrl = openServiceType.url;     // 自定义的url 同一个服务， 但是可以开
				// TODO 0416. 10点多正式在上线， 先暂时这么解决吧， 感觉稍微有点low
				if (customUrl) {
					window.localStorage.removeItem('openServiceData');
				}
			} else if (type && typeof type === 'object') {
				props = type.data || {};  // 自定义参数
				mold = type.type;         // type放到此处了
				isFresh = type.isFresh;   // 是否只刷新
				customTitle = type.title; // 自定义标题
				customCode = type.code;   // 应用多开， serviceCode 为这个值
				customUrl = type.url;     // 自定义的url 同一个服务， 但是可以开
				isReopen = type.isReopen; // 当调用reopen的时候， 传递此参数
			}
			if (customUrl && !customCode) {
				throw new Error("no customCode");
			}

			const persistServiceData = window.sessionStorage.getItem("_PERSISTSERVICEDATA") ? JSON.parse(window.sessionStorage.getItem("_PERSISTSERVICEDATA")) : {};
			if (customCode) {
				customCode = customCode + "_diwork_" + serviceCode
				persistServiceData[customCode] = {};
				persistServiceData[customCode].type = type;
				persistServiceData[customCode].data = data || {};
				persistServiceData[customCode].serviceCode = serviceCode;
			} else {
				persistServiceData[serviceCode] = {};
				persistServiceData[serviceCode].type = type || 1;
				persistServiceData[serviceCode].data = data || {};
			}

			const code = customCode || serviceCode;
			const flag = store.getState().wrap.tabs.findIndex(({ id }) => { return id === code }) > -1;
			const activeTabs = store.getState().wrap.iframeTabs.find(({ id }) => { return id === code });
			if (!flag && store.getState().wrap.tabs.length >= 20) {
				openMess({
					title: "最多打开20个页签，请关闭不需要的页签。",
					duration: 2,
					type: 'error',
					closable: false,
				});
				return false;
			}

			// 判断不是重新打开， 则通知， 否则
			if (activeTabs && !isReopen) {
				const { customEdit, id, isMdf, url: postDataUrl } = activeTabs;
				const postData = {
					action: "isReOpen",
					activeKey: id,
					data: { serviceCode, data, type, url: postDataUrl }
				};
				if (isMdf) {
					store.dispatch(showTabs(activeTabs));
					cb.communication(postData);
					return false;
				}
				if (customEdit) {
					const frameElm = document.getElementById(id);
					if (frameElm) {
						store.dispatch(showTabs(activeTabs));
						postMessageToWin(frameElm.contentWindow, {
							type: 'data',
							data: postData,
						});
					}
					return false;
				}
			}

			window.sessionStorage.setItem("_PERSISTSERVICEDATA", JSON.stringify(persistServiceData));
			// 如果是自定义url的就不再存储到全局的openServiceData中了
			if (data && typeof data === 'object' && !isWhite && !customUrl) {
				openServiceData[serviceCode] = data;
			}
			// currentType   1是应用， 0 是服务   ，即mold 2是应用，  1或者不传为服务
			const currentType = mold === 2 ? '1' : '0';
			// 判断是否可以直接用传递的url打开能力
			const isWhite = whitelist.find(item => { return item.id === serviceCode });
			if (isWhite) {
				serviceCode = isWhite.serviceCode;
			}
			try {
				const payload = await getServiceInfoWithDetail(serviceCode, currentType);
				// 可以对应到的直接打开传过来的url的能力
				if (isWhite) {
					const { url, title, } = data;
					handlers.openWin({
						id: isWhite.id,
						title: title,
						url: url,
					});
					return false;
				}
				const {
					serviceName,
					url,
					serviceCode: subCode,
					hasWidget,
					openNewTab,
					serviceId,
					applicationId,
					applicationCode,
					applicationName,
					// sysEveryone,
					// serviceType,

					TEMPORARY,        // 中文
					serviceNameExt2,  // 英文
					serviceNameExt3,  // 繁体
					ext1,
					nativeUrl,
				} = payload;
				// 判断是否符合mdf加载条件， 下边判断是为了兼容专属云可以直接用去除iframe形式打开
				const isDisIframe = !customUrl && nativeUrl ? nativeUrl.split("//")[1] : false
				if (isDisIframe && !window._initCb_) {
					createLoadingFunc({ text: '加载中...' });
					window._MDFLOADING_ = true;
					console.info("mdf正在加载中");
					window.diworkTools.on("_MDFLOADING_", () => {
						dispatchMessageTypeHandler({
							type: "openService",
							detail: _arguments
						});
						console.log("mdf加载完毕，可以执行打开");
					});
					return false;
				}
				const isMdf = window._initCb_ && isDisIframe;
				const entry_mode = ["menu", "history", "workbench"];
				// tabs记录一下是什么地方打开
				let entryType = "other";
				// TODO 此方案有点图省事， 先这样约定吧
				if (data && typeof data === "string" && entry_mode.includes(data)) {
					entryType = data;
					try {
						const properties = {
							entry_mode: data,      //进入方式
							function_id: subCode,    //
							function_name: serviceName
						}
						window.AnalysysAgent && window.AnalysysAgent.track("function_click", properties);
					} catch (e) {
						console.log(e)
					}
				}

				const logParams = {
					serviceId,
					serviceCode: subCode,
					serviceName,
					applicationId,
					applicationCode,
					applicationName,
				};

				// 操作记录
				recordLog(logParams).then(() => { }, (err) => { store.dispatch(requestError(err)) });
				const locationProtocol = window.location.protocol;
				if (openNewTab || (locationProtocol === 'https:' && url.split(':')[0] === "http")) {
					window.open(url);
					return false;
				}

				const urlParam = {
					serviceCode: customCode || subCode,
					refimestamp: new Date().valueOf(),
				}
				const query = getOpenServiceData(serviceCode);
				// 自定义url或者payload返回url
				const locations = customUrl ? appendSearchParam(customUrl, urlParam) : appendSearchParam(url, {
					...query,
					...urlParam,
				});
				// 将title加入的data中
				const iframeTitle = customTitle || serviceName;
				props.iframeTitle = iframeTitle;
				// 将宽高信息等加入
				const { serviceInfo } = store.getState().wrap;
				props = Object.assign(props, serviceInfo);


				// 如果自定义title 又要考虑多语进去的话 --- 目前需要解决 0328
				store.dispatch(addTabs({
					id: customCode || subCode,
					type: 'service',
					url: locations,
					title: iframeTitle,
					titlelang: {
						zh_CN: TEMPORARY || serviceName,
						zh_TW: serviceNameExt3 || serviceName,  // 无繁体和英文的时候取中文
						en_US: serviceNameExt2 || serviceName,
					},
					hasWidget: hasWidget,
					isFresh: isFresh,
					data: props,
					entryType,
					iframeAttribute: ext1,
					isMdf: isMdf			// 加载方式，目前主要
				}));
			} catch (err) {
				console.log(err);
				store.dispatch(requestError(err));
			}
		}
	},
	reOpenService(data) {
		const dataDetail = data.data;
		if (!dataDetail) {
			throw new Error('data is required.');
		}
		const { type } = dataDetail;
		let typeData = {};
		if (type && typeof type === 'object') {
			typeData = Object.assign(type, { isReopen: true, });
		} else {
			typeData = { type: type, isReopen: true }
		}
		dataDetail.type = typeData;
		dispatchMessageTypeHandler({
			type: "openService",
			detail: dataDetail
		});
	},
	openDialog({ options }) {
		openGlobalDialog(options);
	},
	closeDialog() {
		closeGlobalDialog();
	},
	checkServiceOpen({ serviceCode }) {
		const tabs = store.getState().wrap.iframeTabs;
		const flag = tabs.find(item => {
			return item.id === serviceCode
		});
		return flag ? true : false;
	},
	postDataToService({ serviceCode, mdfCommunication, data }) {
		const tabs = store.getState().wrap.iframeTabs;
		const target = tabs.find(item => {
			return item.id === serviceCode
		});
		if (target) {
			const { id, isMdf } = target;
			if (mdfCommunication && isMdf) {
				window.diworkTools.trigger({ type: id, data: data });
				return false;
			}
			const frameElm = document.getElementById(id);
			if (frameElm) {
				postMessageToWin(frameElm.contentWindow, {
					type: 'data',
					data,
				});
				return true;
			}
		}
		return false;
	},
	openMessage(param) {
		openMess(param);
	},
	// for IM
	onMessage({ unreadTotalNum }) {
		store.dispatch(changeMessageType(!!unreadTotalNum));
	},
	hideIm() {
		store.dispatch(hideIm());
	},
	refreshUserInfo() {
		let userId = window.getUserInfo && window.getUserInfo().userId
		store.dispatch(getUserInfo(userId));
	},
	logout() {
		logout();
	},
	switchChatTo({ id, yht_id, type }) {
		trigger('IM', 'switchChatTo', {
			id,
			yht_id,
			type,
		});
	},
	onGroupUpdated(data) {
		// 借助window  判断是否已经注册， 已经注册则直接调用trigger
		store.dispatch(updateGroupIm(data));
		if (window.onGroupUpdatedType) {
			window.diworkTools.trigger({ type: window.onGroupUpdatedType, data: data });
		}
	},
	getImGroupData() {
		trigger('IM', 'getImGroupData');
	},
	openNotifyCenter({ tab }) {
		trigger('IM', 'openNotifyCenter', { tab, });
	},
	onUnReadedNumChanged(data) {
		store.dispatch(unReadedIm(data));
		if (window.onUnReadedNumChangedType) {
			window.diworkTools.trigger({ type: window.onUnReadedNumChangedType, data: data });
		}
	},

	showDialog(data) {
		store.dispatch(showDialog(data));
	},
	closeDialogNew() {
		store.dispatch(closeDialogNew());
	},
	openFrame(data) {
		store.dispatch(openFrame(data));
	},
	closeFrame() {
		store.dispatch(closeFrame());
	},
	openServicePublish(data) {
		store.dispatch(openFrame({ id: "addService", pageParam: data }));
	},
	closeServicePublish() {
		store.dispatch(closeFrame());
	},
	// TODO 后期想干掉， 这个现在diwork-public-components中搜索用到， 协同的个人主页中也用到
	openHomePage(data) {
		const key = data.key || 'info';
		dispatchMessageTypeHandler({
			type: "openWin",
			detail: {
				id: 'HomePage',
				title: "个人主页",
				data: {
					userId: data.userId,
					key: key
				}
			}
		});
	},
	recordLog({ serviceCode, data }) {
		if (!serviceCode) {
			throw new Error('serviceCode error.');
		}
		const param = { serviceCode, ...data };
		recordLog(param).then(() => { }, (err) => { store.dispatch(requestError(err)) });
	},
	dismissEnterprise(data) {
		if (window.sessionStorage.getItem("TABS_DATA")) {
			window.sessionStorage.removeItem('TABS_DATA');
		}
		window.location.reload();
	},
	updateService(data) {
		store.dispatch(updateTabs(data));
	},
}
window.handlers = handlers;

function bind(target, obj) {
	Object.keys(obj).forEach((key) => {
		if (typeof obj[key] === 'function') {
			obj[key] = obj[key].bind(target);
		}
	})
}

export function regMessageTypeHandler(app) {
	bind(app, handlers);
}

export function dispatchMessageTypeHandler({ type, detail }) {
	if (type && handlers[type]) {
		return handlers[type](detail);
	} else {
		throw new Error('dispatchMessageTypeHandler need type');
	}
}

export function parseType(type) {
	const firstColonIndex = type.indexOf(':');
	let detail;
	if (firstColonIndex !== -1) {
		detail = type.slice(firstColonIndex + 1);
		type = type.slice(0, firstColonIndex);
	}
	return {
		type,
		detail,
	};
}

const openServiceData = {};
const openWinData = {};

let initData = {};
try {
	if (window.location.search) {
		const urlObj = new URL(window.location.href);
		const keys = urlObj.searchParams.keys();
		while (1) {
			let { done, value: key } = keys.next();
			if (done) {
				break;
			}
			initData[key] = urlObj.searchParams.getAll(key);
		}
	}
} catch (e) {
	console.log(e.message);
}


export function getOpenServiceData(serviceCode) {
	let data = {};
	if (initData) {
		data = initData;
		initData = null;
	}
	if (typeof window.localStorage.getItem('openServiceData') !== 'undefined') {
		try {
			data = {
				...data,
				...JSON.parse(window.localStorage.getItem('openServiceData')),
			};
		} catch (e) {
			console.log(e);
		}
		window.localStorage.removeItem('openServiceData');
	}
	if (typeof openServiceData[serviceCode] !== 'undefined') {
		data = {
			...data,
			...openServiceData[serviceCode],
		};
		delete openServiceData[serviceCode];
	}
	return data;
}

export function getStorageData(name) {
	let data = {};
	if (window.localStorage.getItem(name)) {
		try {
			data = JSON.parse(window.localStorage.getItem(name))
		} catch (e) {
			console.log(e);
		}
		window.localStorage.removeItem(name);
	}
	return data;
}


// 兼容openService 易观和原有的 type
export function openService(serviceCode, type, sa) {
	if (type && typeof type === "string") {
		handlers.openService({ serviceCode, data: type, type: sa });
	} else {
		handlers.openService({ serviceCode, type });
	}
}

export function openWin(data) {
	handlers.openWin(data);
}
