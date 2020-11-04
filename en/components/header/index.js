/* tslint:disable:jsx-no-multiline-js */
import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Icon from 'pub-comp/icon';
import './index.css';

const defaultProps = {
  prefixCls: 'lebra-navbar',
  mode: 'dark',
  iconName: '',
  onLeftClick() {
  },
  className: '',
  children: null,
  leftContent: null,
  rightContent: [],
  onLeftTitleClick: () => { },
};
const propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.element,
  mode: PropTypes.string,
  rightContent: PropTypes.arrayOf(PropTypes.element),
  onLeftClick: PropTypes.func,
  onLeftTitleClick: PropTypes.func,
};

class Header extends Component {
  static defaultProps = defaultProps;
  static propTypes = propTypes;
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const {
      prefixCls, className, children, mode, iconName, leftContent, leftContentStyle,
      rightContent, rightContentStyle, onLeftClick, onLeftTitleClick, wrapStyle
    } = this.props;
    const wrapCls = classnames(prefixCls, `${prefixCls}-${mode}`, className);
    return (
      <div className={wrapCls} style={wrapStyle}>
        <div className={`${prefixCls}-left`} style={leftContentStyle} role="button">
          <span className={`${prefixCls}-left-icon`} aria-hidden="true" onClick={onLeftClick} >
            {typeof iconName === 'string' ? <Icon type={iconName} /> : iconName}
          </span>
          <span className={`${prefixCls}-left-content`} onClick={onLeftTitleClick || onLeftClick} onKeyDown={onLeftTitleClick || onLeftClick} role="presentation">{leftContent}</span>
        </div>
        <div className={`${prefixCls}-title`} >{children}</div>
        <div className={`${prefixCls}-right`} style={rightContentStyle}>
          {rightContent}
        </div>
      </div>
    );
  }
}

export default Header;
