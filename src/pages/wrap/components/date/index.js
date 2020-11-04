import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, getContext } from '@u';

import moment from 'moment';
import Icon from 'pub-comp/icon';

import DatePick from './datepick';
import { getDateFormat } from "ac-format";

import rootActions from 'store/root/actions';
const { requestError, getCurrentDate, setCurrentDate } = rootActions;
import { date, iconbox, iconsty, onlyIcon, editIcon } from './style.css';

const toFormat = Object.keys(getContext()).length != 0 && 'dataformat' in getContext() && Object.keys(getContext().dataformat).length != 0
	? JSON.parse(getContext().dataformat).dateFormat : 'YYYY-MM-DD'
// const utc8 = Object.keys(getContext()).length != 0 && 'timezone' in getContext() && getContext().timezone != ''
//     ? getContext().timezone : 'UTC+08:00';

const dateFormat = 'YYYY-MM-DD';
// now.
@connect(
	mapStateToProps(
		'currItem',
		{
			key: "businessDate",
			value: (home, ownProps, root) => {
				return root.businessDate;
			}
		},
		{
			namespace: 'wrap',
		},

	),
	{
		requestError, getCurrentDate, setCurrentDate
	},
)

class Date extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lang: true,                             // 需要显示中文还是英文
			value: null,                            // 日期控件需要的值
			calType: false,                         // 显示日期控件
			dateType: getDateFormat(getContext().businessDate, 'UTC+08:00', toFormat)    // 默认显示的是单独图标， 还是已经设置好了的
		};
	}

	componentWillMount() {
		const { businessDate } = this.props;
		if (!businessDate) {
			const { requestError, getCurrentDate } = this.props;
			getCurrentDate().then(({ error, payload }) => {
				if (error) {
					requestError(payload);
					return;
				}
				this.setValue(payload.businessDate);
			});
		} else {
			this.setValue(businessDate);
		}
	}

	setValue = (date) => {
		const now = moment(date, dateFormat);
		const lang = getContext().locale.includes("zh");
		if (lang) {
			now.locale('zh-cn').utcOffset(8);
		} else {
			now.locale('en-gb').utcOffset(8);
		}
		this.setState({
			lang,
			value: now
		})
	}

	componentDidMount() {

	}

	openFn = () => {
		this.setState({ calType: true })
	}

	closeFn = () => {
		this.setState({ calType: false })
	}

	onSelect = (value) => {
		const val = value.format(dateFormat);
		const { setCurrentDate } = this.props;
		const param = {
			businessDate: val
		}
		setCurrentDate(param).then(({ error, payload }) => {
			if (error) {
				requestError(payload);
				return;
			}
			window.location.reload();
		});
	}

	render() {
		const { value, lang, calType, dateType } = this.state;
		if (!value) return null;
		return (
			<div className={`${date}`}>
				{
					dateType ? <div className={`${iconbox} um-box`} >
						<div>
							<Icon font="riqi" className={iconsty} />
						</div>
						<p className="um-bf1">{dateType}</p>
						<Icon type="record" className={editIcon} title="修改业务日期" onClick={this.openFn} />
					</div> :
						<div className={onlyIcon}>
							<Icon font="riqi" onClick={this.openFn} title="修改业务日期" />
						</div>
				}
				{
					calType ? <DatePick lang={lang} dateType={dateType} value={value} onSelect={this.onSelect} closeFn={this.closeFn} /> : null
				}

			</div>
		);
	}
}

export default Date;
