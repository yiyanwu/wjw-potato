import * as React from 'react'
import { connect } from 'react-redux';
import _ from 'lodash'
import { format, parseISO} from 'date-fns'
import Polygon from './polygon'
import TodoHistory from './TodoHistory/todoHistory'
import TomatoHistory from './TomatoHistory/tomatoHistory'
import './statistics.scss'

interface statisticsProps {
    todos:any
    tomatoes:any
}

class Statistics extends React.Component<statisticsProps> {
    
    get finishedTodos (){
        return this.props.todos.filter((t:any) => t.completed && !t.deleted)
    }

    get finishedTomatoes(){
        return this.props.tomatoes.filter((t:any) => t.description && !t.aborted && t.ended_at)
    }

    get tomatoData (){
        return _.groupBy(this.finishedTomatoes, (t: any) => {
            return format(parseISO(t.started_at), 'yyyy-MM-d')
        })
    }

    get todosData (){
        return _.groupBy(this.finishedTodos,(t:any)=>{
            return format(parseISO(t.updated_at),'yyyy-MM-d')
        })
    }

    render () {
        return (
            <div className="Statistics" id="Statistics">
                <ul>
                    <li>统计</li>
                    <li>
                        <div className="gragh">
                            <div className="title">番茄历史</div>
                            <span className="textTitle">累计完成番茄</span>
                            <span className="number">{this.finishedTomatoes.length}</span>
                        </div>
                        <Polygon data={this.tomatoData}
                            totalFinishedCount={this.finishedTomatoes.length} />
                    </li>
                    <li>
                        <div className="gragh">
                            <div className="title">任务历史</div>
                            <span className="textTitle">累计完成任务</span>
                            <span className="number">{this.finishedTodos.length}</span>
                        </div>
                        <Polygon data={this.todosData}
                            totalFinishedCount={this.finishedTodos.length} />
                    </li>
                </ul>
                <TomatoHistory/>
                {/* <TodoHistory /> */}
            </div>
        )
    }
}

const mapStateToProps = (state: { todos: any;tomatoes:any }, ownProps: any) => ({
    todos: state.todos,
    tomatoes: state.tomatoes,
    ...ownProps
})

export default connect(mapStateToProps)(Statistics)