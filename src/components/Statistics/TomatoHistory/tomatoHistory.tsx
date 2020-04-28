import * as React from 'react'
import { connect } from 'react-redux'
import { format, parseISO } from 'date-fns'
import { Tabs } from 'antd'
import TomatoHistoryItem from './tomatoHistoryItem'
import _ from 'lodash'
import './tomatoHistory.scss'

interface tomatoHistoryProps {
    tomatoes: any[]
}

const { TabPane } = Tabs;


class TomatoHistory extends React.Component<tomatoHistoryProps> {

    get finishedTomatoes() {
        return this.props.tomatoes.filter(t => t.description && !t.aborted && t.ended_at)
    }

    get abortedTomatoes() {
        return this.props.tomatoes.filter(t => t.aborted)
    }

    get dailyFinishedTomatoes() {
        return _.groupBy(this.finishedTomatoes, (t: any) => {
            return format(parseISO(t.started_at), 'yyyy-MM-d')
        })
    }

    get finishedDates() {
        return Object.keys(this.dailyFinishedTomatoes).sort((a, b) => Date.parse(b) - Date.parse(a))
    }

    render() {
        const finishedTomatoList = this.finishedDates.map(date => {
            return (
                <div key={date} className="dailyTomatoes">
                    <div className="summary">
                        <p className="date">
                            <span>{date}</span>
                            <span>周日</span>
                        </p>
                        <span className="finishedCount">完成了{this.dailyFinishedTomatoes[date].length}个番茄</span>
                    </div>
                    <div className="tomatoList">
                        {
                            this.dailyFinishedTomatoes[date].map(tomato =>
                                <TomatoHistoryItem key={tomato.id}
                                    tomato={tomato} itemType="finished" />)
                        }
                    </div>
                </div>
            )
        })

        const abortedTomatoList = this.abortedTomatoes.map(tomato => {
            return (
                <TomatoHistoryItem key={tomato.id} tomato={tomato} itemType="aborted" />
            )
        })

        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="完成的番茄" key="1">
                    <div className="TomatoHistory" id="TomatoHistory">
                        {finishedTomatoList}
                    </div>
                </TabPane>
                <TabPane tab="打断记录" key="2">
                    <div className="TomatoHistory" id="TomatoHistory">
                        {abortedTomatoList}
                    </div>
                </TabPane>
            </Tabs>
        )
    }
}

const mapStateToProps = (state: { tomatoes: any; }, ownProps: any) => ({
    tomatoes: state.tomatoes,
    ...ownProps
})

export default connect(mapStateToProps)(TomatoHistory)