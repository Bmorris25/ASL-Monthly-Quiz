import { useEffect, useState } from "react";

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
  const [answers, setAnswers] = useState([]);
  const [isMuted, setIsMuted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const speakText = (text) => {
  if (isMuted) return;

  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(text);
  speech.rate = 0.9;

  window.speechSynthesis.speak(speech);
};

  useEffect(() => {
    if (!currentQuestion) return;

    const speech = new SpeechSynthesisUtterance(
      currentQuestion.question
    );

    speech.rate = 0.9;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  }, [currentQuestion]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    const isCorrect =
      selectedAnswer === currentQuestion.correct;

    const updatedScore = isCorrect
      ? score + 1
      : score;

    const answerRecord = {
    question: currentQuestion.question,
    image: currentQuestion.image,
    selectedAnswer: selectedAnswer,
    correctAnswer: currentQuestion.correct,
    isCorrect: isCorrect,
  };

  const updatedAnswers = [
    ...answers,
    answerRecord,
  ];

    const isLastQuestion =
      currentQuestionIndex === questions.length - 1;

    if (isLastQuestion) {
      onFinish(updatedScore, updatedAnswers);
      return;
    }

    const nextQuestion =
  questions[currentQuestionIndex + 1];

  setAnswers(updatedAnswers);
  setScore(updatedScore);
  setCurrentQuestionIndex(
    (previousIndex) => previousIndex + 1
  );
  setSelectedAnswer("");

  speakText(nextQuestion.question);
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

  <button
    type="button"
    className="mute-button"
    onClick={() => {
      if (!isMuted) {
        window.speechSynthesis.cancel();
      }

      setIsMuted(!isMuted);
    }}
  >
    {isMuted ? "🔇 Muted" : "🔊 Sound On"}
  </button>
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

        <button
            type="button"
            className="repeat-question-button"
            onClick={() => speakText(currentQuestion.question)}
          >
            🔊 Repeat Question
          </button>

        <div className="answer-buttons">
          {currentQuestion.answers.map((answer) => (
            <button
                key={answer}
                className={`answer-button ${
                  selectedAnswer === answer ? "selected" : ""
                }`}
                onClick={() => handleAnswerSelect(answer)}
                onMouseEnter={() => speakText(answer)}
                onFocus={() => speakText(answer)}
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