import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import PopDialog from 'pub-comp/pop';
import { dispatchMessageTypeHandler } from 'public/regMessageTypeHandler';
import rootActions from 'store/root/actions';
import { titleStyle, customtip } from './style.css'
import DragM from "dragm";
import ToolTip from 'bee-adapter/toolTip';

class BuildTitle extends React.Component {
	updateTransform = transformStr => {
		this.modalDom.style.transform = transformStr;
	};

	componentDidMount() {
		this.modalDom = document.getElementsByClassName(
			"basic_dialog_modal"
		)[0];
	}

	render() {
		const { title } = this.props;
		return (
			<DragM updateTransform={this.updateTransform}>
				<div style={{ display: 'inline-block', width: '85%' }}>{title}</div>
			</DragM>
		);
	}
}

const { closeDialogNew } = rootActions;

@connect(
	mapStateToProps(
		'showModal',
		'dialogData',
	),
	{
		closeDialogNew
	}
)
class PopDialogComp extends Component {

	// componentWillUnmount(){
	// 	if(this.props.showModal){
	// 		this.props.closeDialogNew();
	// 	}
	// }

	showTip = (tip, message) => {
		if (message && message.length > 50) {
			return <ToolTip trigger="click" rootClose inverse overlay={tip} className={customtip}>
				<a style={{ color: 'blue' }}>
					More
				</a>
			</ToolTip>
		}
	}

	render() {
		const {
			dialogData,
			showModal,
			closeDialogNew,
		} = this.props;
		let {
			type: dialogType,
			title: dialogTitle,
			msg: dialogMsg,
			btn: btns,
			close: closeFn,
			customData,
		} = dialogData;

		let customBtn = [
			{
				label: "OK",
				fun: () => {
					closeFn ? closeFn() : closeDialogNew();
				},
				type: 'u8cPrimary',// null,//dialogType === "success" ? null : dialogType,
				//className: 'basic_dialog_modal u-button'
			}
		];
		// 判断是自定义的Data
		if (customData) {
			const { action, } = customData;
			if (action === "isCloseAction") {
				btns = null;
				dialogType = "warning";
				dialogTitle = dialogTitle || "Tips";
				dialogMsg = dialogMsg || "The page contains unsaved data. Clicking OK will close the page. Are you sure to continue?";
				customBtn = [
					{
						label: "OK",
						fun: () => {
							closeDialogNew();
							dispatchMessageTypeHandler({
								type: "closeWin",
								detail: {},
							});
						},
					},
					{
						label: "Cancel",
						fun: () => {
							closeDialogNew();
						},
					}
				];
			}
			if (action === "isReOpen") {
				btns = null;
				dialogType = "warning";
				dialogTitle = dialogTitle || "Tips";
				dialogMsg = dialogMsg || "The page contains unsaved data. Clicking OK will re-open the page. Are you sure to continue?";
				customBtn = [
					{
						label: "OK",
						fun: () => {
							closeDialogNew();
							dispatchMessageTypeHandler({
								type: "reOpenService",
								detail: customData,
							});
						},
					},
					{
						label: "Cancel",
						fun: () => {
							closeDialogNew();
						},
					}
				];
			}
		}
		const _btn = btns || customBtn;
		let tip = (
			<div>
				{dialogMsg}
			</div>
		)
		const title = <BuildTitle visible={showModal} title={<span className={titleStyle}>{dialogTitle}</span>} />
		return (
			<PopDialog
				className="basic_dialog_modal"
				type={dialogType}
				backdrop={"static"}
				show={true}
				title={title}
				backup={false}
				close={closeFn || closeDialogNew}
				btns={_btn}
			>
				<p className="content_p">
					{dialogMsg && dialogMsg.length > 50 ? dialogMsg.substring(0, 50) + '......' : dialogMsg}
					{this.showTip(tip, dialogMsg)}
				</p>
			</PopDialog>
		)
	}
}

export default PopDialogComp;
