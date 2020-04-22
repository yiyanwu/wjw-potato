import * as React from 'react'

interface countDownProps {
    timer:number
    onFinish:() => void
}

interface countDownState {
    countDown:number
}

let timeId: NodeJS.Timeout 

class CountDown extends React.Component<countDownProps, countDownState> {
    constructor(props:any){
        super(props)
        this.state = {
            countDown:this.props.timer
        }
    }

    get countDown (){
        const { countDown } = this.state
        const min = Math.floor(countDown / 1000 / 60)
        const second = Math.floor(countDown / 1000 % 60)
        return `${min < 10 ? `0${min}` : min}:${second < 10 ? `0${second}` : second}`  
    }

    componentDidMount(){
        timeId = setInterval(()=>{
            let time = this.state.countDown
            document.title = `${this.countDown} - WJW Potato`
            this.setState({ countDown:time - 1000})
            if(time < 1000){
                this.props.onFinish()
                clearInterval(timeId)
            }
        },1000)
    }

    componentWillUnmount(){
        clearInterval(timeId)
    }

    render (){

        return (
            <div className="CountDown" id="CountDown">
                {this.countDown}
            </div>
        )
    }
}

export default CountDown