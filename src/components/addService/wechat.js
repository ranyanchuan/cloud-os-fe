import React, { Component } from 'react';
import FormControl from 'bee-adapter/form-control';
import Radio from 'bee-adapter/radio';
import Select from 'bee-adapter/select';
const Option = Select.Option;

class WeChat extends Component {
  constructor(props) {
    super(props);
    const _this = this.props;
    if (_this.name == "WeChat") {
      this.state = _this.state.vx
    } else if (_this.name == "Ding") {
      this.state = _this.state.dingding
    } else if (_this.name == "MobileNative") {
      this.state = _this.state.nativeMobile
    }
  }
  componentWillMount() {
    // name为调用组件传递名称， getRef为主组件方法
    const { getRef, name } = this.props;
    if (getRef) {
      if (name == "WeChat") {
        getRef("weChatCom", this);
      } else if (name == "Ding") {
        getRef("dingCom", this);
      } else if (name == "MobileNative") {
        getRef("mobileNativeCom", this);
      }
    }
  }

  handleChangeFn = (value, key) => {
    this.setState({ [key]: value });
  }
  render() {
    // 集成策略下拉选项
    const strategyAry = [
      {
        value: '',
        name: '无'
      },
      {
        value: 'ykj_third_sys_service_strategy',
        name: '友空间'
      }
    ];
    if (name == "WeChat") {
      strategyAry.push({
        value: 'wx_third_sys_service_strategy',
        name: '微信'
      })
    } else if (name == "Ding") {
      strategyAry.push({
        value: 'dd_third_sys_service_strategy',
        name: '钉钉'
      })
    }

    const {
      params, homepage, libVersion, strategy, useNativeNavigationBar, offline, priority, downloadUrl, common, category,
    } = this.state
    return <div>
      <div className="app-bf1">
        <span className="labelName">运行环境版本</span>
        <FormControl type="text" value={libVersion} onChange={(e) => { this.handleChangeFn(e, 'libVersion') }} />
      </div>
      <div className="app-bf1">
        <span className="labelName">主页</span>
        <FormControl type="text" value={homepage} onChange={(e) => { this.handleChangeFn(e, 'homepage') }} />
      </div>
      <div className="app-bf1">
        <span className="labelName">跳转参数</span>
        <FormControl type="text" value={params} onChange={(e) => { this.handleChangeFn(e, 'params') }} />
      </div>
      <div className="app-bf1">
        <span className="labelName">集成免登策略</span>
        <Select
          className="strategy-select"
          searchPlaceholder="免登策略"
          value={strategy}
          onChange={(e) => { this.handleChangeFn(e, 'strategy') }}
        >
          {strategyAry.map((item) => {
            return <Option key={item.value} value={item.value}
            >{item.name}</Option>
          })}
        </Select>
      </div>
      <div className="app-bf1">
        <span className="labelName">置顶优先级</span>
        <FormControl type="number" value={priority} onChange={(e) => { this.handleChangeFn(e, 'priority') }} />
      </div>
      <div className="app-bf1">
        <span className="labelName">是否离线应用</span>
        <Radio.RadioGroup
          name="isNative"
          selectedValue={offline}
          onChange={(e) => { this.handleChangeFn(e, 'offline') }}
        >
          <Radio value >是</Radio>
          <Radio value={false} >否</Radio>
        </Radio.RadioGroup>
      </div>
      <div className="app-bf1">
        <span className="labelName">下载地址</span>
        <FormControl type="text" value={downloadUrl} onChange={(e) => { this.handleChangeFn(e, 'downloadUrl') }} />
      </div>
      <div className="app-bf1">
        <span className="labelName">是否使用原生导航</span>
        <Radio.RadioGroup
          name="isNative"
          selectedValue={useNativeNavigationBar}
          onChange={(e) => { this.handleChangeFn(e, 'useNativeNavigationBar') }}
        >
          <Radio value >是</Radio>
          <Radio value={false} >否</Radio>
        </Radio.RadioGroup>
      </div>
      <div className="app-bf1">
        <span className="labelName">标签</span>
        <FormControl type="text" value={category} onChange={(e) => { this.handleChangeFn(e, 'category') }} />
      </div>
      <div className="app-bf1">
        <span className="labelName">是否常用应用</span>
        <Radio.RadioGroup
          name="isNative"
          selectedValue={common}
          onChange={(e) => { this.handleChangeFn(e, 'common') }}
        >
          <Radio value >是</Radio>
          <Radio value={false} >否</Radio>
        </Radio.RadioGroup>
      </div>
    </div>
  }
}

export default WeChat;
