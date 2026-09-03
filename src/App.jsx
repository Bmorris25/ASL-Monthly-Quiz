import { useState } from "react";
import StartScreen from "./components/StartScreen";
import Quiz from "./components/Quiz";
import Results from "./components/Results";

import { quizzes } from "./data/quizzes";
import { buildQuiz } from "./utils/buildQuiz";

function App() {
  const [page, setPage] = useState("start");

  const [studentName, setStudentName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleStart = (name, month, grade) => {
    setStudentName(name);
    setSelectedMonth(month);
    setSelectedGrade(grade);


    const quizData = quizzes[month];

if (quizData) {
  const questionBank =
    quizData.questions[grade];

  const randomQuiz =
    buildQuiz(questionBank, grade);

  setQuizQuestions(randomQuiz);
}

    setScore(0);
    setAnswers([]);
    setPage("quiz");
  };

  const handleFinish = (
  finalScore,
  finalAnswers
) => {
  setScore(finalScore);
  setAnswers(finalAnswers);
  setPage("results");
};

  const handleTryAgain = () => {
  const quizData =
  quizzes[selectedMonth];

const questionBank =
  quizData.questions[selectedGrade];

  const newQuiz = buildQuiz(
    questionBank,
    selectedGrade
  );

  setQuizQuestions(newQuiz);
  if (newQuiz.length > 0) {
  const speech =
    new SpeechSynthesisUtterance(
      newQuiz[0].question
    );

  speech.rate = 0.9;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
}

  setScore(0);
  setAnswers([]);
  setPage("quiz");
};

  const handleChooseAnotherQuiz = () => {
  setQuizQuestions([]);
  setScore(0);
  setAnswers([]);
  setPage("start");
};

  if (page === "start") {
    return <StartScreen onStart={handleStart} />;
  }

  if (page === "quiz") {
    return (
      <Quiz
        studentName={studentName}
        month={selectedMonth}
        grade={selectedGrade}
        questions={quizQuestions}
        onFinish={handleFinish}
      />
    );
  }

  if (page === "results") {
    return (
      <Results
  studentName={studentName}
  month={selectedMonth}
  grade={selectedGrade}
  score={score}
  totalQuestions={quizQuestions.length}
  answers={answers}
  onTryAgain={handleTryAgain}
  onChooseAnotherQuiz={handleChooseAnotherQuiz}
      />
    );
  }

  return null;
}

export default App;