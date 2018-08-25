import * as React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import * as matchSorter from 'match-sorter'
import { RingLoader } from 'react-spinners'

type DataState = {
    key: number
}

type State = {
    dataState: DataState[]
    firstNameState: string
    lastNameState: string
    SelectedIndex: number
    IsEditing: boolean
    SelectedKey: number
    KeyState: number
}

type Props = {
}

export default class Clientes extends React.Component<Props, State> {

    constructor(props) {
        super(props)
        this.state = {
            dataState: null,
            firstNameState: 'Andres',
            lastNameState: 'Aguirre',
            SelectedIndex: 0,
            IsEditing: true,
            SelectedKey: 1,
            KeyState: 1
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

    changeBooleanEdition = (event => {
        this.setState({
            IsEditing: false,
            KeyState: 9999,
            firstNameState: '',
            lastNameState: ''
        })
    })

    handleChangeKey = (event => {
        this.setState({
            KeyState: event.target.value
        })
    })

    handleChangeFirstName = (event => {
        this.setState({
            firstNameState: event.target.value
        })
    })

    handleChangeLastName = (event => {
        this.setState({
            lastNameState: event.target.value
        })
    })

    delete = (event => {
        event.preventDefault()
        let r = confirm('¿Esta seguro que quiere eliminar la clave: ' + this.state.dataState[this.state.SelectedIndex].key + '?')
        if (r === true) {
            let index: number
            index = this.state.SelectedIndex
            fetch('http://localhost:51705/api/Clients/delete', {
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
            let obj: { key: number, firstName: string, lastName: string } = { key: this.state.SelectedKey, firstName: this.state.firstNameState, lastName: this.state.lastNameState }


            fetch('http://localhost:51705/api/Clients/edit', {
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
            let obj: { firstName: string, lastName: string, key: number } = { key: this.state.KeyState, firstName: this.state.firstNameState, lastName: this.state.lastNameState }
            fetch('http://localhost:51705/api/Clients/create', {
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
                lastNameState: ''
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
            inputClave = <input className='form-control  inputStyle' type='number' onChange={this.handleChangeKey} value={this.state.KeyState} />
        } else {
            inputClave = <input className='form-control  inputStyle font-weight-bold' type='text' value='Nueva Clave' />
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
            <div style={{ display: 'block', margin: '0 auto', borderColor: 'red', marginTop: '50px' }}>
                <RingLoader
                    color={'#002BFF'}
                    size={200}
                />
            </div>
        )
        return (
            <div>
                <h1 style={{ fontSize: '22px', padding: '0 0 0 0', marginBottom: '3px' }} className='text-center'>Clientes</h1>
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
                                    id: 'firstName',
                                    accessor: d => d.firstName,
                                    filterMethod: (filter, rows) =>
                                        matchSorter(rows, filter.value, { keys: ['firstName'] }),
                                    filterAll: true
                                },
                                {
                                    Header: 'LastName',
                                    id: 'lastName',
                                    accessor: d => d.lastName,
                                    filterMethod: (filter, rows) =>
                                        matchSorter(rows, filter.value, { keys: ['lastName'] }),
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
                                            firstNameState: rowInfo.row.firstName,
                                            lastNameState: rowInfo.row.lastName,
                                            KeyState: rowInfo.row.key,
                                            SelectedIndex: rowInfo.index,
                                            SelectedKey: rowInfo.original.key,
                                            IsEditing: true
                                        })
                                    }
                                    else {
                                        let r = confirm('¿Esta seguro que quiere dejar de agregar?')
                                        if (r === true) {
                                            this.setState({
                                                firstNameState: rowInfo.row.firstName,
                                                lastNameState: rowInfo.row.lastName,
                                                KeyState: rowInfo.row.key,
                                                SelectedIndex: rowInfo.index,
                                                SelectedKey: rowInfo.original.key,
                                                IsEditing: true
                                            })
                                        }
                                        else {
                                            return
                                        }
                                    }
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
                                    <label>Key</label>
                                    {inputClave}
                                    {smallComment}
                                </div>
                                <div className='form-group'>
                                    <label className='text-center'>FirstName</label>
                                    <input className=' form-control inputStyle' type='text' onChange={this.handleChangeFirstName} value={this.state.firstNameState} />
                                </div>
                                <div className='form-group'>
                                    <label className='text-center'>LastName</label>
                                    <input className=' form-control inputStyle' type='text' onChange={this.handleChangeLastName} value={this.state.lastNameState} />
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