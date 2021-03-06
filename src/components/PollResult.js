import { Component } from 'react'
import {connect} from 'react-redux'

class PollResult extends Component {
    render() { 
        const { question, authedUser } = this.props
        const optionOneLength = question.optionOne.votes.length
        const optionTwoLength = question.optionTwo.votes.length
        const totalVotes = optionOneLength + optionTwoLength
        const isYourVoteOne = question.optionOne.votes.includes(authedUser)
        const isYourVoteTwo = question.optionTwo.votes.includes(authedUser)
        const percentOptionOne = (100*optionOneLength/totalVotes).toFixed()
        const percentOptionTwo = (100*optionTwoLength/totalVotes).toFixed()

        return ( 
            <div className='card-box'>          
                <h3 className='title'>Asked {question.name}</h3>      
                <div className='flex'>
                    <div className='avatar-box'>
                        <img className='avatar' src={question.avatarURL} alt={`Avatar of ${question.name}`} />
                    </div>
                    <div className='question'>
                        <h3 className='mb15'>Results: </h3>
                        <div className='card-box'>
                            <p>{question.optionOne.text} - <strong>{percentOptionOne}%</strong></p>
                            <strong>({optionOneLength} out of {totalVotes} votes)</strong>
                            {isYourVoteOne ? <span className='voter'>Your<br/> Vote</span> : null}
                        </div>
                        <div className='card-box'>
                            <p>{question.optionTwo.text} - <strong>{percentOptionTwo}%</strong></p>
                            <strong>({optionTwoLength} out of {totalVotes} votes)</strong>
                            {isYourVoteTwo ? <span className='voter'>Your<br/> Vote</span> : null}
                        </div>
                    </div>
                </div>            
            </div> 
         );
    }
}
function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}
export default connect(mapStateToProps)(PollResult);