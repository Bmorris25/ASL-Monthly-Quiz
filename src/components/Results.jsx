import { useState } from "react";

function Results({
  studentName,
  month,
  grade,
  score,
  totalQuestions,
  answers = [],
  onTryAgain,
  onChooseAnotherQuiz,
}) {
  const [showReview, setShowReview] = useState(false);

  const percentage = Math.round(
    (score / totalQuestions) * 100
  );

  return (
    <div className="results-screen">
      <div className="results-container">
        <h1>Quiz Complete!</h1>

        <div className="student-result">
          <h2>{studentName}</h2>
          <p>
            {month} • {grade}
          </p>
        </div>

        <div className="score-container">
          <p className="score-label">
            Your Score
          </p>

          <div className="score">
            {score}
            <span> / {totalQuestions}</span>
          </div>

          <p className="percentage">
            {percentage}%
          </p>
        </div>

        <p className="result-message">
          Great job!
        </p>

        <button
          className="review-toggle"
          onClick={() => setShowReview(!showReview)}
        >
          {showReview
            ? "Hide Answer Review"
            : "Review Your Answers"}
        </button>


        {showReview && (
          <div className="answer-review">
            {answers.map((answer, index) => (
              <div
                key={index}
                className={`review-card ${
                  answer.isCorrect
                    ? "correct"
                    : "incorrect"
                }`}
              >
                <p className="review-number">
                  Question {index + 1}
                </p>

                <img
                  src={answer.image}
                  alt={`Question ${index + 1}`}
                  className="review-image"
                />

                <h3>{answer.question}</h3>

                <p>
                  Your answer:{" "}
                  <strong>
                    {answer.selectedAnswer}
                  </strong>
                </p>

                {!answer.isCorrect && (
                  <p>
                    Correct answer:{" "}
                    <strong>
                      {answer.correctAnswer}
                    </strong>
                  </p>
                )}

                <p className="review-status">
                  {answer.isCorrect
                    ? "✓ Correct"
                    : "✗ Incorrect"}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="result-buttons">
          <button
            className="result-button"
            onClick={onTryAgain}
          >
            Try Again
          </button>

          <button
            className="result-button secondary"
            onClick={onChooseAnotherQuiz}
          >
            Choose Another Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;