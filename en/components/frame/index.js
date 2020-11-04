import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapStateToProps, } from '@u';
import AddServiceMenu from 'components/addServiceMenu';
import AddService from 'components/addService';
import Modal from 'bee-adapter/modal';
import { frame } from './index.css';

@connect(
  mapStateToProps(
    'frameParam',
  ),
  {}
)
class Frame extends Component {
  static propTypes = {
    frameParam: PropTypes.shape({

    }),
  };
  static defaultProps = {
    frameParam: {

    },
  };
  constructor(props) {
    super(props);
    this.state = {
      w: '100%',
      h: '100%',
    };
  }


  render() {
    const { id, url, rect, backdrop, backdropStyle, pageParam } = this.props.frameParam;
    const Style = {
      width: rect && rect.w || this.state.w,
      height: rect && rect.h || this.state.h,
    };
    let context;
    if (id === "serviceMenu") {
      context = <AddServiceMenu data={pageParam} />
    } else if (id === "addService") {
      context = <AddService data={pageParam} />
    } else {
      context = <iframe
        id={id}
        title={id}
        src={url}
        style={Style}
      />
    }
    return (
      <div>
        <Modal
          className={frame}
          show
          backdrop={backdrop}
          animation={true}
          backdropStyle={backdropStyle}
        >
          {context}
        </Modal>
      </div>
    )
  }
}

export default Frame;
