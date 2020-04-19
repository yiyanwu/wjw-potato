import * as React from 'react'
import TomatoAction from './tomatoAction'
import {connect} from 'react-redux'
import { addTomato} from '../../redux/actions/tomatoes'
import './tomatoes.scss'

class Tomatoes extends React.Component {
    render() {
        return(
            <div className="Tomatoes" id="Tomatoes">
                <TomatoAction />
            </div>
        )
    }
}

const mapStateToProps = (state: { tomatoes: any; }, ownProps: any) => ({
    tomatoes: state.tomatoes,
    ...ownProps
})

const mapDispatchToProps = {
    addTomato
}

export default connect(mapStateToProps, mapDispatchToProps)(Tomatoes)