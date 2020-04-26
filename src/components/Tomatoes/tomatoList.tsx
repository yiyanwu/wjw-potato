import * as React from 'react'
import { format, parseISO} from 'date-fns'
import './tomatoList.scss'

interface tomatoListProps {
    finishedTomatoes:any
}

const TomatoItem = function (props:any){
    return (
        <div className="content">
            <span className="time">{format(parseISO(props.started_at), 'HH:mm')} - {format(parseISO(props.ended_at), 'H:mm')}</span>
            <span className="description">{props.description}</span>
        </div>
    )
}

class TomatoList extends React.Component<tomatoListProps> {
    
    get dates (){
        const dates = Object.keys(this.props.finishedTomatoes)
        return dates.sort((a,b)=>Date.parse(b) - Date.parse(a))
    }

    render(){
        const list = this.dates.map((d) => {
            const tomatoes = this.props.finishedTomatoes[d]
            return(
                <div key={d} className="List">
                    <div className="title">
                        <span>{d}</span>
                        <span>完成了 {tomatoes.length} 个番茄</span>
                    </div>
                    {tomatoes.map((t: any) => <TomatoItem key={t.id} {...t}/>)}
                </div>
            )
        })

        return(
            <div className="TomatoList" id="TomatoList">
                {list}
            </div>
        )
    }
}

export default TomatoList