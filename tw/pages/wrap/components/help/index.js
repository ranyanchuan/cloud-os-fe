import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { getHost, mapStateToProps, getContext } from '@u';
import Icon from 'pub-comp/icon';
import rootActions from 'store/root/actions';
import "public/helpcenter_sdk";
import { help } from './style.css';
const { requestError } = rootActions;

@connect(
	mapStateToProps(
		'currItem',
		'menuItemCodes',
		{
			key: "helpInfo",
			value: (home, ownProps, root) => {
				return root.helpInfo;
			}
		},
		{
			namespace: 'wrap',
		}
	),
	{
		requestError
	},
)
class Help extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	componentDidMount() {

	}

	openHelp = () => {
		let { currItem, menuItemCodes, requestError } = this.props;
		const { id, type, entryType } = currItem;
		let hash = "";
		const menuItemCode = menuItemCodes[id];
		if (type === "service") {
			hash = `/ysdetail/${id}`;
		}
		// 判断是菜单打开的，从数组中找对应的code， 避免是磁贴打开的也能找到
		if (entryType === "menu" && menuItemCode) {
			hash = `${hash}?menucode=${menuItemCode}`
		}
		const { productLine } = getContext();

		if (window._IUAPPREMISESFLAG) {
			window.HelpcentSdk.goHelpcenter(hash, () => {
				const msg = "您當前所在的網路環境可能使您無法訪問幫助中心，請連接到公網再嘗試。";
				requestError(msg);
			});
		} else {
			const key = productLine === "diwork" ? "helpDiwork" : "helpYs";
			const url = `${getHost(key)}${hash}`
			window.open(url);
		}
	}

	render() {
		const { helpInfo: { notGlobal } } = this.props;
		return (
			<div className={`${help}`}>
				<Icon font="bangzhu" onClick={this.openHelp} title="幫助中心" />
				{notGlobal ? <div /> : null}
			</div>
		);
	}
}

export default Help;
