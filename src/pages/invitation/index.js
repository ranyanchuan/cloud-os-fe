import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapStateToProps, getContext } from '@u';

import rootActions from 'store/root/actions';
import inviteActions from 'store/root/invitation/actions';

import Tabs, { TabPane } from 'bee-adapter/tabs';
import FormControl from 'bee-adapter/form-control';
import { openMess } from 'pub-comp/notification';
import { ButtonBrand } from 'pub-comp/button';

import TagsInput from './tagsInput';

import SuccessDialog from './successDialog';


import {
  wrap,
  content,
  urlArea,
  copyLinkBtn,
  submitBtn,
  tabPane1,
  tabPane2,
  tabPane3,
  qrCode,
  firstP,
  btnboxIe
} from './style.css';

const { requestStart, requestSuccess, requestError } = rootActions;
const { getInviteUsersJoinAddress, sendMessage } = inviteActions;

const regMail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

// @withRouter
@connect(
  mapStateToProps(
    'inviteJoinAddress',
    {
      key: 'userInfo',
      value: (home, ownProps, root) => {
        return root.userInfo
      }
    },
    {
      namespace: 'invitation',
    },

  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    getInviteUsersJoinAddress,
    sendMessage,
  },
)
class Invitation extends Component {
  static propTypes = {
    getInviteUsersJoinAddress: PropTypes.func,
    sendMessage: PropTypes.func,
    requestStart: PropTypes.func,
    requestSuccess: PropTypes.func,
    requestError: PropTypes.func,
    userInfo: PropTypes.shape({
      userName: PropTypes.string,
    }),
    history: PropTypes.shape({
      goBack: PropTypes.func,
      replace: PropTypes.func,
    }),
  };
  static defaultProps = {
    getInviteUsersJoinAddress: () => { },
    sendMessage: () => { },
    requestStart: () => { },
    requestSuccess: () => { },
    requestError: () => { },
    userInfo: {},
    history: {},
  };
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      mails: [],
      successDialogShow: false,
      copy: false,
      creator: props.userInfo.userName,
      message: '',
    };
    // this.goBack = this.goBack.bind(this);
  }

  componentWillMount() {
    const {
      requestStart, requestSuccess, requestError, getInviteUsersJoinAddress,
    } = this.props;
    requestStart();
    getInviteUsersJoinAddress().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
        return false;
      }
      this.setState({
        url: payload,
      });
      this.shortUrl.select();
      requestSuccess();
    });
  }

  onMailChange = i => (e) => {
    const { value } = e.target;
    const mails = [...this.state.mails];
    mails[i] = value;
    this.setState({
      mails,
    });
  }

  setOptherData = (obj) => {
    this.state[obj.name] = obj.value;
    this.setState({
      ...this.state,
    });
  }

  copyLink = () => {
    this.shortUrl.select();
    document.execCommand('copy');
    openMess({
      title: '链接复制成功，赶快发送给你的小伙伴吧!',
      duration: 2,
      type: 'success',
      closable: false,
    });
  }

  addMail = () => {
    const mails = [...this.state.mails, ''];
    this.setState({
      mails,
    });
  }

  submit = () => {
    const {
      requestStart, requestSuccess, requestError, sendMessage,
    } = this.props;
    const { message, creator } = this.state;
    const mails = this.state.mails.filter(mail => mail && regMail.test(mail));
    if (mails.length <= 0) {
      openMess({
        title: '请输入正确的邮件地址!',
        duration: 1.5,
        type: 'error',
        closable: false,
      });
    } else {
      const parent = { email: mails, message: message === '' ? '友空间-赋能个人、激活组织' : message, creator };
      requestStart();
      sendMessage(parent).then(() => {
        requestSuccess();
        this.setState({
          mails: [],
          // successDialogShow: false,
        });
      }, (err) => {
        requestError(err);
      });
      this.setState({
        mails: ['', ''],
        successDialogShow: true,
      });
    }
  }

  handleChange = (tags) => {
    this.setState({ mails: tags });
  }

  printQr = () => {
    const newstr = document.getElementById('qrCode').innerHTML;
    const oldstr = document.body.innerHTML;
    document.body.innerHTML = newstr;
    window.print();
    document.body.innerHTML = oldstr;
    return false;
  }

  closeSuccessDialog = () => {
    this.setState({
      successDialogShow: false,
    });
  }

  render() {
    const {
      url,
      successDialogShow,
      creator,
      message,
    } = this.state;

    const { userInfo: { allowTenants, } } = this.props;
    const { tenantid } = getContext();
    const curTenant = allowTenants && allowTenants.filter(tenant => tenant.tenantId === tenantid)[0];
    const curText = curTenant.type === 0 ? "企业" : "团队";
    return (
      <div className={`diworkcontent ${wrap}`} id="Invitation">
        <div className={content}>
          <Tabs
            destroyInactiveTabPane
            defaultActiveKey="1"
            onChange={this.callback}
            className="demo-tabs"
          >
            <TabPane tab="链接邀请" key="1" className={tabPane1}>
              <p>将链接发给小伙伴就可以啦</p>
              <div className={urlArea}>
                <span>链接</span>
                <input ref={(c) => { this.shortUrl = c; }} type="text" value={url} readOnly />
              </div>
              <ButtonBrand className={copyLinkBtn} onClick={this.copyLink} >复制链接</ButtonBrand>

            </TabPane>
            <TabPane tab="邮件邀请" key="2" className={tabPane2}>

              <p className={firstP}>给你的小伙伴捎句话吧</p>
              <FormControl
                placeholder="用友云-赋能个人、激活组织"
                value={message}
                onChange={(e) => { this.setOptherData({ name: 'message', value: e }); }}
              />

              <p>署名</p>
              <FormControl value={creator} onChange={(e) => { this.setOptherData({ name: 'creator', value: e }); }} />

              <p>输入邮箱地址并用 “;” 隔开</p>
              <TagsInput
                value={this.state.mails}
                addKeys={[13, 186, 59]} // enter,semicolon:chrome186,firefox59
                addOnBlur
                onlyUnique
                addOnPaste
                validationRegex={regMail}
                pasteSplit={data => data.replace(/[\r\n,;]/g, ' ').split(' ').map(d => d.trim())}
                onChange={this.handleChange}
              />
              <div className={btnboxIe}>
                <ButtonBrand className={submitBtn} onClick={this.submit} >确定发送</ButtonBrand>
              </div>
            </TabPane>
            <TabPane tab="二维码邀请" key="3" className={tabPane3}>
              <div>
                <span>{`扫描二维码直接进入${curText}`}</span>
                <div className={qrCode} id="qrCode">
                  <img alt="" src="/invite/getQRCode" />
                </div>
                {/* <ButtonBrand className={printQrBtn} >二维码</ButtonBrand> */}
              </div>
            </TabPane>
          </Tabs>
        </div>
        <SuccessDialog show={successDialogShow} close={this.closeSuccessDialog} />
      </div>
    );
  }
}

export default Invitation;
