import React, { Component } from 'react';
import { logout } from '@u';
import Header from 'components/header';
import { header, logostyle, } from './index.css';
import diworklogo from 'assets/image/yonBip.svg'

import Info from "pages/wrap/components/info";

class CreateHeader extends Component {
	render() {
		return (
			<div className="diwork-header-fixed">
				<Header
					className={header}
					mode="light"
					rightContent={<Info />}
					onLeftClick={logout}
				>
					<img className={`${logostyle}`} alt={window._IUAPPREMISESFLAG ? "iuap5.0 logo" : "logo"} src={diworklogo} />
				</Header>
			</div>
		)
	}
}

export default CreateHeader;
