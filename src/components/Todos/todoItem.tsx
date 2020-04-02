import * as React from 'react'
import { Checkbox } from 'antd';

interface todoItemProps {
    id:number,
    description: string,
    completed:boolean,
    update:(id:number,params:any) => void
}

class todoItem extends React.Component<any, todoItemProps> {
    constructor(props:any) {
        super(props)
    }

    update = (params:any) => {
        this.props.update(this.props.id,params)
    }

    render () {
        return (
            <div className="todoItem" id="todoItem">
                <Checkbox 
                checked={this.props.completed} 
                onChange={e => this.update({completed:e.target.checked})}   
                />
                <span>{this.props.description}</span>
            </div>
        )
    }

}

export default todoItem