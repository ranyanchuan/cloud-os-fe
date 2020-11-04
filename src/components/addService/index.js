import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { openMess } from 'pub-comp/notification';
import { openGlobalDialog } from 'pub-comp/pop';
import { uploadApplication, addService, getServiceInfo, getAppRef, getTypeApplication } from 'store/root/api';
import rootActions from 'store/root/actions';
import IndexRender from './IndexRender';
import { mapStateToProps, postMessageToWin } from '@u';

const { requestStart, requestSuccess, requestError, closeFrame } = rootActions;

@withRouter
@connect(mapStateToProps(),
	{
		requestStart,
		requestSuccess,
		requestError,
		closeFrame
	},
)

class AddApp extends Component {
	static propTypes = {
		requestStart: PropTypes.func,
		requestSuccess: PropTypes.func,
		requestError: PropTypes.func,
		closeFrame: PropTypes.func,
		data: PropTypes.shape(),
	};
	static defaultProps = {
		requestStart: () => { },
		requestSuccess: () => { },
		requestError: () => { },
		closeFrame: () => { },
		data: {},
	};
	constructor(props) {
		super(props);
		this.state = {
			selectWarning: false,
			nameWarning: false,
			imgWarning: false,
			areaWarning: false,
			classifyWarning: false,
			iosWarning: false,
			androidWarning: false,
			appWarning: false,//新增移动端：移动端主页与summerid必须选一个
			strategyWarning: false,
			// showDialogModal: false,
			urlWarning: false,//20180925
			clientUrlWarning: false,//20180925
			iconDialog: false,//上传图片的方式
			iconType: 1,// 1是预制的 2是自己上传的
			newApplicationIcon: '',
			precutIndex: null,//预制默认图片选中
			// selectTypeArr: [

			// ],  // 五种类型的集合
			// selectType: "",     // 当前选中的tabs

			applications: [],  // 根据applicatonId查询到的应用名称
			applicationId: '',
			areas: [],//可供选择的领域
			typeApplication: [],
			areaId: "",//领域ID
			typeApplicationId: '',
			weChatCom: '',    // 微信整个ref
			dingCom: '',      // 叮叮ref
			mobileNativeCom: '',  // 移动端ref
			allServiceAttr: {},//所有服务属性

			ext2: "",                // 需要传递给后台的ext参数
			primitive: false,       //111
			serviceName: '',        //111
			serviceType: 1,         //111
			serviceIcon: '',
			url: '',
			clientUrl: '',
			phoneUrl: '',
			summerPackageId: '',
			iosDownAddr: '',
			iosParam: '',
			androidDownAddr: '',
			androidParam: '',
			serverAddr: '',
			webStatus: false,
			clientStatus: false,
			phoneStatus: false,
			first: true,
			enable: true,
			home: false,
			everyone: true,
			navShow: '1',//app原生导航
			ts: null,//20190108提交需要这个
			createTime: null,//20190108提交需要这个
			pcOpenType: 1,
			webOpenType: 0,
			strategy: "",//默认无
			vxStatus: false,
			dingdingStatus: false,
			nativeMobileStatus: false,
			vx: {
				category: "",
				common: false,
				downloadUrl: "",
				homepage: "",
				offline: false,
				params: "",
				priority: 0,
				strategy: "无",
				useNativeNavigationBar: false,
				libVersion: ""
			},
			dingding: {
				category: "",
				common: false,
				downloadUrl: "",
				homepage: "",
				offline: false,
				params: "",
				priority: 0,
				strategy: "无",
				useNativeNavigationBar: false,
				libVersion: ""
			},
			nativeMobile: {
				category: "",
				common: false,
				downloadUrl: "",
				homepage: "",
				offline: false,
				params: "",
				priority: 0,
				strategy: "无",
				useNativeNavigationBar: false,
				libVersion: ""
			},
			// userItems: [],
			// orgItems: [],
			// contentTip: '',
			feExtend: {
				showPort: ['web', 'client', 'phone', 'vx', 'dingding'],	//	1.需要显示端的配置项
				webOpenTypes: [0, 1]
			},		// 0421新增，前端控制行为显示，非数据控制
		};
		this.actualInput = null;//这里是为了多次上传同一张图片

	}

