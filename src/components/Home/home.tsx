import * as React from 'react'
import {  Menu, Dropdown } from 'antd'
import { DownOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import axios from '../../config/axios'
import Todos from '../Todos/todos'
import { withRouter } from 'react-router-dom'
import './home.scss'

interface indexState {
    user: any
}

class Home extends React.Component<any, indexState> {
    constructor(props: any) {
        super(props)
        this.state = {
            user: {}
        }
    }

    async UNSAFE_componentWillMount() {
        await this.getMe()
    }

    getMe = async () => {
        const response = await axios.get('me')
        this.setState({ user: response.data })
    }

    signOut = () => {
        localStorage.setItem('x-token', '')
        this.props.history.push('/login')
    }

    menu = (
        <Menu>
            <Menu.Item key="1"><SettingOutlined/>设置</Menu.Item>
            <Menu.Item key="2" onClick={this.signOut}><LogoutOutlined/>登出</Menu.Item>
        </Menu>
    );

    
    render() {
        return (
            <div className="Home" id="Home">
                <header>
                    <span className="Logo">LOGO</span>
                    <Dropdown overlay={this.menu} trigger={['click']}>
                        <span className="User">
                            {this.state.user.account} <DownOutlined style={{ marginLeft: 8 }}/>
                        </span>
                    </Dropdown>
                </header>
                <main>
                    <Todos />
                </main>
            </div>
        )
    }
}

export default withRouter(Home)