import * as React from 'react'
import {  Menu, Dropdown } from 'antd'
import { DownOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import axios from '../../config/axios'
import { connect} from 'react-redux'
import { initTodos } from '../../redux/actions/todos'
import { initTomatoes } from '../../redux/actions/tomatoes'
import Todos from '../Todos/todos'
import Tomatoes from '../Tomatoes/tomatoes'
import Statistics from '../Statistics/statistics'
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
        await this.getTodo()
        await this.getTomatoes()
    }

    getMe = async () => {
        const response = await axios.get('me')
        this.setState({ user: response.data })
    }

    getTodo = async () => {
        try {
            const response = await axios.get('todos')
            const todos = response.data.resources.map((t: any) => Object.assign({}, t, { editing: false }))
            this.props.initTodos(todos)
        } catch (e) { throw new Error(e) }
    }

    getTomatoes = async () => {
        try {
            const response = await axios.get('tomatoes')
            this.props.initTomatoes(response.data.resources)
        } catch (error) {
            throw new Error(error)
        }
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
                    <span className="Logo">WJW-番茄土豆</span>
                    <Dropdown overlay={this.menu} trigger={['click']}>
                        <span className="User">
                            {this.state.user.account} <DownOutlined style={{ marginLeft: 8 }}/>
                        </span>
                    </Dropdown>
                </header>
                <main>
                    <Tomatoes />
                    <Todos />
                </main>
                <div>   
                    <Statistics />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: { todos: any; }, ownProps: any) => ({
    ...ownProps
})

const mapDispatchToProps = {
    initTodos,
    initTomatoes
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))