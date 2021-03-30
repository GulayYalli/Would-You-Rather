import React, { Component } from 'react'
import { connect } from 'react-redux'
import formatQues from '../utils/helpers'
import { handleAnswerPoll } from '../actions/users'
import PollResult from './PollResult';
import Page404 from './404';

class Poll extends Component { 

    state = {
        answer: '',
        toResult: false
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {dispatch, id, authedUser} = this.props
        const {answer} = this.state
        dispatch(handleAnswerPoll(authedUser, id, answer))
        this.setState(()=>({
            toResult: true        
        }))
    }

    handleChange = (e) => {
        const answer = e.target.value
        this.setState(()=>({
            answer
        }))
    }  

    render() { 
        const { question, isAnswered, is404Page } = this.props
        const { toResult, answer } = this.state

        if(toResult === true || isAnswered === true) {
            return <PollResult question={question} />
        }
        if(is404Page) {
            return <Page404 />
        }

        return (       
            <div className='card-box'>          
                <h3 className='title'>{question.name} asks:</h3>      
                <div className='flex'>
                    <div className='avatar-box'>
                        <img className='avatar' src={question.avatarURL} alt={`Avatar of ${question.name}`} />
                    </div>
                    <div className='question'>
                        <h3>Would you rather</h3>
                        <form onSubmit={this.handleSubmit}>
                            <div className='form-item'>
                                <input onChange={this.handleChange} type='radio' name='selectOption' value='optionOne' />
                                <label>{question.optionOne.text}</label>
                            </div>
                            <div className='form-item'>
                                <input onChange={this.handleChange} type='radio' name='selectOption' value='optionTwo' />
                                <label>{question.optionTwo.text}</label>
                            </div>
                            <button type="submit" disabled={ answer === '' }>Submit</button>
                        </form>
                    </div>
                </div>            
            </div> 
        );
    }
}

function mapStateToProps({users, questions, authedUser}, props) {
    const { id } = props.match.params
    let question = questions[id]
    let is404Page = false
    let isAnswered = false
    
    if(question === undefined) {
        is404Page = true
    } else {
        const votes = [...question.optionOne.votes, ...question.optionTwo.votes]
        isAnswered = votes.includes(authedUser)
        question =  formatQues(question, users[question.author])
    }

    return {
        id,
        question,
        authedUser,
        isAnswered,
        is404Page
    }
}
export default connect(mapStateToProps)(Poll);