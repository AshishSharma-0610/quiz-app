import { motion } from 'framer-motion'; // Import framer-motion for animations

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Animated spinner */}
      <motion.div
        animate={{ rotate: 360 }} // Spin the element 360 degrees
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }} // Continuous infinite spinning
        className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
      />
      {/* Loading text */}
      <span className="ml-4 text-lg font-medium">Loading quiz...</span>
    </div>
  );
};

export default LoadingScreen;
