import * as React from 'react'
import { connect } from 'react-redux';
import { initTodos } from '../../redux/actions/todos'
import TodoInput from './todoInput'
import TodoItem from './todoItem'
import axios from '../../config/axios'
import './todos.scss'


class Todos extends React.Component<any> {
    constructor(props:any) {
        super(props)
    }

    get unDeletedTodos () {
        return this.props.todos.filter((t:any) => !t.deleted)
    }

    get unCompletedTodos () {
        return this.unDeletedTodos.filter((t: any) => !t.completed)
    }

    get completedTodos() {
        return this.unDeletedTodos.filter((t: any) => t.completed)
    }

    componentDidMount() {
        this.getTodo()
    }

    getTodo = async () => {
        try {
            const response = await axios.get('todos')
            const todos = response.data.resources.map((t:any) =>Object.assign({},t,{editing:false}))
            this.props.initTodos(todos)
        } catch (e) {throw new Error(e)}
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

const mapDispatchToProps = {
    initTodos
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos)