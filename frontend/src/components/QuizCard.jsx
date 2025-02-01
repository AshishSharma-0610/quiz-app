import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGesture } from 'react-use-gesture';
import { ChevronRight, Award, BookOpen, Check, X } from 'lucide-react';

const QuizCard = ({
  question,
  options,
  onAnswer,
  currentIndex,
  totalQuestions,
  isLast,
  solution,
  theme
}) => {
  // State for controlling solution visibility, selected option, and feedback
  const [showSolution, setShowSolution] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Gesture hook for swipe functionality (left/right swipe for selecting options)
  const bind = useGesture({
    onSwipe: ({ direction: [x] }) => {
      if (x > 0) handleOptionSelect(options[0]); // Swipe right selects first option
      if (x < 0) handleOptionSelect(options[options.length - 1]); // Swipe left selects last option
    },
  });

  // Handle option selection and trigger feedback
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      onAnswer(option); // Pass selected option to parent component for answer handling
    }, 1000);
  };

  return (
    <motion.div
      {...bind()} // Apply gesture binding to enable swipe functionality
      className={`w-full max-w-lg rounded-xl shadow-lg p-6 mx-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        {/* Question Header */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-primary font-semibold">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          {/* Button to toggle solution visibility */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`text-sm flex items-center gap-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
            onClick={() => setShowSolution(!showSolution)}
          >
            <BookOpen className="w-4 h-4" />
            {showSolution ? 'Hide Solution' : 'Show Solution'}
          </motion.button>
        </div>
        {/* Display Question */}
        <h2 className="text-xl font-bold mt-2">{question}</h2>
      </div>

      {/* Display Solution if visible */}
      {showSolution ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mb-6 p-4 rounded-lg text-sm ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}
        >
          <h3 className="font-semibold mb-2">Solution:</h3>
          <div className="prose prose-sm">{solution}</div>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {/* Render each option */}
          {options.map((option) => (
            <motion.button
              key={option.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full text-left p-4 rounded-lg border transition-all ${theme === 'dark'
                ? 'border-gray-700 hover:border-primary hover:bg-gray-700'
                : 'border-gray-200 hover:border-primary hover:bg-primary/5'
                }`}
              onClick={() => handleOptionSelect(option)} // Handle option selection
              disabled={showFeedback} // Disable options after feedback is shown
            >
              <div className="flex items-center justify-between">
                <span>{option.description}</span>
                {/* Chevron Icon */}
                <ChevronRight className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {/* Show feedback after selecting an option */}
      <AnimatePresence>
        {showFeedback && selectedOption && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
              p-4 rounded-lg shadow-lg ${selectedOption.is_correct
                ? 'bg-green-500' // Correct answer feedback
                : 'bg-red-500' // Incorrect answer feedback
              } text-white`}
          >
            {selectedOption.is_correct ? (
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>Correct!</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <X className="w-5 h-5" />
                <span>Incorrect</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Display Award icon if it's the last question */}
      {isLast && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-4 -right-4"
        >
          <Award className="w-8 h-8 text-primary" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default QuizCard;
