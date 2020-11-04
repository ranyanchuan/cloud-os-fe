import React, { Component } from 'react';
import Icon from 'pub-comp/icon';
import {
    ButtonU8cPrimary,
} from "pub-comp/button";
import {
    win, tip, triangle, desc, footer,
    menu, menu_icon, first,
    setting, setting_icon, second,
    history, history_icon, third,
    search, search_icon, fourth,
    // add, add_icon, fifth,
} from "./index.css";

import Menu from 'assets/image/menu.svg';
class Beginner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currPage: 1,
            searchLeft: 'auto',
        };
    }

    componentDidMount() {
       
    }

    handClick = () => {
        const { currPage } = this.state;
        if (currPage === 2) {
            this.props.setLeadStatus({ "content": true })
            return false;
        }
        const _search = document.getElementById("_search");
        console.log(_search)
        // 因为宽度包含了right 15， left 14. 所以基本相等，直接除以2就ok
        const searchLeft = _search.offsetLeft + _search.offsetParent.offsetLeft + 7;
        this.setState({
            searchLeft,
            currPage: currPage + 1
        })
    }

    render() {
        const { currPage, searchLeft } = this.state;
        return (
            <div className={`um-win ${win}`}>
                {
                    currPage === 1 ?
                        <div>
                            <div className={menu}>
                                <div className={menu_icon}>
                                    <img src={Menu} />
                                </div>
                                <div className={`${tip} ${first}`}>
                                    <div className={triangle}></div>
                                    <div className={desc}>
                                        <h5>菜單入口：</h5>
                                        <p>在這裏可以找到全部的功能</p>
                                    </div>
                                </div>
                            </div>
                            {/* <div className={setting}>
                                <div className={setting_icon}>
                                    <Icon type="Set-up" />
                                    <span title="首頁設置">首頁設置</span>
                                </div>
                                <div className={`${tip} ${second}`}>
                                    <div className={triangle}></div>
                                    <div className={desc}>
                                        <h5>靈活的首頁定制：</h5>
                                        <p>將常用功能添加到首頁</p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        : null
                }
                {
                    currPage === 2 ?
                        <div>
                            <div className={history}>
                                <div className={history_icon}>
                                    <Icon type="History" />
                                </div>
                                <div className={`${tip} ${third}`}>
                                    <div className={triangle}></div>
                                    <div className={desc}>
                                        <h5>歷史記錄：</h5>
                                        <p>查看您的使用記錄</p>
                                    </div>
                                </div>
                            </div>
                            <div className={search} style={{ left: searchLeft }}>
                                <div className={search_icon}>
                                    <Icon type="search" />
                                </div>
                                <div className={`${tip} ${fourth}`}>
                                    <div className={triangle}></div>
                                    <div className={desc}>
                                        <h5>全局搜索：</h5>
                                        <p>搜索您想查找的功能、通訊錄等 資訊。 </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null
                }
                {
                    // currPage === 3 ?
                    //     <div>
                    //         <div className={add}>
                    //             <div className={add_icon}>
                    //                 <span title="将当前页添加到首页">将当前页添加到首页</span>
                    //             </div>
                    //             <div className={`${tip} ${fifth}`}>
                    //                 <div className={triangle}></div>
                    //                 <div className={desc}>
                    //                     <h5>快速添加：</h5>
                    //                     <p>快速添加常用功能至首页</p>
                    //                 </div>
                    //             </div>
                    //         </div>
                    //     </div>
                    //     : null
                }
                <div className={`${footer}`}>
                    <div>
                        <ButtonU8cPrimary onClick={this.handClick}> 知道了 </ButtonU8cPrimary>
                    </div>
                    {
                        currPage > 2 ? <div /> : <div>{`${currPage}/2`}</div>
                    }
                </div>
            </div>
        );
    }
}

export default Beginner;
