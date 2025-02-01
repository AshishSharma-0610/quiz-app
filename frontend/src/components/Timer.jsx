import { motion } from 'framer-motion';

const Timer = ({ timeRemaining }) => {
  // Calculate minutes and seconds from total time remaining
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  // Check if time remaining is less than 1 minute
  const isLowTime = timeRemaining < 60;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }} // Initial animation state
      animate={{ opacity: 1, y: 0 }} // Final animation state
      className={`text-center mb-4 ${isLowTime ? 'text-red-500' : 'text-primary'}`} // Conditional styling
    >
      {/* Display formatted time */}
      <div className="text-xl font-bold">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>

      {/* If time is less than 1 minute, show warning message with animation */}
      {isLowTime && (
        <motion.div
          animate={{ scale: [1, 1.1, 1] }} // Pulsing animation to draw attention
          transition={{ duration: 1, repeat: Infinity }} // Infinite repeat
          className="text-sm"
        >
          Time is running out!
        </motion.div>
      )}
    </motion.div>
  );
};

export default Timer;
