import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, postMessageToWin, getContext } from '@u';
import Icon from 'pub-comp/icon';
import { openMess } from 'pub-comp/notification';
import { dispatchMessageTypeHandler, openWin } from 'public/regMessageTypeHandler';
import rootActions from 'store/root/actions';
import wrapActions from 'store/root/wrap/actions';
import homeActions from 'store/root/home/actions';
import Pulldown from './pulldown';

import { tab, active, first, pagesign, navLi, close, popover, pop_content } from './style.css';

const { requestError } = rootActions;
const { showTabs, openPin, cancelFolders, } = wrapActions;
const { getWorkList } = homeActions;
@connect(
	mapStateToProps(
		'tabs',
		'currItem',
		'activeCarrier',
		'iframeTabs',
		'retract',
		{
			namespace: 'wrap',
		}
	),
	{
		showTabs,
		requestError,
		openPin,
		cancelFolders,
		getWorkList
	},
)

class Tabmenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			width: 0,
			refeshshow: false,
			refechIndex: -1,
		};
		this.pullW = 36;
	}

	componentWillMount() {
		window.addEventListener('resize', this.resizeHandler);
	}

	componentDidMount() {
		this.resizeHandler();
	}

	componentWillReceiveProps({ tabs: nextTabs }) {
		const { tabs: oldTabs } = this.props;
		if (oldTabs.length !== nextTabs.length) {
			const areaWidth = this.tabsArea.clientWidth;
			this.setState({
				width: areaWidth,
			});
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.resizeHandler);
	}

	resizeHandler = () => {
		this.setState({
			width: this.tabsArea.clientWidth,
		});
	}

	closeWin = (param) => {
		// 删除的时候不去掉， 重新打开就会出现， 因为关闭按钮点击之后就不会触发mouseleave事件
		this.setState({
			refeshshow: false,
			refechIndex: -1,
		});
		const { customEdit, id, isMdf } = param;
		const { showTabs } = this.props;

		const postData = {
			action: "isCloseAction",
			activeKey: id,
			data: true
		};
		// 优先判断是否在iframe的tab中存在
		const isFlag = this.checkIframeTabs(param);
		// 当mdf节点关闭按钮直接调用cb的方法，
		if (isMdf && isFlag) {
			showTabs(param);
			cb.communication(postData);
			return false;
		}
		// 注册的非mdf节点关闭
		if (customEdit && isFlag) {
			showTabs(param);
			const frameElm = document.getElementById(id);
			if (frameElm) {
				postMessageToWin(frameElm.contentWindow, {
					type: 'data',
					data: postData,
				});
			}
			return false;
		}
		// 正常关闭
		dispatchMessageTypeHandler({
			type: "closeWin",
			detail: param,
		});
	}

	getTabsAndMores = (totalTab, areaWidth) => {
		let mores = [];
		let tabs = [];
		const totalTabs = totalTab;
		const listW = 154, menuW = 80;
		const width = this.props.retract ? areaWidth - this.pullW : areaWidth - this.pullW - menuW;
		const maxTabsNum = Math.floor(width / listW);
		if (totalTabs.length > maxTabsNum) {
			tabs = totalTabs.filter((item, index) => {
				return index < maxTabsNum;
			});
			mores = totalTabs.filter((item, index) => {
				return index >= maxTabsNum;
			});
		} else {
			tabs = totalTabs;
		}
		return {
			tabs,
			mores,
			maxTabsNum
		}
	}

	setNavClass = (id, index) => {//portal，整理classname
		const activeCarrier = this.props.activeCarrier;
		return `${navLi} ${id === activeCarrier ? active : ''} ${activeCarrier == 'home' && index == 0 ? first : ''}`
	}

	openService = (item, isShow = false) => {
		if (item.type === "url") {
			item.isFresh = true;
			openWin(item);
			return false;
		}
		let serviceCode = item.id;
		const { customReFresh, isMdf } = item;
		const postData = {
			action: "isRefresh",
			activeKey: serviceCode,
			data: true
		};
		// 判断是否为mdf集成， 直接调用cb的方法，否则继续广发
		if (!isShow && isMdf) {
			cb.communication(postData);
			return false;
		}
		if (!isShow && customReFresh) {
			const frameElm = document.getElementById(serviceCode);
			if (frameElm) {
				postMessageToWin(frameElm.contentWindow, {
					type: 'data',
					data: postData
				});
			}
			return false;
		}

		const persistServiceData = window.sessionStorage.getItem("_PERSISTSERVICEDATA") ? JSON.parse(window.sessionStorage.getItem("_PERSISTSERVICEDATA")) : {};
		const serviceData = persistServiceData[serviceCode];
		const data = serviceData && serviceData.data;
		const type = serviceData && serviceData.type;
		if (serviceData && serviceData.serviceCode) {
			serviceCode = serviceData.serviceCode
		}
		let typeData = {};
		if (type && typeof type === 'object') {
			typeData = Object.assign(type, { isFresh: true, });
		} else {
			typeData = { type: type, isFresh: true }
		}
		dispatchMessageTypeHandler({
			type: "openService",
			detail: {
				serviceCode: serviceCode,
				data: data,
				type: typeData
			},
		});
	}

	checkIframeTabs = (item) => {
		const { iframeTabs } = this.props;
		const isFlag = iframeTabs.find(value => value.id === item.id);
		return isFlag;
	}

	showTabs = (item) => {
		const { showTabs } = this.props;
		const isFlag = this.checkIframeTabs(item);
		if (isFlag) {
			showTabs(item);
		} else {
			this.openService(item, true);
		}
	}

	refreshShow = (refeshshow, index) => {
		const refechIndex = refeshshow ? index : -1;
		this.setState({
			refeshshow: !!refeshshow,
			refechIndex,
		});
	}

	handleClick = (item) => {
		const { requestError, getWorkList, openPin, cancelFolders, } = this.props;
		const { id, hasWidget } = item;
		if (hasWidget) {
			cancelFolders(id).then(({ error, payload }) => {
				if (error) {
					requestError(payload)
					return false;
				}
				openMess({
					title: '移除成功!',
					duration: 2,
					type: 'success',
					closable: false,
				});
				getWorkList();
			});
		} else {
			openPin();
		}
	}

	getText = (hasWidget) => {
		return hasWidget ? "移除首页" : "添加首页";
	}

	render() {
		const { tabs: totalTabs, activeCarrier, } = this.props;
		const { width, refeshshow, refechIndex } = this.state;
		const { tabs, mores } = this.getTabsAndMores(totalTabs, width);
		return (
			<div className={tab} ref={(c) => { this.tabsArea = c; }}>
				<ul>
					{
						tabs && tabs.map((item, index) => {
							return (
								<li
									className={this.setNavClass(item.id, index)}
									key={`${item.id}`}
									onMouseEnter={() => { this.refreshShow(true, index) }}
									onMouseLeave={() => { this.refreshShow(false, index) }}
								>
									<Icon type="blank-page" className={pagesign} />
									<p onClick={() => { this.showTabs(item) }} title={item.title}>{item.title}</p>
									<div className={close} onClick={() => { this.closeWin(item) }}>
										<Icon type="error3" />
									</div>
									{
										item.id !== activeCarrier || refechIndex !== index || !refeshshow || item.type === "locale" ? null :
											<div className={popover}>
												<div className={`${pop_content} um-box`}>
													<button className='um-box-center' onClick={() => { this.openService(item) }}>
														<Icon type="refresh2" />
														<span>刷新</span>
													</button>
													{
														<button disabled={item.id.indexOf("_diwork_") > -1 || item.type === "url" ? true : false} className="um-box-center" onClick={() => { this.handleClick(item) }}>
															{item.hasWidget ? <Icon type="error3" /> : <Icon type="add" />}
															<span title={this.getText(item.hasWidget)}>{this.getText(item.hasWidget)}</span>
														</button>
													}
												</div>
											</div>
									}
								</li>
							)
						})
					}
				</ul>
				<Pulldown themeStyle={this.props.themeStyle} width={this.pullW} items={mores} closeWin={this.closeWin} />
			</div>
		);
	}
}
export default Tabmenu;
