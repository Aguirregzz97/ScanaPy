import * as React from 'react'
import { SpringGrid, makeResponsive } from 'react-stonecutter'

const Grid = makeResponsive(SpringGrid, { maxWidth: 1920 })

const computer = require('./../assets/img/computer.png')


type ApiState = {
    name: string
}

type State = {
    dataFromAPI: ApiState
    arrayComputer: any[]
    indexSelected: number
}

type Props = {
}

export default class TestAPI extends React.Component<Props, State> {

    constructor(props) {
        super(props)
        this.state = {
            dataFromAPI: null,
            indexSelected: null,
            arrayComputer: [
                {
                    ip: '1',
                    brand: 'acer'
                },
                {
                    ip: '2',
                    brand: 'apple'
                },
                {
                    ip: '3',
                    brand: 'razr'
                },
                {
                    ip: '4',
                    brand: 'asus'
                },
                {
                    ip: '5',
                    brand: 'gigabyte'
                },
                {
                    ip: '6',
                    brand: 'dell'
                },
                {
                    ip: '7',
                    brand: 'google'
                },
                {
                    ip: '8',
                    brand: 'HP'
                },
            ],
        }
    }

    componentDidMount() {
        fetch('http://192.168.1.138:000')
            .then(d => d.json())
            .then(d => {
                this.setState({
                    dataFromAPI: d
                })
            })
    }

    selectComputer(indexSel) {
        this.setState({
            indexSelected: indexSel
        })
    }

    render() {
        if (!this.state.dataFromAPI) return (
            <div>
                <div style={{ marginBottom: '20px' }} ></div>
                <Grid
                    component='ul'
                    columns={5}
                    columnWidth={250}
                    gutterWidth={5}
                    gutterHeight={20}
                    itemHeight={200}
                    springConfig={{ stiffness: 170, damping: 26 }}
                >
                    {this.state.arrayComputer.map((num, index) => {
                        return <a href='' onClick={this.selectComputer.bind(this, index)} data-toggle='modal' data-target='#exampleModal'><img className='computerImage' src={computer} key={index} /></a>
                    })}
                </Grid>
                <div className='modal fade' id='exampleModal' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>
                    <div className='modal-dialog' role='document'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title' id='exampleModalLabel'>PC # {this.state.indexSelected + 1}</h5>
                                <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                    <span aria-hidden='true'>&times;</span>
                                </button>
                            </div>
                            <div className='modal-body'>
                            ip: {this.state.indexSelected && this.state.arrayComputer[this.state.indexSelected].ip}
                            <br/>
                            brand: {this.state.indexSelected && this.state.arrayComputer[this.state.indexSelected].brand}
                            </div>
                            <div className='modal-footer'>
                                <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
                                <button type='button' className='btn btn-primary'>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
        return (
            <div>
            </div>
        )
    }
}