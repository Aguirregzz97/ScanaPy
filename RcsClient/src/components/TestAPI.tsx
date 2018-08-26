import * as React from 'react'
import { SpringGrid, makeResponsive } from 'react-stonecutter'
import { RingLoader } from 'react-spinners'



const Grid = makeResponsive(SpringGrid, { maxWidth: 1920 })


const computer = require('./../assets/img/computer.png')


type ApiState = {
    name: string
}

type State = {
    dataFromAPI: ApiState
    arrayComputer: any[]
    indexSelected: number
    ports: any[]
}

type Props = {
}

export default class TestAPI extends React.Component<Props, State> {

    constructor(props) {
        super(props)
        this.state = {
            dataFromAPI: null,
            indexSelected: null,
            arrayComputer: null,
            ports: null
        }
    }

    componentDidMount() {

        fetch('http://192.168.1.132:5000/getActiveHosts')
            .then(d => d.json())
            .then(d => {
                this.setState({
                    arrayComputer: d.addressInfo
                })
                console.log(this.state.arrayComputer)
            })
    }

    selectComputer(indexSel) {
        this.setState({
            indexSelected: indexSel
        })
    }

    close = () => {
        this.setState({
            ports: null
        })
    }

    scan = (event) => {
        let url = new URL('http://192.168.1.132:5000/singleScan'),
            params = { ipToScan: this.state.arrayComputer[this.state.indexSelected].ipAddress }
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        fetch(String(url))
            .then(d => d.json())
            .then(d => {
                this.setState({
                    ports: d.portsInfo
                })
                console.log(this.state.ports)
            })
    }

    render() {
        if (!this.state.arrayComputer) return (
            <div>
                <div style={{ marginLeft: '42%', marginRight: '50%', marginTop: '40px' }}>
                    <RingLoader
                        size={250}
                        color={'red'}
                    />
                </div>

            </div>
        )
        return (
            <div>
                <div style={{ marginBottom: '20px' }} ></div>
                <Grid
                    component='ul'
                    columns={5}
                    columnWidth={260}
                    gutterWidth={5}
                    gutterHeight={20}
                    itemHeight={200}
                    springConfig={{ stiffness: 170, damping: 26 }}
                >
                    {this.state.arrayComputer.map((num, index) => {
                        return <div><a href='' onClick={this.selectComputer.bind(this, index)} data-toggle='modal' data-target='#exampleModal'><img className='computerImage' src={computer} key={index.toString()} /></a><h5 style={{ marginTop: '5px', fontSize: '16px' }} className='text-center white'>{this.state.arrayComputer[index].ipAddress}</h5></div>
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
                                IP: {this.state.indexSelected && this.state.arrayComputer[this.state.indexSelected].ipAddress}
                                <br />
                                MacAddress: {this.state.indexSelected && this.state.arrayComputer[this.state.indexSelected].macAddress}
                                <br />
                                Vendor: {this.state.indexSelected && this.state.arrayComputer[this.state.indexSelected].vendor}
                                <br />
                                <br />
                                {this.state.ports && this.state.ports.map((anObjectMapped, index) => {
                                    return (
                                        <p key={`${anObjectMapped.name}_{anObjectMapped.email}`}>
                                            Port Number: {anObjectMapped.portNumber} <br /> Protocol: {anObjectMapped.protocolType} <br /> Service: {anObjectMapped.serviceName} <br /> State: {anObjectMapped.stateValue}
                                        </p>
                                    )
                                })}
                            </div>
                            <div className='modal-footer'>
                                <button type='button' className='btn btn-secondary' data-dismiss='modal' onClick={this.close}>Close</button>
                                <button type='button' className='btn btn-primary' onClick={this.scan}>Scan</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}