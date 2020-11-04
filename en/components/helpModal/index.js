import React, { Component } from 'react';
import PopDialog from 'pub-comp/pop';
import { getHost, getContext } from "@u";
class HelpModal extends Component {

	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {

	}

	openHelp = (path) => {
		const { productLine } = getContext();
		const key = productLine === "diwork" ? "helpDiwork" : "helpYs";
		const url = `${getHost(key)}${path}`
		window.open(url);
		this.props.closeFn();
	}


	render() {
		const { closeFn, helpInfo: { global } } = this.props;
		if (!global) return null;
		const { title, msg, pathWithHash } = global;
		const btns = [
			{
				label: "noDictionnaryFlag",
				fun: () => { this.openHelp(pathWithHash) }
			}
		];
		return (
			<PopDialog
				className="invitation_pop"
				title={title}
				show
				type="warning"
				backdrop
				close={closeFn}
				btns={btns}
			>
				<div className="" dangerouslySetInnerHTML={{ __html: msg }} />
			</PopDialog>
		)
	}
}

export default HelpModal;
