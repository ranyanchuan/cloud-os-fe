import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { mapStateToProps, getContext } from '@u';
import { dispatchMessageTypeHandler } from 'public/regMessageTypeHandler';

import EnterContent from 'pub-comp/enterContent';
import { uploadApplication } from 'store/root/api';
import { texts } from 'yutils/entertext';

import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';
import teamconfigActions from 'store/root/teamconfig/actions';
const { requestStart, requestSuccess, requestError } = rootActions;
const { setCreateEnter } = homeActions;
const { getTeamInfo } = teamconfigActions;

import { pageEnterprise, enterTitle, enterCont, hr } from './style.css';

// @withRouter
@connect(
  mapStateToProps(
    'userInfo',
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    getTeamInfo, // 获取团队基础信息
    setCreateEnter,
  },
)
class Updateenter extends Component {
  static propTypes = {
    history: PropTypes.shape({
      goBack: PropTypes.func,
    }),
    getTeamInfo: PropTypes.func,
    requestError: PropTypes.func,
    requestSuccess: PropTypes.func,
  };
  static defaultProps = {
    history: {},
    getTeamInfo: () => { },
    requestError: () => { },
    requestSuccess: () => { },
  };
  constructor(props) {
    super(props);
    this.state = {
      enterData: null,
    };
  }

  componentWillMount() {
    const { getTeamInfo, requestError, requestSuccess } = this.props;
    getTeamInfo().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
        return false;
      }
      this.setState({
        enterData: payload,
      });
      requestSuccess();
    });
  }

  goHome = () => {
    this.props.history.replace('');
  }

  goBack = () => {
    this.props.history.goBack();
  }

  handleClick = (param, fn) => {
    dispatchMessageTypeHandler({
      type: "showDialog",
      detail: {
        type: 'warning',
        title: 'Tips',
        msg: "Click OK to refresh the page. Continue?",
        btn: [{
          label: "OK",
          fun: () => {
            dispatchMessageTypeHandler({
              type: "closeDialogNew",
            });
            this.create(param, fn);
          },
        },
        {
          label: "Cancel",
          fun: () => {
            dispatchMessageTypeHandler({
              type: "closeDialogNew",
            });
            fn({ error: true });
          },
        }
        ]
      }
    });
  }

  create = (param, fn) => {
    const {
      requestStart,
      requestSuccess,
      requestError,
      setCreateEnter
    } = this.props;
    requestStart();
    setCreateEnter(param, "upgradeEnter").then(({ error, payload }) => {
      // 此处调用callback
      fn({ error, payload });
      if (error) {
        requestError(payload);
        return;
      }
      requestSuccess();
      if (window.sessionStorage.getItem('TABS_DATA')) {
        window.sessionStorage.removeItem('TABS_DATA');
      }
    });
  }

  render() {
    const { enterData } = this.state;
    const { userInfo } = this.props;
    const { locale } = getContext();
    return (
      <div className="diworkcontent">
        <div className={pageEnterprise}>
          <div className={enterTitle} >Enterprise Authentication</div>
          <hr className={hr} />
          <div className={enterCont} >
            {
              enterData && Object.keys(userInfo).length > 0 ?
                <EnterContent
                  data={enterData}
                  userInfo={userInfo}
                  _from="update"
                  handleClickFn={this.handleClick}
                  buttonText="Upgrade"
                  loadingDesc="Upgrading to enterprise…"
                  uploadApplication={uploadApplication}
                  texts={texts}
                  lang={locale}
                /> : null
            }

          </div>
        </div>
      </div>
    );
  }
}
export default Updateenter;

