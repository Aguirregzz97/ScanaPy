import * as React from 'react'

type ApiState = {
    name: string
}

type State = {
    dataFromAPI: ApiState
}

type Props  = {
}

export default class TestAPI extends React.Component<Props, State> {

    constructor(props) {
        super(props)
        this.state = {
            dataFromAPI: null
        }
    }

    componentDidMount() {
        fetch('http://192.168.1.132:5000')
        .then(d => d.json())
        .then(d => {
            this.setState({
                dataFromAPI: d
            })
            console.log(this.state.dataFromAPI)
        })
    }

    render() {
        if (!this.state.dataFromAPI) return (
            <div>
                <h1>loading...</h1>
            </div>
        )
        return (
            <div>
                <h1>This is test</h1>
                <h1>{this.state.dataFromAPI.name}</h1>
            </div>
        )
    }
}