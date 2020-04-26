import * as React from 'react'
import { connect } from 'react-redux'
import { format, parseISO } from 'date-fns'
import { Tabs } from 'antd'
import _ from 'lodash'
import './todoHistory.scss'

interface todoHistoryProps {
    todos: any[]
}

const { TabPane } = Tabs;

const TodoItem = function (param: any) {
    return (
        <div className="todoItem">
            <span className="time">{format(parseISO(param.updated_at), 'HH:mm')}</span>
            <span className="description">{param.description}</span>
        </div>
    )
}

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

    get dailyDeletedTodos() {
        return _.groupBy(this.deletedTodos, (t: any) => {
            return format(parseISO(t.updated_at), 'yyyy-MM-d')
        })
    }

    get finishedDates() {
        return Object.keys(this.dailyFinishedTodos).sort((a, b) => Date.parse(b) - Date.parse(a))
    }

    get deletedDates() {
        return Object.keys(this.dailyDeletedTodos).sort((a, b) => Date.parse(b) - Date.parse(a))
    }

    render() {
        const finishedTodoList = this.finishedDates.map(date => {
            return (
                <div key={date} className="dailyTodos">
                    <div className="summary">
                        <p className="date">
                            <span>{date}</span>
                            <span>周日</span>
                        </p>
                        <span className="finishedCount">完成了{this.dailyFinishedTodos[date].length}个任务</span>
                    </div>
                    <div className="todoList">
                        {
                            this.dailyFinishedTodos[date].map(todo =>
                                <TodoItem key={todo.id} {...todo} />)
                        }
                    </div>
                </div>
            )
        })

        const deletedTodoList = this.deletedDates.map(date => {
            return (
                <div key={date} className="dailyTodos">
                    <div className="summary">
                        <p className="date">
                            <span>{date}</span>
                            <span>周日</span>
                        </p>
                        <span className="finishedCount">删除了{this.dailyDeletedTodos[date].length}个任务</span>
                    </div>
                    <div className="todoList">
                        {
                            this.dailyDeletedTodos[date].map(todo =>
                                <TodoItem key={todo.id} {...todo} />)
                        }
                    </div>
                </div>
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