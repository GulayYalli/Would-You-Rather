import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import UserCard from './UserCard';
class Dashboard extends Component {

    handleTab = (e)=> {
        const target = e.target
        const type = target.getAttribute('data-type')
        const dashboardList = document.getElementsByClassName('dashboard-list')
        const tab = document.getElementsByClassName('tab')
        for(let i = 0; i < dashboardList.length; i++ ){
            dashboardList[i].style.display = 'none'
        }
        for(let i = 0; i < tab.length; i++ ){
            tab[i].classList.remove('active')
        }
        target.classList.add('active')
        document.getElementById(type).style.display = 'block'
    }

    render() { 
        const { answered, unanswered } = this.props
        return ( 
            <Fragment>
                <ul className='tabs'>
                    <li className='active tab' onClick={this.handleTab} data-type="unansweredList">Unanswered Question</li>  
                    <li className='tab' onClick={this.handleTab} data-type="answeredList">Answered Question</li>  
                </ul>                
                <ul id="unansweredList" className='dashboard-list'>                 
                    {unanswered.map((question)=>(
                        <UserCard key={question.id} questionID={question.id} />
                    ))}
                </ul>
                <ul id="answeredList" className='dashboard-list answered' style={{display:'none'}}>                
                    {answered.map((question)=>(
                        <UserCard key={question.id} questionID={question.id} isAnswered={true} />
                    ))}
                </ul>
            </Fragment>
        );
    }
}

function mapStateToProps({authedUser, questions, users}) {
    const answeredIds = Object.keys(users[authedUser].answers)
    const answered = Object.values(questions).filter(q => answeredIds.includes(q.id)).sort((a,b) => b.timestamp - a.timestamp)
    const unanswered = Object.values(questions).filter(q => !answeredIds.includes(q.id)).sort((a,b) => b.timestamp - a.timestamp)
    return {
        answered: answered,
        unanswered: unanswered
    }
}

export default connect(mapStateToProps)(Dashboard);