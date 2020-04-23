import * as React from 'react'

interface tomatoListProps {
    finishedTomatoes:any
}

class TomatoList extends React.Component<tomatoListProps> {
    constructor(props:any){
        super(props)
    }
    
    get dates (){
        const dates = Object.keys(this.props.finishedTomatoes)
        return dates.sort((a,b)=>Date.parse(b) - Date.parse(a))
    }

    render(){
        const list = this.dates.map((d) => {
            const tomatoes = this.props.finishedTomatoes[d]
            return(
                <div key={d}>
                    <span>{d}</span>
                    <span>完成了 {tomatoes.length} 个番茄</span>
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