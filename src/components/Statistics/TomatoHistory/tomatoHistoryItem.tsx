import * as React from 'react'
import { connect } from 'react-redux'
import { format, parseISO } from 'date-fns'
import { updateTomato } from '../../../redux/actions/tomatoes'
import axios from '../../../config/axios'
import './tomatoHistoryItem.scss'

interface tomatoHistoryItemProps {
    tomato: any
    updateTomato: (payload: any) => void,
    itemType: string
}

interface tomatoHistoryItemState {
    description:string
}

class TomatoHistoryItem extends React.Component<tomatoHistoryItemProps, tomatoHistoryItemState> {
    constructor(props:any){
        super(props)
        this.state = {
            description:this.props.tomato.description
        }
    }

    updateTomato = async (params: any) => {
        try {
            const response = await axios.put(`tomatoes/${this.props.tomato.id}`, params)
            this.props.updateTomato(response.data.resource)
        } catch (error) {
            throw new Error(error)
        }
    }

    onKeyUp = (e:any) =>{
        if (e.keyCode === 13 && this.state.description !== '') {
            this.updateTomato({ description: this.state.description, extra: {}})
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
            description = this.props.tomato.description
            action = (
                <div className="action">
                    <span onClick={() => this.updateTomato({ extra: {editing:true} })}>编辑</span>
                    <span onClick={() => this.updateTomato({ deleted: true })}>删除</span>
                </div>
            )
        } else if (this.props.itemType === 'aborted') {
            formatTime = format(parseISO(this.props.tomato.created_at), 'yyyy-MM-dd HH:mm')
            description = this.props.tomato.description ? this.props.tomato.description:'无番茄描述'
            action = (
                <div className="action">
                    <span onClick={() => this.updateTomato({ extra: { editing: true } })}>编辑</span>
                </div>
            )
        }

        const editingAction = (
            <div className="action">
                <span onClick={() => this.updateTomato({ description: this.state.description, extra: {} })}>提交</span>
                <span onClick={() => this.updateTomato({ extra: {} })}>取消</span>
            </div>
        )

        const editing = (
            <div className="itemWrapper">
                <div className="text">
                    <span className="time">{formatTime}</span>
                    <input className="editing" value={this.state.description}
                        onChange={(e: any) => { this.setState({ description: e.target.value }) }}
                        onKeyUp={this.onKeyUp} />
                </div>
                {editingAction}
            </div>
        )

        const historyItem = (
            <div className="itemWrapper">
                <div className="text">
                    <span className="time">{formatTime}</span>
                    <span className="description">{description}</span>
                </div>
                {action}
            </div>
        )
        
        return (
            <div className="TomatoHistoryItem" id="TomatoHistoryItem">
                {
                    (JSON.stringify(this.props.tomato.extra) === `{"editing":true}`)  ? editing : historyItem
                }
            </div>
        )
    }
}

const mapStateToProps = (state: { todos: any; }, ownProps: any) => ({
    ...ownProps
})

const mapDispatchToProps = {
    updateTomato
}

export default connect(mapStateToProps, mapDispatchToProps)(TomatoHistoryItem)