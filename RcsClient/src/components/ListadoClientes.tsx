import * as React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ListadoClientesResultTable from './ListadoClientesResultTable'
import { RingLoader } from 'react-spinners'


type DataState = {
    key: number,
    firstName: string
}


type State = {
    dataState: DataState[],
    fromKeyState: number,
    toKeyState: number,
    showList: boolean
}

type Props = {
}

export default class ListadoClientes extends React.Component<Props, State> {

    constructor(props) {
        super(props)
        this.state = {
            dataState: null,
            fromKeyState: null,
            toKeyState: null,
            showList: false
        }
    }

    componentDidMount() {
        fetch('http://localhost:51705/api/Clients/get')
            .then(d => d.json())
            .then(d => {
                this.setState({
                    dataState: d
                })
            })
    }

    handleFromChange = (event => {
        this.setState({
            fromKeyState: parseInt(event.target.value)
        })
    })

    handleToChange = (event => {
        this.setState({
            toKeyState: parseInt(event.target.value)
        })
    })

    createList = (event => {
        event.preventDefault()
        let newTable: DataState[] = []
        for (let i in this.state.dataState) {
            if (this.state.dataState[i].key >= this.state.fromKeyState && this.state.dataState[i].key <= this.state.toKeyState) {
                newTable.push(this.state.dataState[i])
            }
        }
        if (this.state.fromKeyState > this.state.toKeyState) {
            alert('Datos capturados incorrectamente')
        }
        else {
            this.setState({
                dataState: newTable,
                showList: true
            })
        }
        console.log(newTable)
        console.log(this.state.dataState)
    })

    render() {
        if (!this.state.dataState) return (
            <div style={{ display: 'block', margin: '0 auto', borderColor: 'red', marginTop: '50px' }}>
                <RingLoader
                    color={'#002BFF'}
                    size={200}
                />
            </div>
        )
        if (this.state.showList === true) return (
            <ListadoClientesResultTable dataProp={this.state.dataState} />
        )
        return (
            <div>
                <h1 style={{ fontSize: '35px', marginBottom: '20px' }} className='text-center'>Listado de clientes</h1>
                <form onSubmit={this.createList}>
                    <div className='row'>
                        <div className='col-2 offset-1'>
                            <h5 className='text-center'>Key</h5>
                            <div className='form-group'>
                                <label>From</label>
                                <input className='form-control text-center inputStyle' type='number' onChange={this.handleFromChange} />
                            </div>
                            <div className='form-group'>
                                <label>To</label>
                                <input className='form-control text-center inputStyle' type='number' onChange={this.handleToChange} />
                            </div>
                        </div>
                    </div>
                    <div className='text-center'>
                        <button className='btn btn-primary' type='submit'>Crear listado <span className='fa fa-list' aria-hidden='true'></span></button>
                    </div>
                </form>
            </div>
        )
    }
}