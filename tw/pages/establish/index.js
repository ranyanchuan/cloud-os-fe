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
			title: '創建團隊',
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
			title: '創建企業',
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
              <h6>免費創建團隊</h6>
              <div className={content}>
                <p>我是團隊管理者,<br />需要賦能刷新我的部門或專案組。</p>
                <p>關鍵特性：</p>
                <ul className="clearfix">
                  <li key='t0'>全功能團隊即時溝通工具（IM）</li>
                  <li key='t1'>小友智能虛擬個人助理</li>
                  <li key='t2'>帶有場景感知能力的日程中心</li>
                  <li key='t3'>賦能型專案協作工具</li>
                  <li key='t4'>員工權益中心</li>
                  <li key='t5'>智慧找人</li>
                  <li key='t6'>工作圈、微郵等辦公協作工具</li>
                </ul>
              </div>
              <div style={{ textAlign: "center" }}>
                <button onClick={this.openTeam}>開始創建</button>
              </div>
            </div> */}
								<div className={box} key='enter'>
									<div className={imageBox}>
										<img src={Company} />
									</div>
									<h6>免費創建企業</h6>
									<div className={`${content}`}>
										<p>我是企業管理者,<br />需要把所有部門都刷新為賦能型組織並獲得企業級服務。</p>
										<p>關鍵特性：</p>
										<ul className="clearfix">
											<li key='e0'>團隊組織所具備的全部能力</li>
											<li key='e1'>企業級組織架構管理</li>
											<li key='e2'>更嚴格的企業成員管理</li>
											<li key='e3'>基於管理角色的應用許可權管理</li>
											<li key='e4'>企業級統一基礎檔案與數據管控</li>
											<li key='e5'>基礎假勤與薪資查詢服務</li>
											<li key='e6'>企業級應用市場提供全方位數位化服務入口</li>
										</ul>
									</div>
									<div style={{ textAlign: "center" }}>
										<button onClick={this.openEnter}>開始創建</button>
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
