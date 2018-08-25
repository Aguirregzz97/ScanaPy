import * as React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


type State = {
}

type Props = {
}

export default class Navbar extends React.Component<Props, State> {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <nav className='navbar navbar-expand-sm fixed-top navbar-light bg-light'>
                    <a className='navbar-brand' href='#'>EtisysOnline</a>
                    <button className='navbar-toggler navbar-toggler-right' type='button' data-toggle='collapse' data-target='#navbar1'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbar1'>
                        <ul className='navbar-nav'>
                            <li className='nav-item dropdown active'>
                                <a href='#' id='menu' data-toggle='dropdown' className='nav-link dropdown-toggle'>Catalogo de administración</a>
                                <ul className='dropdown-menu'>
                                    <li className='dropdown-item dropdown-submenu'>
                                        <a href='#' data-toggle='dropdown' className='dropdown-toggle font-weight-bold'>Clientes</a>
                                        <ul className='dropdown-menu'>
                                            <li className='dropdown-item'>
                                                <a href='/clientes'>Captura</a>
                                            </li>
                                            <li className='dropdown-item'>
                                                <a href='/listadoclientes'>Listado</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className='dropdown-item dropdown-submenu'>
                                        <a href='#' data-toggle='dropdown' className='dropdown-toggle font-weight-bold'>Vendedores</a>
                                        <ul className='dropdown-menu'>
                                            <li className='dropdown-item'>
                                                <a href='/sellers'>Captura</a>
                                            </li>
                                            <li className='dropdown-item'>
                                                <a href='#'>Listado</a>
                                            </li>
                                        </ul>

                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <ul className='navbar-nav ml-auto'>
                            <li className='nav-item active'>
                                <a className='nav-link' href='#'>Link</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}