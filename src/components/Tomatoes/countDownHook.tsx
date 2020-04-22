import React,{useState,useEffect,FunctionComponent} from 'react'

interface countDownHookProps {
    timer: number
    onFinish: () => void
}


let timeId: NodeJS.Timeout 

const CountDwonHook: FunctionComponent<countDownHookProps> = (props) => {
    const [countDown,setCountDwon] = useState(props.timer)

    const min = Math.floor(countDown / 1000 / 60)
    const second = Math.floor(countDown / 1000 % 60)
    const time = `${min < 10 ? `0${min}` : min}:${second < 10 ? `0${second}` : second}`

    useEffect(() => {  //类似于componentDidMount和componentWillUnMount钩子
        document.title = `${time} - WJW Potato`
        timeId = setInterval(() => {
            setCountDwon(countDown - 1000)
            if (countDown < 1000) {
                props.onFinish()
                clearInterval(timeId)
            }
        }, 1000)

        return function cleanup() {  
            clearInterval(timeId)
        }
    })

    return (
        <div className="CountDown" id="CountDown">
            {time}
        </div>
    )
}

export default CountDwonHook