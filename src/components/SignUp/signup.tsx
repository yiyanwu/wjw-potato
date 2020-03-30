import * as React from 'react'
import { Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from '../../config/axios'
import { Link,withRouter } from 'react-router-dom'
import './signup.scss'


interface SignUpState {
    account: string,
    password: string,
    passwordConfirmation: string
}

class SignUp extends React.Component<any, SignUpState> {
    constructor(props: any) {
        super(props)
        this.state = {
            account: '',
            password: '',
            passwordConfirmation: ''
        };
    }

    onChangeAccount = (e: any) => {
        this.setState({ account: e.target.value })
    }

    onChangePassword = (e: any) => {
        this.setState({ password: e.target.value })
    }

    onChangePasswordConfirmation = (e: any) => {
        this.setState({ passwordConfirmation: e.target.value })
    }

    submit = async () => {
        const { account, password, passwordConfirmation } = this.state
        try {
            await axios.post('sign_up/user', {
                account,
                password,
                password_confirmation: passwordConfirmation
            })
            this.props.history.push('/')
        } catch (e) {
            throw new Error(e)
        }
    }

    render() {
        const { account, password, passwordConfirmation } = this.state
        return (
            <div className="SignUp" id="SignUp">
                <h1>W-番茄闹钟注册</h1>
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
                <Input.Password
                    placeholder="请确认密码"
                    value={passwordConfirmation}
                    onChange={this.onChangePasswordConfirmation}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                />
                <Button
                    onClick={this.submit}
                    className="signUpButton"
                    type="primary">注册</Button>
                <p>如果你有账号，请<Link to='/login'>登录</Link></p>
            </div>
        )
    }
}

export default withRouter(SignUp)