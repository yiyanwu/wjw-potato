import * as React from 'react'
import { connect } from 'react-redux';
import { addTodo } from '../../redux/actions'
import axios from '../../config/axios'
import { Input } from 'antd'
import { EnterOutlined, EditOutlined } from '@ant-design/icons';


interface TodoInputState {
    description: string
}

interface todoInputProps {
    addTodo:(payload:any) => any
}

class TodoInput extends React.Component<any, TodoInputState, todoInputProps> {
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
            this.postTodo()
        }
    }

    postTodo = async() => {
        try {
            const response = await axios.post('todos', { description: this.state.description })
            this.props.addTodo(response.data.resource)
        } catch (e) {
            throw new Error(e)
        }
        this.setState({ description: '' })
    }

    render() {
        const { description } = this.state
        const enterOutlined = description ? <EnterOutlined onClick={this.postTodo} /> : <span />
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

const mapStateToProps = (state: { todos: any; }, ownProps: any) => ({
    ...ownProps
})

const mapDispatchToProps = {
    addTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput)