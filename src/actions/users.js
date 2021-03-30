import { _saveQuestionAnswer } from '../utils/_DATA';
import { addAnswerToQuestion } from './questions';

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_ANSWER_TO_USER = 'ADD_ANSWER_TO_USER'
export const ADD_POLL_TO_USERS = 'ADD_POLL_TO_USERS'

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function addPollToUsers(poll) {
    return {
        type: ADD_POLL_TO_USERS,
        poll
    }
}

export function addAnswerToUser(authedUser, qid, answer) {
    return {
        type: ADD_ANSWER_TO_USER,
        authedUser,
        qid,
        answer
    }
}

export function handleAnswerPoll(authedUser, qid, answer) {   
    return (dispatch) => {
        return _saveQuestionAnswer({authedUser, qid, answer}).then(()=>{
            dispatch(addAnswerToUser(authedUser, qid, answer))
            dispatch(addAnswerToQuestion(authedUser, qid, answer))
        }).catch(e => {
            console.warn('Error in handleSaveQuestionAnswer:', e);
        });
    }
}