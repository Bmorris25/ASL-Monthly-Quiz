function shuffleArray(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(
      Math.random() * (i + 1)
    );

    [shuffled[i], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[i],
    ];
  }

  return shuffled;
}

export function buildQuiz(questionBank) {
  const selectedQuestions = [];

  Object.values(questionBank).forEach(
    (categoryQuestions) => {
      if (!categoryQuestions) return;

      const randomQuestions =
        shuffleArray(categoryQuestions)
          .slice(0, 3)
          .map((question) => ({
            ...question,
            answers: shuffleArray(
              question.answers
            ),
          }));

      selectedQuestions.push(
        ...randomQuestions
      );
    }
  );

  return shuffleArray(selectedQuestions);
}