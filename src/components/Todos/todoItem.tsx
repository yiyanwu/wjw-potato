import * as React from 'react'
import { Checkbox } from 'antd';

interface todoItemProps {
    id:number,
    description: string,
    completed:boolean,
    editing:boolean,
    update:(id:number,params:any) => void,
    isEditing:(id:number) => void
}

class todoItem extends React.Component<any, todoItemProps> {
    constructor(props:any) {
        super(props)
    }

    update = (params:any) => {
        this.props.update(this.props.id,params)
    }

    isEditing = () => { 
        this.props.isEditing(this.props.id)
    }

    render () {
        return (
            <div className="todoItem" id="todoItem">
                <Checkbox 
                checked={this.props.completed} 
                onChange={e => this.update({completed:e.target.checked})}   
                />
                {
                    this.props.editing ? 
                    <input value={this.props.description} /> :
                    <span onDoubleClick={this.isEditing}>{this.props.description}</span>
                }
            </div>
        )
    }

}

export default todoItem