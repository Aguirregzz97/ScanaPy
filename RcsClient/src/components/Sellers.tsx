import * as React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import * as matchSorter from 'match-sorter'
import { RingLoader } from 'react-spinners'
import { Popover, PopoverHeader } from 'reactstrap'

type DataState = {
    key: number,
    firstName: string
}

type DataStateClient = {
    key: number,
    firstName: string,
    lastName: string
}

type State = {
    dataState: DataState[],
    dataStateClient: DataStateClient
    keyState: number,
    firstNameState: string
    ClientRefId: number
    SelectedIndex: number
    IsEditing: boolean
    SelectedID: number
    popoverOpen: boolean
    popoverInfo: string
}

type Props = {
}

export default class Sellers extends React.Component<Props, State> {

    constructor(props) {
        super(props)
        this.state = {
            dataState: null,
            dataStateClient: null,
            keyState: 1,
            firstNameState: 'Tadeo',
            ClientRefId: null,
            SelectedIndex: 0,
            IsEditing: true,
            SelectedID: null,
            popoverOpen: false,
            popoverInfo: null
        }

    }

    componentDidMount() {
        fetch('http://localhost:51705/api/Sellers/Get')
            .then(d => d.json())
            .then(d => {
                this.setState({
                    dataState: d
                })
            })
        fetch('http://localhost:51705/api/Clients/Get')
            .then(d => d.json())
            .then(d => {
                this.setState({
                    dataStateClient: d
                })
            })
        document.addEventListener('keydown', this.f7Function, false)
        document.addEventListener('keydown', this.escFunction, false)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.f7Function, false)
        document.removeEventListener('keydown', this.escFunction, false)

    }

    f7Function = (event => {
        if (event.keyCode === 118) {
            this.setState({
                IsEditing: false,
                firstNameState: '',
                ClientRefId: 0
            })
        }
    })

    escFunction = (event => {
        if (event.keyCode === 27) {
            this.setState({
                IsEditing: true,
                keyState: 0,
                firstNameState: '',
                ClientRefId: 0
            })
        }
    })

    togglePopover = () => {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        })
    }


    changeBooleanEdition = (event => {
        this.setState({
            IsEditing: false,
            firstNameState: '',
            ClientRefId: 0
        })
    })

    handleChangeFirstName = (event => {
        this.setState({
            firstNameState: event.target.value
        })
    })

    handleChangeKey = (event => {
        this.setState({
            keyState: event.target.value
        })
    })

    handleChangeClientRefId = (event => {
        this.setState({
            ClientRefId: event.target.value
        })
        for (let i in this.state.dataStateClient) {
            if (parseInt(event.target.value) === this.state.dataStateClient[i].key) {
                this.setState({
                    popoverInfo: 'Cliente: ' + this.state.dataStateClient[i].firstName,
                    popoverOpen: true,
                })
                return
            } else {
                this.setState({
                    popoverInfo: null,
                    popoverOpen: false
                })
            }
        }
    })

    delete = (event => {
        event.preventDefault()
        let r = confirm('¿Esta seguro que quiere eliminar al renglon: ' + this.state.dataState[this.state.SelectedIndex].firstName + '?')
        if (r === true) {
            let index: number
            index = this.state.SelectedIndex
            fetch('http://localhost:51705/api/Sellers/delete', {
                method: 'DELETE',
                body: JSON.stringify(this.state.dataState[index]),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    window.location.reload(true)
                })
        }
        else {
            return
        }
    })


    edit = (event => {
        event.preventDefault()

        let r = confirm('¿Esta seguro de que quiere guardar los cambios en la clave: ' + this.state.dataState[this.state.SelectedIndex].key + '?')
        if (r === true) {
            let obj: { Key: number, firstName: string, KeyRefClient: number } = { Key: this.state.SelectedID, firstName: this.state.firstNameState, KeyRefClient: this.state.ClientRefId }
            fetch('http://localhost:51705/api/Sellers/edit', {
                method: 'PUT',
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.status !== 200) {
                        alert(`Codigo no esperado, ${response.status}`)
                        return response.text()
                            .then(text => {
                                alert(`Mensaje de servidor: ${text}`)
                            })
                    }
                    window.location.reload(true)
                })
                .catch(error => {
                    alert('Hubo un error al editar el catalogo')
                })
        }
        else {
            return
        }

    })

    create = (event => {
        event.preventDefault()
        let r = confirm('¿Esta seguro de que quiere agregar una nueva zona?')
        if (r === true) {
            let obj: { KeyRefClient: number, firstName: string, } = { KeyRefClient: this.state.ClientRefId, firstName: this.state.firstNameState }
            fetch('http://localhost:51705/api/Sellers/create', {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log(response)
                    if (response.status !== 200) {
                        alert(`Codigo no esperado, ${response.status}`)
                        return response.text()
                            .then(text => {
                                alert(`Mensaje de servidor: ${text}`)
                            })
                    }
                    window.location.reload(true)
                })
                .catch(error => {
                    alert('Hubo un error al editar el catalogo')
                })
        }
        else {
            this.setState({
                firstNameState: '',
                ClientRefId: 0
            })
            return
        }
    })

    render() {
        let smallComment
        if (!this.state.IsEditing) {
            smallComment = <small className='form-text text-muted'>La clave se generara sola al agregar el campo</small>
        } else {
            smallComment = null
        }
        let inputClave
        if (this.state.IsEditing) {
            inputClave = <input className='form-control  inputStyle' type='number' onChange={this.handleChangeKey} value={this.state.keyState} readOnly />
        } else {
            inputClave = <input className='form-control  inputStyle font-weight-bold' type='text' value='Nueva Clave' readOnly />
        }
        let buttonE
        if (this.state.IsEditing) {
            buttonE = <button type='submit' className='btn btn-primary'>Guardar <span className='fa fa-pencil'></span></button>
        } else {
            buttonE = null
        }
        let buttonS
        if (!this.state.IsEditing) {
            buttonS =
                <div className='row'>
                    <div className='col-12'>
                        <div className='text-center'>
                            <button type='submit' className='btn btn-success'>Agregar <span className='fa fa-check'></span></button>
                        </div>
                    </div>
                </div>
        } else {
            buttonS = null
        }
        let buttonD
        if (this.state.IsEditing) {
            buttonD = <button onClick={this.delete} className='btn btn-danger'>Eliminar <span className='fa fa-remove'></span></button>
        }
        else {
            buttonD = null
        }
        let buttonA
        if (this.state.IsEditing) {
            buttonA = <button style={{ marginTop: '10px' }} className='btn btn-success' onClick={this.changeBooleanEdition}><span className='fa fa-plus'></span></button>
        } else {
            buttonA = null
        }
        if (!this.state.dataState) return (
            <div style={{ display: 'block', margin: 'auto auto', borderColor: 'red', marginTop: '50px' }}>
                <RingLoader
                    color={'#002BFF'}
                    size={200}
                />
            </div>
        )
        return (
            <div>
                <h1 style={{ fontSize: '22px', padding: '0 0 0 0', marginBottom: '3px' }} className='text-center'>Vendedores</h1>
                <ReactTable
                    data={this.state.dataState}
                    filterable
                    defaultFilterMethod={(filter, row) =>
                        String(row[filter.id]) === filter.value}
                    columns={[
                        {
                            columns: [
                                {
                                    Header: 'Key',
                                    id: 'key',
                                    accessor: d => d.key,
                                    filterMethod: (filter, rows) =>
                                        matchSorter(rows, filter.value, { keys: ['key'] }),
                                    filterAll: true
                                },
                                {
                                    Header: 'FirstName',
                                    id: 'name',
                                    accessor: d => d.name,
                                    filterMethod: (filter, rows) =>
                                        matchSorter(rows, filter.value, { keys: ['name'] }),
                                    filterAll: true
                                },
                                {
                                    Header: 'IdCliente',
                                    id: 'clientRefKey',
                                    accessor: d => d.clientRefKey,
                                    filterMethod: (filter, rows) =>
                                        matchSorter(rows, filter.value, { keys: ['cientRefKey'] }),
                                    filterAll: true
                                }
                            ]
                        },
                    ]}
                    defaultPageSize={8}
                    className='-striped -highlight'
                    pageSizeOptions={[8, 12, 16, 20, 24]}

                    getTrGroupProps={(state, rowInfo, column, instance) => {
                        if (rowInfo !== undefined) {
                            return {
                                onClick: (e, handleOriginal) => {
                                    console.log('It was in this row:', rowInfo)
                                    if (this.state.IsEditing) {
                                        this.setState({
                                            keyState: rowInfo.row.key,
                                            firstNameState: rowInfo.row.name,
                                            ClientRefId: rowInfo.row.clientRefKey,
                                            SelectedIndex: rowInfo.index,
                                            SelectedID: rowInfo.original.key,
                                            IsEditing: true
                                        })
                                    }
                                    else {
                                        let r = confirm('¿Esta seguro que quiere dejar de agregar?')
                                        if (r === true) {
                                            this.setState({
                                                firstNameState: rowInfo.row.name,
                                                SelectedIndex: rowInfo.index,
                                                SelectedID: rowInfo.original.key,
                                                IsEditing: true
                                            })
                                        }
                                        else {
                                            return
                                        }
                                    }

                                    console.log(this.state.SelectedID)
                                },
                                style: {
                                    cursor: 'pointer',
                                    background: rowInfo.index === this.state.SelectedIndex ? '#00afec' : 'white',
                                    color: rowInfo.index === this.state.SelectedIndex ? 'white' : 'black',
                                }
                            }
                        }
                    }
                    }
                />
                <form style={{ marginTop: '10px' }} onSubmit={this.state.IsEditing ? this.edit : this.create}>
                    <div style={{ marginBottom: '5px' }} className='Container'>
                        <div className='row'>
                            <div className='col-1'></div>
                            <div className='col-2'>
                                <div className='form-group'>
                                    <label className='text-center'>Key</label>
                                    {inputClave}
                                    {smallComment}
                                </div>
                                <div className='form-group'>
                                    <label className='text-center'>FirstName</label>
                                    <input className=' form-control inputStyle' type='text' onChange={this.handleChangeFirstName} value={this.state.firstNameState} />
                                </div>
                                <div className='form-group'>
                                    <label className='text-center'>IDCliente</label>
                                    <input id='popover1' className='form-control inputStyle' type='number' onChange={this.handleChangeClientRefId} value={this.state.ClientRefId} />
                                    <Popover placement='right' isOpen={this.state.popoverOpen} target='popover1' toggle={this.togglePopover}>
                                        <PopoverHeader>{this.state.popoverInfo}</PopoverHeader>
                                    </Popover>
                                    <small className='form-text text-muted'>Presiona f2 para mostrar la lista de clientes</small>
                                </div>
                            </div>
                            <div className='col-8'></div>
                            <div className='col-1'>
                                <div className='text-center'>
                                    <a href='/' className='btn btn-info'>
                                        <span id='homeIcon' className='fa fa-home' aria-hidden='true'></span>
                                    </a>
                                    <br />
                                    {buttonA}
                                </div>
                            </div>
                        </div>
                    </div>
                    {buttonS}
                    <div className='row'>
                        <div className='col-5'></div>
                        <div className='col-1'>
                            <div className='text-center'>
                                {buttonE}
                            </div>
                        </div>
                        <div className='col-1'>
                            <div className='text-center'>
                                {buttonD}
                            </div>
                        </div>
                        <div className='col-5'></div>
                    </div>
                </form>


            </div>
        )
    }
}
