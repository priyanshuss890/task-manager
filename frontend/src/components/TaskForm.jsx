import { useState } from "react";
import axios from "axios";

function TaskForm({ API, onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/tasks`, { title, description });
      setTitle("");
      setDescription("");
      onTaskAdded();
    } catch (err) {
      setError("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#f9f9f9", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
      <h2 style={{ marginTop: 0 }}>Add New Task</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ddd", boxSizing: "border-box" }}
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ddd", boxSizing: "border-box", height: "80px" }}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{ backgroundColor: "#4a90e2", color: "white", padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer", opacity: loading ? 0.6 : 1 }}
      >
        {loading ? "Adding..." : "Add Task"}
      </button>
    </div>
  );
}

export default TaskForm;