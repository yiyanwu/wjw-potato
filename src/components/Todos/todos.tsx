import * as React from 'react'
import TodoInput from './todoInput'
import axios from '../../config/axios'
import './todos.scss'

class Todos extends React.Component {

    addTodo = async(params:any) => {
        try{
            const response = await axios.post('todos', params)
            console.log( response.data)
        }catch(e){ throw new Error(e)}
    }

    render () {
        return (
            <div className="Todos" id="Todos">
                <TodoInput addTodo={(params:any) => this.addTodo(params)}/>
            </div>
        )
    }
}

export default Todos