	componentDidMount() {
		// 获取应用
		this.getAppRef();
		//
		// 当传递的参数包含serviceId,则为编辑状态 ， 后续
		const { data } = this.props;
		let { serviceId, serviceInfo } = data;
		if (serviceId) {
			this.getServiceInfo(data.serviceId, data.serviceInfo);
			return false;
		}
		// 如果传递进来serviceInfo，则直接将serviceInfo信息
		if (serviceInfo) {
			const { feExtend: feExtendState } = this.state;
			const { feExtend, ext2, serviceCode, url, phoneUrl } = serviceInfo;
			const feExtendAll = { ...feExtendState, ...feExtend };
			const state = {
				...this.state,
				feExtend: feExtendAll,
				ext2,
				serviceCode,
				url,
				phoneUrl
			};
			this.setState(state);
			// this.setSelectTypeArr2(state);
			return false;
		}
		// this.setSelectTypeArr2({});
	}

	// setSelectTypeArr2 = (state) => {
	// 	const selectTypeArr = [
	// 		{ name: "web端", key: 'web', disable: state.webStatus },
	// 		{ name: "PC客户端", key: 'client', disable: state.clientStatus },
	// 		{ name: "友空间", key: 'phone', disable: state.phoneStatus },
	// 		{ name: "微信", key: 'vx', disable: state.vxStatus },
	// 		{ name: "钉钉", key: 'dingding', disable: state.dingdingStatus }
	// 	];
	// 	const firstDis = selectTypeArr.find(item => item.disable)
	// 	const selectType = firstDis ? firstDis.key : "";
	// 	this.setState({ selectTypeArr, selectType });
	// }

	// 查询所有应用
	getAppRef = () => {
		const { requestError, data: { applicationId } } = this.props;

		getAppRef().then((result) => {
			let applications, applicationIdR;
			const areas = result;
			const areaId = result[0].labelId;
			if (!applicationId) {
				applications = result[0].applications;
				applicationIdR = result[0].applications[0].applicationId;
			} else {
				let match = false;
				let resultLength = result.length;
				for (let i = 0; i < resultLength; i++) {
					for (let j = 0; j < result[i].applications.length; j++) {
						if (result[i].applications[j].applicationId == applicationId) {
							match = true
							applicationIdR = applicationId;
							applications = result[i].applications;
							break;
						}
					}
				}
				if (!match) {
					throw new Error("错误的参数：applicationId");
				}
			}

			this.setState({
				applications,
				applicationId: applicationIdR,
				areas,
				areaId
			}, () => {
				// getTypeApplication().then((result) => {
				// 	this.setState({
				// 		typeApplication: result,
				// 	});
				// 	this.setTypeApplicationId(result);
				// }, (error) => {
				// 	console.log(error);
				// 	requestError(error);
				// });
			});

		}, (error) => {
			console.log(error);
			requestError(error);
		})
	}

	setTypeApplicationId = (result) => {
		result = result || this.state.typeApplication;
		const { applicationId: applicationIdR } = this.state;
		let typeApplicationId;
		result.forEach((item, index) => {
			if (item.applications) {
				item.applications.forEach((list, i) => {
					if (list.applicationId === applicationIdR) {
						typeApplicationId = item.labelId;
					}
				})
			}
		});
		this.setState({ typeApplicationId });
	}

