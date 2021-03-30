import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddPoll } from '../actions/questions'
import { Redirect } from 'react-router-dom';

class NewPoll extends Component {
    state = { 
        optionOne : '',
        optionTwo : '',
        toHome: false
    }
    handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        if(name === 'optionOne') {
            this.setState(()=>({
                optionOne: value
            }))
        } else if (name === 'optionTwo'){
            this.setState(()=>({
                optionTwo: value
            }))
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const {optionOne, optionTwo} = this.state
        const {authedUser, dispatch } = this.props
        const poll = {
            optionOneText: optionOne,
            optionTwoText: optionTwo,
            author: authedUser
        }
        dispatch(handleAddPoll(poll))
        this.setState(()=>({
            optionOne: '',
            optionTwo: '',
            toHome: true
        }))
    }
    render() { 
        const { optionOne, optionTwo, toHome } = this.state

        if(toHome === true) {
            return <Redirect to='/' />
        }
        return ( 
            <div className='card-box center'>
                <h3 className='title'>Create New Question</h3>
                <div className='new-poll'>
                    <p>Complete the questions:</p>
                    <div>
                         <h4>Would You Rather</h4>
                         <form onSubmit={ this.handleSubmit }>
                             <input name='optionOne' type="text" onChange={ this.handleChange } placeholder='Option One' value={optionOne} />
                             <div className='center'>   
                                <br/>                             
                                 ------------- OR -------------
                             </div><br/>
                             <input name='optionTwo' type="text" onChange={ this.handleChange } placeholder='OptionTwo' value={optionTwo} />
                             <button type='submit' disabled={ optionOne==='' || optionTwo ==='' }>Submit</button>
                         </form>
                    </div>
                </div>
            </div>
         );
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(NewPoll);