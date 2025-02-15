import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // For animations

const Home = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen flex flex-col bg-cover bg-center relative"
      
    >
      {/* Dark Overlay for Better Readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Navbar */}
      <nav className="relative w-full flex justify-between items-center py-4 px-8 bg-white/80 backdrop-blur-md shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">Task Manager</h1>
        <div className="space-x-4">
          <button 
            onClick={() => navigate("/login")} 
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </button>
          <button 
            onClick={() => navigate("/signup")} 
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center flex-grow text-center px-6">
        {/* Animated Welcome Text */}
        <motion.h1 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold text-white drop-shadow-lg"
        >
          Welcome to Your <span className="text-blue-300">Task Manager App</span> 
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg text-gray-200 mt-4 max-w-2xl"
        >
          Organize your tasks in a very Effective way , stay productive, and achieve your goals with ease.
        </motion.p>

        {/* Animated Call-to-Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 1, duration: 1 }}
          className="mt-6 flex space-x-4"
        >
          <button 
            onClick={() => navigate("/signup")} 
            className="bg-yellow-300 text-gray-800 px-6 py-3 text-lg font-bold rounded-lg shadow-md hover:bg-yellow-400 transition duration-300"
          >
            Get Started 
          </button>
          <button 
            onClick={() => navigate("/login")} 
            className="bg-white text-gray-800 px-6 py-3 text-lg font-bold rounded-lg shadow-md hover:bg-gray-200 transition duration-300"
          >
            Already have an account? Login
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
