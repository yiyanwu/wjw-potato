import * as React from 'react'
import { connect } from 'react-redux'
import { format, parseISO } from 'date-fns'
import { Tabs, DatePicker } from 'antd'
import _ from 'lodash'
import moment from 'moment'

interface StatisticsProps {
    todos:any[];
    tomatoes:any[]
}

interface StatisticsState {
    timeSpan:number
}

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

class Statistics extends React.Component<StatisticsProps, StatisticsState> {
    constructor(props:any){
        super(props)
        this.state = {
            timeSpan:30
        }
    }

    get finishedTodos() {
        return this.props.todos.filter(t => t.completed && !t.deleted)
    }

    get finishedTomatoes() {
        return this.props.tomatoes.filter(t => t.description && !t.aborted && t.ended_at)
    }

    get dailyFinishedTodos() {
        return _.groupBy(this.finishedTodos, (t: any) => {
            return format(parseISO(t.updated_at), 'yyyy-MM-dd')
        })
    }

    get dailyFinishedTomatoes() {
        return _.groupBy(this.finishedTomatoes, (t: any) => {
            return format(parseISO(t.started_at), 'yyyy-MM-dd')
        })
    }

    onChange = (e:any) => {
        const timeSpan = Math.ceil((e[1]._d.getTime() - e[0]._d.getTime()) / (1000 * 60 * 60 * 24)) +1
        this.setState({timeSpan:timeSpan})
    }

    render(){
        const totalCount = this.finishedTodos.length + this.finishedTomatoes.length
        const average = Math.floor(totalCount / this.state.timeSpan * 100) / 100
        return(
            <Tabs defaultActiveKey="1">
                <TabPane tab="番茄统计" key="1">
                    <div className="TodoHistory" id="TodoHistory">
                        <span className="total">{totalCount}总数</span>
                        <span className="average">{average}日平均数</span>
                        <RangePicker onChange={this.onChange} 
                            defaultValue={[moment('2020/04/01', dateFormat), moment('2020/04/30', dateFormat)]}
                            format={dateFormat} />
                    </div>
                </TabPane>
                <TabPane tab="任务统计" key="2">
                    <div className="TodoHistory" id="TodoHistory">
                        22
                    </div>
                </TabPane>
            </Tabs>
        )
    }
}

const mapStateToProps = (state: { todos: any; tomatoes:any }, ownProps: any) => ({
    todos: state.todos,
    tomatoes: state.tomatoes,
    ...ownProps
})

export default connect(mapStateToProps)(Statistics)