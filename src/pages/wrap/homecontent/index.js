import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';
import { Pages } from 'router';
import Iframe from 'components/iframe';
import RendMdf from 'components/rendMdf';
import { content, diwork } from './style.css';
import wrapActions from 'store/root/wrap/actions';
const { recordServiceInfo } = wrapActions;
@connect(
	mapStateToProps(
		'iframeTabs',
		'tabs',
		'activeCarrier',
		'defaultTabs',
		{
			namespace: 'wrap',
		}
	),
	{
		recordServiceInfo
	},
)
class Homecontent extends Component {
	static propTypes = {
		defaultTabs: PropTypes.array,
		tabs: PropTypes.array,
		activeCarrier: PropTypes.string,
	};
	static defaultProps = {
		defaultTabs: [],
		tabs: [],
		activeCarrier: '',
	};

	constructor(props) {
		super(props);
		this.state = {};
		this.iframArr = [];
	}

	componentDidMount() {
		this.setServiceStyle();
		window.addEventListener("resize", this.setServiceStyle);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.setServiceStyle);
	}

	setServiceStyle = () => {
		const { recordServiceInfo } = this.props;
		const width = this.contentRef.offsetWidth - 16;
		const height = this.contentRef.offsetHeight - 16;
		recordServiceInfo({ iframeWidth: width, iframeHeight: height, });
	}

	renderActive = (item) => {
		const {
			id,
			type,
			url,
			title,
			iframeAttribute,
			isMdf,
			data
		} = item;
		const { effect } = this.props;
		if (isMdf) {
			return <RendMdf id={id} domainKey={isMdf} url={url} data={data} />
		}
		if (type === "service" || url.indexOf('http') === 0) {
			return <Iframe id={id} title={title} url={url} iframeAttribute={iframeAttribute} style={effect === "headless" ? { padding: 0 } : {}} />
		}
		return Pages[url];
	}

	render() {
		const { activeCarrier, iframeTabs } = this.props;
		// const totalTabs = iframeTabs;
		const mdfTabs = iframeTabs.filter(item => item.isMdf);
		const tabs = iframeTabs.filter(item => !item.isMdf);
		return (
			<div className={content} ref={c => this.contentRef = c}>
				{
					tabs.map(item => {
						const style = item.id === activeCarrier ? { zIndex: 2, visibility: "visible" } : { visibility: "hidden" };
						return (
							<div className={diwork} style={style} key={item.id}>
								{this.renderActive(item)}
							</div>
						)
					})
				}
				<div id="yxyweb-support-container">
					<div id="yxyweb-filter">
						{
							mdfTabs.map(item => {
								const style = item.id === activeCarrier ? { display: "block" } : { display: "none" };
								return (
									<div className={diwork} style={style} key={item.id}>
										{this.renderActive(item)}
									</div>
								)
							})
						}
					</div>
					<div id="yxyweb-support-mount-model"></div>
					<div id="yxyweb-support-mount-popover"></div>
				</div>
			</div>
		);
	}
}
export default Homecontent;
