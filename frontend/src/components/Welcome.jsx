import { motion } from 'framer-motion'; // For animations
import { Play, Clock, Book, ListChecks } from 'lucide-react'; // Icons from lucide-react

const Welcome = ({ onStart, title, topic, duration, questionsCount, theme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Initial animation state (fade in and slide up)
      animate={{ opacity: 1, y: 0 }} // Final animation state (fully visible, no vertical movement)
      className={`w-full max-w-lg text-center rounded-xl shadow-lg p-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`} // Conditional background color based on theme
    >
      {/* Animated title with scaling effect */}
      <motion.h1
        className="text-3xl font-bold mb-2"
        animate={{ scale: [1, 1.05, 1] }} // Pulse effect (scale up and back down)
        transition={{ duration: 2, repeat: Infinity }} // Continuous repeat with 2 seconds duration
      >
        {title}
      </motion.h1>

      {/* Topic description */}
      <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
        {topic}
      </p>

      {/* Information grid: Duration and Question count */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {/* Duration information */}
        <div className={`flex items-center justify-center gap-2 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
          <Clock className="w-5 h-5 text-primary" />
          <span>{duration} minutes</span>
        </div>

        {/* Questions count information */}
        <div className={`flex items-center justify-center gap-2 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
          <ListChecks className="w-5 h-5 text-primary" />
          <span>{questionsCount} questions</span>
        </div>
      </div>

      {/* Scoring system explanation */}
      <div className="space-y-4">
        {/* Correct answer marks */}
        <div className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
          <Book className="w-4 h-4" />
          <span>Each correct answer: +4 marks</span>
        </div>

        {/* Incorrect answer marks */}
        <div className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
          <Book className="w-4 h-4" />
          <span>Each wrong answer: -1 mark</span>
        </div>
      </div>

      {/* Start quiz button with hover and tap animation */}
      <motion.button
        whileHover={{ scale: 1.05 }} // Scale up slightly on hover
        whileTap={{ scale: 0.95 }} // Scale down slightly on tap
        className="flex items-center justify-center gap-2 mx-auto px-8 py-4 mt-8 bg-primary text-white rounded-lg hover:bg-secondary transition-colors text-lg font-semibold"
        onClick={onStart} // Start quiz on click
      >
        <Play className="w-5 h-5" />
        Start Quiz
      </motion.button>
    </motion.div>
  );
};

export default Welcome;
