import * as React from 'react'
import { connect } from 'react-redux';
import _ from 'lodash'
import { format, parseISO} from 'date-fns'
import Polygon from './polygon'
import './statistics.scss'

interface statisticsProps {
    todos:any
}

class Statistics extends React.Component<statisticsProps> {
    
    get finishedTodos (){
        return this.props.todos.filter((t:any) => t.completed && !t.deleted)
    }

    get todosData (){
        const obj = _.groupBy(this.finishedTodos,(t:any)=>{
            return format(parseISO(t.updated_at),'yyyy-MM-d')
        })
        return obj
    }

    render () {
        return (
            <div className="Statistics" id="Statistics">
                <ul>
                    <li>统计</li>
                    <li>目标</li>
                    <li>番茄历史</li>
                    <li>
                        任务历史
                        累计完成任务
                        {this.finishedTodos.length}
                        <Polygon data={this.todosData} 
                            totalFinishedCount={this.finishedTodos.length}/>
                    </li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state: { todos: any; }, ownProps: any) => ({
    todos: state.todos,
    ...ownProps
})

export default connect(mapStateToProps)(Statistics)