import * as React from 'react'
import { Button, Input, Popconfirm } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import axios from '../../config/axios'
import CountDown from './countDown'
import './tomatoAction.scss'

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
            this.updateTomato({ description: this.state.discription,
                 ended_at: new Date() })
            this.setState({ discription: '' })
        }
    }

    onFinish = () => {
        this.forceUpdate()
    }

    abortTomato = () => {
        this.updateTomato({aborted:true})
    }

    updateTomato = async(params:any) => {
        try {
            const response = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`, params)
            this.props.updateTomato(response.data.resource)
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
                html = <div className="inputWrapper">
                    <Input  placeholder="刚刚完成了什么事？"
                        value={this.state.discription}
                        onChange={(e:any) => {this.setState({discription:e.target.value})}}
                        onKeyUp={this.onKeyUp}
                    />
                    <Popconfirm placement="bottom"
                        onConfirm={this.abortTomato}
                        okText="确定"
                        cancelText="取消"
                        title="您目前正在一个番茄工作时间中，要放弃这个番茄吗？">
                        <CloseCircleOutlined
                            className="abort" />
                    </Popconfirm>
                </div>
            }else if (timeNow - startedAt < duration){
                const timer = duration - timeNow + startedAt
                html = (
                    <div className="countDownWrapper">
                        <CountDown timer={timer} 
                            duration={duration}
                            onFinish={this.onFinish} />
                        <Popconfirm placement="bottom"
                            onConfirm={this.abortTomato}
                            okText="确定"
                            cancelText="取消"
                            title="您目前正在一个番茄工作时间中，要放弃这个番茄吗？">
                            <CloseCircleOutlined
                                className="abort" />
                        </Popconfirm>
                    </div>
                )
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