import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'pub-comp/icon';
import SearchWrap from './searchWrap';
import SearchItem from './searchItem';
import {
	search,
	searchExtend,
	searchBtn,
	searchInput,
	inputArea,
	clearSearch,
	SearchWin,
	searchWindom,
	searchContent,
	showheight,
	searchBtnAll,
} from './style.css';

class Search extends Component {

	static propTypes = {
		list: PropTypes.arrayOf(PropTypes.shape({
			type: PropTypes.string,
			typeName: PropTypes.string,
			renderUrl: PropTypes.string,
			content: PropTypes.arrayOf(PropTypes.string),
		})).isRequired,
		onChange: PropTypes.func.isRequired,
		onEnter: PropTypes.func.isRequired,
		onSearch: PropTypes.func.isRequired,
		dispatch: PropTypes.func.isRequired,
		trigger: PropTypes.func.isRequired,
		onMoreBtnClick: PropTypes.func.isRequired,

	}

	static defaultProps = {
		list: [],
		onChange: () => { },
		onEnter: () => { },
		onSearch: () => { },
		dispatch: () => { },
		trigger: () => { },
		onMoreBtnClick: () => { },
	}

	constructor(props) {
		super(props);
		this.state = {
			text: '',
			isShow: false,
			isSearchWinShow: false,
			inWrap: false,
		};
		this.searchText = {
			placeholder: 'Personnel Info, service, and others',
			more: 'More Results',
			none: 'No result found',
			clear: 'Clear',
			search: 'Search',
		}
	}

	componentWillMount() {

	}

	componentDidMount() {
		// document.body.addEventListener('click', this.handleClickOutside);
	}

	componentWillUnmount() {
		// document.body.removeEventListener('click', this.handleClickOutside);
	}

	search = (e) => {
		const { isShow, text } = this.state;
		if (isShow && text) {
			this.props.onSearch(text);
		} else if (isShow) {
			this.setState({
				isShow: false,
			});
		} else {
			this.setState({
				isShow: true,
			});
		}
	}


	onKeyDown = (e) => {
		if (e.keyCode === 13) {
			this.props.onEnter(e.target.value);
			this.closeSearch();
		}
	}

	clearInput = () => {
		this.setState({
			text: '',
			isSearchWinShow: false
		});
		this._formInput.focus();
	}


	onChangeHandler = (e) => {
		const { value } = e.target;
		if (value === '') {
			this.setState({
				isSearchWinShow: false,
			});
		} else {
			this.props.onChange(e);
			if (!this.state.isSearchWinShow) {
				this.setState({
					isSearchWinShow: true,
				});
			}
		}
		this.setState({
			text: value,
		});
	}

	onMoreBtnClick = () => {
		this.props.onMoreBtnClick(this.state.text);
		this.closeSearch();
	}

	// 仅仅关下拉搜索结果
	closeSearchWrap = () => {
		this.setState({
			isSearchWinShow: false,
			text: "",
		});
	}

	// 关闭输入框和下拉
	closeSearch = () => {
		this.setState({
			text: '',
			isSearchWinShow: false,
			isShow: false,
		});
	}

	render() {
		const { isShow, text, isSearchWinShow } = this.state;
		const { list, className } = this.props;
		let inputWrap, searchWin;
		const dataList = list
			.filter(({ content }) => content.length)
			.map(({ typeName, content, type, renderUrl }, i) => {
				return (
					<div className={searchWindom} key={`type${i}`}>
						<h3>{typeName}</h3>
						<ul>
							{
								content.map((item, j) => {
									return (
										<li key={`item${j}`} onClick={this.closeSearch}>
											<SearchItem
												data={item}
												type={type}
												url={renderUrl}
												from="quick"
												closeSearch={this.closeSearch}
												{...this.props}
											/>
										</li>
									);
								})
							}
						</ul>
					</div>
				);
			});
		if (isShow) {
			inputWrap = (
				<div className={`ignoreClass-search ${inputArea}`}>
					<input
						ref={child => this._formInput = child}
						className={searchInput}
						type="text"
						value={text}
						onChange={this.onChangeHandler}
						placeholder={this.searchText.placeholder}
						autoFocus={true}
						onKeyDown={this.onKeyDown}
						maxLength="20"
					/>
				</div>
			);

			searchWin = (
				<div className={`${SearchWin}`} >
					<div className={`${searchContent}`}>
						{dataList}
					</div>
					{
						list.length ? (
							<div className={searchBtnAll} onClick={this.onMoreBtnClick}>{this.searchText.more}</div>
						) : (
								<em>{this.searchText.none}</em>
							)
					}
				</div>
			);
		}

		return (
			<div className={`${search} ${isShow ? searchExtend : ''} ${className ? className : null}`} >
				{inputWrap}
				{
					isSearchWinShow ?
						<SearchWrap
							outsideClickIgnoreClass='ignoreClass-search'
							closeSearchWrap={this.closeSearchWrap}
						>{searchWin}</SearchWrap>
						:
						null
				}
				{
					isShow && text ? (
						<div className={`${clearSearch} ignoreClass-search`} onClick={this.clearInput}>
							<Icon title={this.searchText.clear} type="error3" />
						</div>
					) : null
				}
				<div className={`ignoreClass-search ${searchBtn}`} onClick={this.search}>
					<Icon title={this.searchText.search} type="search" />
				</div>
			</div>
		);
	}
}

export default Search;
export { SearchItem };
