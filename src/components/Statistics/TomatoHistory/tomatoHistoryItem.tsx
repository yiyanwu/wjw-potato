import * as React from 'react'
import { connect } from 'react-redux'
import { format, parseISO } from 'date-fns'
import { updateTodo } from '../../../redux/actions/todos'
import axios from '../../../config/axios'
import './tomatoHistoryItem.scss'

interface tomatoHistoryItemProps {
    tomato: any
    updateTodo: (payload: any) => void,
    itemType: string
}

class TomatoHistoryItem extends React.Component<tomatoHistoryItemProps> {

    updateTodo = async (params: any) => {
        try {
            const response = await axios.put(`todos/${this.props.tomato.id}`, params)
            this.props.updateTodo(response.data.resource)
        } catch (error) {
            throw new Error(error)
        }
    }

    render() {
        let action
        let formatTime
        let description
        if (this.props.itemType === "finished") {
            const startTime = format(parseISO(this.props.tomato.started_at), 'HH:mm')
            const endTime = format(parseISO(this.props.tomato.ended_at), 'HH:mm')
            formatTime = `${startTime} - ${endTime}`
            action = (
                <div className="action">
                    <span onClick={() => this.updateTodo({ completed: false })}>恢复</span>
                    <span onClick={() => this.updateTodo({ deleted: true })}>删除</span>
                </div>
            )
        } else if (this.props.itemType === 'aborted') {
            formatTime = format(parseISO(this.props.tomato.created_at), 'yyyy-MM-dd HH:mm')
            action = (
                <div className="action">
                    <span onClick={() => this.updateTodo({ deleted: false })}>恢复</span>
                </div>
            )
        }

        return (
            <div className="TomatoHistoryItem" id="TomatoHistoryItem">
                <div className="text">
                    <span className="time">{formatTime}</span>
                    <span className="description">{this.props.tomato.description}</span>
                </div>
                {action}
            </div>
        )
    }
}

const mapStateToProps = (state: { todos: any; }, ownProps: any) => ({
    ...ownProps
})

const mapDispatchToProps = {
    updateTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(TomatoHistoryItem)