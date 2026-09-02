function Results({
  studentName,
  month,
  grade,
  score,
  totalQuestions,
  onTryAgain,
  onChooseAnotherQuiz,
}) {
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
            {score} <span>/ {totalQuestions}</span>
          </div>

          <p className="percentage">
            {percentage}%
          </p>
        </div>

        <p className="result-message">
          Great job!
        </p>

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