function Quiz({ studentName, month, grade, onFinish }) {
  const question = {
    image: "/images/placeholder-question.png",
    question: "What does this sign mean?",
    answers: [
      "Answer One",
      "Answer Two",
      "Answer Three",
      "Answer Four",
    ],
  };

  const handleFinish = () => {
    onFinish(18);
  };

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
          Question 1 of 20
        </div>

        <div className="question-image-container">
          <img
            src={question.image}
            alt="Quiz question"
            className="question-image"
          />
        </div>

        <h2 className="question-text">
          {question.question}
        </h2>

        <div className="answer-buttons">
          {question.answers.map((answer) => (
            <button
              key={answer}
              className="answer-button"
            >
              {answer}
            </button>
          ))}
        </div>

        <button
          className="next-button"
          onClick={handleFinish}
        >
          Finish Quiz
        </button>

      </div>
    </div>
  );
}

export default Quiz;