import * as React from 'react'

type State = {
    username: string,
    password: string,
    userAuthenticated: boolean
}

type Props = {
}

export default class Login extends React.Component<Props, State> {

    constructor(props) {
        super(props)
        this.state = {
            username: null,
            password: null,
            userAuthenticated: false
        }
    }

    onChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    onChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    submitedLogin = (event) => {
        if (this.state.username === 'admin' && this.state.password === 'admin') {
            this.setState({
                userAuthenticated: true
            })
        }
        else {
            alert('you fucked up boi')
        }
    }


    render() {
        if (this.state.userAuthenticated) {
            return (
                <h1>Login succesful</h1>
            )
        }
        return (
            <div>
                <h1 style={{ marginTop: '40px', marginBottom: '40px' }} className='text-center'>Login</h1>
                <form>
                    <div className='row'>
                        <div className='col-4'></div>
                        <div className='col-4'>
                            <div className='form-group'>
                                <label className=''>Username</label>
                                <input type='email' className='form-control' id='exampleInputEmail1' aria-describedby='emailHelp' placeholder='Enter username' onChange={this.onChangeUsername} />
                            </div>
                            <div className='form-group'>
                                <label className=''>Password</label>
                                <input type='password' className='form-control' id='exampleInputEmail1' aria-describedby='emailHelp' placeholder='Enter password' onChange={this.onChangePassword} />
                            </div>
                        </div>
                        <div className='col-4'></div>
                    </div>
                    <div className='text-center'>
                        <button onClick={this.submitedLogin} className='btn btn-primary text-center'>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}