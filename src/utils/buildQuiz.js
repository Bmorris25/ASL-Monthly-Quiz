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

const quizConfig = {
  "k-1": {
    category1: 3,
    category3: 3,
    category4: 3,
    category5: 3,
  },

  "2-3": {
    category1: 3,
    category2: 3,
    category3: 3,
    category4: 3,
    category5: 3,
  },

  "4-5": {
    category1: 3,
    category2: 3,
    category3: 3,
    category4: 3,
    category5: 3,
  },
};

export function buildQuiz(questionBank, grade) {
  const config = quizConfig[grade];
  const selectedQuestions = [];

  Object.entries(config).forEach(
    ([category, amount]) => {
      const categoryQuestions =
        questionBank[category];

      if (!categoryQuestions) return;

      const randomQuestions =
        shuffleArray(categoryQuestions)
          .slice(0, amount)
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