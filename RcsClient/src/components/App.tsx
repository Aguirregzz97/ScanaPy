import * as React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './../assets/scss/App.scss'
import Home from './Home'


type State = {
  currentSeason: string
}

type Props = {
}

export default class App extends React.Component<Props, State> {

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Home />
      </div>
    )
  }
}