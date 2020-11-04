import React, { Component } from 'react';
import PropType from 'prop-types';
import goTop from 'assets/image/goTop.png';
import { commonback, topicon, toptext } from './style.css'


class Top extends Component {
  static propTypes = {
    linkTo: PropType.func,
  };
  static defaultProps = {
    linkTo: () => { },
  };

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      dist: 100//距离100返回顶部出现
    }
  }

  componentWillMount() {
  }

  componentDidMount() {
    const { dist } = this.state
    document.getElementById("scrollTopPoint").addEventListener('scroll', () => {
      let scrollTop = document.getElementById("scrollTopPoint").scrollTop
      if (scrollTop > dist) {
        this.setState({
          show: true
        })
      } else {
        this.setState({
          show: false
        })
      }
    })
  }


  goTop = () => {
    let scrollToptimer = setInterval(() => { //返回动画效果
      var top = document.getElementById("scrollTopPoint").scrollTop
      var speed = top / 4;
      if (top != 0) {
        document.getElementById("scrollTopPoint").scrollTop -= speed;
      }
      if (top == 0) {
        clearInterval(scrollToptimer);
      }
    }, 30);
  }

  render() {
    const { show } = this.state;
    return (
      <div>
        {show ? <div className={commonback} onClick={this.goTop} >
          <img src={goTop} className={topicon}/>
          <span className={toptext}>返回顶部</span>
        </div> : null}
      </div>
    );
  }

}
export default Top;

