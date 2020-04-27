import * as React from 'react'
import {connect} from 'react-redux'
import {format,parseISO} from 'date-fns'
import { updateTodo} from '../../redux/actions/todos'
import axios from '../../config/axios'
import './todoHistoryItem.scss'

interface todoHistoryItemProps {
    todo:any
    updateTodo:(payload:any) => void,
    itemType:string
}

class TodoHistoryItem extends React.Component<todoHistoryItemProps> {

    updateTodo = async(params:any)=>{
        try {
            const response = await axios.put(`todos/${this.props.todo.id}`, params)
            this.props.updateTodo(response.data.resource)
        } catch (error) {
            throw new Error(error)
        }
    }

    render(){
        let action
        let formatTime
        if(this.props.itemType === "finished"){
            formatTime = format(parseISO(this.props.todo.updated_at), 'HH:mm')
            action = (
                <div className="action">
                    <span onClick={()=> this.updateTodo({completed:false})}>恢复</span>
                    <span onClick={()=> this.updateTodo({deleted:true})}>删除</span>
                </div>
            )
        }else if(this.props.itemType === 'deleted'){
            formatTime = format(parseISO(this.props.todo.created_at), 'yyyy-MM-dd HH:mm')
            action = (
                <div className="action">
                    <span onClick={() => this.updateTodo({deleted: false})}>恢复</span>
                </div>
            )
        }

        return(
            <div className="TodoHistoryItem" id="TodoHistoryItem">
                <div className="text">
                    <span className="time">{formatTime}</span>
                    <span className="description">{this.props.todo.description}</span>
                </div>
                {action}
            </div>
        )
    }
}

const mapStateToProps = (state: { todos: any; }, ownProps: any) => ({
    ...ownProps
})

const mapDispatchToProps = {
    updateTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoHistoryItem)