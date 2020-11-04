import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import { mapStateToProps } from '@u';
import { dispatchMessageTypeHandler } from 'public/regMessageTypeHandler';

// 业务组件
import DropdownButton from './dropdown';
import Header from './header';
import Navs from './navs';
import menuImg from 'assets/image/menu.svg';
import u8clogo from 'assets/image/yonSuite.svg';
import diworklogo from 'assets/image/yonBip.svg'

/*   actions   */
import wrapActions from 'store/root/wrap/actions';
const { changeRetract } = wrapActions;
import { logostyle } from './style.css';
@connect(
	mapStateToProps(
		'retract',
		'productLine',
		{
			key: 'userInfo',
			value: (wrap, ownProps, root) => {
				return root.userInfo
			}
		},
		{
			namespace: 'wrap',
		}
	),
	{
		changeRetract,
	},
)
class Homeheader extends Component {
	static propTypes = {
		userInfo: PropTypes.shape({
			name: PropTypes.string,
			company: PropTypes.string,
			userAvator: PropTypes.string,
		}),
		openMenu: PropTypes.func,
		openHistory: PropTypes.func,
	};
	static defaultProps = {
		userInfo: {},
		openMenu: () => { },
		openHistory: () => { },

	};
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	componentWillMount() {

	}

	getLeftContent() {
		const {
			userInfo: {
				company,
				allowTenants,
				currentTeamConfig,
			},
			productLine
		} = this.props;
		const tenantId = currentTeamConfig && currentTeamConfig.tenantId;
		const dom = <DropdownButton
			getPopupContainer={() => document.getElementById('home_header')}
			label={company}
			tenantId={tenantId}
			type="home"
			productLine={productLine}
			dataItem={
				allowTenants.map(({
					tenantId: name,
					tenantName: value,
					team: type,
				}) => ({
					name,
					value,
					type,
					fun: this.handleClickFn,
				}))
			}
		/>
		return dom;
	}

	handleClickFn = (tenantId) => {
		dispatchMessageTypeHandler({
			type: "showDialog",
			detail: {
				type: 'warning',
				title: '提示',
				msg: "点击确定后即将刷新页面，是否继续？",
				btn: [
					{
						label: "取消",
						fun: () => {
							dispatchMessageTypeHandler({
								type: "closeDialogNew",
							});
						},
						type: 'u8cDefault'
					},
					{
						label: "确定",
						fun: () => {
							dispatchMessageTypeHandler({
								type: "closeDialogNew",
							});
							this.changeTenant(tenantId);
						},
						type: 'u8cPrimary'
					},
				]
			}
		});
	}

	changeTenant = (tenantId) => {
		const {
			location: {
				origin,
				pathname,
				hash,
			},
		} = window;
		if (window.sessionStorage.getItem('TABS_DATA')) {
			window.sessionStorage.removeItem('TABS_DATA');
		}
		const value = Date.now();
		window.localStorage.setItem("_LOSEPAYLOAD_", value);
		const locationUrl = `${origin}?tenantId=${tenantId}&switch=true`;
		window.location.replace(locationUrl);
	}

	render() {
		const { retract, style, openMenu, openHistory, menuShow, productLine } = this.props;
		const {
			userInfo: {
				currentTeamConfig,
			},
		} = this.props;
		if (!currentTeamConfig) return null;
		const logoUrl = currentTeamConfig.logo || (productLine === "u8c" ? u8clogo : diworklogo);
		const title = <a href='#'><img className={logostyle} alt="" src={logoUrl} /></a>;
		return (
			<div className="diwork-header-fixed" id="home_header" style={style}>
				<CSSTransitionGroup
					transitionName={{
						enter: 'animated',
						enterActive: `fadeIn`,
						leave: 'animated',
						leaveActive: `fadeOut`,
					}}
					transitionEnterTimeout={120}
					transitionLeaveTimeout={100}
				>
					{
						retract
							?
							<Header
								leftContent={this.getLeftContent()}
								iconName={<img src={menuImg} className="ignoreClass-menu" onClick={openMenu} />}
								menuShow={menuShow}
							>
								{title}
							</Header>
							: null
					}
				</CSSTransitionGroup>

				<Navs openMenu={openMenu} openHistory={openHistory} menuShow={menuShow} />
			</div>
		);
	}
}
export default Homeheader;
