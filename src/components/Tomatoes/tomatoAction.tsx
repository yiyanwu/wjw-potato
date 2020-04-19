import * as React from 'react'
import { Button } from 'antd';
import axios from '../../config/axios'

class TomatoAction extends React.Component {

    startTomato = async() => {
        try {
            const response = await axios.post('tomatoes', {duration:1500000})
            console.log(response.data)
        } catch (error) {
            throw new Error(error)
        }
    }

    render() {
        return (
            <div className="TomatoAction" id="TomatoAction">
                <Button onClick={this.startTomato}>开始番茄</Button>
            </div>
        )
    }
}

export default TomatoAction