import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import formatQues from '../utils/helpers'

class UserCard extends Component {
    render() {         
        const { question } = this.props
        return ( 
            <Link to={`/questions/${question.id}`}>
                <li className='card-box'>
                    <h3 className='title'>{question.name} asks:</h3>
                    <div className='flex'>
                        <div className='avatar-box'>
                            <img className='avatar' src={question.avatarURL} alt={`Avatar of ${question.name}`} />
                        </div>
                        <div className='question center'>
                            <h3>Would you rather</h3>
                            <p>
                                {question.optionOne.text}
                                <br/>
                                or 
                                <br/>
                                ...
                            </p>
                        </div>
                    </div>
                </li>
            </Link>);
    }
}

function mapStateToProps({users, questions}, {questionID}) {
    const question = questions[questionID]
    return {
        question: formatQues(question, users[question.author])
    }
}
export default connect(mapStateToProps)(UserCard);