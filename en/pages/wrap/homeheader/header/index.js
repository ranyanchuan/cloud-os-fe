import React, { Component, Children, cloneElement } from 'react';
// import { getContext } from '@u';
import Header from 'components/header';
import Info from '../../components/info';
import SearchContainer from '../../components/search';
import Im from '../../components/im';
// import Appr from '../../components/Approval';
import Desttop from '../../components/desttop';
import Help from '../../components/help';
import Date from "../../components/date";
import Customer from "../../components/customer";
import { lebraNavbar, active } from './index.css';

class HeaderContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}
	render() {
		const {
			children,
			onLeftClick,
			onLeftTitleClick,
			iconName,
			leftContent,
			rightContent,
		} = this.props;
		const rightArray = Children.toArray(rightContent);
		const rightContents = rightArray.concat(
			<SearchContainer />,
			<Help />,
			<Desttop />,
			// <Appr />,
			<Im />,
			<Customer />,
			<Date />,
			<Info />,
		);
		return (
			<Header
				className={`${lebraNavbar} ${this.props.menuShow ? active : ''}`}
				mode="light"
				iconName={iconName}
				leftContent={leftContent}
				rightContent={
					rightContents.map((child, i) => cloneElement(child, { key: i }))
				}
				onLeftTitleClick={onLeftTitleClick ? onLeftTitleClick : onLeftClick}
				onLeftClick={onLeftClick}
			>
				{children}
			</Header>
		);
	}
}

export default HeaderContainer;
