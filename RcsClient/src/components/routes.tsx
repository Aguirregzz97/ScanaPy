import * as React from 'react'
import App from './App'
import Clientes from './Clientes'
import ListadoClientes from './ListadoClientes'
import Sellers from './Sellers'

const routes = [
  { path: '/', action: () => <App />},
  { path: '/clientes', action: () => <Clientes />},
  { path: '/sellers', action: () => <Sellers />},
  { path: '/listadoClientes', action: () => <ListadoClientes />},
  { path: '/otherThing', action: () => <p>otherThing</p> },
  { path: '/tasks/:id', action: () => <p>Specific task</p> }
]

export default routes