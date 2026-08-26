import { useState } from "react";
import StartScreen from "./components/StartScreen";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");

  const handleStart = (name, month, grade) => {
    setStudentName(name);
    setSelectedMonth(month);
    setSelectedGrade(grade);
    setQuizStarted(true);
  };

  if (!quizStarted) {
    return <StartScreen onStart={handleStart} />;
  }

  return (
    <div>
      <h1>Quiz Started!</h1>

      <p>Student: {studentName}</p>
      <p>Month: {selectedMonth}</p>
      <p>Grade: {selectedGrade}</p>
    </div>
  );
}

export default App;