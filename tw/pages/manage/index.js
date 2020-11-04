import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getContext } from '@u';


//import CreateManageModule from './manageWidgetForHomepage';
import CreateManageModule from 'pub-comp/manageWidgetForHomepage';
// import {CreateManageModule} from 'u8c-components';
//import {manageList} from './manageList';
//import {menuList} from './menuList';

import { win } from './style.css';
import LanguagesJSON from 'yutils/languages';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import manageActions from 'store/root/manage/actions';
const { getManageList, getAllMenuList, setManageList } = manageActions;
import rootActions from 'store/root/actions';
const { requestStart, requestSuccess, requestError } = rootActions;

@withRouter
@connect(
  mapStateToProps(
    {
      namespace: 'manage',
    },
  ),
  {
    getManageList,
    getAllMenuList,
    requestStart,
    requestSuccess,
    requestError,
    setManageList
  }
)
class Manage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    const { getManageList, getAllMenuList, requestStart, requestError, requestSuccess } = this.props;
    const manageList = getManageList();
    const menuList = getAllMenuList();
    requestStart();
    Promise.all([manageList, menuList]).then((a) => {
      this.setState({
        manageList: a[0].payload.workList,
        menuList: a[1].payload,
        loading: false
      })
      requestSuccess();
    }, (b) => {
      requestError(b)
    })
  }
  //  保存
  goBack = () => {
    this.props.history.replace('/')
  }
  render() {
    const { manageList, menuList, loading } = this.state;
    const { setManageList } = this.props;
    const { locale } = getContext();
    if (loading) {
      return null
    }
    return (
      <div className={`${win}`}>
        <CreateManageModule
          menuList={menuList}
          groupList={manageList}
          languagesJSON={LanguagesJSON}
          history={this.props.history}
          match={this.props.match}
          save={setManageList}
          goBack={this.goBack}
          locale={locale}
        />
      </div>
    );
  }
}

export default Manage;
