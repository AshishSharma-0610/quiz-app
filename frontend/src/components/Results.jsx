import { motion } from 'framer-motion';
import { Award, Trophy, RefreshCw } from 'lucide-react';

const Results = ({ score, totalQuestions, onRestart, maxScore, theme }) => {
  const percentage = (score / maxScore) * 100; // Calculate percentage score

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }} // Animation for component entry
      animate={{ opacity: 1, scale: 1 }}
      className={`w-full max-w-lg mx-auto rounded-xl shadow-lg p-8 text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
    >
      {/* Display Trophy or Award based on score */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="mb-6"
      >
        {percentage >= 80 ? (
          <Trophy className="w-16 h-16 mx-auto text-yellow-500" /> // Trophy for high score (80%+)
        ) : (
          <Award className="w-16 h-16 mx-auto text-primary" /> // Award for lower score
        )}
      </motion.div>

      {/* Display quiz completion message */}
      <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
      <p className="text-lg mb-2">Your Score:</p>

      {/* Display score */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8 }}
        className="text-4xl font-bold text-primary mb-6"
      >
        {score}/{maxScore}
      </motion.div>

      {/* Display additional statistics */}
      <div className={`mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        <p>Total Questions: {totalQuestions}</p>
        <p>Percentage: {percentage.toFixed(1)}%</p>
      </div>

      {/* Button to restart the quiz */}
      <motion.button
        whileHover={{ scale: 1.05 }} // Hover animation
        whileTap={{ scale: 0.95 }}   // Tap animation
        className="flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
        onClick={onRestart} // Trigger onRestart function when clicked
      >
        <RefreshCw className="w-5 h-5" />
        Try Again
      </motion.button>
    </motion.div>
  );
};

export default Results;
