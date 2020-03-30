import * as React from 'react'
import { Button } from 'antd'
import axios from '../../config/axios'
import {withRouter} from 'react-router-dom'

interface indexState {
    user:any
}

class Index extends React.Component<any,indexState> {
    constructor(props:any) {
        super(props)
        this.state = {
            user:{}
        }
    }

    async UNSAFE_componentWillMount () {
        await this.getMe()
    }

    getMe = async() =>{
        try{
            const response = await axios.get('me')
            this.setState( {user: response.data})
        }catch(e){
            
        }
    }

    signOut = ()=> {
        localStorage.setItem('x-token','')
        this.props.history.push('/login')
    }
    
    render(){
        return (
            <div className="Index">
                <p>欢迎 {this.state.user.account}</p>
                <Button onClick={this.signOut}>登出</Button>
            </div>
        )
    }
}

export default withRouter(Index)