import React, { Component, } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapStateToProps, } from '@u';
import Icon from 'pub-comp/icon';

import actions from 'store/root/actions';
import { Approval } from './style.css';
import { openService } from 'public/regMessageTypeHandler';
const {
    showApproval,
    hideApproval,
} = actions;

@connect(
    mapStateToProps(
        'messageType',
        'ApprovalShowed',
    ),
    {
        showApproval,
        hideApproval,
    }
)
class Appr extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    openApproval = (e) => {
        openService('XTSPZX0001');
    }


    render() {
        let aproveStatus = diworkContext && diworkContext().aproveStatus && diworkContext().aproveStatus =='true';
        return (
            (window._IUAPPREMISESFLAG  && aproveStatus )? <div ref="Approval"  className={`tc ${Approval} `} onClick={this.openApproval}>
                <Icon title="審批中心" type="approval" />
            </div>
            :
            null
        );
    }
}

export default Appr;
