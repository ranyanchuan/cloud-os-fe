import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps, getContext } from '@u';
import { dispatchMessageTypeHandler } from 'public/regMessageTypeHandler';

import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';

import Button from 'bee-adapter/button';
import Progress from 'pub-comp/progress';

import Upload from 'pub-comp/upload';
import { uploadApplication } from 'store/root/api';
import { check } from './checkTenantStatus'
/*   actions   */
const { requestStart, requestSuccess, requestError } = rootActions;
const { setCreateEnter } = homeActions;
import {
  wrap,
  create_team_cont,
  item,
  name_error,
  upload,
  footer,
  footer_hr,
  process_loading_content,
  submit_class,
} from './index.css';

@withRouter
@connect(
  mapStateToProps(
    {
      key: "userInfo",
      value: (home, ownProps, root) => {
        return root.userInfo;
      }
    },
    {
      namespace: 'wrap',
    }
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    setCreateEnter,
  }
)

class CreateTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      logo: "",
      error: false,
      startFlag: false,//0表示未开始，1表示开始progress
      tenantId: '',//tenantId
    }
    //progressbar
    this.loadingFunc = null;
    this.successFunc = null;
    this.timer = null;
  }

  componentWillMount() {

  }

  onChange = (e) => {
    const value = e.target.value;
    if (value.length > 60 || value == "") {
      this.setState({
        value,
        error: true
      });
      return false;
    }
    this.setState({
      value,
      error: false
    })
  }

  setUrl(name, url) {
    this.state[name] = url;
    this.setState({
      ...this.state
    })
  }

  btnfn = () => {
    const { value } = this.state;
    if (!value || value === "") {
      this.setState({
        error: true
      });
      return false;
    }
    dispatchMessageTypeHandler({
      type: "showDialog",
      detail: {
        type: 'warning',
        title: '提示',
        msg: "点击确定后即将刷新页面，是否继续？",
        btn: [{
          label: "确定",
          fun: () => {
            dispatchMessageTypeHandler({
              type: "closeDialogNew",
            });
            this.create();
          },
        },
        {
          label: "取消",
          fun: () => {
            dispatchMessageTypeHandler({
              type: "closeDialogNew",
            });
          },
        }
        ]
      }
    });
  }

  create = () => {
    const { setCreateEnter, requestStart, requestSuccess, requestError } = this.props;
    const { value, logo } = this.state;
    let data = {
      tenantName: value
    };
    if (logo) {
      data.logo = logo;
    }
    requestStart();
    setCreateEnter(data, 'createTeam').then(({ error, payload }) => {
      if (error) {
        requestError(payload);
        return;
      }
      this.setState({
        startFlag: true,//开始progressbar
      });
      requestSuccess();
      if (window.sessionStorage.getItem('TABS_DATA')) {
        window.sessionStorage.removeItem('TABS_DATA');
      }
      const tenantId = payload.tenantId;
      this.setState({ tenantId: tenantId }, () => {
        clearInterval(this.timer);
        check(tenantId, this.loadingFunc, this.successFunc);
      });//把startFlag变成1.那么就开是走progress
    });
  }
  successLoading = () => {
    const { tenantId } = this.state;
    window.location.href = `/?tenantId=${tenantId}&switch=true`;
  }
  loadingCallBack = (loadingFunc, successFunc) => {
    this.timer = setInterval(loadingFunc, 500);
    this.loadingFunc = loadingFunc;
    this.successFunc = successFunc;
  }

  render() {
    const { logo, value, disabled, error, startFlag } = this.state;
    const nameBH = error ? 'block' : 'none';
    return (
      <div className="diworkcontent">
        <div className={`${wrap}`}>
          <h5>创建团队</h5>
          <hr />
          <div className={create_team_cont}>
            <div className={item + " um-box "}>
              <label>团队名称<span>&nbsp;*&nbsp;</span></label>
              <input
                className="u-form-control"
                placeholder="最多60个字符"
                maxLength="60"
                value={value}
                onChange={(e) => { this.onChange(e) }}
              />
            </div>
            <div className={`${name_error}`} style={{ display: nameBH }}>
              请输入团队名称
          </div>

            <div className={`${item} um-box ${upload}`}>
              <label>团队头像&nbsp; &nbsp; </label>
              <div>
                <Upload
                  name='logo'
                  logo={logo || ""}
                  onChange={(e) => { this.setUrl("logo", e) }}
                  logoError={"请上传图片"}
                  logoError2={"必须是一个图片"}
                  uploadApplication={uploadApplication}
                  tip=''
                />
              </div>
            </div>
          </div>
          <hr className={footer_hr} />
          <div className={footer}>
            <div>
              {
                startFlag ?
                  <div className={process_loading_content}>
                    <Progress loadingCallBack={this.loadingCallBack} startFlag={startFlag} successFunc={this.successLoading} loadingDesc={'正在配置团队信息…'} />
                  </div> :
                  <Button className={submit_class} onClick={this.btnfn} colors="primary" >创建</Button>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateTeam;
