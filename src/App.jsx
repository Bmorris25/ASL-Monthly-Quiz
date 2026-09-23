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
    const quizData = quizzes[month];

    if (!quizData) {
  return;
}

const questionBank =
  quizData.questions[grade];

console.log("GRADE:", grade);
console.log(
  "AVAILABLE GRADES:",
  Object.keys(quizData.questions)
);
console.log(
  "QUESTION BANK:",
  questionBank
);

if (!questionBank) {
  return;
}

    const randomQuiz =
      buildQuiz(questionBank);

    setStudentName(name);
    setSelectedMonth(month);
    setSelectedGrade(grade);
    setQuizQuestions(randomQuiz);
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

    if (!quizData) {
      return;
    }

    const questionBank =
      quizData.questions[selectedGrade];

    if (!questionBank) {
      return;
    }

    const newQuiz =
      buildQuiz(questionBank);

    setQuizQuestions(newQuiz);
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
    return (
      <StartScreen
        onStart={handleStart}
      />
    );
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
        totalQuestions={
          quizQuestions.length
        }
        answers={answers}
        onTryAgain={handleTryAgain}
        onChooseAnotherQuiz={
          handleChooseAnotherQuiz
        }
      />
    );
  }

  return null;
}

export default App;