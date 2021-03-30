import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import setAuthedUser from '../actions/authedUser'

class Login extends Component {
    state = {
        newUser : ''
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        const { newUser } = this.state
        dispatch(setAuthedUser(newUser))
        this.setState(()=>({
            newUser: '',
            toHome : newUser ? true : false
        }))
    }
    handleChange = (e) => {
        const newUser = e.target.value
        this.setState(()=>({
            newUser
        }))
    }
    render() { 
        const { users } = this.props
        const { newUser, toHome } = this.state
        if(toHome === true) {
            return <Redirect to='/' />
        }
        return ( 
            <div className='center board'>
                <h3>Welcome to the Would You Rather App!</h3>
                <p>Please sign in to continue</p>
                <form onSubmit={this.handleSubmit}>
                    <select onChange={this.handleChange}>
                        <option key='ChooseUser'>Choose A User</option>
                        {
                            users.map(user => (
                                <option key={user}>{user}</option>
                            ))
                        }
                    </select>
                    <button type='submit' className='btn' disabled={newUser===''}>Sign In</button>
                </form>
            </div>
         );
    }
}

function mapStateToProps({ users, authedUser }) {
    return {
        users: Object.keys(users),
        authedUser
    }
}

export default connect(mapStateToProps)(Login); 