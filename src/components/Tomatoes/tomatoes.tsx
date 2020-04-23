import * as React from 'react'
import TomatoAction from './tomatoAction'
import TomatoList from './tomatoList'
import {connect} from 'react-redux'
import { addTomato, initTomatoes, updateTomato} from '../../redux/actions/tomatoes'
import _ from 'lodash'
import { format, parseISO} from 'date-fns'
import axios from '../../config/axios'
import './tomatoes.scss'

interface tomatoesProps {
    addTomato:(payload:any)=> any,
    updateTomato: (payload: any) => any,
    tomatoes: any[],
    initTomatoes: (payload:any[]) => any
}

class Tomatoes extends React.Component<tomatoesProps>{
    constructor(props:any){
        super(props)
    }

    componentDidMount(){
        this.getTomatoes()
    }

    get unfinishedTomato () {
        return this.props.tomatoes.filter((t:any) => 
            !t.description && !t.ended_at && !t.aborted)[0]
        
    }

    get finishedTomatoes () {
        const finishedTomatoes = this.props.tomatoes.filter((t: any) =>
            t.description && t.ended_at && !t.aborted)
        const obj = _.groupBy(finishedTomatoes,(t) => {
            return format(parseISO(t.started_at),'yyyy-MM-d')
        })
        return obj
    }

    getTomatoes = async () => {
        try {
            const response = await axios.get('tomatoes')
            this.props.initTomatoes(response.data.resources)
        } catch (error) {
            throw new Error(error)
        }
    }

    startTomato = async () => {
        try {
            const response = await axios.post('tomatoes', { duration: 1500000 })
            this.props.addTomato(response.data.resource)
        } catch (error) {
            throw new Error(error)
        }
    }

    render() {
        return(
            <div className="Tomatoes" id="Tomatoes">
                <TomatoAction 
                    startTomato={this.startTomato}
                    unfinishedTomato={this.unfinishedTomato}
                    updateTomato={this.props.updateTomato}/>
                <TomatoList finishedTomatoes={this.finishedTomatoes}/>
            </div>
        )
    }
}

const mapStateToProps = (state: { tomatoes: any; }, ownProps: any) => ({
    tomatoes: state.tomatoes,
    ...ownProps
})

const mapDispatchToProps = {
    addTomato,
    initTomatoes,
    updateTomato
}

export default connect(mapStateToProps, mapDispatchToProps)(Tomatoes)