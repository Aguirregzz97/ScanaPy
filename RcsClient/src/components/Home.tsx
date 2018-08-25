import * as React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Navbar from './navbar'


type State = {
}

type Props = {
}

export default class Home extends React.Component<Props, State> {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Navbar />
            </div>
        )
    }
}