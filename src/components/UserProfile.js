import React, { Component } from 'react';
import { connect } from 'react-redux';
import setAuthedUser from '../actions/authedUser';

class UserProfile extends Component {
    handleLogout = () =>{
        const {dispatch} = this.props
        const userID = ''
        dispatch(setAuthedUser(userID))
    }
    render() { 
        const {authedUser, userAvatar, userName} = this.props
        return ( 
            <div className='userProfile'>
                <img className='avatar' src={userAvatar} alt={`Avatar Of ${authedUser}`}></img>
                <div>
                    <span>Hello, {userName}</span>               
                    <button className='logout-btn' onClick={this.handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
         );
    }
}

function mapStateToProps({authedUser, users}) {
    const userAvatar = users[authedUser].avatarURL
    const userName = users[authedUser].name
    return {
        authedUser,
        userAvatar,
        userName
    }
}

export default connect(mapStateToProps)(UserProfile);
