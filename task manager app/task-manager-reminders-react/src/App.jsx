import React, { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('tasks') || '[]');
    saved.forEach(task => schedule(task));
    setTasks(saved);

    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  const schedule = (task) => {
    const delay = new Date(task.time).getTime() - Date.now();
    if (delay > 0) {
      setTimeout(() => {
        new Notification('⏰ Reminder', { body: task.text });
      }, delay);
    }
  };

  const add = () => {
    if (!text || !time) return;
    const task = { text, time };
    const updated = [...tasks, task];
    setTasks(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
    schedule(task);
    setText('');
    setTime('');
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <h1>📝 Task Manager with Reminders</h1>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Task" /><br/>
      <input type="datetime-local" value={time} onChange={e => setTime(e.target.value)} /><br/>
      <button onClick={add}>Add Task</button>
      <ul>
        {tasks.map((t,i) =>
          <li key={i}>{t.text} @ {new Date(t.time).toLocaleString()}</li>
        )}
      </ul>
    </div>
  );
}

export default App;
