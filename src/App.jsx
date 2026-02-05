import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Sidebar from "./components/Sidebar";
import TodoList from "./components/TodoList";
import TodoDetail from "./components/TodoDetail";
import useTodos from "./hooks/useTodos";

const App = () => {
  const todoApi = useTodos();
  const { todos } = todoApi;

  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("default");
  const [selectedTodoId, setSelectedTodoId] = useState(null);

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "Completed") return todo.completed;
      if (filter === "Pending") return !todo.completed;
      return true;
    })
    .filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const priorityValues = { High: 3, Medium: 2, Low: 1 };

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sort === "priority") {
      return priorityValues[b.priority] - priorityValues[a.priority];
    }
    if (sort === "createdAt") {
      return b.createdAt - a.createdAt;
    }
    // default sort
    return Number(a.completed) - Number(b.completed);
  });

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar
        {...todoApi}
        filter={filter}
        setFilter={setFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sort={sort}
        setSort={setSort}
      />
      <div className="flex flex-1 h-screen">
        <main className="flex-1 overflow-y-auto p-6">
          <TodoList
            todos={sortedTodos}
            editTodo={todoApi.editTodo}
            toggleTodo={todoApi.toggleTodo}
            deleteTodo={todoApi.deleteTodo}
            onSelectTodo={setSelectedTodoId}
            selectedTodoId={selectedTodoId}
          />
        </main>
        <AnimatePresence mode="wait">
          {selectedTodo && (
            <TodoDetail
              key={selectedTodoId}
              todo={selectedTodo}
              onEdit={todoApi.editTodo}
              addSubtask={todoApi.addSubtask}
              toggleSubtask={todoApi.toggleSubtask}
              deleteSubtask={todoApi.deleteSubtask}
              onClose={() => setSelectedTodoId(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
