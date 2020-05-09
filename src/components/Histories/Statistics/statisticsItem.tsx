import * as React from 'react'
import { DatePicker } from 'antd'
import { getDaysInMonth} from 'date-fns'
import './statisticsItem.scss'


interface StatisticsItemProps {
    totalCount: number
}

interface StatisticsItemState {
    timeSpan: number,
    width: number | null,
    arr: any[]
}



class StatisticsItem extends React.Component<StatisticsItemProps, StatisticsItemState> {
    constructor(props: any) {
        super(props)
        this.state = {
            timeSpan: 0,
            width: 968,
            arr: []
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
        const rect = document.getElementById('rect')
        const left = ele?.getBoundingClientRect().left
        const right = ele?.getBoundingClientRect().right
        let wid
        if (left) { wid = (right && left) ? right - left - 32 : null } else {
            wid = right ? right - 32 : null
        }
        this.setState({ width: wid })
        if (rect) rect.style.width = `${this.state.width}px`
        this.handleArr()
    }

    handleArr = () => {
        let span = this.state.width ? (this.state.width * 97.5 / 100) / (this.state.timeSpan - 1) : 0
        let arr = Array.from(new Array(this.state.timeSpan), (k, i) => ({ x: (i * span), y: 170 }))
        this.setState({arr})
    }

    handleTimeSpan = (e: any) => {
        this.handleWidth()
        const year = new Date(e._d).getFullYear()
        const month = new Date(e._d).getMonth() 
        const timeSpan = getDaysInMonth(new Date(year, month))
        let span = this.state.width ? (this.state.width * 97.5 / 100) / (timeSpan - 1) : 0
        let arr = Array.from(new Array(timeSpan), (k, i) => ({ x: (i * span), y: 170 }))
        this.setState({ timeSpan: timeSpan,arr: arr})
    }

    point = () => {
        let firstPoint = this.state.arr[0]
        if(firstPoint){
            const pointArr = this.state.arr.map(e => {
                return `L${e.x +7.5},${e.y}`
            })
            return [`M${firstPoint.x + 7.5},${firstPoint.y}`, ...pointArr].join(' ')
        }else{
            return "M7.5,170 L7.5,170"
        }
    }

    render() {
        const average = this.state.timeSpan ? (Math.floor((this.props.totalCount / this.state.timeSpan) * 100) / 100) : 0
        const firstPoint = this.state.arr[0]
        return (
            <div className="StatisticsItem" id="StatisticsItem">
                <div className="timeContainer">
                    <DatePicker 
                        allowClear={false}
                        onChange={this.handleTimeSpan}
                        picker="month" />
                </div>
                <div className="countContainer">
                    <span className="count"><strong>{this.props.totalCount}</strong> 总数</span>
                    <span className="count"><strong>{average}</strong> 日平均数</span>
                </div>
                <div className="chartContainer">
                    <svg width="100%" height="200px">
                        <g>
                            <rect x="0" y="0" height="170px" id="rect"></rect>
                            {this.state.arr.map((e,i) => {
                                return <text x={e.x + 7.5} y={e.y + 30} textAnchor="middle" key={i}>{i + 1}</text>
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