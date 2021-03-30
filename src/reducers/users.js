import {  ADD_ANSWER_TO_USER, ADD_POLL_TO_USERS, RECEIVE_USERS } from '../actions/users'

export default function users (state = {}, action) {
 switch(action.type) {
    case RECEIVE_USERS :
     return {
       ...state,
       ...action.users
    }
    case ADD_POLL_TO_USERS :
      const author = action.poll.author
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat(action.poll.id)
        }
      }
    case ADD_ANSWER_TO_USER :
      const {authedUser, qid, answer} = action;

      return {
        ...state,
        [authedUser] : {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
          }
        }
      }
   default :
     return state
 }
} 