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
        name: 'Null'
      },
      {
        value: 'ykj_third_sys_service_strategy',
        name: 'YouZone'
      }
    ];
    if (name == "WeChat") {
      strategyAry.push({
        value: 'wx_third_sys_service_strategy',
        name: 'WeChat'
      })
    } else if (name == "Ding") {
      strategyAry.push({
        value: 'dd_third_sys_service_strategy',
        name: 'DingTalk'
      })
    }

    const {
      params, homepage, libVersion, strategy, useNativeNavigationBar, offline, priority, downloadUrl, common, category,
    } = this.state
    return <div>
      <div className="app-bf1">
        <span className="labelName">Runtime Env. Ver</span>
        <FormControl type="text" value={libVersion} onChange={(e) => { this.handleChangeFn(e, 'libVersion') }} />
      </div>
      <div className="app-bf1">
        <span className="labelName">Homepage</span>
        <FormControl type="text" value={homepage} onChange={(e) => { this.handleChangeFn(e, 'homepage') }} />
      </div>
      <div className="app-bf1">
        <span className="labelName">Redirection Parameters</span>
        <FormControl type="text" value={params} onChange={(e) => { this.handleChangeFn(e, 'params') }} />
      </div>
      <div className="app-bf1">
        <span className="labelName">Free of Login</span>
        <Select
          className="strategy-select"
          searchPlaceholder="Free of Login"
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
        <span className="labelName">Priority at Top</span>
        <FormControl type="number" value={priority} onChange={(e) => { this.handleChangeFn(e, 'priority') }} />
      </div>
      <div className="app-bf1">
        <span className="labelName">Offline App</span>
        <Radio.RadioGroup
          name="isNative"
          selectedValue={offline}
          onChange={(e) => { this.handleChangeFn(e, 'offline') }}
        >
          <Radio value >Yes</Radio>
          <Radio value={false} >No</Radio>
        </Radio.RadioGroup>
      </div>
      <div className="app-bf1">
        <span className="labelName">Download URL</span>
        <FormControl type="text" value={downloadUrl} onChange={(e) => { this.handleChangeFn(e, 'downloadUrl') }} />
      </div>
      <div className="app-bf1">
        <span className="labelName">Use App Navigation</span>
        <Radio.RadioGroup
          name="isNative"
          selectedValue={useNativeNavigationBar}
          onChange={(e) => { this.handleChangeFn(e, 'useNativeNavigationBar') }}
        >
          <Radio value >Yes</Radio>
          <Radio value={false} >No</Radio>
        </Radio.RadioGroup>
      </div>
      <div className="app-bf1">
        <span className="labelName">Tag</span>
        <FormControl type="text" value={category} onChange={(e) => { this.handleChangeFn(e, 'category') }} />
      </div>
      <div className="app-bf1">
        <span className="labelName">Common App</span>
        <Radio.RadioGroup
          name="isNative"
          selectedValue={common}
          onChange={(e) => { this.handleChangeFn(e, 'common') }}
        >
          <Radio value >Yes</Radio>
          <Radio value={false} >No</Radio>
        </Radio.RadioGroup>
      </div>
    </div>
  }
}

export default WeChat;
