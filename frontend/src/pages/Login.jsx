import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // For password visibility toggle

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/todos");
    } catch (error) {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-700 animate-gradient">
      <motion.form
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleLogin}
        className="p-8 bg-white/10 backdrop-blur-md shadow-lg rounded-2xl w-96 border border-white/20"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>
        
        <div className="relative">
          <input
            type="email"
            placeholder="Email"
            className="border border-white/30 p-3 mt-2 w-full bg-transparent text-white placeholder-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="relative mt-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border border-white/30 p-3 w-full bg-transparent text-white placeholder-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-300 hover:text-white"
          >
            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all"
        >
          Login
        </button>

        <p className="mt-4 text-gray-300 text-sm text-center">
          Don't have an account? <a href="/register" className="text-white font-semibold hover:underline">Sign up</a>
        </p>
      </motion.form>
    </div>
  );
};

export default Login;
