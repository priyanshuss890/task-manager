import { useState } from "react";
import axios from "axios";

const statusColors = {
  pending: "#ff9800",
  in_progress: "#2196f3",
  completed: "#4caf50"
};

function TaskList({ tasks, API, onTaskUpdated }) {
  const [editing, setEditing] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API}/tasks/${id}`, { status });
      onTaskUpdated();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/tasks/${id}`);
      onTaskUpdated();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(`${API}/tasks/${id}`, { title: editTitle, description: editDesc });
      setEditing(null);
      onTaskUpdated();
    } catch (err) {
      console.error("Error saving edit:", err);
    }
  };

  if (tasks.length === 0) {
    return <p style={{ textAlign: "center", color: "#888" }}>No tasks found.</p>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} style={{ background: "white", border: "1px solid #eee", borderRadius: "8px", padding: "16px", marginBottom: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          {editing === task.id ? (
            <div>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                style={{ width: "100%", padding: "8px", marginBottom: "8px", borderRadius: "4px", border: "1px solid #ddd", boxSizing: "border-box" }}
              />
              <textarea
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                style={{ width: "100%", padding: "8px", marginBottom: "8px", borderRadius: "4px", border: "1px solid #ddd", boxSizing: "border-box", height: "60px" }}
              />
              <button onClick={() => saveEdit(task.id)} style={{ backgroundColor: "#4caf50", color: "white", padding: "6px 12px", border: "none", borderRadius: "4px", cursor: "pointer", marginRight: "8px" }}>Save</button>
              <button onClick={() => setEditing(null)} style={{ backgroundColor: "#e0e0e0", padding: "6px 12px", border: "none", borderRadius: "4px", cursor: "pointer" }}>Cancel</button>
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3 style={{ margin: "0 0 4px 0" }}>{task.title}</h3>
                  {task.description && <p style={{ margin: "0 0 8px 0", color: "#666" }}>{task.description}</p>}
                  <span style={{ backgroundColor: statusColors[task.status], color: "white", padding: "2px 8px", borderRadius: "12px", fontSize: "12px" }}>
                    {task.status.replace("_", " ").toUpperCase()}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => { setEditing(task.id); setEditTitle(task.title); setEditDesc(task.description); }}
                    style={{ backgroundColor: "#ff9800", color: "white", padding: "6px 12px", border: "none", borderRadius: "4px", cursor: "pointer" }}>Edit</button>
                  <button onClick={() => deleteTask(task.id)}
                    style={{ backgroundColor: "#f44336", color: "white", padding: "6px 12px", border: "none", borderRadius: "4px", cursor: "pointer" }}>Delete</button>
                </div>
              </div>
              <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
                {["pending", "in_progress", "completed"].map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(task.id, s)}
                    disabled={task.status === s}
                    style={{ padding: "4px 10px", border: "1px solid #ddd", borderRadius: "4px", cursor: task.status === s ? "default" : "pointer", backgroundColor: task.status === s ? statusColors[s] : "white", color: task.status === s ? "white" : "#333", fontSize: "12px", opacity: task.status === s ? 1 : 0.7 }}
                  >
                    {s.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskList;