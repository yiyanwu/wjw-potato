import * as React from 'react'
import { connect } from 'react-redux';
import TodoInput from './todoInput'
import TodoItem from './todoItem'
import './todos.scss'


class Todos extends React.Component<any> {

    get unDeletedTodos () {
        return this.props.todos.filter((t:any) => !t.deleted)
    }

    get unCompletedTodos () {
        return this.unDeletedTodos.filter((t: any) => !t.completed)
    }

    get completedTodos() {
        return this.unDeletedTodos.filter((t: any) => t.completed)
    }

    render () {
        return (
            <div className="Todos" id="Todos">
                <TodoInput/>
                <div className="todoLists">
                    {
                        this.unCompletedTodos.map((t: any) => 
                        <TodoItem key={t.id} {...t}/>)
                    }                 
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: { todos: any; }, ownProps: any) => ({
    todos: state.todos,
    ...ownProps
})



export default connect(mapStateToProps)(Todos)