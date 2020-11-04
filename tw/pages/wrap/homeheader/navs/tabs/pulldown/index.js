import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { openWin } from 'public/regMessageTypeHandler';
import Dropdown from 'bee-adapter/dropdown';
import Menu from 'bee-adapter/menus';
import Icon from 'pub-comp/icon';
import Button from 'bee-adapter/button';
import {
	pulldown, dropdown, close, blackpage, error
} from './style.css';

import wrapActions from 'store/root/wrap/actions';
const { closeTabs, addTabs } = wrapActions;

const { Item, Divider } = Menu;

@connect(
	mapStateToProps(
		'tabs',
		{
			namespace: 'wrap',
		}
	),
	{
		addTabs,
		closeTabs,
	},
)
class Pulldown extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	componentDidMount() {

	}

	handleClick = (e, item) => {
		e.stopPropagation();
		const { closeWin } = this.props;
		closeWin(item);
	}

	onSelect = (selectItem) => {
		const { addTabs, tabs } = this.props;
		if (selectItem.key === "close") {
			try {
				const isMdfTab = tabs.findIndex(item => item.isMdf);
				if (isMdfTab > -1) {
					cb.communication({ action: "closeAll" });
				}
			} catch (error) {
				console.log(error);
			}
			this.props.closeTabs();
			return false;
		}
		const { item: { props: { attribute } } } = selectItem;
		addTabs(attribute);
	}

	render() {
		const { tabs, items } = this.props;
		const menus = (
			<Menu
				onClick={this.onSelect}
				className={dropdown}
			>
				<Item key="close" title="關閉全部頁簽" className={close}>關閉全部頁簽</Item>
				{
					items.length ? <Divider /> : null
				}

				{
					items.length && items.map((item) => {
						return (
							<Item key={item.id} attribute={item}>
								<Icon type="blank-page" className={blackpage} />
								{item.title}
								<Icon type="error3" className={error} onClick={(e) => this.handleClick(e, item)} />
							</Item>
						)
					})
				}
			</Menu>
		);
		return (
			<div className={pulldown} style={{ width: this.props.width }}>
				<Dropdown
					trigger={['click']}
					overlay={menus}
					animation="slide-up"
					overlayClassName="close_tabs"
				>
					<Button disabled={!tabs.length}><Icon type="More" /></Button>
				</Dropdown>
			</div>
		);
	}
}
export default Pulldown;
