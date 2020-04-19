import * as React from 'react'
import { Button,Input } from 'antd';
import axios from '../../config/axios'

interface tomatoActionProps {
    startTomato:() => void,
    unfinishedTomato:any
}

interface TomatoActionState {
    discription:string
}

class TomatoAction extends React.Component<tomatoActionProps, TomatoActionState> {
    constructor(props:any) {
        super(props)
        this.state = {
            discription:''
        }
    }
    
    onKeyUp = (e: any) => {
        if (e.keyCode === 13 && this.state.discription !== '') {
            this.addDiscription()
        }
    }

    addDiscription = async () => {
        try {
            const response = await axios.put(`tomatoes/${this.props.unfinishedTomato.id,
            { discription:this.state.discription}}`)
            console.log(response)
            this.setState({discription:''})
        } catch (error) {
            throw new Error(error)
        }
    }

    render() {
        let html = <div/>
        if(this.props.unfinishedTomato === undefined){
            html = <Button onClick={this.props.startTomato}>开始番茄</Button>
        }else{
            const startedAt = Date.parse(this.props.unfinishedTomato.started_at)
            const duration = this.props.unfinishedTomato.duration
            const timeNow = new Date().getTime()
            if(timeNow - startedAt > duration){
                html = <div>
                    <Input  value={this.state.discription}
                        onChange={(e:any) => {this.setState({discription:e.target.value})}}
                        onKeyUp={this.onKeyUp}
                    />
                </div>
            }else if (timeNow - startedAt < duration){
                html = <div></div> //倒计时
            }
        }

        return (
            <div className="TomatoAction" id="TomatoAction">
                {html}
            </div>
        )
    }
}

export default TomatoAction