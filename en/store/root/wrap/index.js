import { handleActions } from 'redux-actions';
import { getContext, GetQueryString } from '@u';
import actions from './actions';
const {
	getServiceList,
	getPortal,
	openRoot,
	openPortal,
	showTabs,
	addTabs,
	delTabs,
	closeTabs,
	updateTabs,
	openPin,
	closePin,
	cancelFolders,
	setFolders,
	addFolders,
	getAllMenuList,
	getHistoryList,
	changeRetract,    // 更改header是否收起
	setMenuKeys,    // 记录大菜单最后打开的位置
	setLeadStatus,
	recordServiceInfo,
	getAllPortal,
	setDefaultPortal,
} = actions;

const fetchTabs = () => {
	let tabs = [];
	if (window.sessionStorage.getItem('TABS_DATA')) {
		try {
			tabs = JSON.parse(window.sessionStorage.getItem('TABS_DATA')).map(item => {
				item.title = item.titlelang[getContext().locale];
				// 处理浏览器刷新时候不能重新打开的bug
				item.customEdit = false;
				return item;
			});
		} catch (e) {
			console.log(e);
		}
	}
	return tabs;
}

const setTabsStorage = (tabs) => {
	const tabs_new = tabs.filter(item => item.type === "service");
	window.sessionStorage.setItem('TABS_DATA', JSON.stringify(tabs_new));
}

const defaultState = {
	serviceList: [],
	portalInfo: {
		openStatus: false,
		portalUrl: ''
	},
	defaultDesktop: getContext().defaultDesktop,
	productLine: getContext().productLine,
	retract: true,  // header合并一个
	// tabs: [
	// {
	//   id: '234',   // id  唯一  service的 即 servicecode
	//   title: '333',  // 页签显示标题
	//   type: 'locale',  // 类型， 本地 还是 服务
	//   url: '',         // 地址  本地或者 服务
	//   hasWidget: false // 是否在首页磁贴中， 可判断是否添加到首页/从首页磁贴移除
	//   data: {}         // 打开新页签 传递的参数
	//   isnoneDel: true        // 不可关闭的标示， 固定页签
	//   isFresh: false       // 默认为false，将新打开的放到首位， true则不变化位置
	// }
	// ],     // 多页签存储
	tabs: fetchTabs(),
	iframeTabs: [],
	currItem: {}, // 当前页签的内容
	activeCarrier: GetQueryString('workbenchHome') == 'home' ? 'home' : window.localStorage.getItem("defaultDesktop") || 'portal',
	// 当前页签id
	pinDisplay: false,  // 是否显示 pin弹窗
	beginner: window.getSystemConfigs ? window.getSystemConfigs().leadStatus : true,    // 新手指导开关
	allMenuList: [],  // 菜单项
	historyList: [],  // 历史记录
	menuKeys: {}, // 设定菜单那里选中的keys
	menuItemCodes: {},
	serviceInfo: {},  // iframe， 宽度， 高度。
	allPortal: [],
	defaultPortal: {},
	isMutliPortal: false,
	isDefaultPortal: false,
	initPortal: window.localStorage.getItem("defaultDesktop") === "home" ? false : true,			// 门户首次加载
};

