import * as React from 'react'
import { Button } from 'antd';

interface tomatoActionProps {
    startTomato:() => void,
    unfinishedTomato:any
}

class TomatoAction extends React.Component<any,tomatoActionProps> {
    constructor(props:any) {
        super(props)
    }
    

    render() {
        return (
            <div className="TomatoAction" id="TomatoAction">
                <Button onClick={this.props.startTomato}>开始番茄</Button>
            </div>
        )
    }
}

export default TomatoAction