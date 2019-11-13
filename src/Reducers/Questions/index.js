const initialState = {
  allQuestions: [],
  currentQuestion: {},
  correctAnswer: [],
  wrongAnswer: [],
  givenAnswer: {},
  currentIndex: 1
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_QUESTIONS': {
      return {
        ...state,
        allQuestions: [...action.payload],
        currentQuestion: { ...action.payload[0] },
        currentIndex: 1,
        correctAnswer: [],
        wrongAnswer: [],
        givenAnswer: {}
      }
    }
    case 'ANSWER_QUESTION':
      if (action.payload.status) {
        return {
          ...state,
          correctAnswer: [...state.correctAnswer, action.payload.question],
          givenAnswer: { givenAnswer: action.payload.givenAnswer, ...action.payload.question }
        }
      } else {
        return { ...state, wrongAnswer: [...state.wrongAnswer, action.payload.question] }
      }
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        currentQuestion: { ...state.allQuestions[state.currentIndex] }
      }
    default:
      return { ...state }
  }
}