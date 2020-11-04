import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapStateToProps, getContext } from '@u';
import { dispatchMessageTypeHandler } from 'public/regMessageTypeHandler';

import EnterContent from 'pub-comp/enterContent';
import { uploadApplication } from 'store/root/api';
import { texts } from 'yutils/entertext';

import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';
const { requestStart, requestSuccess, requestError } = rootActions;
const { setCreateEnter } = homeActions;

import { pageEnterprise, enterTitle, enterCont, hr } from './style.css';

@connect(
	mapStateToProps(
		{
			key: "userInfo",
			value: (home, ownProps, root) => {
				return root.userInfo;
			}
		},
		{
			namespace: 'wrap',
		}
	),
	{
		requestStart,
		requestSuccess,
		requestError,
		setCreateEnter,
	},
)
class Enterprise extends Component {
	static propTypes = {
		userInfo: PropTypes.shape({
			allowTenants: PropTypes.array,
		}),
	};
	static defaultProps = {
		userInfo: {},
	};
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentWillMount() {

	}

	handleClick = (param, fn) => {
		dispatchMessageTypeHandler({
			type: "showDialog",
			detail: {
				type: 'warning',
				title: 'Tips',
				msg: "Click OK to refresh the page. Continue?",
				btn: [{
					label: "OK",
					fun: () => {
						dispatchMessageTypeHandler({
							type: "closeDialogNew",
						});
						this.create(param, fn);
					},
				},
				{
					label: "Cancel",
					fun: () => {
						dispatchMessageTypeHandler({
							type: "closeDialogNew",
						});
						fn({ error: true });
					},
				}
				]
			}
		});
	}

	create = (param, fn) => {
		const {
			requestStart,
			requestSuccess,
			requestError,
			setCreateEnter
		} = this.props;
		// fn({ error: false, payload: {tenantId: "1"} });
		// return;
		requestStart();
		setCreateEnter(param, "createEnter").then(({ error, payload }) => {
			// 此处调用callback
			fn({ error, payload });
			if (error) {
				requestError(payload);
				return;
			} else {
				requestSuccess();
				if (window.sessionStorage.getItem('TABS_DATA')) {
					window.sessionStorage.removeItem('TABS_DATA');
				}
				const value = Date.now();
				window.localStorage.setItem("_LOSEPAYLOAD_", value);
			}
		});
	}

	switchSpace = (tenantId) => {
		window.location.href = `/?tenantId=${tenantId}&switch=true`;
	}

	render() {
		const { userInfo } = this.props;
		const { locale, } = getContext();
		return (
			<div className="diworkcontent" id="CreateEnter">
				<div className={`${pageEnterprise}`}>
					<div className={enterTitle} >Create Enterprise</div>
					<hr className={hr} />
					<div className={enterCont} >
						{
							Object.keys(userInfo).length > 0
								? <EnterContent
									userInfo={userInfo}
									_from="create"
									handleClickFn={this.handleClick}
									buttonText="Create "
									loadingDesc="Creating enterprise…"
									uploadApplication={uploadApplication}
									texts={texts}
									lang={locale}
									switchSpace={this.switchSpace}
								/> : null
						}
					</div>
				</div>
			</div>
		);
	}
}
export default Enterprise;

