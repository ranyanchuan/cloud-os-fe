import React, { Component } from 'react';
import Icon from 'pub-comp/icon';
import { ButtonU8cPrimary, ButtonU8cDefault, ButtonDefaultWhite } from 'pub-comp/button';
import Checkbox from 'bee-adapter/checkbox';
import FormControl from 'bee-adapter/form-control';
import Radio from 'bee-adapter/radio';
import UploadDialog from './uploadDialog';
import { wrap, form, appValidate, option, app_classify_option } from './index.css';
import { u8c } from './u8c.css';
import Select from 'bee-adapter/select';
const Option = Select.Option;
import WeChat from './wechat';

class IndexRender extends Component {

	constructor(props) {
		super(props);
		this.webOpenTypeItems = { 0: "In Current Page", 1: "In New Page" }
	}
	render() {
		const _this = this.props;
		const { data: { serviceId } } = _this.props;
		const {
			serviceName, primitive, serviceIcon, webStatus, clientStatus, phoneStatus, url,
			phoneUrl, summerPackageId, clientUrl,
			iosDownAddr, iosParam, androidDownAddr, androidParam, serverAddr,
			selectWarning, nameWarning, imgWarning, iosWarning,
			androidWarning, appWarning, home,
			urlWarning, clientUrlWarning,
			iconType, iconDialog, precutIndex, newApplicationIcon,
			navShow, pcOpenType, webOpenType, strategy, strategyWarning, vxStatus, dingdingStatus,
			applications, applicationId, feExtend, areas, typeApplication,areaId,typeApplicationId,
			selectTypeArr, selectType, serviceType, nativeMobileStatus
		} = _this.state;
		const isNewFirst = _this.state.first;
		const iconBtn = [
			{
				label: 'Cancel',
				fun: _this.closeIconDialog,
				type: 'u8cDefault'
			},
			{
				label: 'OK',
				fun: _this.confirmIconDialog,
				type: 'u8cPrimary'
			},
		];
		//初始phoneStatus,不会变
		const initPhoneStatus = this.props.state.initPhoneStatus;
		// 如果没有选中的， 则取第一个
		// const firstSelectKey = selectTypeArr.length && selectTypeArr[0].key;
		// const selectType2 = selectType || firstSelectKey;


		const { showPort, webOpenTypes } = feExtend;
		return (
			<div className={`${u8c} ${wrap}`}>
				<div className="um-win">
					<header className="um-header">
						<div>Service Function Release</div>
						<Icon type="error3" onClick={() => { _this.closeFn() }} />
					</header>
					<form className={`${form} um-content`}>
						<div className="app-box">
							<div className="app-bf1">
								<span className="labelName"><span className="appRequired">*</span>Service List</span>
								<FormControl type="text" placeholder="Cannot be more than 6 Chinese chars or 12 letters." value={serviceName} onChange={_this.changeNameFn} />
								{nameWarning ? (<div className={appValidate}><Icon type="error4" />{nameWarning}</div>) : null}
							</div>
							<div className="app-bf1">
								<span className="labelName"><span className="appRequired">*</span>Field</span>
								<Select
									className="strategy-select"
									// disabled
									searchPlaceholder="Field"
									value={areaId}
									onChange={_this.handChangeAreaID}
								>
									{
										areas.map(item => <Option key={item.labelId} value={item.labelId} className={app_classify_option}>{item.labelName}</Option>)
									}
								</Select>
								{/* <ButtonDefaultWhite>[object Object]</ButtonDefaultWhite>   */}
							</div>
							<div className="app-bf1">
								<span className="labelName"><span className="appRequired">*</span> App</span>
								<Select
									className="strategy-select"
									searchPlaceholder="Free of Login"
									value={applicationId}
									onChange={_this.handChangeApplicationID}
								>
									{
										applications.map(item => <Option key={item.applicationId} value={item.applicationId} className={app_classify_option}>{item.applicationName}</Option>)
									}
								</Select>
							</div>
							{/* <div className="app-bf1 keynone">
								<span className="labelName"><span className="appRequired">*</span>Category</span>
								<Select
									className="strategy-select"
									searchPlaceholder="Category"
									disabled
									value={typeApplicationId}
									onChange={_this.typeApplicationClick}
								>
									{
										typeApplication.map(item => <Option key={item.labelId} value={item.labelId} className={app_classify_option}>{item.labelName}</Option>)
									}
								</Select>
							</div> */}
							<div className="app-bf1">
								<span className="labelName"><span className="appRequired">*</span>Service icon</span>
								{serviceIcon !== '' ? <img id="imgSrc2" src={serviceIcon} className="appImg" alt="" /> : <img id="imgSrc" className="appImg appDefaultBGImg" alt="" />}
								{imgWarning ? (<div className={`${appValidate} imgWarningCls`}><Icon type="error4" />{imgWarning}</div>) : null}
								<div className="uploadTypeBtn">
									<ButtonU8cPrimary className="selectImg" onClick={e => _this.uploadImageDialog(1)}>Select default icon</ButtonU8cPrimary>
									<ButtonU8cDefault className="uploadImg localImg" onClick={(e) => { _this.uploadImageDialog(2); }}>Upload Local Icon</ButtonU8cDefault>
								</div>
							</div>

							<div className="app-bf1">
								<span className="labelName">Publish To</span>
								{showPort.includes("web") ? <Checkbox className="app-checkbox" checked={webStatus} onChange={_this.toggleWeb}>Web </Checkbox> : null}
								{showPort.includes("client") ? <Checkbox className="app-checkbox" checked={clientStatus} onChange={_this.toggleNet}>PC Client </Checkbox> : null}
								{showPort.includes("phone") ? <Checkbox className="app-checkbox" checked={phoneStatus} onChange={_this.toggleApp}>YouZone</Checkbox> : null}
								{showPort.includes("vx") ? <Checkbox className="app-checkbox" checked={vxStatus} onChange={_this.toggleWeChat}>WeChat</Checkbox> : null}
								{showPort.includes("dingding") ? <Checkbox className="app-checkbox" checked={dingdingStatus} onChange={_this.toggleDing}>DingTalk</Checkbox> : null}
							</div>
							{
								// <div className="app-bf1 um-box">
								// 	<span className="labelName"></span>
								// 	<div className='um-box'>
								// 		<ul className='selectTypeArr um-box'>
								// 			{
								// 				selectTypeArr.map(item => {
								// 					if (item.disable) {
								// 						return <li key={item.key} className={item.key === selectType ? "active" : ''} onClick={() => { _this.setSelectType(item.key) }}>{item.name}</li>
								// 					}
								// 				})
								// 			}
								// 		</ul>
								// 	</div>
								// </div>
							}
							<div>
								{
									webStatus && showPort.includes("web") ? (
										<div className="items">
											{/* <div className="items" style={{ display: selectType === 'web' ? 'block' : 'none' }}> */}
											<div className="app-bf1">
												<span className="labelName"><span className="appRequired">*</span>Web Homepage</span>
												<FormControl type="text" value={url} onChange={_this.changeWebFn} placeholder="Redirect URL for Web browser" />
												{urlWarning ? (<div className={appValidate}><Icon type="error4" />{urlWarning}</div>) : null}

											</div>
											<div className="app-bf1">
												<span className="labelName">web Open Method</span>
												<Radio.RadioGroup
													name="webOpenType"
													selectedValue={webOpenType}
													onChange={_this.handleWebOpenType}
												>
													{webOpenTypes.map((item) => {
														return <Radio value={+item} >{this.webOpenTypeItems[item]}</Radio>
													})}
												</Radio.RadioGroup>
											</div>
											<div className="app-bf1">
												<span className="labelName">Free of Login</span>
												<Select
													// multiple
													className="strategy-select"
													searchPlaceholder="Free of Login"
													value={strategy}
													onChange={_this.handleChangeStrategy}
												>
													<Option key="ykj_third_sys_service_strategy"
														value={"ykj_third_sys_service_strategy"}
														className={app_classify_option}
													>YouZone</Option>
													<Option key="" value={""}
														className={app_classify_option}>Null</Option>
												</Select>
												{strategyWarning ? (<div className={appValidate}><Icon type="error4" />{strategyWarning}</div>) : null}

											</div>
										</div>
									) : null
								}
								{
									clientStatus && showPort.includes("client") ? (
										<div className="items">
											{/* <div className="items" style={{ display: selectType === 'client' ? 'block' : 'none' }}> */}
											<div className="app-bf1">
												<span className="labelName"><span className="appRequired">*</span>PCClient Homepage</span>
												<FormControl type="text" value={clientUrl} onChange={_this.changeNetFn} placeholder="Redirect URL for YouZone PC version" />
												{clientUrlWarning ? (<div className={appValidate}><Icon type="error4" />{clientUrlWarning}</div>) : null}

											</div>
											<div className="app-bf1">
												<span className="labelName">pcClient Open Method</span>
												<Radio.RadioGroup
													name="pcOpenType"
													selectedValue={pcOpenType}
													onChange={_this.handlePCOpenType}
												>
													<Radio value={2} >pc client</Radio>
													<Radio value={1} >In new browser page</Radio>
													<Radio value={3} >Local</Radio>
												</Radio.RadioGroup>
											</div>
										</div>
									) : null
								}
								{
									phoneStatus && showPort.includes("phone") ? (
										<div className="items">
											{/* <div className="items" style={{ display: selectType === 'phone' ? 'block' : 'none' }}> */}
											<div className="app-bf1">
												<span className="labelName">appNative Navigation</span>
												<Radio.RadioGroup
													name="isNative"
													selectedValue={navShow}
													onChange={_this.handleNavShow}
												>
													<Radio value={'1'} >Yes</Radio>
													<Radio value={'2'} >No</Radio>
												</Radio.RadioGroup>
											</div>
											<div className="app-bf1">
												<span className="labelName">Native App</span>
												<Radio.RadioGroup
													name="isNative"
													selectedValue={primitive}
													onChange={_this.handleChange}

												>
													<Radio value disabled={serviceId && initPhoneStatus ? true : false}>Yes</Radio>
													<Radio value={false} disabled={serviceId && initPhoneStatus ? true : false}>No</Radio>
												</Radio.RadioGroup>
												{
													selectWarning ? (
														<div className={appValidate}>
															<Icon type="error4" />
															{selectWarning}
														</div>) : null
												}
											</div>
											{
												!primitive ? (
													<div>
														<div className="app-bf1">
															<span className="labelName">Mobile Homepage,</span>
															<FormControl type="text" value={phoneUrl} onChange={_this.changeAppFn} placeholder="Redirect URL for YouZone PC versionAPP " />
															{appWarning ? (<div className={appValidate}><Icon type="error4" />{appWarning}</div>) : null}
														</div>

														<div className="app-bf1">
															<span className="labelName">summerId</span>
															<FormControl type="text" value={summerPackageId} onChange={_this.changeSummerFn} placeholder="Installation pack ID to upload to theiUAPplatformID" />
														</div>
													</div>) : null
											}
											{
												primitive ? [
													<div key="ios-download" className="app-bf1">
														<span className="labelName"><span className="appRequired">*</span>IOSDownload Link</span>
														<FormControl type="text" value={iosDownAddr} onChange={_this.changeIosAddressFn} />
														{iosWarning ? (<div className={appValidate}><Icon type="error4" />{iosWarning}</div>) : null}
													</div>,
													<div key="ios-jump" className="app-bf1">
														<span className="labelName">IOSRedirection Parameters</span>
														<FormControl type="text" value={iosParam} onChange={_this.changeIosParamFn} />
													</div>,
													<div key="android-download" className="app-bf1">
														<span className="labelName"><span className="appRequired">*</span>AndroidDownload Link</span>
														<FormControl type="text" value={androidDownAddr} onChange={_this.changeAndroidAddressFn} />
														{androidWarning ? (<div className={appValidate}><Icon type="error4" />{androidWarning}</div>) : null}
													</div>,
													<div key="android-jump" className="app-bf1">
														<span className="labelName">AndroidRedirection Parameters</span>
														<FormControl type="text" value={androidParam} onChange={_this.changeAndroidParamFn} />
													</div>,
													<div key="server-host" className="app-bf1">
														<span className="labelName" key="server-label">Server Address</span>
														<FormControl type="text" value={serverAddr} onChange={_this.changeServiceFn} />
													</div>

												] : null
											}
											<div className="app-bf1">
												<span className="labelName"></span>
												<div className="appRadioGroup">
													<Checkbox className="app-checkbox" checked={home} onChange={_this.toggle}>Add to Mobile Homepage</Checkbox>
													<Radio.RadioGroup
														name="position"
														selectedValue={isNewFirst}
														onChange={_this.handlePositionChange}
													>
														<Radio value >Top</Radio>
														<Radio value={false} >Bottom</Radio>
													</Radio.RadioGroup>
												</div>
											</div>
										</div>
									) : null
								}
								{
									vxStatus && showPort.includes("vx") ? (
										<div className="items">
											{/* <div style={{ display: selectType === 'vx' ? 'block' : 'none' }}> */}
											<WeChat name='WeChat' {..._this} />
										</div>
									) : null
								}
								{
									dingdingStatus && showPort.includes("dingding") ? (
										<div className="items">
											{/* <div style={{ display: selectType === 'dingding' ? 'block' : 'none' }}> */}
											<WeChat name='Ding' {..._this} />
										</div>
									) : null
								}
								{
									/* {nativeMobileStatus ? <WeChat name='MobileNative' {..._this} /> : null} */
								}
							</div>
						</div>
					</form>
					<div className={`${option} um-footerbar`}>
						<ButtonU8cDefault onClick={() => { _this.closeFn() }}>Cancel</ButtonU8cDefault>
						<ButtonU8cPrimary onClick={_this.servicePublish}>OK</ButtonU8cPrimary>
					</div>
				</div>
				{
					iconDialog &&
					<UploadDialog
						iconType={iconType}
						iconDialog={iconDialog}
						precutIndex={precutIndex}
						newApplicationIcon={newApplicationIcon}
						iconBtn={iconBtn}
						closeIconDialog={_this.closeIconDialog}
						imgChange={_this.imgChange}
						precut={_this.precut}
					/>
				}
			</div >
		);
	}
}
export default IndexRender;
