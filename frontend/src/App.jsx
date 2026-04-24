import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL || "";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTasks = () =>
    fetch(`${API}/tasks`)
      .then((r) => r.json())
      .then(setTasks)
      .finally(() => setLoading(false));

  useEffect(() => { fetchTasks(); }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await fetch(`${API}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setTitle("");
    fetchTasks();
  };

  const toggleTask = async (task) => {
    await fetch(`${API}/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !task.done }),
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API}/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  return (
    <div style={{ maxWidth: 500, margin: "60px auto", fontFamily: "sans-serif", padding: "0 16px" }}>
      <h1 style={{ textAlign: "center" }}>Task Manager</h1>
      <form onSubmit={addTask} style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task..."
          style={{ flex: 1, padding: "8px 12px", fontSize: 16, borderRadius: 6, border: "1px solid #ccc" }}
        />
        <button type="submit" style={{ padding: "8px 16px", borderRadius: 6, background: "#2563eb", color: "#fff", border: "none", cursor: "pointer", fontSize: 16 }}>
          Add
        </button>
      </form>

      {loading ? (
        <p style={{ textAlign: "center", color: "#888" }}>Loading...</p>
      ) : tasks.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888" }}>No tasks yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <li key={task.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid #eee" }}>
              <input type="checkbox" checked={task.done} onChange={() => toggleTask(task)} />
              <span style={{ flex: 1, textDecoration: task.done ? "line-through" : "none", color: task.done ? "#aaa" : "#111" }}>
                {task.title}
              </span>
              <button onClick={() => deleteTask(task.id)} style={{ background: "none", border: "none", color: "#e11d48", cursor: "pointer", fontSize: 18 }}>
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