const reducer = handleActions({
	[setLeadStatus]: (state, { payload, error }) => {
		if (error) {
			return state;
		};
		return {
			...state,
			beginner: true
		}
	},
	[getServiceList]: (state, { payload: serviceList, error }) => {
		if (error) {
			return state;
		}
		return {
			...state,
			serviceList,
		};
	},
	[getPortal]: (state, { payload, error }) => {
		if (error) {
			return state;
		}
		return {
			...state,
			portalInfo: payload,
		};
	},
	[openRoot]: (state, { payload, }) => {
		window.localStorage.setItem("defaultDesktop", 'home');
		return {
			...state,
			activeCarrier: 'home',
			currItem: {},
		};
	},
	[openPortal]: (state, { payload, }) => {
		window.localStorage.setItem("defaultDesktop", 'portal');
		return {
			...state,
			activeCarrier: 'portal',
			currItem: {},
			initPortal: true
		};
	},
	[showTabs]: (state, { payload, }) => {
		return {
			...state,
			activeCarrier: payload.id,
			currItem: payload,
		};
	},
	[addTabs]: (state, { payload, }) => {
		let { tabs, iframeTabs } = state;
		const cIndex = tabs.findIndex((item) => {
			return item.id === payload.id;
		});
		const iframeIndex = iframeTabs.findIndex(item => {
			return item.id === payload.id;
		});
		let newTabs, newIframeTabs;
		// 判断是否已经打开
		if (cIndex > -1) {
			// 判断是只刷新，还是重新打开到前边
			if (payload.isFresh) {
				delete payload.isFresh;
				tabs.splice(cIndex, 1, payload);
				newTabs = [...tabs];
			} else {
				tabs.splice(cIndex, 1);
				newTabs = [payload, ...tabs];
			}
			// tabs中有， iframeTabs中么有，
			if (iframeIndex > -1) {
				// iframeTabs都是当作刷新单个来处理， 不换位置
				iframeTabs.splice(iframeIndex, 1, payload);
				newIframeTabs = [...iframeTabs];
			} else {
				newIframeTabs = [payload, ...iframeTabs];
			}
		} else {
			newTabs = [payload, ...tabs];
			newIframeTabs = [payload, ...iframeTabs];
		}
		// 将tabs存起来
		setTabsStorage(newTabs);
		return {
			...state,
			tabs: newTabs,
			iframeTabs: newIframeTabs,
			activeCarrier: payload.id,
			currItem: payload,
		};
	},
	[delTabs]: (state, { payload, }) => {
		const { tabs, activeCarrier, iframeTabs, productLine } = state;
		const newTabs = tabs.filter((item) => {
			return item.id !== payload.id;
		});
		const newIframeTabs = iframeTabs.filter((item) => {
			return item.id !== payload.id;
		});
		setTabsStorage(newTabs);
		// 判断删除的是否是当前获取焦点的tabs
		if (payload.id === activeCarrier) {
			// 如果已经删除的长度大于0，就将第一个设定为active状态 ，否则直接回home
			// if (newTabs.length) {
			// 	return {
			// 		...state,
			// 		tabs: newTabs,
			// 		iframeTabs: [...newIframeTabs],
			// 		currItem: newTabs[0],
			// 		activeCarrier: newTabs[0].id,
			// 	}
			// }
			return {
				...state,
				tabs: newTabs,
				iframeTabs: [...newIframeTabs],
				currItem: {},
				activeCarrier: window.localStorage.getItem("defaultDesktop") || 'portal',
			}
		}
		// 不是焦点的直接删。
		return {
			...state,
			tabs: newTabs,
			iframeTabs: [...newIframeTabs]
		};
	},
	[closeTabs]: (state) => {
		const { productLine } = state;
		setTabsStorage([]);
		return {
			...state,
			tabs: [],
			iframeTabs: [],
			activeCarrier: window.localStorage.getItem("defaultDesktop") || 'portal',
			currItem: {},
		};
	},
	[updateTabs]: (state, { payload, }) => {
		const { serviceCode, data } = payload;
		const { tabs, activeCarrier, currItem } = state;
		if (!serviceCode) {
			throw new Error("Missing required parameter:serviceCode");
		}
		let id = serviceCode;
		if (serviceCode && typeof serviceCode === "object") {
			let {
				serviceCode: subCode,
				code,
			} = serviceCode;
			if (!subCode) {
				throw new Error("Missing required parameter:serviceCode");
			}
			id = subCode;
			if (code) {
				id = `${code}_diwork_${subCode}`;
			}
		}
		if (id !== activeCarrier) {
			return state;
		}
		const { title, customReFresh, customEdit } = data;
		const cIndex = tabs.findIndex((item) => {
			return item.id === id;
		});
		if (title) {
			currItem.title = title;
			/*  *不用更新getData 获取的currItem.data中的iframeTitle， iframeTitle这个是为了保证初始值* */
		}
		if (typeof customReFresh === 'boolean') {
			currItem.customReFresh = customReFresh;
		}
		if (typeof customEdit === 'boolean') {
			currItem.customEdit = customEdit;
		}
		tabs.splice(cIndex, 1, currItem);
		setTabsStorage(tabs);
		return {
			...state,
			tabs: [...tabs],
			currItem: currItem
		}
	},
	[openPin]: (state) => {
		return {
			...state,
			pinDisplay: true
		};
	},
	[closePin]: (state) => {
		return {
			...state,
			pinDisplay: false
		};
	},
	[cancelFolders]: (state, { error }) => {
		if (error) {
			return state;
		}
		const { currItem, tabs, activeCarrier } = state;
		// hasWidget 是当前页签是否固定到首页的标示
		currItem.hasWidget = false;
		const currIndex = tabs.findIndex(item => {
			return activeCarrier === item.id;
		});
		tabs[currIndex].hasWidget = false;
		setTabsStorage(tabs);
		return {
			...state,
			currItem: { ...currItem },
			tabs: [...tabs],
		};
	},
	[setFolders]: (state, { error }) => {
		if (error) {
			return state;
		}
		const { currItem, tabs, activeCarrier } = state;
		currItem.hasWidget = true;
		const currIndex = tabs.findIndex(item => {
			return activeCarrier === item.id;
		});
		tabs[currIndex].hasWidget = true;
		setTabsStorage(tabs);
		return {
			...state,
			currItem: { ...currItem },
			tabs: [...tabs],
		};
	},
	[addFolders]: (state, { error, payload }) => {
		const { folders } = state;
		if (error) {
			return state;
		}
		return {
			...state,
			folders: [...folders, payload],
		};
	},
	[getAllMenuList]: (state, { payload, error }) => {
		if (error) {
			return state;
		}
		return {
			...state,
			allMenuList: payload,
		};
	},
	[getHistoryList]: (state, { payload, error }) => {
		if (error) {
			return state;
		}
		return {
			...state,
			historyList: payload,
		};
	},
	[changeRetract]: (state, { payload, error }) => {
		if (error) {
			return state;
		}
		return {
			...state,
			retract: !payload,
		};
	},
	[setMenuKeys]: (state, { payload, error }) => {
		if (error) {
			return state;
		}
		const { menuItemCodes } = state;
		return {
			...state,
			menuKeys: payload.menuKeys,  // 设定菜单那里选中的keys
			menuItemCodes: payload.menuItemCodes || menuItemCodes,
		};
	},
	[recordServiceInfo]: (state, { payload, error }) => {
		if (error) {
			return state;
		}
		const { serviceInfo } = state;
		const newServiceInfo = Object.assign(serviceInfo, payload);
		return {
			...state,
			serviceInfo: newServiceInfo,  // 设定菜单那里选中的keys
		};
	},
	[getAllPortal]: (state, { payload, error }) => {
		if (error) {
			return state;
		};
		let defaultPortal = payload.find(item => item.defaultPortal) || {};
		let isDefaultPortal = false;
		// 当有返回数据， 但是没有默认门户的情况， 将第一个设置为默认门户
		if (!defaultPortal.id) {
			if (payload.length >= 1) {
				defaultPortal = payload[0];
			}
		} else {
			isDefaultPortal = true;
		}

		return {
			...state,
			allPortal: payload,
			defaultPortal,
			isMutliPortal: payload.length > 1 ? true : false,
			isDefaultPortal,
		}
	},
	[setDefaultPortal]: (state, { payload, error }) => {
		if (error) {
			return state;
		};
		let { allPortal } = state;
		const allPortalNew = allPortal.map(item => {
			item.defaultPortal = false;
			return item;
		});

		const defaultPortalId = payload.id;
		let defaultPortal;
		allPortalNew.forEach(item => {
			if (item.id === defaultPortalId) {
				item.defaultPortal = true;
				defaultPortal = item;
			}
		});
		return {
			...state,
			allPortal: allPortalNew,
			defaultPortal: defaultPortal,
			isDefaultPortal: true
		}
	},
}, defaultState);

export default reducer;
