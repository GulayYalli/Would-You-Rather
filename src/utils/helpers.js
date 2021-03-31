export default function formatQues(question, author) {
    const {id, timestamp, optionOne, optionTwo} = question
    const { name, avatarURL } = author

    return {
        id,
        author,
        timestamp,
        optionOne,
        optionTwo,
        name,
        avatarURL
    }
}

export function formatUser(user) {
    const {answers, avatarURL, id, name, questions} = user
    const answersLength = Object.keys(user.answers).length
    const questionsLength = user.questions.length
    const score = answersLength + questionsLength

    return {
        answers,
        avatarURL,
        id,
        name,
        questions,
        answersLength,
        questionsLength,
        score
    }
}