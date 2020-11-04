import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';

// 公共组件
import Dropdown from 'bee-adapter/dropdown';
import Menu from 'bee-adapter/menus';
import Icon from 'pub-comp/icon';
import { home, ys, active, bg, dropdownIsP, dropdownIsD, menuStyle, defaultClass } from '../style.css';
import { openWin } from 'public/regMessageTypeHandler';
/*   actions   */
import rootActions from 'store/root/actions';
import wrapActions from 'store/root/wrap/actions';
const { requestStart, requestSuccess, requestError, } = rootActions;
const { openPortal, setDefaultPortal, delTabs } = wrapActions;
const { Item, Divider, } = Menu;

@connect(
    mapStateToProps(
        'activeCarrier',
        'retract',
        'allPortal',
        'defaultPortal',
        'isMutliPortal',
        'isDefaultPortal',
        'tabs',
        {
            namespace: 'wrap',
        }
    ),
    { requestStart, requestSuccess, requestError, openPortal, setDefaultPortal, delTabs },
)
class Portal extends Component {
    static propTypes = {

    };
    static defaultProps = {

    };
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
    }

    openPortal = () => {
        const { openPortal } = this.props;
        openPortal();
    }

    handleClick = (e) => {
        if (this.isClickDefa) {
            this.isClickDefa = false;
            return;
        }
        const data = e.item.props.data;
        openWin({
            id: data.id,
            title: data.name,
            url: data.preview_url
        });
        // this.setState({ visible: false });
    }

    setDefault = (e, item) => {
        // e.stopPropagation();
        this.isClickDefa = true;
        const { requestStart, requestSuccess, requestError, setDefaultPortal, delTabs } = this.props;
        const param = { id: item.id };
        requestStart();
        setDefaultPortal(param).then(({ error, payload }) => {
            if (error) {
                requestError(payload);
                return;
            }
            requestSuccess();
            if (this.props.tabs.find(item => item.id === payload.id)) {
                delTabs(payload);
            }
            // this.setState({ visible: false });
        });
    }

    render() {
        const { activeCarrier, retract, allPortal, defaultPortal, isMutliPortal, isDefaultPortal } = this.props;
        const menu = (
            <Menu onClick={this.handleClick} className={menuStyle}>
                {
                    isDefaultPortal ? <Item disabled key={defaultPortal.id}>
                        <div className="um-box-justify">
                            <p className="defaultPortalName" title={defaultPortal.name}>{defaultPortal.name}</p>
                            <a className={`${defaultClass} list`}>默認</a>
                        </div>
                    </Item>
                        : null
                }
                {isDefaultPortal ? <Divider /> : null}
                {
                    allPortal.map(item => {
                        if (!item.defaultPortal) {
                            return <Item disabled={!isDefaultPortal && (item.id === defaultPortal.id) } key={item.id} data={item}>
                                <div className="um-box-justify">
                                    <p className="defaultPortalName" title={item.name}>{item.name}</p>
                                    <a className={defaultClass} onClick={(e) => { this.setDefault(e, item) }}>設為默認</a>
                                </div>
                            </Item>
                        }
                    })
                }
            </Menu>
        );
        return (
            <div
                className={`${home} ${ys} ${activeCarrier === "portal" ? active : ''}`}
                onClick={() => { this.openPortal() }}
            >
                <div className="um-box-vc">
                    {activeCarrier === "portal" ? <Icon font="shouye1" /> : <Icon font="Homeshouyee" />}
                    <span>門戶</span>
                </div>
                {
                    isMutliPortal ?
                        <Dropdown
                            trigger={['click']}
                            overlay={menu}
                            // visible={this.state.visible}
                            overlayClassName={retract ? dropdownIsP : dropdownIsD}
                            onVisibleChange={this.onVisibleChange}
                        >
                            <div className={`${bg} um-box-center`} ><Icon type="pull-down" /></div>
                        </Dropdown> : null
                }

            </div>
        );
    }
}
export default Portal;
