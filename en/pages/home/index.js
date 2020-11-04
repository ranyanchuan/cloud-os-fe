import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { mapStateToProps, equals, getContext } from "@u";
import Icon from "pub-comp/icon";
import { openService } from "public/regMessageTypeHandler";
import _ from "lodash";
import homeActions from "store/root/home/actions";
import rootActions from "store/root/actions";

import WidgeList from "./homeWidgetList";
import HomeMark from "./homemark";
import Top from './components/top';
import { wrap, content, manage } from "./style.css";

const { getWorkList, getApplicationList, clearApplicationTips } = homeActions;
const { requestStart, requestSuccess, requestError } = rootActions;
import { calColCount, getContainerMaxHeight } from 'pub-comp/manageWidgetCollision/utils';
//import { calColCount, getContainerMaxHeight } from '../manage/manageWidget/utils';

import { compactLayoutHorizontal } from 'pub-comp/manageWidgetCollision/compact.js'
//import { compactLayoutHorizontal } from '../manage/manageWidget/compact.js'

let resizeWaiter = false;

@withRouter
@connect(
	mapStateToProps(
		"workList",
		{
			key: "userInfo",
			value: (home, ownProps, root) => {
				return root.userInfo;
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
			namespace: "home"
		}
	),
	{
		requestStart,
		requestSuccess,
		requestError,
		getWorkList,
		getApplicationList,
		clearApplicationTips
	}
)
class Home extends Component {
	static propTypes = {
		requestStart: PropTypes.func,
		requestSuccess: PropTypes.func,
		requestError: PropTypes.func,
		getWorkList: PropTypes.func,
		workList: PropTypes.arrayOf(PropTypes.object),
		getApplicationList: PropTypes.func,
		userInfo: PropTypes.shape({})
	};
	static defaultProps = {
		requestStart: () => { },
		requestSuccess: () => { },
		requestError: () => { },
		getWorkList: () => { },
		getApplicationList: () => { },
		workList: [],
		userInfo: {
			admin: false
		}
	};
	constructor(props) {
		super(props);
		this.state = {
			viewport: {
				top: 0,
				height: 0,
			},
			lazyLoadNum: -1,
			homemark: false,
			newAppNum: 0, // 判断应用开通时间在7天(含)之内
			willExpiredNum: 0, // 即将过期应用个数
			expiredNum: 0, //过期应用个数
			applications: [],
			// layout: {
			// 	margin: [10, 10],
			// 	containerPadding: [0, 0],
			// 	rowHeight: 175,
			// 	calWidth: 175
			// },
			showEmpty: false,
			json: {},
			groups: [],

			popmark: false,	//	临时方案，弹窗告知压测服务
		};

		this.layout = {
			margin: [10, 10],
			containerPadding: [0, 0],
			rowHeight: 175,
			calWidth: 175
		};
	}

	componentWillMount() {
		// 判断是否到期应用，包含多少个到期应用
		this.getApplicationList();

	}
	componentDidMount() {
		// 请求列表
		this.getWorkList();
		window.addEventListener("resize", this.updateViewport, false);
		window.addEventListener("resize", this.handleHomeLoad);
	}

	componentWillReceiveProps(nextProps) {
		if (!equals(nextProps.workList, this.props.workList) || this.state.viewport.height === 0) {
			this.handleHomeLoad(null, nextProps.workList);
			this.updateViewport(null, nextProps.workList);
		}
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateViewport);
		window.removeEventListener("resize", this.handleHomeLoad);
	}

	getWorkList = () => {
		const {
			requestStart,
			requestSuccess,
			requestError,
			getWorkList
		} = this.props;
		requestStart();
		const param = {
			componentCode: "yonyoucloud",
			viewCode: "home",
			deviceType: "PC",
			lang: "US"
		};
		// 请求磁贴
		getWorkList(param).then(({ error, payload }) => {

			if (error) {
				requestError(payload);
				return false;
			}
			requestSuccess();
		});
	};

	handleHomeLoad = (e, data) => {
		const groups = data || this.props.workList;
		// if (!groups.length) return;
		const windowWidth = window.innerWidth - 60 * 2;
		const col = calColCount(
			this.layout.calWidth,
			windowWidth,
			this.layout.containerPadding,
			this.layout.margin
		);
		_.forEach(groups, g => {
			let compactedLayout = compactLayoutHorizontal(g.children, col);
			g.children = compactedLayout;
		});
		this.setState({ groups });
	};

	getApplicationList = () => {
		// 请求应用   判断是否有过期应用功能
		const {
			getApplicationList,
			userInfo: { admin }
		} = this.props;
		const timeType = this.totalTime();
		if (admin && timeType) {
			const time = new Date().format("yyyy-MM-dd");
			localStorage.setItem("time", time);
			// 新增临时弹窗方案
			this.setState({ popmark: true });

			getApplicationList().then(({ error, payload }) => {
				if (error) {
					requestError(payload);
					return false;
				}
				this.setState({
					applications: payload.expiTip.applications
				});
				let { willExpiredNum, expiredNum } = this.forTime(
					payload.expiTip.applications
				);
				if (willExpiredNum || expiredNum || payload.addTip) {
					this.setState({
						homemark: true,
						newAppNum: payload.addTip || 0,
						willExpiredNum,
						expiredNum
					});
				}
				requestSuccess();
			});
		}
	};

	totalTime = () => {
		const localTime = localStorage.getItem("time");
		if (!localTime) return true;
		let day1 = new Date();
		day1.setDate(day1.getDate() - 1);
		const s1 = day1.format("yyyy-MM-dd");
		if (s1 == localTime || s1 > localTime) {
			return true;
		}
		return false;
	};

	forTime = applications => {
		let type = false;
		let willExpiredNum = 0;
		let expiredNum = 0;
		for (var i = 0; i < applications.length; i++) {
			const time = applications[i].expired;
			if (!time) {
				type = false;
				continue;
			}
			const currTime = new Date().getTime();
			const timeDiff = (time - currTime) / 1000 / 60 / 60 / 24;
			if (time > currTime && timeDiff <= 30) {
				type = true;
				++willExpiredNum;
				// break;
			} else if (currTime > time) {
				type = true;
				++expiredNum;
				// break;
			}
		}
		// return type;
		return { willExpiredNum, expiredNum };
	};

	updateViewport = (e, data) => {
		const workList = data || this.props.workList;
		const total = workList.reduce(function (pre, cur) {
			return pre + cur.children.length;
		}, 0);
		if (this.state.lazyLoadNum === total) {
			window.removeEventListener("resize", this.updateViewport);
			return false;
		}
		this.setState({
			viewport: {
				top: this._container.scrollTop,
				height: this._container.offsetHeight
			}
		});
	};

	loadOk = (() => {
		const self = this;
		let count = 0;
		return () => {
			count += 1;
			self.setState({
				lazyLoadNum: count
			});
		};
	})();

	linkTo = () => {
		const { clearApplicationTips } = this.props;
		clearApplicationTips().then(({ error, payload }) => {
			if (error) {
				requestError(payload);
				return false;
			}
			this.closeHomeMark();
			requestSuccess();
			openService("GZTSYS010");
		});
	};

	closeHomeMark = () => {
		this.setState({
			homemark: false
		});
	};

	changeRouter = () => {
		const { history, match } = this.props;
		history.push("/manage");
	};

	updataView = h => {
		const { top, height } = this.state.viewport;
		this.setState({
			viewport: {
				height: height,
				top: top + h
			}
		});
	};


	// 新增临时方案 弹窗告知压测服务
	close = () => {
		this.setState({ popmark: false });
	}

	render() {
		const { groups } = this.state;
		const contents = [];
		groups.forEach(da => {
			const props = {
				key: `nav${da.widgetId}`,
				data: da
			};
			const containerHeight = getContainerMaxHeight(
				da.children,
				this.layout.rowHeight,
				this.layout.margin
			);
			contents.push(
				<WidgeList
					{...props}
					updateViewport={this.updateViewport}
					viewport={this.state.viewport}
					loadOk={this.loadOk}
					updataView={this.updataView}
					height={containerHeight}
					layout={this.layout}
				/>
			);
		});
		const { themeList, currentThemeId, } = this.props;
		const editStyle = {
			color: themeList.find(item => item.id === currentThemeId).editColor,
		};
		return (
			<div
				ref={c => (this._container = c)}
				className={`${wrap}`}
				id="scrollTopPoint"
				onScroll={this.updateViewport}
			>
				<div className={manage} style={editStyle} onClick={this.changeRouter}>
					<Icon type="Set-up" style={editStyle} />
					<span title="Homepage Settings" style={editStyle} >Homepage Settings</span>
				</div>
				<div className={content}>
					{contents}
				</div>
				{this.state.homemark ? (
					<HomeMark
						linkTo={this.linkTo}
						homemark={this.state.homemark}
						newAppNum={this.state.newAppNum}
						willExpiredNum={this.state.willExpiredNum}
						expiredNum={this.state.expiredNum}
						closeHomeMark={this.closeHomeMark}
					/>
				) : null}
				<Top />
			</div>
		);
	}
}
export default Home;
