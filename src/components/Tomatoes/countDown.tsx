import * as React from 'react'

interface countDownProps {
    timer:number
}

interface countDownState {
    countDown:number
}

class CountDown extends React.Component<countDownProps, countDownState> {
    constructor(props:any){
        super(props)
        this.state = {
            countDown:this.props.timer
        }
    }

    componentDidMount(){
        setInterval(()=>{
            let time = this.state.countDown
            this.setState({ countDown:time - 1000})
            if(time < 0){
                //完成倒计时 清除interval
            }
        },1000)
    }

    render (){
        const { countDown} = this.state
        const min = Math.floor(countDown/1000/60)
        const second = Math.floor(countDown/1000%60)
        const time = `${min<10?`0${min}`:min}:${second<10?`0${second}`:second}`

        return (
            <div className="CountDown" id="CountDown">
                {time}
            </div>
        )
    }
}

export default CountDown