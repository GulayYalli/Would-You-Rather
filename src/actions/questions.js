import { _saveQuestion } from "../utils/_DATA"
import { addPollToUsers } from "./users"

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_POLL_TO_QUESTIONS = 'ADD_POLL_TO_QUESTIONS'
export const ADD_ANSWER_TO_QUESTION = 'ADD_ANSWER_TO_QUESTION'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export function addPollToQuestions(poll) {
    return {
        type: ADD_POLL_TO_QUESTIONS,
        poll
    }
}

export function handleAddPoll(poll) {
    return (dispatch) => {
        return _saveQuestion(poll).then((poll) => {
            dispatch(addPollToQuestions(poll))
            dispatch(addPollToUsers(poll))
        })
    }
}


export function addAnswerToQuestion(authedUser, qid, answer) {
    return {
      type: ADD_ANSWER_TO_QUESTION,
      authedUser,
      qid,
      answer
    };
}