	getServiceInfo = (serviceId, serviceInfo) => {
		const {
			requestStart,
			requestSuccess,
			requestError,
		} = this.props;

		requestStart();
		getServiceInfo(serviceId).then((payload) => {
			// const state = this.state;
			// payload.vx = payload.vx || this.state.vx;
			// payload.strategy = payload.strategy || "";
			// payload.dingding = payload.dingding || this.state.dingding;
			// payload.nativeMobile = payload.nativeMobile || this.state.nativeMobile;
			// this.setState({
			//   state,
			//   ...payload
			// });
			const { feExtend: feExtendState } = this.state;
			const { feExtend } = serviceInfo;
			const feExtendAll = { ...feExtendState, ...feExtend };
			this.setState({
				allServiceAttr: payload,
				primitive: payload.primitive,
				serviceName: payload.serviceName,
				serviceType: payload.serviceType,
				serviceIcon: payload.serviceIcon,
				url: payload.url,
				clientUrl: payload.clientUrl,
				phoneUrl: payload.phoneUrl,
				summerPackageId: payload.summerPackageId,
				iosDownAddr: payload.iosDownAddr,
				iosParam: payload.iosParam,
				androidDownAddr: payload.androidDownAddr,
				androidParam: payload.androidParam,
				serverAddr: payload.serverAddr,
				webStatus: payload.webStatus,
				clientStatus: payload.clientStatus,
				phoneStatus: payload.phoneStatus,
				first: payload.first,
				home: payload.home, // 是否是首页
				navShow: payload.navShow,
				ts: payload.ts, //20190108提交需要
				createTime: payload.createTime,//20190108提交需要这个
				serviceCode: payload.serviceCode,//必传字段
				pcOpenType: payload.pcOpenType,//新加字段，PC端服务打开方式,为确保一定有值
				webOpenType: payload.webOpenType,//新加字段，webOpenType,为确保一定有值
				initPhoneStatus: payload.phoneStatus,
				strategy: payload.strategy || "",
				vxStatus: payload.vxStatus,
				dingdingStatus: payload.dingdingStatus,
				nativeMobileStatus: payload.nativeMobileStatus,
				vx: payload.vx ? payload.vx : this.state.vx,
				dingding: payload.dingding ? payload.dingding : this.state.dingding,
				nativeMobile: payload.nativeMobile ? payload.nativeMobile : this.state.nativeMobile,
				feExtend: feExtendAll,
			}, () => {
				console.log(this.state, '======================================')
				// this.setSelectTypeArr2(payload);
			});
			requestSuccess();
		}, (error) => {
			console.log(error);
			requestError(error);
		});
	}

	closeFn = (instance) => {
		instance && instance.destroy();
		// 关闭弹窗
		this.props.closeFrame();
	}

