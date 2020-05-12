import * as React from 'react'
import { connect } from 'react-redux'
import { format, parseISO } from 'date-fns'
import { Tabs } from 'antd'
import _ from 'lodash'
import './todoHistory.scss'
import  TodoHistoryItem from './todoHistoryItem'

interface todoHistoryProps {
    todos: any[]
}

const { TabPane } = Tabs;


class TodoHistory extends React.Component<todoHistoryProps> {

    get finishedTodos() {
        return this.props.todos.filter(t => t.completed && !t.deleted)
    }

    get deletedTodos() {
        return this.props.todos.filter(t => t.deleted)
    }

    get dailyFinishedTodos() {
        return _.groupBy(this.finishedTodos, (t: any) => {
            return format(parseISO(t.updated_at), 'yyyy-MM-d')
        })
    }

    get finishedDates() {
        return Object.keys(this.dailyFinishedTodos).sort((a, b) => Date.parse(b) - Date.parse(a))
    }

    render() {
        const weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
        const finishedTodoList = this.finishedDates.map(date => {
            return (
                <div key={date} className="dailyTodos">
                    <div className="summary">
                        <p className="date">
                            <span>{date}</span>
                            <span>{weekDay[new Date(date).getDay()]}</span>
                        </p>
                        <span className="finishedCount">完成了{this.dailyFinishedTodos[date].length}个任务</span>
                    </div>
                    <div className="todoList">
                        {
                            this.dailyFinishedTodos[date].map(todo =>
                                <TodoHistoryItem key={todo.id} 
                                todo={todo} itemType="finished"/>)
                        }
                    </div>
                </div>
            )
        })

        const deletedTodoList = this.deletedTodos.map(todo => {
            return (
                <TodoHistoryItem key={todo.id} todo={todo} itemType="deleted"/> 
            )
        })

        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="已完成的任务" key="1">
                    <div className="TodoHistory" id="TodoHistory">
                        {finishedTodoList}
                    </div>
                </TabPane>
                <TabPane tab="已删除的任务" key="2">
                    <div className="TodoHistory" id="TodoHistory">
                        {deletedTodoList}
                    </div>
                </TabPane>
            </Tabs>
        )
    }
}

const mapStateToProps = (state: { todos: any; }, ownProps: any) => ({
    todos: state.todos,
    ...ownProps
})

export default connect(mapStateToProps)(TodoHistory)