import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(""); // Error state for validation
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/todos", {
          headers: { Authorization: token },
        });
        setTodos(res.data);
      } catch (error) {
        alert("Failed to fetch todos");
      }
    };

    fetchTodos();
  }, [navigate]);

  const addTodo = async (e) => {
    e.preventDefault();
    
    // Validation to check if title or description is empty
    if (!title.trim() || !description.trim()) {
      setError("Title and Description cannot be empty!");
      return;
    }

    setError(""); // Clear previous error
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:5000/todos",
        { title, description },
        { headers: { Authorization: token } }
      );
      setTodos([...todos, res.data]);
      setTitle("");
      setDescription("");
    } catch (error) {
      alert("Failed to add todo");
    }
  };

  const deleteTodo = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`, {
        headers: { Authorization: token },
      });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      alert("Failed to delete todo");
    }
  };

  const toggleCompletion = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.patch(`http://localhost:5000/todos/${id}/toggle`, {}, {
        headers: { Authorization: token },
      });
      setTodos(todos.map(todo => todo._id === id ? res.data : todo));
    } catch (error) {
      alert("Failed to update todo status");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-gradient">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6 backdrop-blur-md bg-opacity-80">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6 animate-fadeIn">Your Todos</h2>

        {/* Display Validation Error */}
        {error && <p className="text-red-600 font-semibold text-center mb-2">{error}</p>}

        {/* Add Todo Form */}
        <form onSubmit={addTodo} className="mt-4 flex flex-col gap-4 animate-fadeIn">
          <input 
            type="text" 
            placeholder="Title" 
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition-all duration-300"
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Description" 
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition-all duration-300" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
          <button 
            type="submit" 
            className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 hover:scale-105 transform transition-all duration-300"
          >
            Add Todo
          </button>
        </form>

        {/* Todo List */}
        <ul className="mt-6 space-y-4">
          {todos.map((todo) => (
            <li 
              key={todo._id} 
              className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg transition-transform transform hover:scale-105"
            >
              <div className="flex-1">
                <h3 className={`text-lg font-semibold transition-all duration-300 ${todo.completed ? "line-through text-gray-400" : "text-gray-900"}`}>
                  {todo.title}
                </h3>
                <p className="text-gray-600">{todo.description}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button 
                  onClick={() => toggleCompletion(todo._id)} 
                  className={`px-3 py-2 text-white rounded-lg transition-all duration-300 ${
                    todo.completed ? "bg-gray-500 hover:bg-gray-600" : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {todo.completed ? "Undo" : "Done"}
                </button>
                <button 
                  onClick={() => deleteTodo(todo._id)} 
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-all duration-300"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {todos.length === 0 && <p className="text-center text-gray-100 mt-4">No todos yet. Add one!</p>}
      </div>
    </div>
  );
};

export default Todos;
