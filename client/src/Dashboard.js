import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  const fetchTasks = useCallback(async () => {
    const res = await axios.get("https://studenttask-manager.onrender.com/tasks", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(res.data);
  }, [token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async () => {
    await axios.post("https://studenttask-manager.onrender.com/tasks",
      { title },
      { headers: { Authorization: `Bearer ${token}` }}
    );
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`https://studenttask-manager.onrender.com/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
  };

  return (
    <div>
      <h2>Dashboard</h2>

      {/* ✅ LOGOUT BUTTON (correct place) */}
      <button onClick={() => {
        localStorage.removeItem("token");
        window.location.reload();
      }}>
        Logout
      </button>

      <input
        placeholder="New Task"
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map(t => (
          <li key={t._id}>
            {t.title}
            <button onClick={() => deleteTask(t._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;