import React, { Component } from 'react';
import { openWin } from 'public/regMessageTypeHandler';
import { withRouter } from "react-router-dom";
import { getContext } from '@u';
import {
	wrap,
	en,
	box,
	imageBox,
	content,
	est_context,
} from './index.css';

import DefaultImg from 'assets/image/bg.png';
import Company from 'assets/image/company.png';

@withRouter
class Establish extends Component {

	openTeam = () => {
		const { from } = this.props;
		if (from === "create") {
			this.props.history.push("/createteam");
			return false;
		}
		openWin({
			id: 'CreateTeam',
			title: 'Create Team',
		});
	}

	openEnter = () => {
		const { from } = this.props;
		if (from === "create") {
			this.props.history.push("/createenter");
			return false;
		}
		openWin({
			id: 'CreateEnter',
			title: 'Create Enterprise',
		});
	}

	render() {
		const { locale } = getContext();
		const enstyle = locale === 'en_US' ? en : '';
		return (
			<div className="diworkcontent">
				{
					window._IUAPPREMISESFLAG
						? <div className={`${wrap} ${enstyle}`}>
							<div style={{ position: "absolute", top: "50%", left: "50%" }}>
								<img src={DefaultImg} style={{ marginTop: "-240px", marginLeft: "-324px" }} />
							</div>
						</div>
						:
						<div className={`${wrap} ${enstyle}`}>
							<div className={`um-box-center ${est_context}`}>
								{/* <div className={box} key='team'>
              <div className={imageBox}>
                <img src={Team} />
              </div>
              <h6>Create a team for free</h6>
              <div className={content}>
                <p>I'm a team manager.<br />I need to empower my Dept or project team.</p>
                <p>Key Features:</p>
                <ul className="clearfix">
                  <li key='t0'>An all-in-one IM tool for teams (IM)</li>
                  <li key='t1'>YouBot, an intelligent virtual personal assistant</li>
                  <li key='t2'>Context-aware schedule center</li>
                  <li key='t3'>An empowering project collaboration tool</li>
                  <li key='t4'>Employee Benefits Center</li>
                  <li key='t5'>Intelligent Personnel Searching Function</li>
                  <li key='t6'>Moments, Mini-Mail, and other OA tools</li>
                </ul>
              </div>
              <div style={{ textAlign: "center" }}>
                <button onClick={this.openTeam}>Create</button>
              </div>
            </div> */}
								<div className={box} key='enter'>
									<div className={imageBox}>
										<img src={Company} />
									</div>
									<h6>Create an enterprise for free</h6>
									<div className={`${content}`}>
										<p>I'm an enterprise manager.<br />I need to convert all the Depts to empowering Orgs and get enterprise-level services.</p>
										<p>Key Features:</p>
										<ul className="clearfix">
											<li key='e0'>All capabilities of team Orgs</li>
											<li key='e1'>Enterprise-level Org structure management</li>
											<li key='e2'>Stricter enterprise member management</li>
											<li key='e3'>Role-based application permission management</li>
											<li key='e4'>Enterprise-level uniform basic file and data control</li>
											<li key='e5'>Basic attendance and salary query services</li>
											<li key='e6'>Enterprise-level App market provides all-round digital service entrance</li>
										</ul>
									</div>
									<div style={{ textAlign: "center" }}>
										<button onClick={this.openEnter}>Create</button>
									</div>
								</div>
							</div>
						</div>
				}
			</div >
		)
	}
}

export default Establish;
