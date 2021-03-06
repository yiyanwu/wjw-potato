import * as React from 'react'

interface PolygonProps {
    data:any
    totalFinishedCount:number
}



class Polygon extends React.Component<PolygonProps> {
    

    points = ()=> {
        const dates = Object.keys(this.props.data).sort((a,b) =>{
            return Date.parse(a) - Date.parse(b)
        })
        const firstDay = dates[0]
        if(firstDay){
            const range = new Date().getTime() - Date.parse(firstDay)
            let finishedCount = 0
            let lastY
            const pointArr = dates.map(date => {
                if(date === firstDay){
                    lastY = 0
                    return ''
                }
                const x = (Date.parse(date) - Date.parse(firstDay))/range * 332
                finishedCount += this.props.data[date].length
                const y = (1 - (finishedCount/this.props.totalFinishedCount)) * 60
                lastY = y
                return `${x},${y}`
            })
            return ['0,60',...pointArr,`332,${lastY}`,'332,60'].join(' ')
        }else{
            return "0,60 332,60"
        }
    }

    render() {
        return (
            <div className="Polygon" id="Polygon">
                <svg>
                    <polygon fill="rgba(215,78,78,0.1)" 
                        stroke="rgba(215,78,78,0.5)" strokeWidth="1" 
                        points={this.points()} 
                    />
                </svg>
            </div>
        )
    }
}

export default Polygon