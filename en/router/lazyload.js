import React, { Component } from 'react';
export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null,
      };
    }
    componentDidMount() {
      this.asyncGetComp();
    }
    asyncGetComp = () => {
      const self = this;
      new Promise((resolve) => {
        const asyncCom = importComponent();
        resolve(asyncCom);
      }).then((asyncCom) => {
        const { default: component } = asyncCom;
        self.setState({
          component,
        });
      });
    }
    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }
  return AsyncComponent;
}
