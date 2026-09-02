import { useState } from "react";
import StartScreen from "./components/StartScreen";
import Quiz from "./components/Quiz";
import Results from "./components/Results";

import { septemberQuiz } from "./data/september";
import { buildQuiz } from "./utils/buildQuiz";

function App() {
  const [page, setPage] = useState("start");

  const [studentName, setStudentName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [score, setScore] = useState(0);

  const handleStart = (name, month, grade) => {
    setStudentName(name);
    setSelectedMonth(month);
    setSelectedGrade(grade);

    // For now, only September is connected.
    if (month === "September") {
      const questionBank = septemberQuiz.questions[grade];

      const randomQuiz = buildQuiz(questionBank, grade);

      setQuizQuestions(randomQuiz);
    }

    setScore(0);
    setPage("quiz");
  };

  const handleFinish = (finalScore) => {
    setScore(finalScore);
    setPage("results");
  };

  const handleTryAgain = () => {
    const questionBank = septemberQuiz.questions[selectedGrade];

    const newQuiz = buildQuiz(
      questionBank,
      selectedGrade
    );

    setQuizQuestions(newQuiz);
    setScore(0);
    setPage("quiz");
  };

  const handleChooseAnotherQuiz = () => {
    setQuizQuestions([]);
    setScore(0);
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
        onTryAgain={handleTryAgain}
        onChooseAnotherQuiz={handleChooseAnotherQuiz}
      />
    );
  }

  return null;
}

export default App;