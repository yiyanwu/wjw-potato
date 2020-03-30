import * as React from 'react'
import { Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from '../../config/axios'
import { Link, withRouter} from 'react-router-dom'
import './login.scss'


interface LoginState {
    account: string,
    password: string
   
}

class Login extends React.Component<any, LoginState> {
    constructor(props: any) {
        super(props)
        this.state = {
            account: '',
            password: ''
        };
    }

    onChangeAccount = (e: any) => {
        this.setState({ account: e.target.value })
    }

    onChangePassword = (e: any) => {
        this.setState({ password: e.target.value })
    }


    submit = async () => {
        const { account, password } = this.state
        try {
            await axios.post('sign_in/user', {
                account,
                password
            })
            this.props.history.push('/')
        } catch (e) {
            throw new Error(e)
        }
    }

    render() {
        const { account, password } = this.state
        return (
            <div className="Login" id="Login">
                <h1>W-番茄闹钟登录</h1>
                <Input
                    placeholder="请输入用户名"
                    value={account}
                    onChange={this.onChangeAccount}
                    prefix={<UserOutlined className="site-form-item-icon" />}
                />
                <Input.Password
                    placeholder="请输入密码"
                    value={password}
                    onChange={this.onChangePassword}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                />
                <Button
                    onClick={this.submit}
                    className="loginButton"
                    type="primary">登录</Button>
                <p>如果你没有账号，请<Link to='/signup'>注册</Link></p>
            </div>
        )
    }
}

export default withRouter(Login)