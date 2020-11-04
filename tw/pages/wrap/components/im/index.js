import React, { Component, } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapStateToProps, } from '@u';
import Icon from 'pub-comp/icon';

import actions from 'store/root/actions';
import { im, ms } from './style.css';
import { openService } from 'public/regMessageTypeHandler';
const {
	showIm,
	hideIm,
} = actions;

@connect(
	mapStateToProps(
		'messageType',
		'imShowed',
	),
	{
		showIm,
		hideIm,
	}
)
class Im extends Component {
	static propTypes = {
		messageType: PropTypes.bool,
		imShowed: PropTypes.bool,
		showIm: PropTypes.func,
		hideIm: PropTypes.func,
	}

	static defaultProps = {
		messageType: true,
		imShowed: false,
		showIm: () => { },
		hideIm: () => { },
	}

	constructor(props) {
		super(props);
		this.state = {
			isIm: window._IMENABLEFLAG || typeof window._IMENABLEFLAG === "undefined" ? true : false
		};
	}

	componentDidMount() {
		if (this.state.isIm) {
			this.refs.IM.addEventListener('mousedown', (e) => {
				e.stopPropagation();
			});
		}
	}

	toggleIM = (e) => {
		e.stopPropagation();
		const {
			imShowed,
			showIm,
			hideIm,
		} = this.props;
		if (imShowed) {
			hideIm();
		} else {
			showIm();
		}
	}

	openMS = (e) => {
		openService('MessageCenter');
	}


	render() {
		const { messageType, imShowed, classname } = this.props;
		const imClass = imShowed ? "active tc" : "tc";
		return (
			// window._IUAPPREMISESFLAG ? null :
				// <div ref="MS" className={`${imClass} ${ms} ${classname}`} onClick={this.openMS}>
				// 	<Icon title="消息中心" type="chat" />
				// </div>

				this.state.isIm ?
				<div ref="IM" className={`${imClass} ${im} ${classname}`} onClick={this.toggleIM}>
					<Icon title="智能通訊" type="news" />
					<span className="CircleDot" style={{ display: messageType ? 'block' : 'none' }}></span>
				</div>
				:null
		);
	}
}

export default Im;
