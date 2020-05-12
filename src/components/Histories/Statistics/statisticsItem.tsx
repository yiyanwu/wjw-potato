import * as React from 'react'
import { DatePicker } from 'antd'
import { getDaysInMonth, isLeapYear} from 'date-fns'
import dayjs from 'dayjs'
import './statisticsItem.scss'


interface StatisticsItemProps {
    monthJobs: any,
    finishedMonths: any,
    dailyFinishedJobs: any
}

interface StatisticsItemState {
    timeSpan: number,
    width: number | null,
    arr: any[],
    monthTomatoesCount: number
}


class StatisticsItem extends React.Component<StatisticsItemProps, StatisticsItemState> {
    constructor(props: any) {
        super(props)
        this.state = {
            timeSpan: 0,
            width: 968,
            arr: [],
            monthTomatoesCount: 0
        }
    }

    componentDidMount() {
        this.handleWidth()
        window.addEventListener('resize', this.handleWidth)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWidth)
    }

    handleWidth = () => {
        const ele = document.getElementById('StatisticsItem')
        const rect = document.getElementsByClassName('rect')
        const left = ele?.getBoundingClientRect().left
        const right = ele?.getBoundingClientRect().right
        let wid
        if (left) { wid = (right && left) ? right - left - 32 : null } else {
            wid = right ? right - 32 : null
        }
        this.setState({ width: wid })
        if (rect) Array.prototype.map.call(rect, r => { r.style.width = `${this.state.width}px`})
        this.handleArr()
    }

    handleArr = () => {
        let span = this.state.width ? (this.state.width * 97.5 / 100) / (this.state.timeSpan - 1) : 0
        let arr = Array.from(new Array(this.state.timeSpan), (k, i) => ({ x: (i * span), y: 170 }))
        this.setState({ arr })
    }

    getDays = (year: number, month: number) => {
        if (month === 2) {
            return isLeapYear(year) ? 29 : 28
        }

        const dayObj = {
            1: 31, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31
        }

        return (dayObj as any)[month]
    }

    handleTimeSpan = (e: any) => {
        this.handleWidth()
        const year = new Date(e._d).getFullYear()
        const month = new Date(e._d).getMonth() 
        const timeSpan = getDaysInMonth(new Date(year, month)) 
        const date = dayjs(e._d).format('YYYY-MM')
        let count
        if (this.props.finishedMonths.includes(date)) {
            count = this.props.monthJobs[date].length
        } else {
            count = 0
        }
        const dateArr = Object.keys(this.props.dailyFinishedJobs)
        const selectedMonth = Array.from({ length: this.getDays(year, month + 1) }, (v, k) => `${year}-${month + 1}-${k+1}`)
        const dailyJobs = dateArr.map(d => {  return this.props.dailyFinishedJobs[d].length })
        const Xspan = this.state.width ? (this.state.width * 97.5 / 100) / (timeSpan - 1) : 0
        const Yspan = 170 / Math.max.apply(null, dailyJobs) 
        const arr = Array.from(new Array(timeSpan), (k, i) => {
            let y
            const selectedDays = dayjs(selectedMonth[i]).format('YYYY-MM-DD')
            const length = this.props.dailyFinishedJobs[selectedDays] ? this.props.dailyFinishedJobs[selectedDays].length : 0
            if (length > 0){
                y = 176 - length * Yspan 
            } else { y = 170}
            return {x:(i*Xspan),y:y}
        })
        this.setState({ timeSpan: timeSpan, arr: arr, monthTomatoesCount: count })

    }

    point = () => {
        let firstPoint = this.state.arr[0]
        if (firstPoint) {
            const pointArr = this.state.arr.map(e => {
                return `L${e.x + 7.5},${e.y}`
            })
            return [`M${firstPoint.x + 7.5},${firstPoint.y}`, ...pointArr].join(' ')
        } else {
            return "M7.5,170 L7.5,170"
        }
    }

    render() {
        const average = this.state.timeSpan ? (Math.floor((this.state.monthTomatoesCount / this.state.timeSpan) * 100) / 100) : 0
        return (
            <div className="StatisticsItem" id="StatisticsItem">
                <div className="timeContainer">
                    <span className="monthChoose">请选择月份：</span>
                    <DatePicker
                        allowClear={false}
                        onChange={this.handleTimeSpan}
                        picker="month" />
                </div>
                <div className="countContainer">
                    <span className="count"><strong>{this.state.monthTomatoesCount}</strong> 总数</span>
                    <span className="count"><strong>{average}</strong> 日平均数</span>
                </div>
                <div className="chartContainer">
                    <svg width="100%" height="200px">
                        <g>
                            <rect x="0" y="0" height="170px" id="rect" className="rect"></rect>
                            {this.state.arr.map((e, i) => {
                                return <text x={e.x + 7.5} y={200} textAnchor="middle" key={i}>{i + 1}</text>
                            })}
                            <path d={this.point()}></path>
                            {this.state.arr.map((e, i) => {
                                return <circle cx={e.x + 7.5} cy={e.y} r="5" key={i}></circle>
                            })}
                        </g>
                    </svg>
                </div>
            </div>
        )
    }
}

export default StatisticsItem