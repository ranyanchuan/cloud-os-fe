import React, { Component } from 'react';
import { connect } from 'react-redux'
import { mapStateToProps, getContext } from '@u';
import {
	withRouter,
	Switch,
	Route
} from 'react-router-dom';
import Portal from 'pages/portal';
import RouteWithSubRoutes from 'pub-comp/routeWithSubRoutes';
import wrapActions from 'store/root/wrap/actions';
import Homeheader from './homeheader';
import Homecontent from './homecontent';
import Pin from './pin';
import Menu from './menu';
import Beginner from './beginner';
import { openService } from 'public/regMessageTypeHandler';
import { mark, homeclass, leftbg, rightbg } from './style.css';
import { openWin } from '../../public/regMessageTypeHandler';
const { setLeadStatus, getAllPortal } = wrapActions;

const NoMatch = ({ history }) => {
	history.replace('');
	return <div />;
};
// 为了判断是否是外部直接将整个工作台包到iframe中
let effect;
if (window.location.search) {
	const searchParams = new URLSearchParams(window.location.search);
	const flag = searchParams.has("effect") === true;
	if (flag) {
		effect = searchParams.get("effect");
	}
}

@withRouter
@connect(
	mapStateToProps(
		'activeCarrier',
		'pinDisplay',
		'retract',
		'beginner',
		'tabs',
		'productLine',
		'initPortal',
		'currItem',
		{
			key: "userInfo",
			value: (home, ownProps, root) => {
				return root.userInfo;
			}
		},
		{
			key: "imShowed",
			value: (home, ownProps, root) => {
				return root.imShowed;
			}
		},
		{
			key: "currentThemeId",
			value: (home, ownProps, root) => {
				return root.currentThemeId;
			}
		},
		{
			key: "themeList",
			value: (home, ownProps, root) => {
				return root.themeList;
			}
		},
		{
			namespace: 'wrap',
		}
	),
	{
		setLeadStatus, getAllPortal
	},
)
class Wrap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			menuShow: false,//菜单栏
			height: 72,
			nav: 32,
		};

	}

	componentWillMount() {
		// 主要是为了兼容输入网址 直接打开服务
		const hash = window.location.hash;
		if (hash.indexOf('/service/') > -1 || hash.indexOf('/app/') > -1) {
			// const type = hash.indexOf("/service") > -1 ? 1 : 2;
			const location = hash.split("/");
			const arr = location.filter(item => item !== "#");
			const serviceCode = arr[arr.length - 1] || arr[arr.length - 2];
			openService(serviceCode);
		}else if(hash.indexOf('/win/') > -1){
			const location = hash.split("/");
			const arr = location.filter(item => item !== "#");
			const code = arr[arr.length - 1];
			openWin({id: code, });
		}
		// 多门户拉取
		this.props.getAllPortal();
	}


	componentDidMount() {

	}

	componentWillReceiveProps(nextProps) {
		// 主要是为了给到mdf框架， 当前激活的tab
		const { activeCarrier: activeCarrierNext, currItem: currItemNext } = nextProps;
		const { activeCarrier: activeCarrierPre } = this.props;
		if (activeCarrierNext !== activeCarrierPre && currItemNext.isMdf) {
			const postData = {
				action: "activeTab",
				activeKey: activeCarrierNext,
				data: true
			};
			cb.communication(postData);
		}
	}

	openMenu = () => {
		this.setState({
			menuShow: !this.state.menuShow,
		});
	}

	closeMenu = () => {
		this.setState({
			menuShow: false,
		});
	}

	setMenuStyle = () => {//设置顶部menu  top值
		const { retract } = this.props;
		const { height, nav } = this.state;
		const style = { top: retract ? height - nav : nav };
		return style;
	}

	render() {
		const {
			routes, activeCarrier, pinDisplay, retract, beginner, userInfo,
			imShowed, productLine, currentThemeId, themeList, initPortal,
		} = this.props;
		const { profile } = getContext();
		const { height, nav } = this.state;
		const vis = activeCarrier === 'home' ? 'block' : 'none';
		const portalIsDis = activeCarrier === 'portal' ? 'block' : 'none';
		const top = effect === "headless" ? 0 : retract ? height : nav;
		const style = {
			// top: top,
			background: themeList.find(item => item.id === currentThemeId).background,
		};
		return (
			<div className='um-win'>
				{effect === "headless" ? null : <Homeheader openMenu={this.openMenu} menuShow={this.state.menuShow} />}
				<div className="diwork-content-fixed um-content" style={style} >
					{
						!window._IUAPPREMISESFLAG && profile === "combine" ?
							<div id="portal-root" className={homeclass} style={{ display: portalIsDis }} />
							:
							(!initPortal ? null :
								<div className={homeclass} style={{ display: portalIsDis }}>{<Portal />}</div>)
					}
					<div className={homeclass} style={Object.assign({ display: vis }, style)}>
						<div>
							<div className={leftbg} style={{ top: top }}></div>
							<div className={rightbg} style={{ top: top }}></div>
						</div>
						<Switch>
							{
								routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
							}
							<Route component={NoMatch} />
						</Switch>
					</div>
					<Homecontent routes={routes} effect={effect} />
				</div>
				<Menu
					menuShow={this.state.menuShow}
					openMenu={this.openMenu}
					closeMenu={this.closeMenu}
					style={this.setMenuStyle()}
				/>
				{
					pinDisplay ? <Pin /> : null
				}
				{
					beginner ? null : <Beginner setLeadStatus={this.props.setLeadStatus} />
				}
				{
					this.state.menuShow || imShowed ? <div className={mark} /> : null
				}
			</div>
		);
	}
}
export default Wrap;
