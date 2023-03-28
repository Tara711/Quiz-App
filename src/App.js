import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const apiUrl = `https://opentdb.com/api.php?amount=40&category=17&difficulty=easy&type=multiple`;
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(apiUrl);
      const jsonData = await response.json();
      setQuestions(jsonData.results);
    };
    fetchData();
  }, []);

  const handleAnswerSection = (event) => {
    setUserAnswer(event.target.value);
  };
  const handleNextQuestion = () => {
    if (userAnswer === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setUserAnswer("");
  };
  return (
    <div className="App">
      <h1>Question of the day</h1>
      {questions.length > 0 && (
        <div>
          <h2>{questions[currentQuestionIndex].question}</h2>
          <ul className="quiz-list">
            {questions[currentQuestionIndex].incorrect_answers.map((answer) => (
              <li key={answer}>
                <label htmlFor="">
                  <input
                    type="radio"
                    name="answer"
                    value={answer}
                    checked={userAnswer === answer}
                    id=""
                    onChange={handleAnswerSection}
                  />
                  {answer}
                </label>
              </li>
            ))}
            <li key={questions[currentQuestionIndex].correct_answer}>
              <label htmlFor="">
                <input
                  type="radio"
                  name="answer"
                  value={questions[currentQuestionIndex].correct_answer}
                  id=""
                  checked={
                    userAnswer ===
                    questions[currentQuestionIndex].correct_answer
                  }
                  onChange={handleAnswerSection}
                />
                {questions[currentQuestionIndex].correct_answer}
              </label>
            </li>
          </ul>
          {userAnswer && (
            <div>
              <p className="btn">
                {userAnswer === questions[currentQuestionIndex].correct_answer
                  ? "Correct"
                  : "Incorrect"}
              </p>
              <p className="quiz-p">Score : {score}</p>
              <p className="quiz-p">
                You Score {score} out of {questions.length} questions
              </p>
              {currentQuestionIndex < questions.length - 1 && (
                <button className="btn" onClick={handleNextQuestion}>
                  Next Question
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
