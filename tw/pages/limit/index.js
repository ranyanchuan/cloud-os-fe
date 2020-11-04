import React, { Component } from 'react';
import Icon from "pub-comp/icon";
import { logout } from "@u"
import Header from './header';
import { wrap, modal, imgbox, des, } from './index.css';
import pointImage from 'assets/image/point.svg';

class Limit extends Component {

	constructor(props) {
		super(props);
		this.state = {

		}
	}

	handleClick = () => {
		logout();
	}

	render() {
		return (
			<div className={`um-win ${wrap}`}>
				<Header />
				<div className="diwork-content-fixed um-content">
					<div className={modal}>
						<div className={"um-box-center " + imgbox}>
							<img src={pointImage} />
						</div>
						<div className={`${des} um-box`}>
							{/* <Icon type="notice" /> */}
							<p>{window._LIMITTIP_}</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Limit;
