import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getContext, mapStateToProps } from "@u";
import Header from 'components/header';
import { dispatchMessageTypeHandler } from 'public/regMessageTypeHandler';

import yonsuiteLogo from 'assets/image/yonSuite.svg';
import yonbipLogo from "assets/image/yonBip.svg";

// 业务组件
import DropdownButton from 'pages/wrap/homeheader/dropdown';
import Info from "pages/wrap/components/info";
// 样式表
import { header, logostyle } from './index.css';

@connect(mapStateToProps('userInfo'), {},)
class CreateHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	getLeftContent() {
		const {
			userInfo: {
				company,
				allowTenants,
				currentTeamConfig,
			},
		} = this.props;
		const {productLine} = getContext();
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
				title: 'Tips',
				msg: "Click OK to refresh the page. Continue?",
				btn: [
					{
						label: "OK",
						fun: () => {
							dispatchMessageTypeHandler({
								type: "closeDialogNew",
							});
						},
						type: 'u8cDefault'
					},
					{
						label: "Cancel",
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
		const { productLine } = getContext();
		return (
			<div className="diwork-header-fixed" id="home_header">
				<Header
					className={header}
					mode="light"
					leftContent={this.getLeftContent()}
					rightContent={<Info />}
				>
					<img className={logostyle} alt="" src={productLine === "diwork" ? yonbipLogo : yonsuiteLogo} />
				</Header>
			</div>
		)
	}
}

export default CreateHeader;
