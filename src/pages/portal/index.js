import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, getHost, getContext } from '@u';
import IFrame from 'components/iframe';

@connect(
    mapStateToProps(
        'defaultPortal',
        {
            namespace: 'wrap',
        }
    ),
    {},
)
class Portal extends Component {

    render() {
        const { defaultPortal: { id, preview_url: url } } = this.props;
        return (
            <IFrame
                id={id}
                title="门户"
                wrapperId="iframCont"
                url={url}
            />
        )
    }
}

export default Portal;