	// 确定按钮
	servicePublish = () => {
		const {
			data: { serviceId, serviceCode: publishServiceCode },
			requestStart,
			requestSuccess,
			requestError,
		} = this.props;

		const {
			serviceName, serviceType, primitive, visibleRange, serviceIcon,
			webStatus, clientStatus, phoneStatus, url, phoneUrl, summerPackageId, clientUrl,
			first, enable, home, nameWarning,
			iosDownAddr, iosParam, androidDownAddr, androidParam, serverAddr, everyone, serviceCode,
			navShow, ts, createTime, pcOpenType, webOpenType, allServiceAttr, strategy,
			vxStatus, dingdingStatus, nativeMobileStatus,
			vx, dingding, nativeMobile,
			mobileNativeCom, weChatCom, dingCom, areaId, typeApplicationId,
			applicationId, ext2,
		} = this.state;

		// serviceType=1是自建服务的时候才会校验name，系统服务直接略过
		if (serviceType == 1 && serviceName === '') {
			this.setState({
				nameWarning: '请输入服务名称',
			});
			return false;
		}
		if (serviceType == 1 && serviceName.trim().replace(/[^\x00-\xff]/g, '__').length > 12) {
			this.setState({
				nameWarning: '服务名称不能多于6个汉字或者12个字母',
			});
			return false;
		}
		// 图标验证
		if (!serviceIcon) {
			this.setState({
				imgWarning: '请上传服务图标',
			});
			return false;
		}

		// web 端 20180925webstatus clientstatus也有设置 20181009只对自建服务
		if (serviceType === 1 && webStatus && !url) {
			// this.setSelectType('web');
			this.setState({
				urlWarning: '请输入在Web浏览器打开时跳转地址',
			});
			return false;
		}
		// pc客户端
		if (serviceType === 1 && clientStatus && !clientUrl) {
			// this.setSelectType('client');
			this.setState({
				clientUrlWarning: '请输入在友空间桌面端打开时跳转地址',
			});
			return false;
		}
		// 友空间
		if (typeof primitive === 'undefined') {
			// this.setSelectType('phone');
			this.setState({
				selectWarning: '请选择是否原生',
			});
			return false;
		}
		// 20181009只对自建服务
		if (serviceType === 1 && phoneStatus && primitive && !iosDownAddr) {
			// this.setSelectType('phone');
			this.setState({
				iosWarning: '请输入IOS下载地址',
			});
			return false;
		}
		if (serviceType === 1 && phoneStatus && primitive && !androidDownAddr) {
			// this.setSelectType('phone');
			this.setState({
				androidWarning: '请输入Android下载地址',
			});
			return false;
		}

		if (serviceType === 1 && phoneStatus && !primitive && !phoneUrl && !summerPackageId) {
			// this.setSelectType('phone');
			this.setState({
				appWarning: '移动端主页、summerId选填一个',
			});
			return false;
		}

		// if (typeof primitive === 'undefined' || (serviceType == 1 && (!serviceName
		//   || serviceName.trim().replace(/[^\x00-\xff]/g, '__').length > 12 || nameWarning !== false))
		//   || !serviceIcon) {
		//   return false;
		// }
		// //20181009 只对自建服务,原生两个下载地址都得有
		// if ((serviceType === 1 && phoneStatus && primitive && (!iosDownAddr || !androidDownAddr)) || (serviceType === 1 && phoneStatus && !primitive && !phoneUrl && !summerPackageId)) {
		//   return false;
		// }
		// // 20180925 webstatus clientstatus也有设置 20181009只对自建服务
		// if (serviceType === 1 && webStatus && !url || serviceType === 1 && clientStatus && !clientUrl) {
		//   return false;
		// }
		const param = {
			serviceId,
			serviceName,
			serviceType,
			primitive,
			visibleRange,
			serviceIcon,
			webStatus,
			clientStatus,
			phoneStatus,
			url,
			phoneUrl,
			summerPackageId,
			clientUrl,
			enable,
			home,
			iosDownAddr,
			iosParam,
			androidDownAddr,
			androidParam,
			serverAddr,
			first,
			everyone,
			navShow,
			ts,
			createTime,
			applicationId,
			areaId,
			typeApplicationId,
			serviceCode,
			pcOpenType, //暂时注释
			webOpenType,//暂时注释
			strategy,
			vxStatus: vxStatus,
			dingdingStatus: dingdingStatus,
			nativeMobileStatus: nativeMobileStatus,
			vx: vxStatus ? weChatCom.state : {},
			dingding: dingdingStatus ? dingCom.state : {},
			nativeMobile: nativeMobileStatus ? mobileNativeCom.state : {},
			openNewTab: webOpenType,//两者保持一致
			ext2: typeof (ext2) === "string" ? ext2 : JSON.stringify(ext2),
		};
		requestStart();
		if (primitive) {//如果原生下面两个字段清空
			param.phoneUrl = "";
			param.summerPackageId = ""
		} else {//如果非原生，下面五个字段清空
			param.iosDownAddr = "";
			param.iosParam = "";
			param.androidDownAddr = "";
			param.androidParam = "";
			param.serverAddr = "";
		}
		//加上隐藏的属性,将后台给的属性全部返回
		const allParams = Object.assign(allServiceAttr, param);
		// console.log(allParams,'allParams')
		// return
		addService(allParams).then((payload) => {
			requestSuccess();
			if (publishServiceCode) {
				const frameElm = document.getElementById(publishServiceCode);
				if (frameElm) {
					postMessageToWin(frameElm.contentWindow, {
						type: 'data',
						data: {
							action: "servicePublish",
							data: payload,
						},
					});
				}
			}
			// console.log('test',payload);
			// let serviceId = !!serviceId || payload.serviceId;
			// 新增需求跳到快速授权那里
			let instance = openGlobalDialog({
				title: !!serviceId ? '修改成功！' : '创建成功！',
				duration: 3,
				type: 'success',
				closable: true,
				close: () => this.closeFn(instance)
			});
		}, (error) => {
			requestError(error);
		})
		return true;
	}

