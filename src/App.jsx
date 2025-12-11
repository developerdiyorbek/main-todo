import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Biror vazifa qo'shing", editing: false },
    { id: 2, text: "Tahrirlash va o'chirishni sinang", editing: false },
  ]);
  const [inputValue, setInputValue] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: trimmed, editing: false },
    ]);
    setInputValue("");
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const startEdit = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, editing: true, draft: task.text } : task
      )
    );
  };

  const updateDraft = (id, value) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, draft: value } : task))
    );
  };

  const saveEdit = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id && task.draft?.trim()
          ? {
              ...task,
              text: task.draft.trim(),
              editing: false,
              draft: undefined,
            }
          : { ...task, editing: false, draft: undefined }
      )
    );
  };

  const cancelEdit = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, editing: false, draft: undefined } : task
      )
    );
  };

  const taskCount = tasks.length;
  const hasTasks = taskCount > 0;

  return (
    <div className="app">
      <header className="app__header">
        <div>
          <p className="app__eyebrow">Soddalashtirilgan TODO</p>
          <h1 className="app__title">Ishlaringiz ro&apos;yxati</h1>
          <p className="app__subtitle">
            Qo&apos;shish, tahrirlash va o&apos;chirish uchun pastdagi
            boshqaruvlardan foydalaning.
          </p>
        </div>
      </header>

      <section className="app__panel">
        <form className="todo-form" onSubmit={addTask}>
          <input
            className="todo-input"
            type="text"
            placeholder="Yangi vazifa..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="btn primary">
            Qo&apos;shish
          </button>
        </form>

        <div className="todo-list">
          {!hasTasks && (
            <p className="empty">
              Hozircha vazifa yo&apos;q. Yangi vazifa qo&apos;shing.
            </p>
          )}

          {tasks.map((task, idx) => (
            <div
              key={task.id}
              className={`todo-item ${task.editing ? "is-editing" : ""}`}
            >
              <div className="todo-item__meta">
                <span className="todo-index">
                  #{String(idx + 1).padStart(2, "0")}
                </span>
                <span className="pill pill--soft">
                  {task.editing ? "Tahrirlanmoqda" : "Faol vazifa"}
                </span>
              </div>

              <div className="todo-item__body">
                {task.editing ? (
                  <input
                    className="todo-edit-input"
                    value={task.draft ?? ""}
                    onChange={(e) => updateDraft(task.id, e.target.value)}
                    autoFocus
                  />
                ) : (
                  <span className="todo-text">{task.text}</span>
                )}

                <div className="actions">
                  {task.editing ? (
                    <>
                      <button
                        className="btn success"
                        onClick={() => saveEdit(task.id)}
                      >
                        Saqlash
                      </button>
                      <button
                        className="btn ghost"
                        onClick={() => cancelEdit(task.id)}
                      >
                        Bekor
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn secondary"
                        onClick={() => startEdit(task.id)}
                      >
                        Tahrirlash
                      </button>
                      <button
                        className="btn danger"
                        onClick={() => deleteTask(task.id)}
                      >
                        O&apos;chirish
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
