import { useState } from "react";
import StartScreen from "./components/StartScreen";
import Quiz from "./components/Quiz";
import Results from "./components/Results";

function App() {
  const [page, setPage] = useState("start");

  const [studentName, setStudentName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");

  const [score, setScore] = useState(0);

  const handleStart = (name, month, grade) => {
    setStudentName(name);
    setSelectedMonth(month);
    setSelectedGrade(grade);

    setPage("quiz");
  };

  const handleFinish = (finalScore) => {
    setScore(finalScore);
    setPage("results");
  };

  const handleTryAgain = () => {
    setScore(0);
    setPage("quiz");
  };

  const handleChooseAnotherQuiz = () => {
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
        onTryAgain={handleTryAgain}
        onChooseAnotherQuiz={handleChooseAnotherQuiz}
      />
    );
  }
}

export default App;