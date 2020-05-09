import * as React from 'react'
import { connect } from 'react-redux'
import { format, parseISO } from 'date-fns'
import { Tabs } from 'antd'
import _ from 'lodash'
import StatisticsItem from './statisticsItem'

interface StatisticsProps {
    todos:any[];
    tomatoes:any[]
}


const { TabPane } = Tabs;


class Statistics extends React.Component<StatisticsProps> {
    
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

    get monthFinishedTodos() {
        return _.groupBy(this.finishedTodos, (t: any) => {
            return format(parseISO(t.updated_at), 'yyyy-MM')
        })
    }

    get monthFinishedTomatoes() {
        return _.groupBy(this.finishedTomatoes, (t: any) => {
            return format(parseISO(t.started_at), 'yyyy-MM')
        })
    }

    get tomatoMonths() {
        return Object.keys(this.monthFinishedTomatoes).sort((a, b) => Date.parse(b) - Date.parse(a))
    }

    render(){
        return(
            <Tabs defaultActiveKey="1">
                <TabPane tab="番茄统计" key="1">
                    <div className="TodoHistory" id="TodoHistory">
                        <StatisticsItem  
                            dailyFinishedTomatoes={this.dailyFinishedTomatoes}
                            monthTomatoes={this.monthFinishedTomatoes}
                            finishedMonths={this.tomatoMonths}/>
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