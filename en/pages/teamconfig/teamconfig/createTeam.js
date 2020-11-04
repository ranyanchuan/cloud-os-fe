import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { withRouter } from 'react-router-dom';

import { dispatchMessageTypeHandler } from 'public/regMessageTypeHandler';

import Form, { FormItem } from 'bee/form';
import Upload from 'pub-comp/upload';
import { uploadApplication } from 'store/root/api';
import FormControl from 'bee-adapter/form-control';
import Radio from 'bee-adapter/radio';
import Select from 'bee-adapter/select';
import { ButtonBrand } from 'pub-comp/button';
import { openMess } from 'pub-comp/notification';

import rootActions from 'store/root/actions';
import teamconfigActions from 'store/root/teamconfig/actions';

import { enter_form, lxr_hr, team_cont, form_team } from './createTeam.css';


const { requestStart, requestSuccess, requestError } = rootActions;
const {
  getTeamInfo,
  createTeam,
} = teamconfigActions;

class SubmitBtn extends Component {
  click = (e) => {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(e);
    }
  }
  render() {
    return (
      <div className={'u-form-submit'}>
        {
          this.props.disabled
            ?
            <ButtonBrand onClick={(e) => { this.click(e) }} >Save</ButtonBrand>
            :
            <ButtonBrand disabled={true} >Save</ButtonBrand>
        }
      </div>
    );
  }
}

@withRouter
@connect(
  mapStateToProps(),
  {
    requestStart,
    requestSuccess,
    requestError,
    getTeamInfo,            // 获取团队基础信息
    createTeam,             // 保存团队基本设置
  }
)
class CreateTeam extends Component {

  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      isWaterMark: 1,
      errorType: false,
    }
  }

  componentWillMount() {
    const { getTeamInfo, requestError, requestSuccess } = this.props;
    getTeamInfo().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
        return false;
      }
      this.setState({
        ...payload
      });
      requestSuccess();
    });
  }

  clickFn = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log('Verification failed', values);
      } else {
        this.checkForm(values);
      }
    });
  }

  checkForm = (data) => {
    const { logo, tenantId } = this.state;
    const { createTeam, changeTenantName } = this.props;
    this.setState({
      disabled: false
    });
    data.tenantId = tenantId;
    data.logo = logo;
    requestStart();
    createTeam(data).then(({ error, payload }) => {
      this.setState({ disabled: true });
      if (error) {
        requestError(payload);
        return;
      }
      // 改变当前页面上边的团队名称
      changeTenantName(payload.tenantName);
      // 重新拉取userinfo 
      dispatchMessageTypeHandler({
        type: 'refreshUserInfo',
      });
      requestSuccess();
      openMess({
        title: 'Saved successfully.',
        duration: 2,
        type: 'success',
        closable: false,
      });
    });
  }

  onChangeUpload = (url) => {
    this.setState({
      logo: url
    })
  }

  render() {
    const { tenantName, logo, allowExit, isWaterMark, invitePermission, joinPermission } = this.state;
    const { getFieldProps, getFieldError } = this.props.form;
    const _this = this;
    return (
      <div className={team_cont}>

        <div className={form_team}>
          <Form submitCallBack={this.checkForm} showSubmit={false} className={enter_form}>
            <FormItem>
              <label><span>Team Name<font color='red'> &nbsp;*&nbsp;</font></span></label>
              <FormControl
                name="tenantName"
                value={tenantName || ""}
                onChange={(e) => { this.inputOnChange(e, "tenantName") }}
                placeholder="No more than 60 chars"
                {...getFieldProps('tenantName', {
                  validateTrigger: 'onBlur',
                  initialValue: tenantName,
                  rules: [{ required: true, message: "Please enter the team name.", }],
                })}
              />
              <span className='error'>
                {getFieldError('tenantName')}
              </span>
            </FormItem>

            <FormItem >
              <label><span>Photo<font color='red'> &nbsp; &nbsp;</font></span></label>
              <div style={{ float: "left" }}>
                <Upload
                  name='logo'
                  logo={logo || ""}
                  onChange={this.onChangeUpload}
                  logoError={"Please upload a picture."}
                  logoError2={"It must be a picture."}
                  uploadApplication={uploadApplication}
                />
              </div>
            </FormItem>

            <FormItem>
              <label><span>Invitation Rules<font color='red'>&nbsp;*&nbsp;</font></span></label>
              <Select
                style={{ width: 338, marginRight: 6 }}
                {
                ...getFieldProps('invitePermission', {
                  initialValue: invitePermission || '1',
                  rules: [{ required: true }]
                })
                }
              >
                <Option value="1">Invite All</Option>
                <Option value="2">Invite not Allowed</Option>
                <Option value="0">Invite by Admin</Option>
              </Select>
            </FormItem>

            <FormItem>
              <label><span>Allow to Apply<font color='red'>&nbsp;*&nbsp;</font></span></label>
              <Select
                style={{ width: 338, marginRight: 6 }}
                {
                ...getFieldProps('joinPermission', {
                  initialValue: joinPermission || '1',
                  rules: [{ required: true }]
                })
                }
              >
                <Option value="0">Allowed </Option>
                <Option value="1">Forbidden</Option>
              </Select>
            </FormItem>

            <FormItem>
              <label><span>Users' Quit<font color='red'>&nbsp;*&nbsp;</font></span></label>
              <Radio.RadioGroup
                name="allowExit"
                selectedValue={allowExit || '0'}
                {
                ...getFieldProps('allowExit', {
                  initialValue: allowExit || '0',
                  onChange(value) {
                    _this.setState({ allowExit: value });
                  },
                  rules: [{ required: true }]
                })
                }
              >
                <Radio value="0" >Forbidden</Radio>
                <Radio value="1" >Allowed</Radio>
              </Radio.RadioGroup>
            </FormItem>

            <FormItem>
              <label><span>Display watermark in contacts<font color='red'>&nbsp;*&nbsp;</font></span></label>
              <Radio.RadioGroup
                name="isWaterMark"
                selectedValue={isWaterMark}
                {
                ...getFieldProps('isWaterMark', {
                  initialValue: isWaterMark,
                  onChange(value) {
                    _this.setState({ isWaterMark: value });
                  },
                  rules: [{ required: true }]
                })
                }
              >
                <Radio value={0} >Forbidden</Radio>
                <Radio value={1} >Allowed</Radio>
              </Radio.RadioGroup>
            </FormItem>
            <SubmitBtn
              isSubmit
              disabled={this.state.disabled}
              onClick={this.clickFn}
            />
          </Form>
        </div>

        <div className={lxr_hr}>
          <hr />
        </div>
      </div>
    );
  }
}

export default Form.createForm()(CreateTeam);