	// 推荐到移动端首页
	toggle = (value) => {
		this.setState({
			home: value,
		});
	};

	// 公共方法 - 控制selectTypeArr和selectType

	// setSelectTypeArr = (flag, key) => {
	// 	let { selectTypeArr, selectType } = this.state;
	// 	selectTypeArr.forEach(item => {
	// 		if (item.key === key) {
	// 			item.disable = flag;
	// 		}
	// 	});
	// 	if (flag && !selectType) {
	// 		selectType = key;
	// 	} else if (!flag && key === selectType) {
	// 		const firstDis = selectTypeArr.find(item => item.disable)
	// 		selectType = firstDis ? firstDis.key : "";
	// 	}
	// 	this.setState({
	// 		selectTypeArr: [...selectTypeArr],
	// 		selectType
	// 	});
	// }

	// setSelectType = (selectType) => {
	// 	this.setState({ selectType });
	// }

	// 发布客户端 Web端、Client端、移动端
	toggleWeb = (flag) => {
		this.setState({
			webStatus: !!flag,
		});
	}
	toggleNet = (flag) => {
		this.setState({
			clientStatus: !!flag,
		});
	}
	toggleApp = (flag) => {
		this.setState({
			phoneStatus: !!flag,
		});
	}
	toggleWeChat = (flag) => {
		this.setState({
			vxStatus: !!flag,
		});
	}
	toggleDing = (flag) => {
		this.setState({
			dingdingStatus: !!flag,
		});
	}
	// 推荐到移动端首页 最前或者最后
	handlePositionChange = (value) => {
		this.setState({
			first: value,
		});
	};
	// app原生导航、是否原生、类别、领域
	handleNavShow = (value) => {
		this.setState({
			navShow: value,
		});
	}
	handleChange = (value) => {
		if (typeof value === 'undefined') {
			this.setState({
				selectWarning: '请选择是否原生',
			});
		} else {
			this.setState({
				selectWarning: false,
			});
		}
		this.setState({
			primitive: value,
		});
	};


	// 服务名称、服务名称Blur、
	changeNameFn = (e) => {
		this.setState({
			serviceName: e,
		});
		if (e.trim().length === 0) {
			this.setState({
				nameWarning: '请输入服务名称',
			});
		} else if (e.trim().replace(/[^\x00-\xff]/g, '__').length > 12) {
			this.setState({
				nameWarning: '服务名称不能多于6个汉字或者12个字母',
			});
		} else {
			this.setState({
				nameWarning: false,
			});
		}
	}


	// 请输入在Web浏览器打开时跳转地址、
	changeWebFn = (e) => {
		this.setState({
			url: e,
		});
		if (e.trim().length !== 0) {
			this.setState({
				urlWarning: false,
			});
		}
	}
	// 请输入在友空间APP打开时跳转地址、
	changeAppFn = (e) => {
		this.setState({
			phoneUrl: e,
		});
		if (e.trim().length !== 0) {
			this.setState({
				appWarning: false,
			});
		}
	}
	// 请输入上传到iUAP平台的安装包ID
	changeSummerFn = (e) => {
		this.setState({
			summerPackageId: e,
		});
		if (e.trim().length !== 0) {
			this.setState({
				appWarning: false,
			});
		}
	}
	// 请输入在友空间桌面端打开时跳转地址
	changeNetFn = (e) => {
		this.setState({
			clientUrl: e,
		});
		if (e.trim().length !== 0) {
			this.setState({
				clientUrlWarning: false,
			});
		}
	}
	// IOS下载地址、 IOS跳转参数、Android下载地址、Android跳转参数、服务器地址
	changeIosAddressFn = (e) => {
		this.setState({
			iosDownAddr: e,
		});
		if (e.trim().length === 0) {
			this.setState({
				iosWarning: '请输入IOS下载地址',
			});
		} else {
			this.setState({
				iosWarning: false,
			});
		}
	}
	changeIosParamFn = (e) => {
		this.setState({
			iosParam: e,
		});
	}
	changeAndroidAddressFn = (e) => {
		this.setState({
			androidDownAddr: e,
		});
		if (e.trim().length === 0) {
			this.setState({
				androidWarning: '请输入Android下载地址',
			});
		} else {
			this.setState({
				androidWarning: false,
			});
		}
	}
	changeAndroidParamFn = (e) => {
		this.setState({
			androidParam: e,
		});
	}
	changeServiceFn = (e) => {
		this.setState({
			serverAddr: e,
		});
	}


