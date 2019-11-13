import questions from '../questions.json'

export const getAllQuestions = () => {
  return (dispatch) => {
    let shuffleQuestions = shuffle(questions)
    shuffleQuestions = transformObj(shuffleQuestions)
    dispatch({ type: 'SET_QUESTIONS', payload: shuffleQuestions })
  }
}

export const giveAnswer = (ans, question) => {
  return (dispatch) => {
    let correct = false
    if (ans === question.correct_answer) {
      correct = true
    }
    dispatch({ type: 'ANSWER_QUESTION', payload: { status: correct, question, givenAnswer:ans } })
  }
}

export const nextQuestion = () => {
  return (dispatch) => {
    dispatch({ type: 'NEXT_QUESTION' })
  }
}
const transformObj = (shuffleQuestions) => {
  if (shuffleQuestions && shuffleQuestions.length) {
    shuffleQuestions = shuffleQuestions.map((value) => {
      if (value && Object.keys(value).length) {
        Object.keys(value).forEach((objKey) => {
          if (Array.isArray(value[objKey])) {
            value[objKey] = value[objKey].map((arrayValue) => {
              return decodeURIComponent(arrayValue)
            })
          } else {
            value[objKey] = decodeURIComponent(value[objKey])
          }
        })
      }
      return value
    })
  }
  return shuffleQuestions
}

export const shuffle = (array1) => {
  let ctr = array1.length, temp, index
  while (ctr > 0) {
    index = Math.floor(Math.random() * ctr)
    ctr--
    temp = array1[ctr]
    array1[ctr] = array1[index]
    array1[index] = temp
  }
  return array1
}