import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-purple-600">
      <motion.form
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleLogin}
        className="p-8 bg-white/20 backdrop-blur-lg shadow-lg rounded-lg w-96"
      >
        <h2 className="text-3xl font-bold text-white text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 mt-4 w-full bg-transparent text-white placeholder-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 mt-4 w-full bg-transparent text-white placeholder-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="mt-6 w-full py-2 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all"
        >
          Login
        </button>
      </motion.form>
    </div>
  );
};

export default Login;
