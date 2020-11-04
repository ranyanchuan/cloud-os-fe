import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GetQueryString } from '@u';
import { iframeCont, mdfWrap } from './style.css';

const propTypes = {
	id: PropTypes.string,
	domainKey: PropTypes.string,
	url: PropTypes.string,
};
const defaultProps = {
	id: '',
	domainKey: '',
	url: '',
};

class RendMdf extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
		// this.domainKeys = {
		// 	upc: "productcenter",
		// 	upu: 'upu',
		// 	stock: 'ustock',
		// 	retail: 'retail'
		// }
	}

	componentDidMount() {
		const { url } = this.props;
		this.rendMdfFn(url);
	}

	componentWillReceiveProps(nextPros) {
		const { url: urlPre } = this.props;
		const { url: urlNext } = nextPros;
		if (urlPre && urlNext && urlNext != urlPre) {
			// this.rendMdfFn(urlNext);
		}
	}

	rendMdfFn = (url) => {
		const { id, domainKey } = this.props;
		const { pathname, searchParams, search } = new URL(url);
		const metaKey = "meta/", platformKey = "platform/";

		const urlParamArr = search.substr(1).split("&");
		const query = urlParamArr.reduce((pre, cur) => {
			const curArr = cur.split("=");
			const curKey = curArr[0];
			const curValue = curArr[1];
			return Object.assign(pre, { [curKey]: curValue });
		}, {});
		const publicParams = {
			domainKey,
			serviceCode: searchParams.get('serviceCode'),
			params: {
				query: query,
			}
		}
		const iframe = window.document.getElementById(id);
		// 判断是否为meta
		if (pathname.includes(metaKey)) {
			const metaKeyItems = pathname.substr(pathname.indexOf(metaKey) + metaKey.length).split('/');
			if (metaKeyItems.length !== 2) return;
			const billtype = metaKeyItems[0], billno = metaKeyItems[1];
			const metaParams = {
				billtype,
				billno,
				...publicParams
			};
			window.cb && window.cb.render(metaParams, iframe);
		} else if (pathname.includes(platformKey)) {
			const platformKeyItems = pathname.substr(pathname.indexOf(platformKey) + platformKey.length).split('/');
			if (platformKeyItems.length !== 1) return;
			const menuurl = platformKeyItems[0];
			const platformParams = {
				menuurl,
				...publicParams
			}
			window.cb && window.cb.render(platformParams, iframe);
		}
	}

	render() {
		const {
			id, domainKey
		} = this.props;

		return (
			<div className={iframeCont}>
				<div id={id} className={`${mdfWrap} ${domainKey}`} />
			</div>
		);
	}
}

RendMdf.propTypes = propTypes;
RendMdf.defaultProps = defaultProps;
export default RendMdf;
