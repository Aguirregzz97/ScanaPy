import * as React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import * as matchSorter from 'match-sorter'



type State = {
}

type Props = {
    dataProp: object[]
}

export default class ListadoClientesResultTable extends React.Component<Props, State> {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1 style={{ fontSize: '35px', marginBottom: '20px' }} className='text-center'>Listado de clientes</h1>
                <ReactTable
                    data={this.props.dataProp}
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
                    defaultPageSize={15}
                    className='-striped -highlight'
                    pageSizeOptions={[15, 30, 45, 60, 75]}
                />
            </div>
        )
    }
}