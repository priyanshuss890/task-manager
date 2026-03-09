import { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const API = "http://localhost:5000/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const url = filter === "all" ? `${API}/tasks` : `${API}/tasks?status=${filter}`;
      const res = await axios.get(url);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Task Manager</h1>

      <TaskForm API={API} onTaskAdded={fetchTasks} />

      <div style={{ margin: "20px 0", display: "flex", gap: "10px" }}>
        {["all", "pending", "in_progress", "completed"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              padding: "8px 16px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              backgroundColor: filter === s ? "#4a90e2" : "#e0e0e0",
              color: filter === s ? "white" : "#333",
              fontWeight: filter === s ? "bold" : "normal"
            }}
          >
            {s.replace("_", " ").toUpperCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <TaskList tasks={tasks} API={API} onTaskUpdated={fetchTasks} />
      )}
    </div>
  );
}

export default App;
