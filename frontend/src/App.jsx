/**import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import Welcome from './components/Welcome';
import QuizCard from './components/QuizCard';
import Results from './components/Results';
import ErrorScreen from './components/ErrorScreen';
import LoadingScreen from './components/LoadingScreen';
import Timer from './components/Timer';
import ProgressBar from './components/ProgressBar';
import { useSound } from './hooks/useSound';

function App() {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('welcome');
  const [timeRemaining, setTimeRemaining] = useState(15 * 60); // 15 minutes in seconds
  const { theme, toggleTheme } = useTheme();
  const { playCorrect, playIncorrect, playComplete } = useSound();

  const fetchQuizData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:3000/api/quiz');
      if (!response.ok) throw new Error('Server error');
      const data = await response.json();
      setQuizData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameState('results');
            playComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, timeRemaining]);

  const handleStart = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setTimeRemaining(15 * 60);
  };

  const handleAnswer = (selectedOption) => {
    const correct = selectedOption.is_correct;
    if (correct) {
      setScore(score + parseInt(quizData.correct_answer_marks));
      playCorrect();
    } else {
      setScore(score - parseInt(quizData.negative_marks));
      playIncorrect();
    }

    if (currentQuestion + 1 < quizData.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGameState('results');
      playComplete();
    }
  };

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} onRetry={fetchQuizData} />;
  if (!quizData) return null;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-2 rounded-full bg-primary text-white"
      >
        {theme === 'dark' ? '🌞' : '🌙'}
      </button>

      <div className="container mx-auto px-4 py-8">
        {gameState === 'playing' && (
          <div className="mb-4">
            <Timer timeRemaining={timeRemaining} />
            <ProgressBar
              current={currentQuestion + 1}
              total={quizData.questions_count}
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {gameState === 'welcome' && (
            <Welcome
              key="welcome"
              onStart={handleStart}
              title={quizData.title}
              topic={quizData.topic}
              duration={quizData.duration}
              questionsCount={quizData.questions_count}
              theme={theme}
            />
          )}

          {gameState === 'playing' && quizData.questions && (
            <QuizCard
              key={`question-${currentQuestion}`}
              question={quizData.questions[currentQuestion].description}
              options={quizData.questions[currentQuestion].options}
              onAnswer={handleAnswer}
              currentIndex={currentQuestion}
              totalQuestions={quizData.questions_count}
              isLast={currentQuestion === quizData.questions.length - 1}
              solution={quizData.questions[currentQuestion].detailed_solution}
              theme={theme}
            />
          )}

          {gameState === 'results' && (
            <Results
              key="results"
              score={score}
              totalQuestions={quizData.questions_count}
              onRestart={handleStart}
              maxScore={quizData.questions_count * parseInt(quizData.correct_answer_marks)}
              theme={theme}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;*/

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import Welcome from './components/Welcome';
import QuizCard from './components/QuizCard';
import Results from './components/Results';
import ErrorScreen from './components/ErrorScreen';
import LoadingScreen from './components/LoadingScreen';
import Timer from './components/Timer';
import { useSound } from './hooks/useSound';
import { Sun, Moon } from 'lucide-react'; // Import Lucide icons for theme toggle

function App() {
  // State hooks for quiz data, loading, error, and game state
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('welcome');
  const [timeRemaining, setTimeRemaining] = useState(15 * 60); // 15 minutes in seconds
  const { theme, toggleTheme } = useTheme(); // Hook to manage theme
  const { playCorrect, playIncorrect, playComplete } = useSound(); // Sound hooks

  // Ref for QuizCard to track its height (not used actively here yet)
  const quizCardRef = useRef(null);
  const [quizCardHeight, setQuizCardHeight] = useState(0);

  // Fetch quiz data from the API
  const fetchQuizData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:3000/api/quiz');
      if (!response.ok) throw new Error('Server error');
      const data = await response.json();
      setQuizData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Use effect to fetch quiz data on component mount
  useEffect(() => {
    fetchQuizData();
  }, []);

  // Timer logic: countdown when the game is in progress
  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameState('results');
            playComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer); // Cleanup on game state change
  }, [gameState, timeRemaining]);

  // Handle the start of the game
  const handleStart = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setTimeRemaining(15 * 60); // Reset timer for the new game
  };

  // Handle answering a question
  const handleAnswer = (selectedOption) => {
    const correct = selectedOption.is_correct;
    if (correct) {
      setScore(score + parseInt(quizData.correct_answer_marks)); // Add points for correct answer
      playCorrect(); // Play correct sound
    } else {
      setScore(score - parseInt(quizData.negative_marks)); // Subtract points for incorrect answer
      playIncorrect(); // Play incorrect sound
    }

    // Move to the next question or end the game if it's the last question
    if (currentQuestion + 1 < quizData.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGameState('results');
      playComplete(); // Play completion sound
    }
  };

  // Show loading screen while fetching data
  if (loading) return <LoadingScreen />;
  // Show error screen if there was an error
  if (error) return <ErrorScreen error={error} onRetry={fetchQuizData} />;
  if (!quizData) return null; // Ensure quizData is available before rendering content

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme} // Toggle theme between light and dark
        className="fixed top-4 left-4 p-2 rounded-full bg-primary text-white hover:bg-primary-dark transition-all z-20"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />} {/* Icon for theme */}
      </button>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 flex flex-col justify-center items-center min-h-screen">
        {/* Show Timer when game is playing */}
        {gameState === 'playing' && (
          <div className="w-full max-w-xl mb-4">
            <Timer timeRemaining={timeRemaining} />
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Welcome screen */}
          {gameState === 'welcome' && (
            <Welcome
              key="welcome"
              onStart={handleStart}
              title={quizData.title}
              topic={quizData.topic}
              duration={quizData.duration}
              questionsCount={quizData.questions_count}
              theme={theme}
            />
          )}

          {/* QuizCard screen */}
          {gameState === 'playing' && quizData.questions && (
            <div className="w-full max-w-xl">
              {/* Passing ref for QuizCard */}
              <QuizCard
                key={`question-${currentQuestion}`}
                ref={quizCardRef}
                question={quizData.questions[currentQuestion].description}
                options={quizData.questions[currentQuestion].options}
                onAnswer={handleAnswer}
                currentIndex={currentQuestion}
                totalQuestions={quizData.questions_count}
                isLast={currentQuestion === quizData.questions.length - 1}
                solution={quizData.questions[currentQuestion].detailed_solution}
                theme={theme}
              />
            </div>
          )}

          {/* Results screen */}
          {gameState === 'results' && (
            <Results
              key="results"
              score={score}
              totalQuestions={quizData.questions_count}
              onRestart={handleStart}
              maxScore={quizData.questions_count * parseInt(quizData.correct_answer_marks)}
              theme={theme}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
