import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, getContext } from '@u';
import { TransitionGroup, CSSTransitionGroup } from 'react-transition-group';

import Icon from 'pub-comp/icon';
import InfoContent from './infoContent';
import { win, avator } from './info.css';
import teamconfigActions from 'store/root/teamconfig/actions';
const { openExitModal } = teamconfigActions;
import TeamExitModal from 'components/teamExitModal';

@connect(mapStateToProps(
    'userInfo',
    {
        key: 'exitModal',
        value: (home, ownProps, root) => {
            return root.teamconfig.exitModal
        }
    },
),
    {
        openExitModal
    })
class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoDisplay: false,
            currType: 1
        };
    }

    handerClick = () => {
        const { infoDisplay } = this.state;
        this.setState({
            infoDisplay: !infoDisplay,
        });
    }
    componentDidMount() {
        this.getCompanyType();
    }
    // 获取团队、企业  type 0为企业， 1为团队
    getCompanyType = () => {
        const { tenantid } = getContext();
        const {
            userInfo: {
                allowTenants,
            },
        } = this.props;
        const curTenant = allowTenants && allowTenants.filter(tenant => tenant.tenantId === tenantid)[0];
        let currType = 1;
        if (curTenant && curTenant.type == 0) {
            currType = 0;
        }
        this.setState({
            currType
        });
    }
    closeInfo = () => {
        this.setState({
            infoDisplay: false
        });
    }

    render() {
        const { userInfo: { userAvatorNew }, exitModal } = this.props;
        const { infoDisplay, currType } = this.state;
        const data = currType ? {
            name: "Quit from Team",
            serverApi: "team/leave",
            msg: "After quitting from a team, the Apps under the team will no longer be available, and the relevant data will be deleted. Please confirm that the data has been backed up."
        } : {
                name: 'Quit from Enterprise',
                serverApi: 'enter/leave',
                msg: 'After quitting from an enterprise, the Apps under the enterprise will no longer be available, and the relevant data will be deleted. Please confirm that the data has been backed up.',
            }
        return (
            <div className={win}>
                <div className={`${avator} ignoreClass`} onClick={this.handerClick}>
                    {
                        userAvatorNew
                            ? <img alt="" src={userAvatorNew} />
                            : <div className="avatorImg"></div>
                    }
                </div>
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
                        infoDisplay
                            ?
                            <InfoContent
                                license={this.props.license}
                                closeInfo={this.closeInfo}
                                outsideClickIgnoreClass={'ignoreClass'}
                                openExitModal={this.props.openExitModal}
                                currType={currType}
                            />
                            : null
                    }

                </CSSTransitionGroup>
                {
                    exitModal ?
                        <TeamExitModal
                            data={data}
                            close={true} /> : null
                }
            </div>
        )

    }
}
export default Info;

