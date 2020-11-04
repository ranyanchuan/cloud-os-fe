import React, { Component, } from 'react';
import Calendar from 'rc-calendar';
import onClickOutside from 'react-onclickoutside';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';

import 'rc-calendar/assets/index.css';
import { datebox } from './style.css';

@onClickOutside
class DatePick extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

     // outside 装饰器方法
     handleClickOutside() {
        this.props.closeFn();
    }

    render() {
        const { lang, dateType, value, onSelect} = this.props;
        return (
            <div className={datebox} style={dateType ? { left: "-100px" } : { left: "-200px" }}>
                <Calendar
                    style={{ margin: 10 }}
                    showDateInput={false}
                    showToday={false}
                    locale={lang ? zhCN : enUS}
                    defaultValue={value}
                    onSelect={onSelect}
                />
            </div>

        );
    }
}

export default DatePick;
