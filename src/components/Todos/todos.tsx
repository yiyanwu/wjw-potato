import * as React from 'react'
import TodoInput from './todoInput'
import TodoItem from './todoItem'
import axios from '../../config/axios'
import './todos.scss'

interface todoState {
    todos:any[]
}

class Todos extends React.Component<any,todoState> {
    constructor(props:any) {
        super(props)
        this.state = {
            todos:[]
        }
    }



    addTodo = async(params:any) => {
        const {todos} = this.state
        try{
            const response = await axios.post('todos', params)
            const newTodo = [response.data.resource,...todos]
            this.setState({todos:newTodo})
        }catch(e){ }
    }

    componentDidMount() {
        this.getTodo()
    }

    getTodo = async () => {
        try {
            const response = await axios.get('todos')
            const todos = response.data.resources.map((t:any) =>Object.assign({},t,{editing:false}))
            this.setState({todos:todos})
        } catch (e) {
            
        }
    }
     
    updateTodo = async(id:number,params:any) => {
        const {todos} = this.state
        try {
            const response = await axios.put(`todos/${id}`,params)
            const newTodos = todos.map(t => {
                if(id === t.id){
                    return response.data.resource
                } else {
                    return t
                }
            })
            this.setState({todos:newTodos})
        } catch (error) {
            
        }
    }

    isEditing = (id:number) => {
        const {todos} = this.state
        const newTodo = todos.map((t:any) => {
            if(id === t.id) {
                return Object.assign({}, t, { editing:true})
            } else {
                return Object.assign({}, t, { editing:false})
            }
        }) 
        this.setState({todos:newTodo})
    }

    render () {
        return (
            <div className="Todos" id="Todos">
                <TodoInput addTodo={(params:any) => this.addTodo(params)}/>
                <main>
                    {
                        this.state.todos.map(t => <TodoItem key={t.id} {...t}
                        update={this.updateTodo}
                        isEditing={this.isEditing}/>)
                    }
                </main>
            </div>
        )
    }
}

export default Todos