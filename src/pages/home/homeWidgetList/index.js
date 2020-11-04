import React, { Component } from 'react';
import { connect } from "react-redux";
import { mapStateToProps, } from "@u";
import { openService } from 'public/regMessageTypeHandler';
// 加载components
import WidgetMaker from '../widget';
import * as utilService from 'pub-comp/manageWidgetCollision/utils';
// 加载样式 
import {
  WidgetCont,
  WidgetTitle,
  item,
  WidgetList,
} from './style.css';
@connect(
  mapStateToProps(
    'themeList',
    'currentThemeId',
  ),
  {}
)
class HomeWidgeList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  componentDidMount() {

  }

  // TODO 当初提出来的折叠效果，
  collapse = () => {
    const { open } = this.state;
    this.setState({
      open: !open,
    }, () => {
      const h = open ? 0 : this._container.offsetHeight;
      this.props.updataView(h);
    });
  }

  render() {
    const {
      data: {
        widgetName: name,
        children
      },
      style,
      height,
      layout: {
        margin,
        rowHeight,
        calWidth
      },
      themeList,
      currentThemeId,
    } = this.props;
    // 新增元数据  控制groupTitle 样式
    const list = children.map((child, i) => {
      const {
        jsurl,
        serviceType,
        widgetId,
        serviceCode,
        background,
        gridx,
        gridy,
        width,
        height
      } = child;
      const Widget = WidgetMaker(child);
      const props = {
        key: `widget-${widgetId}-${i}`,
        data: child,
      };
      if (!jsurl) {
        props.clickHandler = () => {
          // openService(serviceCode, serviceType);
          openService(serviceCode, "workbench", serviceType);
        }
      }

      const { x, y } = utilService.calGridItemPosition(gridx, gridy, margin, rowHeight, calWidth);

      const { wPx, hPx } = utilService.calWHtoPx(width, height, margin, rowHeight, calWidth);

      const style = {
        width: wPx,
        height: hPx,
        transform: `translate(${x}px, ${y}px)`
      }

      return (
        <Widget {...props}
          viewport={this.props.viewport}
          loadOk={this.props.loadOk}
          style={style}
        />
      );
    });

    const titleStyle = {
      color: themeList.find(item => item.id === currentThemeId).color
    };

    return (
      <div className={item} style={style} >
        <div className={WidgetTitle} style={titleStyle}>{name} </div>
        <div className={WidgetCont}>
          <ul
            ref={c => this._container = c}
            className={WidgetList}
            style={{ height }}
          >
            {list}
          </ul>
        </div>
      </div>
    );
  }
}

export default HomeWidgeList;
