import { useState } from "react";

function StartScreen({ onStart }) {
  const [studentName, setStudentName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");

  const months = [
    "September",
    "October",
    "November",
    "December",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
  ];

  const grades = [
    { value: "k-1", label: "K–1" },
    { value: "2-3", label: "2–3" },
    { value: "4-5", label: "4–5" },
  ];

  const handleStart = () => {
  if (!studentName.trim() || !selectedMonth || !selectedGrade) {
    return;
  }

  // Unlock browser speech using the student's click
  const unlockSpeech =
    new SpeechSynthesisUtterance(" ");

  window.speechSynthesis.speak(unlockSpeech);

  onStart(
    studentName.trim(),
    selectedMonth,
    selectedGrade
  );
};

  return (
    <div className="start-screen">
      <div className="start-container">
        <h1>ASL Quiz</h1>

        <section className="selection-section">
          <h2>Student Name</h2>

          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Enter your name"
            className="student-name-input"
          />
        </section>

        <section className="selection-section">
          <h2>Choose a Month</h2>

          <div className="month-buttons">
            {months.map((month) => (
              <button
                key={month}
                className={`selection-button ${
                  selectedMonth === month ? "selected" : ""
                }`}
                onClick={() => setSelectedMonth(month)}
              >
                {month}
              </button>
            ))}
          </div>
        </section>

        <section className="selection-section">
          <h2>Choose Your Grade</h2>

          <div className="grade-buttons">
            {grades.map((grade) => (
              <button
                key={grade.value}
                className={`selection-button grade-button ${
                  selectedGrade === grade.value ? "selected" : ""
                }`}
                onClick={() => setSelectedGrade(grade.value)}
              >
                {grade.label}
              </button>
            ))}
          </div>
        </section>

        <button
          className="start-button"
          onClick={handleStart}
          disabled={
            !studentName.trim() ||
            !selectedMonth ||
            !selectedGrade
          }
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default StartScreen;