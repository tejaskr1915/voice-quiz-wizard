
export interface QuizQuestion {
  question: string;
  answers: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: string;
  hint: string;
}

export const quizData: QuizQuestion[] = [
  {
    question: "What is the capital of France?",
    answers: {
      A: "London",
      B: "Berlin",
      C: "Paris",
      D: "Madrid",
    },
    correctAnswer: "C",
    hint: "This city is known for the Eiffel Tower.",
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: {
      A: "Jupiter",
      B: "Mars",
      C: "Venus",
      D: "Saturn",
    },
    correctAnswer: "B",
    hint: "Its reddish appearance is due to iron oxide on its surface.",
  },
  {
    question: "What is the largest mammal in the world?",
    answers: {
      A: "Elephant",
      B: "Giraffe",
      C: "Blue Whale",
      D: "Hippopotamus",
    },
    correctAnswer: "C",
    hint: "This animal lives in the ocean and can grow up to 100 feet long.",
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: {
      A: "Vincent Van Gogh",
      B: "Pablo Picasso",
      C: "Michelangelo",
      D: "Leonardo da Vinci",
    },
    correctAnswer: "D",
    hint: "This Italian artist also created 'The Last Supper'.",
  },
  {
    question: "Which of these is not a programming language?",
    answers: {
      A: "Java",
      B: "Photoshop",
      C: "Python",
      D: "JavaScript",
    },
    correctAnswer: "B",
    hint: "This is actually a software application for editing images.",
  },
];
