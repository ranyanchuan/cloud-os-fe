import React from 'react';
import { handleActions } from 'redux-actions';
import { getContext, logout } from '@u';
import { destoryLoadingFunc, createLoadingFunc } from 'pub-comp/loading';
import { trigger } from 'public/componentTools';
import actions from './actions';

import wrap from './wrap';
import home from './home';
import search from './search';
import manage from './manage';
import homepage from './homepage';
import teamconfig from './teamconfig';
import invitation from './invitation';
import history from './history';

const {
	requestStart,
	requestSuccess,
	requestError,
	getUserInfo,
	setUserInfo,
	changeMessageType,
	updateGroupIm,
	unReadedIm,
	showIm,
	hideIm,
	uploadApplication,
	getPoll,
	setCurrent,
	getAllEnable,
	getCurrent,
	setCurrentNot,
	getAllEnableNot,
	getCurrentNot,
	showDialog,
	closeDialogNew,
	openFrame,
	closeFrame,
	getDefaultDesktop,
	setDefaultDesktop,
	getCurrentDate,
	setCurrentDate,
	setTheme,
	getHelpManage,
} = actions;

const defaultState = {
	userInfo: {}, // userinfo
	showModal: false,   // 统一modal的显隐
	dialogData: {},     // modal 内容
	showFrame: false,   // frame 遮罩层
	frameParam: {},     // 打开frame传递的参数集合
	currLan: 'zh_CN',//当前的语言
	imShowed: false,
	messageType: false,
	messageList: [],
	messageShowNum: 0,
	content: "workbench",      // 默认登录动作， workbench/protal

	GroupImData: null,
	ReadedImData: null,
	businessDate: getContext().businessDate,
	currentThemeId: window.getUserInfo && window.getUserInfo().defaultTheme || "grey",
	themeList: [
		{ id: "grey", background: "linear-gradient(360deg,#CBD0D1 0%,rgba(181,185,188,1) 100%)", color: "#333333", editColor: "#505766", name: " Elegant Grey" },
		{ id: "paleblue", background: "linear-gradient(180deg,rgba(177,189,197,1) 0%,rgba(203,209,210,1) 100%)", color: "#333333", editColor: "#505766", name: " Light Blue" },
		{ id: "yellow", background: "linear-gradient(180deg,rgba(208,202,191,1) 0%,rgba(237,235,232,1) 100%)", color: "#333333", editColor: "#505766", name: "Morandi Yellow" },
		{ id: "blue", background: "linear-gradient(359deg,rgba(105,111,124,1) 0%,rgba(65,76,90,1) 100%)", color: "#ffffff", editColor: "#ffffff", name: " Starry Blue" },
	],
	helpInfo: {},
};

