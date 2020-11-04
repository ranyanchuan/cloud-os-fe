import React, { Component } from 'react';
import Icon from "pub-comp/icon";
import { ButtonU8cPrimary, } from 'pub-comp/button';
import{logout} from "@u"
import Header from './header';
import { wrap, modal, imgbox, list, des, button } from './index.css';
import pointImage from 'assets/image/point.svg';

class Point extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    handleClick = () => {
        logout();
    }

    render() {
        return (
            <div className={`um-win ${wrap}`}>
                <Header />
                <div className="diwork-content-fixed um-content">
                    <div className={modal}>
                        <div className={"um-box-center " + imgbox}>
                            <img src={pointImage} />
                        </div>
                        <div className={list}>
                            <ul>
                                <li><Icon type="notice" />未购买开通任何服务</li>
                                <li><Icon type="notice" />未加入任何企业</li>
                            </ul>
                        </div>
                        <div className={des}>
                            <p>如需购买或了解产品详情请拨打热线</p>
                            <p>010-86393388-1-1</p>
                        </div>
                        <div className={`${button} um-box-center`}>
                            <ButtonU8cPrimary onClick={this.handleClick}>返回官网</ButtonU8cPrimary>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Point;
