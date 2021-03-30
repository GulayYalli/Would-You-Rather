import React, { Component } from 'react'
import {connect} from 'react-redux'
import { formatUser } from '../utils/helpers';

class LeaderBoard extends Component {
    render() { 
        const {users} = this.props 
        return (           
            <ul>   
                {users.map((user)=>(
                    <li key={user.id} className='card-box'>    
                      <h3 className='title'>{user.name}</h3>                   
                      <div className='flex'>
                        <div className='avatar-box'>
                            <img className='avatar' src={user.avatarURL} alt={`Avatar of ${user.name}`} />
                        </div>
                        <div className="w50">                          
                            <p>Answered questions <strong>- {user.answersLength}</strong></p>
                            <hr/>
                            <p>Created questions <strong>- {user.questionsLength}</strong></p> 
                        </div>    
                        <div className="score center">
                            <h3 className='mb15'>Score</h3>                       
                            <span>{user.score}</span>
                        </div>                    
                      </div>
                    </li>
                ))}
            </ul>
        );
    }
}

function mapStateToProps({users}) {
    const formattedUsers = Object.values(users).map((user)=> formatUser(user))
    return {
        users: formattedUsers.sort((a,b) => b.score - a.score)
    }
}
export default connect(mapStateToProps)(LeaderBoard);