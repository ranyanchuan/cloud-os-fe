import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import PropTypes from 'prop-types';
import Icon from 'pub-comp/icon';

import onClickOutside from 'react-onclickoutside';
import { openWin, openService } from 'public/regMessageTypeHandler';
// import { dispatchMessageTypeHandler } from 'public/regMessageTypeHandler';

import rootActions from 'store/root/actions';
import wrapActions from 'store/root/wrap/actions';
import { delHistory, delAllHistory } from "store/root/wrap/api";
const { requestStart, requestSuccess, requestError } = rootActions;
const { getHistoryList } = wrapActions;
import { historyPartInner } from './style.css';

@connect(
  mapStateToProps(
    'historyList',
    {
      namespace: 'wrap',
    }
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    getHistoryList,
  },
)

@onClickOutside
class HistoryInner extends Component {
  static propTypes = {
    historyList: PropTypes.arrayOf(PropTypes.object),
    requestStart: PropTypes.func,
    requestSuccess: PropTypes.func,
    requestError: PropTypes.func,
    getHistoryList: PropTypes.func,
  };
  static defaultProps = {
    historyList: [],
    requestStart: () => { },
    requestSuccess: () => { },
    requestError: () => { },
    getHistoryList: () => { },
  };
  constructor(props) {
    super(props);
    this.state = {
      historyList: []
    }
  }

  componentDidMount() {
    const {
      requestError,
      getHistoryList,
    } = this.props;
    getHistoryList().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
        return;
      }
      const historyList = payload.filter((item, index) => index < 15);
      this.setState({ historyList });
    });
  }

  handleClickOutside(e) {
    e.stopPropagation();
    this.props.closeHistory()
  }

  openHistoryItem = (businessCode, extendParams) => {
    // dispatchMessageTypeHandler({
    //   type: "openService",
    //   detail: {
    //     serviceCode: businessCode,
    //     data: extendParams
    //   }
    // });
    openService(businessCode,"history");
    this.props.closeHistory();
  }

  openAllHistory = () => {
    openWin({
      id: 'History',
      title: 'All History',
    });
    this.props.closeHistory()
  }

  delHistory = (item) => {
    const { historyList } = this.state;
    const { requestStart, requestSuccess, requestError } = this.props;
    const param = [item.businessCode];
    requestStart();
    delHistory(param).then((payload) => {
      const historyList2 = historyList.filter(data => data.latestAccessId !== item.latestAccessId);
      this.setState({ historyList: historyList2 });
      requestSuccess();
    }, (error) => {
      console.log(error);
      requestError(error);
    });
  }

  delAllHistory = () => {
    const { requestStart, requestSuccess, requestError } = this.props;
    requestStart();
    delAllHistory().then(() => {
      this.setState({ historyList: [] });
      requestSuccess();
    }, (error) => {
      requestError(error);
    });
  }

  render() {
    const { historyList } = this.state;
    return (
      <div className={historyPartInner}>
        <div className="inner-header">
          <label className="title">History</label>
          <label className="all" onClick={this.delAllHistory}>Clear</label>
        </div>
        <ul className="inner-list">
          {
            historyList.map((item, key) => {
              return (
                <li className="history-item" key={key}>
                  <p onClick={e => this.openHistoryItem(item.businessCode, item.extendParams)}>
                    <Icon type="blank-page" />
                    <span title={item.title}>{item.title}</span>
                  </p>
                  <Icon type="dustbin" onClick={() => this.delHistory(item)} />
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}
export default HistoryInner;

