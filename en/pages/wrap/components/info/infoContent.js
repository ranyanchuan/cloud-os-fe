import React, { Component } from 'react';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';

import { mapStateToProps, getContext, getHost, logout } from '@u';
import { openWin, openService } from 'public/regMessageTypeHandler';

import Icon from 'pub-comp/icon';
import Menu, { Item as MenuItem, SubMenu } from 'bee-adapter/menus';
import { info, tleft, tright, list, out, menu, menuEn, selectType, workbenchClass, backgroundStyle } from './info.css';
/*   actions   */
import rootActions from 'store/root/actions';
const { requestError, setCurrent, getDefaultDesktop, setDefaultDesktop, setTheme, } = rootActions;



@connect(
	mapStateToProps(
		'content',
		'userInfo',
		'themeList',
		'currentThemeId',
	),
	{
		requestError,
		setCurrent,
		getDefaultDesktop,
		setDefaultDesktop,
		setTheme,
	}
)
@onClickOutside
class InfoContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			desktop: [
				{ key: 'workbench', text: 'Workbench', icon: 'computer' },
				{ key: 'portal', text: 'Portal', icon: 'home' },
			],
			isDevelopCookie: window.isHubbleRecordStarted ? window.isHubbleRecordStarted() : false,
		};
	}

	componentWillMount() {
		// const { getDefaultDesktop } = this.props;
		// getDefaultDesktop();
	}

	// outside 装饰器方法
	handleClickOutside() {
		const { closeInfo } = this.props;
		closeInfo();
	}

	// 打开荣耀 、发言
	openHomePage = (key) => {
		const { userInfo: { userId }, closeInfo } = this.props;
		openWin({
			id: "HomePage",
			title: "Homepage",
			data: {
				userId,
				key: key,
			}
		});
		closeInfo();
	}

	// 打开企业设置
	openEnter = () => {
		openService('GZTSYS001');
		this.props.closeInfo();
	}

	// 打开团队设置
	openTeamconfig = () => {
		openWin({
			id: "Teamconfig",
			title: "Team Settings",
		});
		this.props.closeInfo();
	}

	// 打开邀请
	openInvitation = () => {
		openWin({
			id: "Invitation",
			title: "Invite Member",
		});
		this.props.closeInfo();
	}

	exitFn = () => {
		this.props.closeInfo();
		this.props.openExitModal();
	}

	// 打开员工信息
	openUserinfo = () => {
		openWin({
			id: "Userinfo",
			title: "Employee Info",
			url: `${getHost('user')}#/staff/personInfor-card`,
		});
		this.props.closeInfo();
	}

	// 帐号管理
	openAccount = () => {
		const { locale } = getContext();
		openWin({
			id: 'Account',
			title: 'Account Mgmt',
			url: `${getHost('euc')}/diuser?locale=${locale === "zh_TW" ? "zh_HK" : locale}`
		});
		this.props.closeInfo();
	}

	// 打开问题反馈

	openTicket = () => {
		const { userInfo: { userId, company } } = this.props;
		// const ticketHerf = `${getHost('ticket')}?from=diwork&userId=${userId}&company=${company}&domain=OA&label=diwork v3.0&route=portal&showMenu=false`;
		const ticketHerf = getContext().productLine === "diwork"
			? `${getHost('ticket')}/ticket/query?from=diwork&userId=${userId}&route=portal&showMenu=false`
			: `${getHost('ticket')}/ticket/query?from=yonsuite&userId=${userId}&label=V1.0&route=portal&showMenu=false`
		this.props.closeInfo();
		window.open(ticketHerf);
	}

	openLang = () => {
		this.props.closeInfo();
		const lang = getHost('lang');
		const { tenantid, locale } = getContext();
		const url = `${lang}/tenant-diwork/cloud/setting?locale=${locale}&tenantId=${tenantid}&type=user`
		openWin({
			id: "firstChoice",
			title: "Preferences",
			url
		});

	}

	// 切换登录
	onChangeEntry = (e) => {
		const { setDefaultDesktop, content } = this.props;
		console.log(e);
		if (e.key !== content) {
			setDefaultDesktop({ content: e.key });
		}
	}

	onChangeTheme = (e) => {
		const { key } = e;
		const { setTheme, requestError } = this.props;
		setTheme(key).then(({ error, payload }) => {
			if (error) {
				requestError(payload);
				return;
			}
			this.props.closeInfo();
		});;
	}

	handleClickDev = () => {
		const { isDevelopCookie } = this.state;
		if (isDevelopCookie) {
			window.stopRecordHubble && window.stopRecordHubble();
		} else {
			window.startRecordHubble && window.startRecordHubble();
		}
		this.setState({ isDevelopCookie: !isDevelopCookie });
		this.props.closeInfo();
	}

	render() {
		const { userInfo, content, currType, themeList, currentThemeId } = this.props;
		// const { language, defaultValue, desktop, locale } = this.state;
		const { isDevelopCookie } = this.state;
		const { userAvatorNew, userName, currentTeamConfig, admin, openHonour, openMoments } = userInfo;
		let _invitePermission = false;
		let _allowExit;
		let _charged;
		if (currentTeamConfig) {
			const { invitePermission, charged, joinPermission, allowExit, staffStatus } = currentTeamConfig;
			_allowExit = allowExit;
			_charged = charged;
			// staffStatus空值允许邀请， joinPermission为0 邀请， invitePermission为“0”，管理人员可邀请， 1则全员邀请
			if (staffStatus || joinPermission === "1") {
				_invitePermission = false;
			} else if (invitePermission && invitePermission === '0') {
				_invitePermission = admin;
			} else if (invitePermission && invitePermission === '1') {
				_invitePermission = true;
			}
		}

		const { productLine, tenantid, locale, profile } = getContext();

		const developText = isDevelopCookie ? "Close" : "Open";
		return (
			<div className={info}>
				{
					// 没有租户，专属化未验证通过，登录限制提示
					window._LIMITTIP_ || !tenantid || window._IUAPPREMISESFLAG && this.props.license ? null :
						<dl>
							<dt>
								<div className={tleft}>
									{
										userAvatorNew
											? <img alt="" src={userAvatorNew} />
											: <div className="avatorImg"></div>
									}
								</div>
								<div className={tright}>
									<span title={userName}>{userName}</span>
									<ul>
										{
											!openMoments || window._IUAPPREMISESFLAG ? null :
												<li onClick={() => { this.openHomePage('speak') }}>
													<Icon type="Internet2" title="Moments" />
												</li>
										}
										{
											productLine === "u8c" || !openHonour || window._IUAPPREMISESFLAG ? null :
												<li onClick={() => { this.openHomePage('honor') }}>
													<Icon type="glory" title="Honors" />
												</li>
										}
									</ul>
								</div>
							</dt>
							{
								productLine === "u8c" ? null :
									<dd>
										<ul>
											{
												admin && currType === 0
													?
													<li onClick={this.openEnter}>
														<div className={list}>
															<Icon type="personal-details" className="userinfoicon" />
															<span>Enterprise Mgmt</span>
														</div>
													</li>
													: null
											}
											{
												admin && currType === 1
													?
													<li onClick={this.openTeamconfig}>
														<div className={list}>
															<Icon type="personal-details" className="userinfoicon" />
															<span>Team Mgmt</span>
														</div>
													</li>
													: null
											}
											{
												!_invitePermission ? null :
													<li onClick={this.openInvitation}>
														<div className={list}>
															<Icon type="account-management" />
															<span>Invite Member</span>
														</div>
													</li>
											}
											{
												admin || _allowExit === '0' || _charged || window._IUAPPREMISESFLAG ? null :
													<li onClick={this.exitFn} >
														<div className={list}>
															<Icon type="exit" />
															<span>{`Quit${currType ? "Team" : "Enterprise"}`}</span>
														</div>
													</li>
											}
										</ul>
									</dd>
							}
							<dd>
								<ul>
									<li onClick={this.openAccount}>
										<div className={list}>
											<Icon type="account-management" />
											<span title="Account Mgmt">Account Mgmt</span>
										</div>
									</li>
									<li onClick={this.openLang}>
										<div className={list}>
											<Icon type="language" />
											<span title="Preferences">Preferences</span>
										</div>
									</li>
									{
										window._IUAPPREMISESFLAG ? null :
											<li onClick={this.openTicket}>
												<div className={list}>
													<Icon type="my-application" style={{ fontSize: "20px", left: 0 }} />
													<span title="Feedbacks">Feedbacks</span>
												</div>
											</li>
									}
									{
										profile == "combine" && !window._IUAPPREMISESFLAG ?
											<li onClick={this.handleClickDev}>
												<div className={list}>
													<Icon font={isDevelopCookie ? "kejian" : "yincang"} style={{ fontSize: "20px", left: 0 }} />
													<span title={developText}>{developText}</span>
												</div>
											</li> : null
									}
									<li className={`${workbenchClass}`}>
										<Menu className={`${locale === "en_US" ? menuEn : menu} `} selectedKeys={[currentThemeId]} onClick={this.onChangeTheme}>
											<SubMenu
												key="theme"
												title={
													<div className={list}>
														<Icon font="beijingse" />
														<span>Background Color</span>
													</div>
												}
											>
												{
													themeList.map(item => {
														return (
															<MenuItem key={item.id}>
																<div className="um-box">
																	<div className={backgroundStyle} style={{ background: item.background }}></div>
																	{item.name}
																	<Icon type="Determine" className={selectType} />
																</div>
															</MenuItem>
														)
													})
												}
											</SubMenu>
										</Menu>
									</li>
								</ul>
							</dd>
						</dl>
				}
				<div className={out}>
					<div className={list} onClick={() => { logout() }}>
						<Icon type="cancellation" className="exit" />
						<span>Log Out</span>
					</div>
				</div>

			</div>
		)

	}
}
export default InfoContent;

