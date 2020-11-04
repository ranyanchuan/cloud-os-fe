import React, { Component } from 'react';
import { getHost, getContext } from '@u';
import Icon from 'pub-comp/icon';
import { desttop, } from './index.css';
class Desttop extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    changeDefault = () => {
        const desttop = getHost('yzone');
        window.open(desttop);
    }

    render() {
        const { productLine } = getContext();
        return (
            window._IUAPPREMISESFLAG || productLine === "u8c" ? null :
                <div className={`${desttop}`} onClick={this.changeDefault}>
                    <Icon title="我的門戶" type="Friends-space" />
                </div>
        )

    }
}
export default Desttop;

