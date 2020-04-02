import * as React from 'react'

class todoItem extends React.Component <any> {
    constructor(props:any) {
        super(props)
        console.log(props)
    }

    render () {
        return (
            <div className="todoItem" id="todoItem">
                <span>{this.props.description}</span>
            </div>
        )
    }

}

export default todoItem