import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Todos from "./pages/Todos";
import PageTransition from "./components/PageTransition";
import Loader from "./components/Loader";

const AnimatedRoutes = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (navigationType !== "POP") {
      setLoading(true);
      setTimeout(() => setLoading(false), 1000); 
    }
  }, [location]);

  return (
    <>
      {loading && <Loader />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
          <Route path="/todos" element={<PageTransition><Todos /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
