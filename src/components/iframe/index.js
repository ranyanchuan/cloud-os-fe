import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { appendSearchParam, } from "yutils/utils";
import { iframe, iframeCont, } from './style.css';

const propTypes = {
	id: PropTypes.string,
	url: PropTypes.string,
	title: PropTypes.string,
	style: PropTypes.shape({}),
};
const defaultProps = {
	id: '',
	url: '',
	title: '',
	style: {},
};
class Iframe extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	componentDidMount() {
		const { id, title, url, iframeAttribute } = this.props;
		const iframeId = id || title;
		const attribute = iframeAttribute ? JSON.parse(iframeAttribute) : {};
		const iframe = window.document.getElementById(iframeId);
		// TODO 先取allow为定位的权限吧， 前端判断 无奈
		// const arr = Object.keys(attribute);
		// if (arr.length) {
		//   const arr2 = arr.filter(item => item !== "allow");
		//   arr2.length && arr2.forEach(item=> {
		//     iframe[item] = attribute[item];
		//   });
		// }
		if (attribute.allow) {
			let allow = attribute.allow;
			if (attribute.allow.geolocation) {
				const urls = url.split("/");
				const location = urls[0] + "//" + urls[2];
				allow = `geolocation ${location};`;
			}
			iframe.allow = allow;
			const urlParam = {
				refimestamp: new Date().valueOf(),
			}
			const src = appendSearchParam(url, urlParam)
			iframe.src = src;
		}
	}

	render() {
		const {
			title,
			url,
			style,
			id,
			wrapperId,
		} = this.props;

		return (
			<div id={wrapperId} className={iframeCont} style={style}>
				<iframe
					id={id || title}
					title={title}
					src={url}
					className={iframe}
					allowFullScreen="true"
					webkitallowfullscreen="true"
					mozallowfullscreen="true"
				/>
			</div>
		);
	}
}

Iframe.propTypes = propTypes;
Iframe.defaultProps = defaultProps;
export default Iframe;
