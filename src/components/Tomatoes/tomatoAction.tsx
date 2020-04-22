import * as React from 'react'
import { Button, Input } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import axios from '../../config/axios'
import CountDown from './countDown'


interface tomatoActionProps {
    startTomato:() => void,
    updateTomato: (payload:any)=> void,
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

    onFinish = () => {
        this.render()
    }

    addDiscription = async () => {
        try {
            const response = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`,
            { description: this.state.discription, ended_at: new Date()})
            this.props.updateTomato(response.data.resource)
            this.setState({discription:''})
        } catch (error) {
            throw new Error(error)
        }
    }

    render() {
        let html = <div/>
        if (this.props.unfinishedTomato === undefined){
            html = <Button onClick={this.props.startTomato}>开始番茄</Button>
        }else{
            const startedAt = Date.parse(this.props.unfinishedTomato.started_at)
            const duration = this.props.unfinishedTomato.duration
            const timeNow = new Date().getTime()
            if(timeNow - startedAt > duration){
                html = <div>
                    <Input  placeholder="刚刚完成了什么事？"
                        value={this.state.discription}
                        onChange={(e:any) => {this.setState({discription:e.target.value})}}
                        onKeyUp={this.onKeyUp}
                    />
                    <CloseCircleOutlined />
                </div>
            }else if (timeNow - startedAt < duration){
                const timer = duration - timeNow + startedAt
                html = <CountDown timer={timer} onFinish={this.onFinish}/>
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