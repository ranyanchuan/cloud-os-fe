import { getContext, postMessageToWin, getNewEvent } from '@u';
import { dispatchMessageTypeHandler } from 'public/regMessageTypeHandler';
import store from "store";
// import { Pages } from 'router';
// import { trigger, on } from 'public/queue';
//注册事件
const keys = [
	'JDIWORK',
	// "TEST_IFRAME_EVENT"  //测试数据的api注册
];

const handlerList = {
	openService(type, event) {
		dispatchMessageTypeHandler(event);
		postMessageToWin(this.source, {
			type,
		});
	},
	reOpenService(type, event) {
		dispatchMessageTypeHandler(event);
		postMessageToWin(this.source, {
			type,
		});
	},
	recordLog(type, event) {
		dispatchMessageTypeHandler(event);
	},
	dismissEnterprise(type, event) {
		dispatchMessageTypeHandler(event);
	},
	updateService(type, event) {
		dispatchMessageTypeHandler(event);
		postMessageToWin(this.source, {
			type,
		});
	},
	closeDialog(type, event) {
		dispatchMessageTypeHandler(event);
	},
	openDialog(type, event) {
		const postMessageToWinProxy = (callbackId) => {
			postMessageToWin(this.source, {
				type: callbackId,
				destroy: false,
			});
		};
		const options = event.detail.options;
		if (options) {
			if (options.btns && options.btns.length) {
				options.btns.forEach((btn) => {
					const btnCallbackId = btn.fun;
					btn.fun = () => {
						postMessageToWinProxy(btnCallbackId);
					}
				})
			}
			options.close = () => {
				postMessageToWinProxy(options.onClose);
			};
			dispatchMessageTypeHandler(event);
		} else {
			postMessageToWin(this.source, {
				type,
				data: false,
			});
		}
	},
	addBrm(type, event) {
		postMessageToWin(this.source, {
			type,
		});
	},
	popBrm(type, event) {
		postMessageToWin(this.source, {
			type,
		});
	},
	getBrm(type,) {
		const data = [];
		postMessageToWin(this.source, {
			type,
			data,
		});
	},
	checkServiceOpen(type, event) {
		const result = dispatchMessageTypeHandler(event);
		postMessageToWin(this.source, {
			type,
			data: result,
		});
	},
	postDataToService(type, event) {
		const result = dispatchMessageTypeHandler(event);
		postMessageToWin(this.source, {
			type,
			data: result,
		});
	},
	getContext(type) {
		const data = getContext();
		// 新版本的 增加一个多页签标示
		data.isPages = true;
		const multilist = JSON.parse(data.multilist);
		const sysLocale = multilist.find(item => item.default).langCode;
		data.sysLocale = sysLocale;
		const terminal = window.getUserInfo().currentTeamConfig.terminal
		data.terminal = terminal;
		postMessageToWin(this.source, {
			type,
			data,
		});
	},
	rootClick() {
		// 外部点击现在不用处理， im和菜单弹出会显示遮罩层来搞定
		// const event = getNewEvent('mousedown');
		// window.document.getElementById('root').dispatchEvent(event);
	},
	switchChatTo(type, event) {
		dispatchMessageTypeHandler(event);
		postMessageToWin(this.source, {
			type,
		});
	},
	onGroupUpdated(type, event) {
		const result = store.getState().GroupImData;
		// 如果im已经存储起来信息，则直接返回。
		if (result) {
			postMessageToWin(this.source, {
				type,
				data: result,
				destroy: false,
			});
		}
		window.onGroupUpdatedType = type;
		const _this = this;
		window.diworkTools.on(type, (result) => {
			postMessageToWin(_this.source, {
				type,
				data: result,
				destroy: false,
			});
		});

	},
	getImGroupData(type, event) {
		dispatchMessageTypeHandler(event);
		postMessageToWin(this.source, {
			type,
		});
	},
	openNotifyCenter(type, event) {
		dispatchMessageTypeHandler(event);
		postMessageToWin(this.source, {
			type,
		});
	},
	onUnReadedNumChanged(type) {
		const result = store.getState().ReadedImData;
		// 如果im已经存储起来信息，则直接返回。 如果没有
		if (result) {
			postMessageToWin(this.source, {
				type,
				data: result,
				destroy: false,
			});
		}
		window.onUnReadedNumChangedType = type;
		const _this = this;
		window.diworkTools.on(type, (result) => {
			postMessageToWin(_this.source, {
				type,
				data: result,
				destroy: false,
			});
		});

	},
	openMessage(type, event) {
		dispatchMessageTypeHandler(event);
		postMessageToWin(this.source, {
			type,
		});
	},
	refreshUserInfo(type, event) {
		dispatchMessageTypeHandler(event);
		postMessageToWin(this.source, {
			type,
		});
	},
	showDialog(type, event) {
		dispatchMessageTypeHandler(event);
		postMessageToWin(this.source, {
			type,
		});
	},
	closeDialogNew(type, event) {
		dispatchMessageTypeHandler(event);
		postMessageToWin(this.source, {
			type,
		});
	},
	showTabs(type, event) {
		dispatchMessageTypeHandler(event);
		postMessageToWin(this.source, {
			type,
		});
	},
	openWin(type, event) {
		// if (Pages[event.detail.id]) {
		//   dispatchMessageTypeHandler(event);
		// }
		dispatchMessageTypeHandler(event);
		postMessageToWin(this.source, {
			type,
		});
	},
	closeWin(type, event) {
		dispatchMessageTypeHandler(event);
		postMessageToWin(this.source, {
			type,
		});
	},
	openFrame(type, event) {
		dispatchMessageTypeHandler(event);
		postMessageToWin(this.source, {
			type,
		});
	},
	closeFrame(type, event) {
		dispatchMessageTypeHandler(event);
		postMessageToWin(this.source, {
			type,
		});
	},
	openServicePublish(type, event) {
		dispatchMessageTypeHandler(event);
		postMessageToWin(this.source, {
			type,
		});
	},
	closeServicePublish(type, event) {
		dispatchMessageTypeHandler(event);
		postMessageToWin(this.source, {
			type,
		});
	},
	getPageParam(type) {
		const data = store.getState().frameParam.pageParam;
		postMessageToWin(this.source, {
			type,
			data,
		});
	},
	openHomePage(type, event) {
		dispatchMessageTypeHandler(event);
		postMessageToWin(this.source, {
			type,
		});
	},
	getData(type, event) {
		const tabs = store.getState().wrap.tabs;
		// 兼容当初定义的api的id和 parentId,
		let {
			detail: {
				id,
				parentId,
				code,
				serviceCode,
			}
		} = event;
		if (!id && !serviceCode) {
			throw new Error("Missing required parameter:serviceCode");
		}
		if (serviceCode) {
			id = serviceCode;
		}
		if (code) {
			id = `${code}_diwork_${serviceCode}`;
		} else if (parentId) {
			id = `${id}_diwork_${parentId}`;
		}
		const data = store.getState().wrap.activeCarrier === id ? tabs.find(item => id === item.id).data : {};
		// 如果当前是打开的，来获取可以返回，不然返回空， 防止传错ID 来获取到其它的
		postMessageToWin(this.source, {
			type,
			data
		});
	},
	//工作台hosts
	getHostForGlobal(type, event) {
		let data;
		if (window.getHostForGlobal && typeof window.getHostForGlobal === 'function') {
			const result = window.getHostForGlobal(event.detail);
			data = result;
		}
		postMessageToWin(this.source, {
			type,
			data,
		});
	}
}

function messageHandler({ detail, callbackId }, event) {
	if (callbackId && typeof callbackId === 'string') {
		const type = callbackId.split(':')[0];
		if (handlerList[type]) {
			handlerList[type].call(event, callbackId, { type, detail });
		} else {
			window.diworkTools.trigger({ type, data: detail });
		}
	}
}

window.addEventListener('message', (event) => {
	if (event.data) {
		let data = event.data;
		//兼容财务云组件消息处理
		try {
			if (typeof data === 'string') {
				data = JSON.parse(data);
			}
		} catch (e) {
			console.log(e);
			return;
		}
		const { messType } = data;
		if (messType && keys.indexOf(messType) > -1) {
			messageHandler(data, event);
		}
	}
});