const reducer = handleActions({
	[requestStart](state) {
		createLoadingFunc({ text: 'Loading..' });
		return state;
	},
	[requestSuccess](state) {
		destoryLoadingFunc();
		return state;
	},
	[requestError](state, { payload: msg }) {
		destoryLoadingFunc();
		if (typeof msg !== "string") {
			console.log(msg);
			return {
				...state
			}
		}
		return {
			...state,
			showModal: true,
			dialogData: {
				type: 'error',//'error',
				title: 'Error',
				msg
			},
		};
	},
	[getUserInfo]: (state, { payload, error }) => {
		if (error) {
			return state;
		}
		payload.allowTenants.forEach((da) => {
			da.type = da.team;// 需求变更，废弃team字段。
		});
		return {
			...state,
			userInfo: payload,
		};
	},
	[setUserInfo]: (state, { payload, }) => {
		payload.allowTenants.forEach((da) => {
			da.type = da.team;// 需求变更，废弃team字段。
		});
		return {
			...state,
			userInfo: payload,
		};
	},
	[uploadApplication]: state => state,
	[getPoll]: (state, { payload, error }) => {
		if (error) {
			return state;
		}
		if (payload.needrelogin) {
			return {
				...state,
				showModal: true,
				dialogData: {
					type: 'warning',
					title: 'Tips',
					msg: payload.msg,
					close: () => { logout() }
				},
			}
		}
		const { tenantid, userid } = getContext();
		// 避免localhost环境下一直刷新
		if (payload.tenantId == "tenantid" && payload.userId == "userid") {
			return state;
		}
		if (!payload.tenantId || !tenantid) {
			return state;
		}
		if (payload.tenantId !== tenantid || payload.userId !== userid) {
			window.location.reload();
		}
		return {
			...state,
		}
	},
	[changeMessageType]: (state, { payload: messageType }) => ({
		...state,
		messageType,
	}),
	[updateGroupIm]: (state, { payload }) => ({
		...state,
		GroupImData: payload,
	}),
	[unReadedIm]: (state, { payload }) => ({
		...state,
		ReadedImData: payload,
	}),
	[showIm]: (state) => {
		trigger('IM', 'imShow');
		return {
			...state,
			imShowed: true,
		};
	},
	[hideIm]: (state) => {
		trigger('IM', 'imHide');
		return {
			...state,
			imShowed: false,
		};
	},
	[setCurrent]: state => state,
	[getAllEnable]: state => state,
	[getCurrent]: state => state,
	[setCurrentNot]: state => state,
	[getAllEnableNot]: state => state,
	[getCurrentNot]: (state, { payload }) => {
		// console.log('payload',payload.langCode)
		return {
			...state,
			currLan: payload.langCode
		}
	},
	[showDialog]: (state, { payload: dialogData }) => {
		let { type } = dialogData;
		const { title, msg, btn, customData } = dialogData;
		const typeArray = ['warning', 'success', 'error'];
		if (!typeArray.find((ele) => (ele === type))) {
			type = 'success';
		}
		return {
			...state,
			showModal: true,
			dialogData: {
				type: type,
				title: title || 'Tips',
				msg: msg,
				btn: btn,
				customData,
			},
		}
	},
	[closeDialogNew]: (state) => ({ ...state, showModal: false, dialogData: {} }),
	[openFrame]: (state, { payload: param }) => {
		return {
			...state,
			showFrame: true,
			frameParam: param,
		}
	},
	[closeFrame]: (state) => {
		return {
			...state,
			showFrame: false,
			frameParam: {}
		}
	},
	[getDefaultDesktop]: (state, { payload, error }) => {
		if (error) {
			return state;
		}
		return {
			...state,
			content: payload,
		};
	},
	[setDefaultDesktop]: (state, { payload, error }) => {
		if (error) {
			return state;
		}
		return {
			...state,
			content: payload.content,
		};
	},
	[getCurrentDate]: (state, { payload, error }) => {
		if (error) {
			return state;
		}
		return {
			...state,
			businessDate: payload.businessDate,
		};
	},
	[setCurrentDate]: (state, { payload, error }) => {
		if (error) {
			return state;
		}
		return {
			...state,
			// businessDate: payload.content,
		};
	},
	[setTheme]: (state, { payload, error }) => {
		if (error) {
			return state;
		}
		return {
			...state,
			currentThemeId: payload.content || "grey",
		};
	},
	[getHelpManage]: (state, { payload, error }) => {
		if (error) {
			return state;
		}
		return {
			...state,
			helpInfo: payload,
		};
	},
}, defaultState);

export default function (state, action) {
	const rootState = reducer(state, action);
	const pageState = {
		wrap: wrap(state ? state.wrap : undefined, action),
		home: home(state ? state.home : undefined, action),
		search: search(state ? state.search : undefined, action),
		manage: manage(state ? state.manage : undefined, action),
		homepage: homepage(state ? state.homepage : undefined, action),
		teamconfig: teamconfig(state ? state.teamconfig : undefined, action),
		invitation: invitation(state ? state.invitation : undefined, action),
		history: history(state ? state.history : undefined, action),
	};
	const newState = Object.assign({}, rootState, pageState);
	return newState;
}
