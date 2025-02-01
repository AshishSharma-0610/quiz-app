import { motion } from 'framer-motion'; // Import framer-motion for animations
import { AlertCircle, RefreshCw } from 'lucide-react'; // Import icons from lucide-react

const ErrorScreen = ({ error, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }} // Initial animation state (invisible and scaled down)
      animate={{ opacity: 1, scale: 1 }} // Final animation state (fully visible and scaled to normal size)
      className="min-h-screen flex items-center justify-center" // Center content vertically and horizontally
    >
      <div className="text-center">
        {/* Display an alert icon */}
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />

        {/* Error message heading */}
        <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong</h2>

        {/* Display the error description */}
        <p className="text-gray-600 mb-6">{error}</p>

        <motion.button
          whileHover={{ scale: 1.05 }} // Slightly scale up button on hover
          whileTap={{ scale: 0.95 }} // Slightly scale down button on click
          onClick={onRetry} // Trigger retry callback when clicked
          className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg mx-auto"
        >
          {/* Refresh icon */}
          <RefreshCw className="w-5 h-5" />
          {/* Button text */}
          Try Again
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ErrorScreen;
