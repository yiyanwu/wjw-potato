import * as React from 'react'
import { Link } from 'react-router-dom'

class Component extends React.Component {

    render(){
        return (
            <div className="Component">
                <Link to='/login'>登录</Link>
            </div>
        )
    }
}

export default Component