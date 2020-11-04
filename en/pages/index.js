import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import {
	HashRouter as Router,
	withRouter,
	Switch,
	Route
} from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from 'router';
import HelpModal from 'components/helpModal';
import createRoutes from 'router/create.js';
import pointRoutes from 'router/point.js';
import limitRoutes from 'router/limit.js';
import store from 'store';
import componentTool from 'public/componentTools';
import { getContext, mapStateToProps, getHost } from '@u';
import RouteWithSubRoutes from 'pub-comp/routeWithSubRoutes';
import rootActions from 'store/root/actions';
import { regMessageTypeHandler } from 'public/regMessageTypeHandler';
import BasicDialog from 'components/basicDialog';
import Frame from 'components/frame';

const NoMatch = ({ history }) => {
	history.replace('');
	return <div />;
};

const {
	getPoll,
	setUserInfo,
	setCurrentNot,
	getHelpManage
} = rootActions;

function timer(fn, time) {
	let timerId = 0;
	function loop() {
		// 根据时间戳和localstorage特性来解决多窗口打开，频繁ping的问题
		const date = Date.now();
		const pingDate = window.localStorage.getItem("_pingDate_") ? Number(window.localStorage.getItem("_pingDate_")) : null;
		// 不用担心小于或等于10000， 因为执行就要耗时，所以肯定超过10000
		if (!pingDate || (date - pingDate) > 10000) {
			fn();
			window.localStorage.setItem("_pingDate_", date);
		}
		timerId = setTimeout(loop, time);
	}
	loop();
	return () => {
		clearTimeout(timerId);
	};
}

@withRouter
@connect(
	mapStateToProps(
		'showFrame',
		'showModal',
		'helpInfo',
	),
	{
		getPoll,
		setUserInfo,
		setCurrentNot,
		getHelpManage
	}
)
class Root extends Component {
	static propTypes = {
		getPoll: PropTypes.func,
		setUserInfo: PropTypes.func,
	};
	static defaultProps = {
		getPoll: () => { },
		setUserInfo: () => { },
	};
	constructor(props) {
		super(props);
		this.state = {
			defaultLan: 'zh_CN',    //默认是中文
			isHelpModal: false,
		};
		this.isLogin = window.os_fe_isLogin && window.os_fe_isLogin();
		this.userInfo = window.getUserInfo && window.getUserInfo();
		this.timer = 0;
	}
	componentWillMount() {
		if (!this.isLogin) {
			const currentLan = window.getCurrentLangCode && window.getCurrentLangCode();
			if (currentLan) {
				this.setState({
					defaultLan: currentLan,
				});
			}
			return false;
		}
		const {
			getPoll, setUserInfo,
		} = this.props;
		// 将ftl文件header中的userinfo赋值到store中
		setUserInfo(this.userInfo);
		// 初始化绑定handle
		regMessageTypeHandler(this);
		// 心跳
		const { allowTenants } = this.userInfo;
		if (allowTenants.length) {
			timer(getPoll, 15000);
		}
	}

	componentDidMount() {
		const _this = this;
		// 9.29加入， 暂时只上测试环境
		const { productLine, userid, tenantid, appcode } = getContext();
		window.osImCallBack = () => {
			InitEsnIM(new componentTool('IM'), getContext(), { // eslint-disable-line
				el: 'IM',
			});
		};
		window.osXiaoyouCallBack = () => {
			var xiaoyouSdk = xiaoyou({
				el: "xiaoyou",
				config: {
					tenantid: tenantid,
					userid: userid,
					appcode: appcode,
				},
				workbenchTool: new componentTool('XiaoYou'),
			});
			xiaoyouSdk.mount();
		}

		const sid = productLine === "u8c" ? "CFCAEB07EA91D18BC05D4A07DCD038F5AA17A665AF45540580C7F5612351B36F8AF537E731F37CD77299EA90E0922B6A" : "CFCAEB07EA91D18B9E12B7BD6FAD10EC497DBD299F0040BDA84DD27F9AB61C73A9D3E0A974903B8727B1D8B50A817CD9";
		window.loadPopDialog && window.loadPopDialog(
			sid,
			{
				userId: userid,
				tantentId: tenantid,
				serviceCode: ""
			},
			{
				"height": 88,
				"width": 160,
				"radius": true,
				"background": "url(http://fuwu.yonyou.com/assets/chatClient/src/images/visitor.png)"
			},
			false
		);

		// 监听来自于iframe发起的事件中心。
		window.diworkTools.onData((data) => {
			// saveLang 保存完语言设置回调
			if (data.action === "saveLang") {
				const {
					location: {
						origin,
						pathname,
						hash,
					},
				} = window;
				const locationUrl = `${origin}${pathname}?sessionReload=true${hash}`;
				window.location.replace(locationUrl);
			}
		});

		//
		window.addEventListener("storage", function (event) {
			if (event.key === "_LOSEPAYLOAD_") {
				const { newValue, oldValue } = event;
				if (newValue != oldValue) {
					setTimeout(() => {
						_this.props.getPoll();
					}, 0)
				}
			}
		});
	}

	judgeRoute = () => {
		// 登录以后应该就有了查看组织等
		if (this.isLogin) {
			const userInfo = window.getUserInfo && window.getUserInfo();
			const { allowTenants } = userInfo;
			const { productLine } = getContext();
			// 判断是diwork 并且没有租户的情况
			if (!allowTenants.length && productLine === "diwork") {
				return createRoutes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
			}
			// 判断u8c环境， 没有租户则跳转到这个页面
			if (!allowTenants.length && productLine === "u8c") {
				return pointRoutes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
			}
			if (window._LIMITTIP_) {
				return limitRoutes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
			}
			// 返回正常
			return routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
		}
		return <div>no match</div>
	}

	render() {
		const { showFrame, showModal } = this.props;
		const { isHelpModal } = this.state;
		const subRoute = this.judgeRoute();
		if (!subRoute) return null;
		return (
			<div>
				<Switch>
					{subRoute}
					<Route component={NoMatch} />
				</Switch>
				{showModal ? <BasicDialog /> : null}
				{showFrame ? <Frame /> : null}
				{isHelpModal ? <HelpModal helpInfo={helpInfo} closeFn={this.closeHelpModal} /> : null}
			</div>
		);
	}
}

const App = () => (
	<Provider store={store} >
		<Router>
			<Root />
		</Router>
	</Provider>
);

export default App;

