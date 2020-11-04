import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from 'bee/loading';
import { getContext } from '@u';
import WidgetTool from 'public/componentTools';
import {
	widgetItem,
	title,
	titleRight,
} from './style.css';
import axios from 'axios';
import { findDOMNode } from 'react-dom'

function getResultFetch(that, text, callback, errorCallback) {
	that.tool = new WidgetTool(that.props.data.widgetId);
	try {
		const fn = new Function(
			'React',
			'widgetInstance',
			'widgetTool',
			'widgetContext',
			'return ' + text,
		);

		const result = fn(
			React,
			that.props.data,
			that.tool,
			getContext(),
		);
		callback(result);
	} catch (e) {
		console.log(e);
		errorCallback(e);
	}
}


function getData(url, callback, errorCallback) {
	const browser = navigator.appName;
	const bVersion = navigator.appVersion;
	if (browser === 'Microsoft Internet Explorer' && bVersion.match(/9./i)[0] === '9.') {
		axios.get(url).then((response) => {
			getResultFetch(this, response.data, callback);
		}).catch((error) => {
			console.log(error);
		});
	} else {
		fetch(url, {
			method: 'GET',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'text/plain;charset=UTF-8',
			},
		}).then((response) => {
			if (response.ok) {
				return response.text().then((text) => {
					if (text) {
						getResultFetch(this, text, callback, errorCallback);
					} else {
						return Promise.reject(new Error('No data returned'));
					}
					return false;
				});
			}
			return Promise.reject(new Error('Request failed'));
		});
	}
}


class WidgetItem extends Component {
	static propTypes = {
		data: PropTypes.shape({
			jsurl: PropTypes.string,
		}),
	}
	static defaultProps = {
		data: {},
		viewport: {
			top: 0,
			height: 0
		}
	}
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			widget: null,
			shouldLoad: false,
		}
	}
	componentWillUnmount() {
		if (this.tool && typeof this.tool.destroy === 'function') {
			this.tool.destroy();
		}
	}

	componentDidMount() {
		const { from } = this.props;
		if (!this.state.shouldLoad && this.props.viewport.height) {
			var el = findDOMNode(this.refs.normal_widget);
			this.updataLoadState(el, el.offsetHeight)
		}
	}

	componentDidUpdate(prevProps) {
		if (!this.state.shouldLoad && prevProps.viewport) {
			var el = findDOMNode(this.refs.normal_widget);
			this.updataLoadState(el, el.offsetHeight)
		}
	}

	loadWidget() {
		const { data: { jsurl } } = this.props;
		if (jsurl) {
			getData.call(this, jsurl, (result) => {
				this.setState({
					loaded: true,
					widget: result.default ? result.default : result,
				});
			}, (err) => {
				this.setState({
					loaded: true,
					widget: () => { return <div /> },
				});
			});
		}
	}

	setShowImage(show) {
		this.setState({
			shouldLoad: !!(show)
		})
		this.props.loadOk();
		this.loadWidget();
	}

	updataLoadState(e, height) {
		if (this.state.shouldLoad) {
			return;
		}
		const arr = window.getComputedStyle(e).transform.split(',');
		const top = parseInt(arr[arr.length - 1]) + e.offsetTop;
		var min = this.props.viewport.top;
		var max = this.props.viewport.top + this.props.viewport.height;

		if ((min <= (top + height) && top <= max)) {
			this.setShowImage(true);
		}
	}

	render() {
		const {
			data: {
				background,
				size,
				widgetName: name,
				serviceType,
			},
			style
		} = this.props;
		const { widget: Widget, loaded } = this.state;
		let contentElm;
		if (loaded) {
			contentElm = (<Widget />);
		} else {
			contentElm = (<Loading container={this} show />);
		}

		return (
			<li ref="normal_widget" className={widgetItem} style={style} >
				{this.state.shouldLoad ? (
					<div>
						{serviceType === 3 ? null : <div className={title}>{name}</div>}
						{contentElm}
					</div>) : (<Loading container={this} show={true} />)}
			</li>
		);
	}
}

export default WidgetItem;
