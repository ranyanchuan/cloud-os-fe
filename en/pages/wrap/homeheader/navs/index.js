import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';

// 公共组件
import Icon from 'pub-comp/icon';
import Tabmenu from './tabs';
import Portal from './portal';
import Im from '../../components/im';
import History from '../../components/history';
import {
  menus, menu, history, home, ys, active, upward, im, tabTips
} from './style.css';
import menuImg from 'assets/image/menu.svg';

/*   actions   */
import wrapActions from 'store/root/wrap/actions';
const { openRoot, changeRetract } = wrapActions;

@connect(
  mapStateToProps(
    'activeCarrier',
    'retract',
    'productLine',
    {
      namespace: 'wrap',
    }
  ),
  {
    openRoot,
    changeRetract,
  },
)
class Navs extends Component {
  static propTypes = {
    requestSuccess: PropTypes.func,
    requestError: PropTypes.func,
    openMenu: PropTypes.func,
  };
  static defaultProps = {
    requestSuccess: () => { },
    requestError: () => { },
    openMenu: () => { },
  };
  constructor(props) {
    super(props);
    this.state = {
      historyShow: false,
      isFold: false,
    };
  }

  componentDidMount() {
    // F11全屏显示
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("webkitfullscreenchange", this.fullscreenchange);
    document.addEventListener("fullscreenchange", this.fullscreenchange)
    document.addEventListener("mozfullscreenchange", this.fullscreenchange)
    document.addEventListener("MSFullscreenChange", this.fullscreenchange)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown);
    document.removeEventListener("webkitfullscreenchange", this.fullscreenchange);
    document.removeEventListener("fullscreenchange", this.fullscreenchange)
    document.removeEventListener("mozfullscreenchange", this.fullscreenchange)
    document.removeEventListener("MSFullscreenChange", this.fullscreenchange)
  }

  openRoot = () => {
    const { openRoot } = this.props;
    openRoot();
  }

  fullscreenchange = () => {
    const { isFold } = this.state;
    this.setState({ isFold: !isFold });
  }

  openHistory = () => {
    this.setState({
      historyShow: !this.state.historyShow,
    });
  }

  onKeyDown = (e) => {
    const keyCode = e.keyCode;
    // const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
    if (keyCode === 122) {
      e.preventDefault();
      this.fullScreen();
    }
  }

  changeFold = () => {
    const { isFold } = this.state;
    if (isFold) {
      this.exitFullscreen();
    } else {
      this.fullScreen();
    }
  }

  fullScreen = () => {
    if (window.navigator.userAgent.indexOf('MSIE') < 0) {
      console.log('Not Supported requestFullscreen');
    }
    let main = document.documentElement;
    if (main.requestFullscreen) {
      main.requestFullscreen()
    } else if (main.mozRequestFullScreen) {
      main.mozRequestFullScreen()
    } else if (main.webkitRequestFullScreen) {
      main.webkitRequestFullScreen()
    } else if (main.msRequestFullscreen) {
      main.msRequestFullscreen()
    }
  }

  exitFullscreen() {
    if (!this.state.isFold) return;
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

  closeHistory = () => {
    this.setState({
      historyShow: false,
    });
  }

  changeRetract = () => {
    const { retract, changeRetract } = this.props;
    changeRetract(retract);
  }

  render() {
    const { activeCarrier, retract, openMenu, menuShow, productLine } = this.props;
    const { isFold } = this.state;
    return (
      <div className={menus}>
        {
          retract ? null :
            <div className={`${menu} um-box-center ${menuShow ? "active" : null}`}>
              <img src={menuImg} className="ignoreClass-menu" onClick={openMenu} />
            </div>
        }
        <div className={`${history}`}>
          <div className="ignoreClass-history um-box-center" onClick={() => { this.openHistory() }}>
            <Icon style={{ color: '#E3352E' }} type="History" />
          </div>
          <History
            historyShow={this.state.historyShow}
            closeHistory={this.closeHistory}
          />
        </div>
        {
          // productLine === "diwork" ? null :
            <Portal />
        }
        {
          // productLine === "diwork"
          //   ?
          //   <div
          //     className={`${home} um-box-center ${activeCarrier === "home" ? active : ''}`}
          //     onClick={() => { this.openRoot() }}
          //   >
          //     <Icon font="shouye1" style={{ margin: 0 }} />
          //   </div>
          //   :
            <div
              className={`${home} ${ys} um-box ${activeCarrier === "home" ? active : ''}`}
              onClick={() => { this.openRoot() }}
            >
              <div className="um-box-vc">
                {activeCarrier === "home" ? <Icon font="Computer-filled" /> : <Icon font="Computer" />}
                <span>Workbench</span>
              </div>
            </div>
        }

        <Tabmenu />
        {
          retract ? null : <Im classname={im} />
        }
        <div className={`${upward} tc`} onClick={this.changeRetract}>
          <Icon type={retract ? "upward" : "pull-down"} />
          <div className={tabTips}>
            {retract ? "Hide" : "Expand"}
          </div>
        </div>
        <div className={`${upward} tc`} onClick={this.changeFold}>
          <Icon font={isFold ? "tuichuquanping" : "quanpingzhanshi"} />
          <div className={tabTips}>
            {isFold ? "Exit" : "Full Screen"}
          </div>
        </div>
      </div>
    );
  }
}
export default Navs;
