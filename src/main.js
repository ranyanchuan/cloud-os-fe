import React from 'react';
import ReactDOM from 'react-dom';
import { destoryLoadingFunc } from 'pub-comp/loading';
import "public/queue";
import 'public/jDiworkBridge';
import 'assets/style/reset.css';
import 'assets/style/animate.css';
import 'assets/style/iuapmobile.um.css';
import 'assets/style/base.css';
window.name = "_WORKBENCH_";
window.React = React;
window.ReactDOM = ReactDOM;
window._initCb_ = false;
window._MDFLOADING_ = false;

import App from 'pages';
// mdf 初始化
window.cbReady = (data) => {
	window._initCb_ = true;
	if (window._MDFLOADING_) {
		window._MDFLOADING_ = false;
		destoryLoadingFunc();
		window.diworkTools.trigger({ type: "_MDFLOADING_", data: {} });
	}
}
const rootElm = document.getElementById('root');
ReactDOM.render(<App />, rootElm);

// /*  貌似点击im外部可以触发  */
// import { dispatchMessageTypeHandler } from 'public/regMessageTypeHandler';
// rootElm.addEventListener('mousedown', (e) => {
//   dispatchMessageTypeHandler({
//     type: 'hideIm',
//   });
// });
// const osFeLoginCallBack = () => {
// 	window.location.reload();
// }
// window.os_fe_loginCallback = osFeLoginCallBack;
