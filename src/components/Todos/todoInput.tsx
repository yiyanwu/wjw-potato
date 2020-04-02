import * as React from 'react'
import { Input } from 'antd'
import { EnterOutlined, EditOutlined } from '@ant-design/icons';


interface TodoInputState {
    description: string
}

class TodoInput extends React.Component<any, TodoInputState> {
    constructor(props: any) {
        super(props)
        this.state = {
            description: ''
        }
    }

    onChange = (e: any) => {
        this.setState({ description: e.target.value })
    }

    onKeyUp = (e: any) => {
        if (e.keyCode === 13 && this.state.description !== '') {
            this.addTodo()
        }
    }

    addTodo = () => {
        this.props.addTodo({ description: this.state.description })
        this.setState({ description: '' })
    }

    render() {
        const { description } = this.state
        const enterOutlined = description ? <EnterOutlined onClick={this.addTodo} /> : <span />
        return (
            <div className="TodoInput" id="TodoInput">
                <Input
                    placeholder="添加新任务"
                    prefix={<EditOutlined />}
                    suffix={enterOutlined}
                    value={description}
                    onChange={this.onChange}
                    onKeyUp={this.onKeyUp}
                />
            </div>
        )
    }
}

export default TodoInput