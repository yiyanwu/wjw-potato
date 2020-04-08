import * as React from 'react'
import { Checkbox } from 'antd';
import { EnterOutlined, DeleteFilled } from '@ant-design/icons';
import classNames from 'classnames'
import './todoItem.scss'

interface todoItemProps {
    id:number,
    description: string,
    completed:boolean,
    editing:boolean,
    update:(id:number,params:any) => void,
    isEditing:(id:number) => void
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

    update = (params:any) => {
        this.props.update(this.props.id,params)
    }

    isEditing = () => { 
        this.props.isEditing(this.props.id)
    }

    onkeyUp = (e:any) => {
        if(e.keyCode === 13 && this.state.itemText !== '') {
            this.update({description: this.state.itemText})
        }
    }

    onClick = () => {
        if (this.state.itemText !== '') {
            this.update({ description: this.state.itemText })
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
                    <DeleteFilled onClick={(e) => {this.update({deleted:true})}}/>
                </div>
            </div>
        );
        
        const Text = <span className="text" onDoubleClick={this.isEditing}>{this.props.description}</span>;

        const todoItemClass = classNames({
            todoItem:true,
            editing:this.props.editing,
            completed:this.props.completed
        })

        return (
            <div className={todoItemClass} id="todoItem">
                <Checkbox 
                checked={this.props.completed} 
                onChange={e => this.update({completed:e.target.checked})}   
                />
                { this.props.editing ? editing :Text }
            </div>
        )
    }

}

export default todoItem