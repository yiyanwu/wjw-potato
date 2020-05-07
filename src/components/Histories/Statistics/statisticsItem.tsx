import * as React from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'
import './statisticsItem.scss'


const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

interface StatisticsItemProps {
    totalCount:number
}

interface StatisticsItemState {
    timeSpan:number
}


class StatisticsItem extends React.Component<StatisticsItemProps, StatisticsItemState> {
    constructor(props: any) {
        super(props)
        this.state = {
            timeSpan: 30
        }
    }


    onChange = (e: any) => {
        const timeSpan = Math.ceil((e[1]._d.getTime() - e[0]._d.getTime()) / (1000 * 60 * 60 * 24)) + 1
        this.setState({ timeSpan: timeSpan })
    }

    render () {
        const average = Math.floor((this.props.totalCount / this.state.timeSpan) * 100) / 100
        const ele = document.getElementById('StatisticsItem')
        const rect = document.getElementById('rect')
        const left = ele?.getBoundingClientRect().left
        const right = ele?.getBoundingClientRect().right
        const wid = (right && left) ? right - left - 32 : null
        if (rect) rect.style.width = `${wid}px`

        return(
            <div className="StatisticsItem" id="StatisticsItem">
                <div className="timeContainer">
                    <RangePicker onChange={this.onChange}
                        defaultValue={[moment('2020/04/01', dateFormat), moment('2020/04/30', dateFormat)]}
                        format={dateFormat} />
                </div>
                <div className="countContainer">
                    <span className="count"><strong>{this.props.totalCount}</strong> 总数</span>
                    <span className="count"><strong>{average}</strong> 日平均数</span>
                </div>
               <div className="chartContainer">
                   <svg width="100%" height="200px">
                       <rect x="0" y="0"  height="170px" id="rect"></rect>
                       <path></path>
                       <text></text>
                       <circle></circle>
                   </svg>
               </div>
            </div>
        )
    }
}

export default StatisticsItem