	//上传图片函数 precut、uploadImageDialog、closeIconDialog、confirmIconDialog、uploadImage、imgChange、handleChange
	precut = (index, url) => {
		this.setState({
			precutIndex: index,
			newApplicationIcon: url,
		})
	}

	uploadImageDialog = (type) => {
		// event.stopPropagation && event.stopPropagation()
		this.setState({
			iconDialog: true,
			iconType: type,// 1是预制，2是自己上传
		})
	}
	// 关闭上传
	closeIconDialog = (e) => {
		// event.stopPropagation && event.stopPropagation()
		this.setState({
			iconDialog: false,
			newApplicationIcon: '',
			precutIndex: null,
		})
	}
	// 确认事件
	confirmIconDialog = (e) => {
		const { newApplicationIcon, } = this.state;
		if (!newApplicationIcon) return false;// 沒有設置圖片不能確定
		this.setState({
			iconDialog: false,
			serviceIcon: newApplicationIcon,
			imgWarning: null,
			newApplicationIcon: '',
			precutIndex: null,
		});

	}
	// input 上传图片
	imgChange = (e) => {
		let _this = this;
		this.actualInput = document.getElementById('btn_file2');
		if (e.target.value.trim().length === 0) {
			this.setState({
				imgWarning: '请上传图片',
			});
		}
		const val = e.target.value && e.target.value.substr(e.target.value.lastIndexOf('.'));
		if (val && !val.match(/.jpg|.gif|.png|.bmp|.svg/i)) {
			this.setState({
				imgWarning: '必须是一个图片',
			});
			return false;
		}
		this.setState({
			imgWarning: false,
		});

		const [obj] = document.getElementById('btn_file2').files; //这里的上传的图片是在dialog中的
		const imgUrl = window.URL.createObjectURL(obj);
		// document.getElementById('imgSrc2').src = imgUrl;
		// 创建对象
		const imgObj = new Image();
		// 改变图片的src
		imgObj.src = imgUrl;
		// 加载完成执行
		imgObj.onload = function () {
			if (imgObj.width !== imgObj.height || imgObj.width !== 120 || obj.size > 5000000) {
				openMess({
					title: '上传图标失败！',
					content: '图标尺寸须为120*120，且不大于5M！',
					duration: 6,
					type: 'error',
					closable: false,
					style: { zIndex: 1711 }
				});
				return false;
			}
			const { requestError } = _this.props;
			const from = new FormData();
			from.append('file', obj);
			uploadApplication(from).then((payload) => {
				if (payload.url) {
					_this.setState({
						newApplicationIcon: payload.url,
					});
				}
			}, (error) => {
				_this.actualInput.value = null;
				requestError(error);
			})
			return true;
		};

	}


	handlePCOpenType = (value) => {
		this.setState({
			pcOpenType: value,
		});
	}
	handleWebOpenType = (value) => {
		this.setState({
			webOpenType: value,
		});
	}
	//
	handleChangeStrategy = (value) => {
		this.setState({
			strategy: value,
		});
	}
	//  更改id
	handChangeApplicationID = (value) => {
		this.setState({
			applicationId: value,
		},()=>{
			// this.setTypeApplicationId();
		});
	}
	handChangeAreaID = (value) => {
		const { areas } = this.state;
		let applications = []
		areas.forEach((item) => {
			if (item.labelId == value) {
				applications = item.applications
			}
		})
		this.setState({
			areaId: value,
			applications: applications,
			applicationId: applications[0] && applications[0].applicationId,
		}, () => {
			// this.setTypeApplicationId();
		});
	}
	// 微信组件的唯一方法
	getRef = (type, childRef) => {
		this.setState({
			[type]: childRef
		})
	}
	render() {
		return <IndexRender {...this} />
	}
}
export default AddApp;
