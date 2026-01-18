import { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "todos";

const defaultTodos = [
  {
    id: 1,
    title: "Learn React",
    description: "Understand hooks and component flow",
    completed: false,
    createdAt: Date.now(),
  },
  {
    id: 2,
    title: "Build Todo App",
    description: "Use proper hooks and structure",
    completed: true,
    createdAt: Date.now(),
  },
  {
    id: 3,
    title: "Read Documentation",
    description: "Go through the official React docs",
    completed: false,
    createdAt: Date.now(),
  },
  {
    id: 4,
    title: "Implement Features",
    description: "Add new features to the Todo App, like filtering and sorting",
    completed: false,
    createdAt: Date.now(),
  },
  {
    id: 5,
    title: "Refactor Code",
    description: "Clean up code and follow best practices",
    completed: false,
    createdAt: Date.now(),
  },
];

export default function useTodos() {
  // Initialize from localStorage, fallback to defaults on first run
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    try {
      return stored ? JSON.parse(stored) : defaultTodos;
    } catch {
      return defaultTodos;
    }
  });

  // Keep todos in localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title, description) => {
    if (!title.trim()) return;

    const newTodo = {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
      createdAt: Date.now(),
    };

    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id, updatedTodo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return {
    todos,
    addTodo,
    editTodo,
    toggleTodo,
    deleteTodo,
  };
}
