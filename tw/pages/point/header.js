import React, { Component } from 'react';
import Header from 'components/header';
import { header, logostyle } from './index.css';
import logo from 'assets/image/yonSuite.svg';
import Info from "pages/wrap/components/info";

class CreateHeader extends Component {

    render() {
        return (
            <div className="diwork-header-fixed">
                <Header
                    className={header}
                    mode="light"
                    rightContent={<Info />}
                >
                    <img className={logostyle} alt="" src={logo} />
                </Header>
            </div>
        )
    }
}

export default CreateHeader;
