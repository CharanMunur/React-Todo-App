import { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "todos";

const defaultTodos = [
  {
    id: 1,
    title: "Learn React",
    description: "Understand hooks and component flow",
    completed: false,
    priority: "High",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    dueDate: null,
    notes: "Check out the new docs on react.dev",
    subtasks: [
      { id: 1, text: "useState", completed: true },
      { id: 2, text: "useEffect", completed: true },
      { id: 3, text: "useContext", completed: false },
    ],
  },
  {
    id: 2,
    title: "Build Todo App",
    description: "Use proper hooks and structure",
    completed: true,
    priority: "Medium",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    dueDate: new Date().setDate(new Date().getDate() + 3),
    notes: "",
    subtasks: [
      { id: 1, text: "Setup project", completed: true },
      { id: 2, text: "Add add/edit/delete functionality", completed: true },
      { id: 3, text: "Test UI", completed: false },
    ],
  },
  {
    id: 3,
    title: "Read UI/UX Book",
    description: "Complete 'Refactoring UI'",
    completed: false,
    priority: "Low",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    dueDate: null,
    notes: "Focus on color and layout chapters",
    subtasks: [
      { id: 1, text: "Typography", completed: false },
      { id: 2, text: "Color theory", completed: false },
      { id: 3, text: "Layout principles", completed: false },
    ],
  },
  {
    id: 4,
    title: "Review PRs",
    description: "Review open pull requests for team repo",
    completed: false,
    priority: "High",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    dueDate: new Date().setDate(new Date().getDate() + 2),
    notes: "Focus on the authentication branch",
    subtasks: [
      { id: 1, text: "Check code style", completed: true },
      { id: 2, text: "Run tests", completed: false },
      { id: 3, text: "Leave review comments", completed: false },
    ],
  },
  {
    id: 5,
    title: "Write Blog Post",
    description: "Write a blog about React best practices",
    completed: false,
    priority: "Medium",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    dueDate: null,
    notes: "See last month's notes",
    subtasks: [
      { id: 1, text: "Draft outline", completed: true },
      { id: 2, text: "Write first draft", completed: false },
      { id: 3, text: "Add code examples", completed: false },
    ],
  },
  {
    id: 6,
    title: "Buy Groceries",
    description: "Pick up weekly groceries",
    completed: false,
    priority: "Low",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    dueDate: new Date().setDate(new Date().getDate() + 1),
    notes: "Check for discounts on fruits",
    subtasks: [
      { id: 1, text: "Milk", completed: true },
      { id: 2, text: "Eggs", completed: false },
      { id: 3, text: "Apples", completed: false },
      { id: 4, text: "Coffee", completed: false },
    ],
  },
  {
    id: 7,
    title: "Plan Weekend Trip",
    description: "Organize a short weekend getaway",
    completed: false,
    priority: "Medium",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    dueDate: null,
    notes: "",
    subtasks: [
      { id: 1, text: "Book hotel", completed: false },
      { id: 2, text: "Pack bag", completed: false },
      { id: 3, text: "Invite friends", completed: false },
    ],
  },
];

export default function useTodos() {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    try {
      const parsed = stored ? JSON.parse(stored) : defaultTodos;
      return parsed.map(todo => ({
        ...todo,
        dueDate: todo.dueDate ? new Date(todo.dueDate) : null
      }));
    } catch {
      return defaultTodos;
    }
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (
    title,
    description,
    priority = "Medium",
    dueDate = null,
    subtasks = []
  ) => {
    if (!title.trim()) return;
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
      priority,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      dueDate,
      notes: "",
      subtasks,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const editTodo = (id, updatedFields) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, ...updatedFields, updatedAt: Date.now() }
          : todo
      )
    );
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: Date.now() }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const addSubtask = (todoId, text) => {
    const newSubtask = { id: crypto.randomUUID(), text, completed: false };
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: [...todo.subtasks, newSubtask],
              updatedAt: Date.now(),
            }
          : todo
      )
    );
  };

  const toggleSubtask = (todoId, subtaskId) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks.map((subtask) =>
                subtask.id === subtaskId
                  ? { ...subtask, completed: !subtask.completed }
                  : subtask
              ),
              updatedAt: Date.now(),
            }
          : todo
      )
    );
  };

  const deleteSubtask = (todoId, subtaskId) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks.filter(
                (subtask) => subtask.id !== subtaskId
              ),
              updatedAt: Date.now(),
            }
          : todo
      )
    );
  };

  return {
    todos,
    addTodo,
    editTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
  };
}
