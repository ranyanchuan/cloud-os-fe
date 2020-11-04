import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { TransitionGroup, CSSTransitionGroup } from 'react-transition-group';
import wrapActions from 'store/root/wrap/actions';
import MenuBarInner from './menuInner';
import { menuBarPart, sideBarPanel, } from './style.css';

const { getAllMenuList } = wrapActions;
@connect(
  mapStateToProps(),
  {
    getAllMenuList,
  },
)
class MenuBar extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    const { getAllMenuList, } = this.props;
    getAllMenuList().then(({ error, payload }) => {
      if (error) {
        // requestError(payload);
        return;
      }
    });
  }

  render() {
    let { menuShow, closeMenu } = this.props;
    return (
      <div className={menuBarPart} style={this.props.style}>
        <TransitionGroup>
          <CSSTransitionGroup
            transitionName={{
              enter: 'animated',
              enterActive: `fadeIn`,
              leave: 'animated',
              leaveActive: `fadeOut`,
            }}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {
              menuShow ? (
                <div className={sideBarPanel}>
                  <MenuBarInner outsideClickIgnoreClass='ignoreClass-menu' closeMenu={closeMenu} menuShow={menuShow} />
                </div>
              ) : null
            }
          </CSSTransitionGroup>
        </TransitionGroup>
      </div>
    );
  }
}
export default MenuBar;

