import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import Navigation from './Navigation'
import UserProfile from './UserProfile'
import Login from './Login'
import Dashboard from './Dashboard'
import Poll from './Poll'
import NewPoll from './NewPoll'
import LeaderBoard from './LeaderBoard'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() { 
    return ( 
      <Router>
        <div className='container'>
          {this.props.authedUser ? 
           <Fragment> 
              <div className='flex topbar'>
                <Navigation />
                <UserProfile />          
              </div>
              <div className='board'>
                  <Route path="/" exact component={Dashboard} />
                  <Route path="/leaderboard" component={LeaderBoard} />
                  <Route path="/questions/:id" component={Poll} />
                  <Route path="/add" component={NewPoll} /> 
              </div>                         
            </Fragment>
            :  <Login />}
        </div>
      </Router>
     );
  }
}
function mapStateToProps({authedUser}) {
  return {
    authedUser
  }
}
export default connect(mapStateToProps)(App);