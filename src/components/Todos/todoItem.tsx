import * as React from 'react'
import { connect } from 'react-redux';
import { editTodo, updateTodo } from '../../redux/actions/todos'
import { Checkbox } from 'antd';
import { EnterOutlined, DeleteFilled } from '@ant-design/icons';
import axios from '../../config/axios'
import classNames from 'classnames'
import './todoItem.scss'

interface todoItemProps {
    id:number,
    description: string,
    completed:boolean,
    editing:boolean,
    updateTodo:(payload:any) => any,
    editTodo:(id:number) => any
}

interface todoItemText {
    itemText:string
}

class todoItem extends React.Component<todoItemProps, todoItemText> {
    constructor(props:any) {
        super(props)
        this.state = {
            itemText: this.props.description
        }
    }

    updateTodo = async (params: any) => {
        try {
            const response = await axios.put(`todos/${this.props.id}`, params)
            this.props.updateTodo(response.data.resource)
        } catch (error) {
            throw new Error(error)
        }
    }

    editTodo = () => { 
        this.props.editTodo(this.props.id)
    }

    onkeyUp = (e:any) => {
        if(e.keyCode === 13 && this.state.itemText !== '') {
            this.updateTodo({description: this.state.itemText})
        }
    }

    onClick = () => {
        if (this.state.itemText !== '') {
            this.updateTodo({ description: this.state.itemText })
        }
    }

    render () {
        const editing = (
            <div className="editing">
                <input value={this.state.itemText} 
                onChange={(e:any) => {this.setState({itemText:e.target.value})}}
                onKeyUp={this.onkeyUp}/>
                <div className="iconWrapper">
                    <EnterOutlined onClick={this.onClick}/>
                    <DeleteFilled onClick={(e) => { this.updateTodo({deleted:true})}}/>
                </div>
            </div>
        );
        
        const Text = <span className="text" onDoubleClick={this.editTodo}>{this.props.description}</span>;

        const todoItemClass = classNames({
            todoItem:true,
            editing:this.props.editing,
            completed:this.props.completed
        })

        return (
            <div className={todoItemClass} id="todoItem">
                <Checkbox 
                checked={this.props.completed} 
                    onChange={e => this.updateTodo({completed:e.target.checked})}   
                />
                { this.props.editing ? editing :Text }
            </div>
        )
    }

}

const mapStateToProps = (state: { todos: any; }, ownProps: any) => ({
    ...ownProps
})

const mapDispatchToProps = {
    editTodo, 
    updateTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(todoItem)