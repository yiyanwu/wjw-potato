import * as React from 'react'
import { connect } from 'react-redux'
import { format, parseISO } from 'date-fns'
import { Tabs } from 'antd'
import _ from 'lodash'

interface todoHistoryProps {
    todos: any[]
}

const { TabPane } = Tabs;

const TodoItem = function (param: any) {
    return (
        <div>
            <span>{format(parseISO(param.updated_at), 'H:mm')}</span>
            <span>{param.description}</span>
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

    get dates() {
        return Object.keys(this.dailyFinishedTodos).sort((a, b) => Date.parse(b) - Date.parse(a))
    }

    render() {
        const todoList = this.dates.map(date => {
            return (
                <div key={date}>
                    <div>
                        <span>{date}</span>
                        <span>完成了{this.dailyFinishedTodos[date].length}个任务</span>
                    </div>
                    <div>
                        {
                            this.dailyFinishedTodos[date].map(todo =>
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
                        {todoList}
                    </div>
                </TabPane>
                <TabPane tab="已删除的任务" key="2">
                    Content of Tab Pane 2
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