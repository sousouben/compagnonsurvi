
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const questions = [
    {
      id: 1,
      question: "Combien de temps peut-on survivre sans eau ?",
      options: [
        "1 jour",
        "3 jours",
        "1 semaine",
        "2 semaines"
      ],
      correct: 1,
      explanation: "En général, on peut survivre environ 3 jours sans eau, selon les conditions climatiques et l'activité physique."
    },
    {
      id: 2,
      question: "Quelle est la priorité absolue en situation de survie ?",
      options: [
        "Trouver de la nourriture",
        "Construire un abri",
        "Assurer sa sécurité immédiate",
        "Allumer un feu"
      ],
      correct: 2,
      explanation: "La sécurité immédiate est toujours la priorité : évaluer les dangers, s'éloigner des menaces, puis s'occuper des besoins vitaux."
    },
    {
      id: 3,
      question: "Comment purifier l'eau en urgence ?",
      options: [
        "La laisser reposer",
        "La faire bouillir 1 minute",
        "La faire bouillir 3-5 minutes",
        "Ajouter du sel"
      ],
      correct: 2,
      explanation: "Faire bouillir l'eau pendant 3-5 minutes élimine la plupart des bactéries, virus et parasites."
    },
    {
      id: 4,
      question: "Quel signal de détresse international utilise-t-on ?",
      options: [
        "3 coups répétés",
        "SOS (3 courts, 3 longs, 3 courts)",
        "Crier 'Au secours'",
        "Agiter les bras"
      ],
      correct: 1,
      explanation: "SOS en morse (3 signaux courts, 3 longs, 3 courts) est le signal de détresse international reconnu."
    },
    {
      id: 5,
      question: "Comment trouve-t-on le nord sans boussole la nuit ?",
      options: [
        "Suivre la lune",
        "Localiser l'étoile polaire",
        "Observer les nuages",
        "Écouter les bruits"
      ],
      correct: 1,
      explanation: "L'étoile polaire indique toujours le nord. On la trouve en prolongeant la ligne des deux étoiles du bout de la Grande Ourse."
    },
    {
      id: 6,
      question: "Quelle plante est universellement comestible ?",
      options: [
        "Tous les champignons blancs",
        "Les baies rouges",
        "Le plantain",
        "Toutes les fleurs jaunes"
      ],
      correct: 2,
      explanation: "Le plantain est une plante comestible très répandue et facilement identifiable, contrairement aux autres options qui peuvent être dangereuses."
    },
    {
      id: 7,
      question: "Combien de temps peut-on survivre sans nourriture ?",
      options: [
        "3 jours",
        "1 semaine",
        "3 semaines",
        "2 mois"
      ],
      correct: 2,
      explanation: "En moyenne, une personne peut survivre environ 3 semaines sans nourriture, selon sa condition physique et les conditions environnementales."
    },
    {
      id: 8,
      question: "Que faire en cas d'hypothermie ?",
      options: [
        "Frotter vigoureusement la peau",
        "Donner de l'alcool",
        "Réchauffer progressivement",
        "Faire de l'exercice intense"
      ],
      correct: 2,
      explanation: "Il faut réchauffer progressivement la personne, éviter les chocs thermiques et les frottements qui peuvent endommager les tissus."
    },
    {
      id: 9,
      question: "Comment allumer un feu par friction ?",
      options: [
        "Frotter deux pierres",
        "Frotter du bois sec rapidement",
        "Utiliser des feuilles vertes",
        "Frotter du métal"
      ],
      correct: 1,
      explanation: "La friction de bois sec peut créer suffisamment de chaleur pour produire des braises, qu'on peut ensuite transformer en flamme."
    },
    {
      id: 10,
      question: "Quel est le meilleur endroit pour construire un abri ?",
      options: [
        "Au sommet d'une colline",
        "Dans une vallée humide",
        "Sur un terrain légèrement surélevé et protégé",
        "Près d'un cours d'eau rapide"
      ],
      correct: 2,
      explanation: "Un terrain légèrement surélevé évite l'humidité et les inondations, tout en offrant une protection contre le vent."
    }
  ];

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    const isCorrect = selectedAnswer === questions[currentQuestion].correct;
    const newUserAnswers = [...userAnswers, {
      questionId: questions[currentQuestion].id,
      selectedAnswer,
      correct: isCorrect
    }];
    
    setUserAnswers(newUserAnswers);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
    setUserAnswers([]);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "Excellent ! Vous êtes un vrai survivant ! 🏆";
    if (percentage >= 60) return "Bien joué ! Vous avez de bonnes bases. 👍";
    if (percentage >= 40) return "Pas mal, mais il faut encore étudier. 📚";
    return "Il faut revoir les bases de la survie ! 💪";
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "text-green-400";
    if (percentage >= 60) return "text-blue-400";
    if (percentage >= 40) return "text-yellow-400";
    return "text-red-400";
  };

  if (quizCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-4 pt-8 text-center"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="glass-effect rounded-lg p-8 mb-6"
        >
          <Trophy className="mx-auto mb-4 text-yellow-400" size={64} />
          <h1 className="text-2xl font-bold text-white mb-4">Quiz Terminé !</h1>
          
          <div className="mb-6">
            <div className={`text-4xl font-bold mb-2 ${getScoreColor()}`}>
              {score}/{questions.length}
            </div>
            <div className="text-lg text-gray-300 mb-4">
              {Math.round((score / questions.length) * 100)}% de réussite
            </div>
            <p className="text-gray-400">{getScoreMessage()}</p>
          </div>

          <Button 
            onClick={resetQuiz}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            <RotateCcw className="mr-2" size={16} />
            Recommencer
          </Button>
        </motion.div>

        {/* Résultats détaillés */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white mb-4">Résultats détaillés</h2>
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer?.correct;
            
            return (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glass-effect rounded-lg p-4 border-l-4 ${
                  isCorrect ? 'border-green-500' : 'border-red-500'
                }`}
              >
                <div className="flex items-start space-x-3">
                  {isCorrect ? (
                    <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                  ) : (
                    <XCircle className="text-red-400 flex-shrink-0 mt-1" size={20} />
                  )}
                  <div className="flex-1 text-left">
                    <h3 className="font-medium text-white mb-2">{question.question}</h3>
                    <p className="text-sm text-gray-300 mb-1">
                      <span className="text-green-400">Bonne réponse:</span> {question.options[question.correct]}
                    </p>
                    {!isCorrect && (
                      <p className="text-sm text-gray-300 mb-1">
                        <span className="text-red-400">Votre réponse:</span> {question.options[userAnswer.selectedAnswer]}
                      </p>
                    )}
                    <p className="text-xs text-gray-400">{question.explanation}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 pt-8"
    >
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Quiz de Survie</h1>
        <div className="flex items-center justify-center space-x-4 text-gray-400">
          <span>Question {currentQuestion + 1}/{questions.length}</span>
          <span>Score: {score}</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full"
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="glass-effect rounded-lg p-6"
          >
            <div className="flex items-center mb-6">
              <Brain className="text-blue-400 mr-3" size={24} />
              <h2 className="text-lg font-bold text-white">
                {questions[currentQuestion].question}
              </h2>
            </div>

            <div className="space-y-3 mb-6">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedAnswer === index
                      ? 'border-green-500 bg-green-500/20 text-white'
                      : 'border-gray-600 bg-slate-800/50 text-gray-300 hover:border-gray-500'
                  }`}
                >
                  <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                </motion.button>
              ))}
            </div>

            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50"
            >
              {currentQuestion === questions.length - 1 ? 'Terminer' : 'Question suivante'}
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-effect rounded-lg p-6 text-center"
          >
            {selectedAnswer === questions[currentQuestion].correct ? (
              <>
                <CheckCircle className="mx-auto mb-4 text-green-400" size={64} />
                <h2 className="text-xl font-bold text-green-400 mb-2">Correct !</h2>
              </>
            ) : (
              <>
                <XCircle className="mx-auto mb-4 text-red-400" size={64} />
                <h2 className="text-xl font-bold text-red-400 mb-2">Incorrect</h2>
                <p className="text-gray-300 mb-2">
                  La bonne réponse était : <span className="text-green-400 font-bold">
                    {questions[currentQuestion].options[questions[currentQuestion].correct]}
                  </span>
                </p>
              </>
            )}
            
            <p className="text-gray-400 text-sm">
              {questions[currentQuestion].explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Quiz;
