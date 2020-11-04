import React, { Component } from 'react';
import { mapStateToProps, getContext } from '@u';
import { connect } from 'react-redux';
import { dispatch, trigger } from 'public/componentTools';
import Search from 'components/search';
import searchActions from 'store/root/search/actions';
import rootActions from 'store/root/actions';
import { openWin } from 'public/regMessageTypeHandler';

const { getSearchSuggest } = searchActions;
const { requestError } = rootActions;

@connect(
	mapStateToProps(
		'SearchSuggestList',
		{
			namespace: 'search',
		},
	),
	{
		requestError,
		getSearchSuggest,
	}
)
class SearchContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	goSearchPage = (text) => {
		if (text === "") {
			text = " ";
		}
		openWin({
			id: 'Search',
			title: '搜索',
			data: {
				type: 'service',
				value: text
			}
		})
	}

	lastTime = 0

	getSearchList = (event) => {
		const { requestError, getSearchSuggest, } = this.props;
		const keyworks = event.target.value;
		this.lastTime = event.timeStamp;
		const _this = this;
		// react 合成事件应用
		event.persist()
		let t;
		clearTimeout(t);
		t = setTimeout(() => {
			let thisTime = event.timeStamp;
			if (_this.lastTime - thisTime == 0) {
				getSearchSuggest(keyworks).then(({ error, payload }) => {
					if (error) {
						requestError(payload);
					}
				});
			}
		}, 800);
	}

	render() {
		const { SearchSuggestList } = this.props;
		const searchContext = getContext();
		return (
			<div id="_search">
				<Search
					list={SearchSuggestList}
					onChange={this.getSearchList}
					onEnter={this.goSearchPage}
					onSearch={this.goSearchPage}
					onMoreBtnClick={this.goSearchPage}
					dispatch={dispatch}
					trigger={trigger}
					searchContext={searchContext}
				/>
			</div>
		);
	}
}

export default SearchContainer;
