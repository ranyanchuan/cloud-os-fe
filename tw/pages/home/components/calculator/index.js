import React, { Component } from 'react';
import PropType from 'prop-types';
import Icon from 'pub-comp/icon';


class Calculator extends Component {
  static propTypes = {
    linkTo: PropType.func,
  };
  static defaultProps = {
    linkTo: () => {},
  };
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }
  componentWillMount() {
    
  }
  componentDidMount() {
   
  }

  render() {
    return <div>Calculator</div>
  }

}
export default Calculator;

