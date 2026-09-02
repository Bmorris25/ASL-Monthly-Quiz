import { useState } from "react";

function Quiz({
  studentName,
  month,
  grade,
  questions,
  onFinish,
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    const isCorrect =
      selectedAnswer === currentQuestion.correct;

    const updatedScore = isCorrect
      ? score + 1
      : score;

    const isLastQuestion =
      currentQuestionIndex === questions.length - 1;

    if (isLastQuestion) {
      onFinish(updatedScore);
      return;
    }

    setScore(updatedScore);
    setCurrentQuestionIndex(
      (previousIndex) => previousIndex + 1
    );
    setSelectedAnswer("");
  };

  if (!currentQuestion) {
    return (
      <div className="quiz-screen">
        <div className="quiz-container">
          <h2>No questions found.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-screen">
      <div className="quiz-container">

        <div className="quiz-header">
          <span>{studentName}</span>

          <span>
            {month} • {grade}
          </span>
        </div>

        <div className="question-progress">
          Question {currentQuestionIndex + 1} of{" "}
          {questions.length}
        </div>

        <div className="question-image-container">
          <img
            src={currentQuestion.image}
            alt={`Question ${
              currentQuestionIndex + 1
            }`}
            className="question-image"
          />
        </div>

        <h2 className="question-text">
          {currentQuestion.question}
        </h2>

        <div className="answer-buttons">
          {currentQuestion.answers.map((answer) => (
            <button
              key={answer}
              className={`answer-button ${
                selectedAnswer === answer
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                handleAnswerSelect(answer)
              }
            >
              {answer}
            </button>
          ))}
        </div>

        <button
          className="next-button"
          onClick={handleNext}
          disabled={!selectedAnswer}
        >
          {currentQuestionIndex ===
          questions.length - 1
            ? "Finish Quiz"
            : "Next"}
        </button>

      </div>
    </div>
  );
}

export default Quiz;