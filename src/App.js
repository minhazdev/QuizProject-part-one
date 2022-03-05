import { useState } from 'react'
import QuizCard from './QuizCard'
import GameOver from './GameOver'
import './style.css';
import shuffle from './utils'


//button - question and answer - selecting answer -wright or wrong answer - total number
//single select answer
//reset quiz
//Api key
//  https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple  



const App = () => {
  const [quizzes,setQuizzes] = useState(null)
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0)
  const [startGame, setStartGame] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [endGame, setEndGame] = useState(false)
  const startQuiz= async() => {
   const res = await fetch( 
     "https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple"
   )
   const { results } =await res.json()
   setQuizzes(results)
   setStartGame(true)
   setSelectedQuestion({
     question:results[0].question,
     answers:shuffle(results[0]),
   })
   setLoaded(true)
  console.log(results)
  }

  const navigateNextQuiz = () => {
    //Make sure you are in the last question
    const isLastQuestion = quizzes.length - 1 === selectedQuestionIndex
    if(isLastQuestion) {
       setEndGame(true)

    }else {
        setSelectedQuestionIndex((prevIndex) => prevIndex +1)
        setSelectedQuestion({
        question:quizzes[selectedQuestionIndex].question,
        answers:shuffle(quizzes[selectedQuestionIndex]),
      })
     }
    }
    
  const resetQuiz = () => {
     setQuizzes(null) 
     setSelectedQuestion(null)
     setSelectedQuestionIndex(0)
     setEndGame(false)
     setLoaded(false)  
     setStartGame(false)
  
    }
  
  return (
    <div>
        {endGame && <GameOver resetQuiz={resetQuiz} />}
        {startGame && loaded && !endGame && <QuizCard selectedQuestion= {selectedQuestion}navigateNextQuiz={navigateNextQuiz} />}
       {!startGame && <button onClick= {startQuiz}> Start Quiz </button>}
       
    
    
    </div>
    

  )
}

export default App;
