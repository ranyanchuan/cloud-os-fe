import React, { Component } from 'react';
import { findDOMNode } from 'react-dom'
import default0Icon from 'assets/image/default-icon/0.png';
import default1Icon from 'assets/image/default-icon/1.png';
import default2Icon from 'assets/image/default-icon/2.png';
import default3Icon from 'assets/image/default-icon/3.png';
import default4Icon from 'assets/image/default-icon/4.png';
import default5Icon from 'assets/image/default-icon/5.png';
import default6Icon from 'assets/image/default-icon/6.png';
import default7Icon from 'assets/image/default-icon/7.png';
import default8Icon from 'assets/image/default-icon/8.png';
import default9Icon from 'assets/image/default-icon/9.png';
import default0Bg from 'assets/image/default-bg/0.png';
import default1Bg from 'assets/image/default-bg/1.png';
import default2Bg from 'assets/image/default-bg/2.png';
import default3Bg from 'assets/image/default-bg/3.png';
import default4Bg from 'assets/image/default-bg/4.png';
import default5Bg from 'assets/image/default-bg/5.png';
import {
  widgetItem,
  box,
  title,
  defaultArea,
  iconImg,
} from './style.css'
import Loading from 'bee/loading';

class WidgetItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shouldLoad: false,
      defaultImgIndex: -1
    }
  }

  componentWillMount() {
    this.setState({ defaultImgIndex: parseInt(Math.random() * 4 + 1, 10) })
  }

  componentDidMount() {
    if (!this.state.shouldLoad && this.props.viewport) {
      var el = findDOMNode(this.refs.default_widget);
      this.updataLoadState(el, el.offsetHeight)
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.state.shouldLoad && prevProps.viewport) {
      var el = findDOMNode(this.refs.default_widget);
      this.updataLoadState(el, el.offsetHeight)
    }
  }

  updataLoadState(e, height) {
    if (this.state.shouldLoad) {
      return;
    }
    const arr = window.getComputedStyle(e).transform.split(',');
    const top = parseInt(arr[arr.length - 1]) + e.offsetTop;
    var min = this.props.viewport.top;
    var max = this.props.viewport.top + this.props.viewport.height;
    if ((min <= (top + height) && top <= max)) {
      this.setShowImage(true);
    }
  }

  setShowImage(show) {
    this.setState({
      shouldLoad: !!(show)
    })
    this.props.loadOk();
  }

  styleOut = (widgetStyle) => {
    let style = {
      backgroundStyle: {},
      iconStyle: {},
      titleStyle: {}
    }
    if (widgetStyle && typeof widgetStyle === "string") {
      widgetStyle = JSON.parse(widgetStyle);
      return {
        backgroundStyle: widgetStyle.background || {},
        titleStyle: widgetStyle.title || {},
        iconStyle: widgetStyle.hiddenIcon || {}
      }
    }
    return style;
  }

  render() {
    const {
      data: {
        keys,
        widgetName: name,
        icon,
        widgetStyle,
        serviceCode,
        size
      },
      clickHandler,
      style,
    } = this.props;
    const { backgroundStyle, iconStyle, titleStyle } = this.styleOut(widgetStyle);
    const defaultImgArray = [
      default0Icon, default1Icon, default2Icon, default3Icon, default4Icon,
      default5Icon, default6Icon, default7Icon, default8Icon, default9Icon
    ];
    const defaultBgArray = [
      default0Bg, default1Bg, default2Bg, default3Bg, default4Bg, default5Bg,
    ];
    const arr = serviceCode.split("");
    const total = arr.reduce((total, num) => {
      return total + num.charCodeAt();
    }, 0);
    const index = total % 6;
    const index2 = total % 10;
    const background = Object.keys(backgroundStyle).length || size !== 1 ? backgroundStyle : { backgroundImage: `url(${defaultBgArray[index]})` }
    return (
      <li ref="default_widget" className={`${widgetItem} ${defaultArea}`}
        onClick={clickHandler}
        onKeyDown={clickHandler}
        role="presentation"
        style={style}
      >
        {this.state.shouldLoad ? (
          <div className={box} style={background}>
            <div className={title} style={titleStyle}>
              {name}
            </div>
            <img alt="" src={icon || defaultImgArray[index2]} className={iconImg} style={iconStyle} />
          </div>) : (
            <Loading container={this} show={true} />)
        }
      </li>
    );
  }
}

export default WidgetItem;
