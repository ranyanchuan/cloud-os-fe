import React, { Component } from 'react';
import store from "store";
import { connect } from 'react-redux';
import { mapStateToProps, get, post, postMessageToWin, } from '@u';
import { dispatchMessageTypeHandler } from 'public/regMessageTypeHandler';
import Tree from 'bee-adapter/tree';
import { ButtonU8cPrimary, ButtonU8cDefault } from 'pub-comp/button';
import {
	wrapper, content, menuInfo, tree, menuName,
	option, node, leaf, del, red, noddBg, hoverBg
} from './style.css';
import rootActions from 'store/root/actions';
import wrapActions from 'store/root/wrap/actions';
const { getAllMenuList } = wrapActions;
const TreeNode = Tree.TreeNode;
import _ from "lodash";

const {
	requestStart,
	requestSuccess,
	requestError,
	showDialog,
	closeDialogNew,
	closeFrame
} = rootActions;
@connect(mapStateToProps(), { requestStart, requestSuccess, requestError, showDialog, closeDialogNew, closeFrame })
class AddServiceMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			treeData: [],
			selectedNode: {},
			added: false,
			url: '',
			checkedKeys: [],
			serviceCode: "",
		};
	}

	componentWillMount() {
		const { data, requestError } = this.props;
		this.setState({
			applicationCode: data.applicationCode,
			service: data.service,//创建服务
			ifCreateService: data.ifCreateService == undefined ? true : data.ifCreateService,
			//默认是true
			serviceId: data.serviceId,//已有服务
			serviceName: data.service && data.service.serviceName,
			serviceCode: data.serviceCode,//用于向内嵌frame传入信息
			ifEdit: data.ifEdit == undefined ? true : data.ifEdit//传过来的名称是否可编辑
		})
		let api = `/menubar/getAllLight`;
		let params = {};
		if (data.menuBarCode) {
			api = `/menubar/getByCode`;
			params.menuBarCode = data.menuBarCode
		}
		// var result = require('./aa.json').data;
		// this.addKeyAndName(result);
		// this.addParentKey(result);
		// this.setState({
		// 	treeData: result,
		// });
		get(api, params).then((result) => {
			this.addKeyAndName(result);
			this.addParentKey(result);
			this.setState({
				treeData: result,
			});
		}, (error) => {
			console.log(error);
			requestError(error);
		})
	}

	addKeyAndName = (data) => {
		data.forEach((item) => {
			if (item.menuItems) {
				item.children = item.menuItems;
			}
			item.key = `${item.menuBarId}-${item.menuItemId ? item.menuItemId : ''}`;
			item.name = item.menuItemName || item.menuBarName;
			if (item.children && item.children.length) {
				this.addKeyAndName(item.children)
			}
		})
	}

	addParentKey = (data, key = "top") => {
		data.forEach((item) => {
			item.parentKey = key;
			if (item.children && item.children.length) {
				this.addParentKey(item.children, item.key);
			}
		})
	}

	addNode = (nodeItem, position) => {
		const { requestError } = this.props;

		const { treeData, applicationCode, service, serviceName, ifCreateService } = this.state;
		if (!serviceName) {
			requestError('Please enter menu name first');
			return
		}
		//根据nodeItem获取父节点和当前节点
		const selectedNodeParent = this.getNodeByKey(treeData, nodeItem.parentKey)
		//如果创建服务 service不为undefined
		if (ifCreateService) service.serviceName = serviceName

		const nodeItemToBeInsert = {
			parentKey: nodeItem.parentKey,
			//menuItemCode:this.menuCode.value,
			newAdded: true,
			name: serviceName,
			applicationCode: applicationCode,
			service: service,
			adjacentMenuItemId: nodeItem.menuItemId,
			beforeAdjacentMenuItem: position == "forward" ? true : false,
			menuBarId: nodeItem.menuBarId
		}
		const { children = [] } = selectedNodeParent || {};

		let selectedNodeIndex = children.findIndex(item => item.key == nodeItem.key)
		if (selectedNodeParent) {
			// 如果key不存在就动态生成一个
			if (!nodeItemToBeInsert.key) {
				nodeItemToBeInsert.key = children.length + 1;
			}
			if (position == "forward") {
				children.splice(selectedNodeIndex, 0, nodeItemToBeInsert);

			} else if (position == 'backward') {
				children.splice(selectedNodeIndex + 1, 0, nodeItemToBeInsert);
			}
		}

		this.setState({
			treeData,
			added: true,
			nodeItem: nodeItemToBeInsert,
			checkedKeys: [nodeItem.key]
		});
	}

	getNodeByKey = (data, key) => {
		this.node = null
		if (!this.node) {
			data.find(item => {
				if (item.key === key) {
					this.node = item;
					return (true);
				} else {
					if (item.children) {
						return this.getNodeByKey(item.children, key);
					}
				}
			})
		}
		return this.node;
	}

	cancel = () => {
		this.props.closeFrame();
	}
	componentDidMount() {
		const _this = this
		document.getElementById('saveMenuId').addEventListener('click', this.save)
	}
	componentWillUnmount() {
		document.getElementById('saveMenuId').removeEventListener('click', this.save)
	}
	save = (e) => {

		const {
			nodeItem: {
				name: menuItemName,
				applicationCode,
				beforeAdjacentMenuItem,
				adjacentMenuItemId,
				menuBarId,
				service
			}, ifCreateService, serviceId, serviceCode } = this.state;

		const params = {
			menuItemName,  //菜单名称  必填  由我内部处理,不用调用者传参
			applicationCode,//需要调用者传过来
			beforeAdjacentMenuItem,
			adjacentMenuItemId,
			menuBarId,//必填,由我内部处理,不用调用者传参
		};

		if (ifCreateService) { //如果同时新创建服务的话，把服务传过去
			params.service = service;
		} else {  //如果是已有服务发布菜单，传serviceId
			params.serviceId = serviceId
		}
		const url = ifCreateService ? "/manager/menuItem/publish" : "/manager/menuItem/publish4Service"
		post(url, params).then((payload) => {
			if (serviceCode) {
				// if(window._IUAPPREMISESFLAG){
				store.dispatch(getAllMenuList());
				// }
				const detail = {
					serviceCode: serviceCode,
					mdfCommunication: true,
					data: {
						action: "addMenu",
						data: {
							status: true,
							payload,
						},
					}
				};
				dispatchMessageTypeHandler({
					type: "postDataToService",
					detail: detail,
				});
				// const frameElm = document.getElementById(serviceCode);
				// if (frameElm) {
				// 	postMessageToWin(frameElm.contentWindow, {
				// 		type: 'data',
				// 		data: {
				// 			action: "addMenu",
				// 			data: {
				// 				status: true,
				// 				payload,
				// 			},
				// 		},
				// 	});
				// }
			}
			this.props.showDialog({
				msg: "",
				title: "Saved successfully.",
				type: "success"
			});
			this.cancel();
		}, (error) => {
			this.props.showDialog({
				msg: error.message,
				title: "Error",
				type: "error"
			});
		})
	}

	del = (nodeItem) => {
		const { treeData, } = this.state;
		//根据nodeItem获取父节点和当前节点
		const selectedNodeParent = this.getNodeByKey(treeData, nodeItem.parentKey)
		const { children = [] } = selectedNodeParent || {};
		let selectedNodeIndex = children.findIndex(item => item.key == nodeItem.key)
		children.splice(selectedNodeIndex, 1);
		this.setState({
			treeData,
			added: false,
			nodeItem: null,
			checkedKeys: []
		});
	}

	onChange = (e) => {
		this.setState({ serviceName: e.target.value })
	}

	render() {
		const { added, serviceName, checkedKeys, treeData, ifEdit } = this.state;
		const loop = data => data.map((item) => {
			if (item.children && item.children.length) {//titleStyle={{color:'red'}}
				return <TreeNode title={item.name} key={item.key} >{loop(item.children)}</TreeNode>;
			}
			return <TreeNode
				title={
					<div className={`${added ? "" : node} ${item.newAdded ? red : ''}`}>{item.name}
						<div className={option} >
							<span onClick={this.addNode.bind(this, item, 'forward')}>Before</span>
              &nbsp;&nbsp;
              <span style={{ marginRight: 20 }} onClick={this.addNode.bind(this, item, 'backward')}>After</span>
						</div>
						{item.newAdded ? <span className={del}
							onClick={this.del.bind(this, item)}>X</span> : null}
					</div>}
				key={item.key} isLeaf={item.isLeaf} className={`${leaf} ${added ? "" : hoverBg} ${item.newAdded ? noddBg : ''}`} />;
		});
		const treeNodes = treeData.length && loop(treeData);
		return (
			<div className={wrapper}>
				<header >Publish to Menu</header>
				<div className={content}>
					<p>Menu Position</p>
					<div className={tree}>
						<Tree
							checkedKeys={checkedKeys}
							checkable
							className="myCls"
							selectable={false}
							defaultExpandedKeys={this.state.defaultExpandedKeys}
						>
							{treeNodes ? treeNodes : null}
						</Tree>
					</div>
					<div className={menuInfo}>
						<div className={menuName}>
							<label>Menu Name</label>
							<input disabled={!ifEdit || added} value={serviceName} onChange={this.onChange} />
						</div>
					</div>
				</div>
				<footer>
					<ButtonU8cDefault onClick={this.cancel}>Cancel</ButtonU8cDefault>
					<ButtonU8cPrimary id="saveMenuId" disabled={!added}>Save</ButtonU8cPrimary>
				</footer>
			</div>
		);
	}
}

export default AddServiceMenu;
