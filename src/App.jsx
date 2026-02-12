import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Sidebar from "./components/Sidebar";
import TodoList from "./components/TodoList";
import TodoDetail from "./components/TodoDetail";
import useTodos from "./hooks/useTodos";
import { ScrollArea } from "./components/ui/scroll-area";

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
        <main className="flex-1 p-6 flex flex-col gap-4 min-h-0">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Tasks</h2>
            <span className="text-sm text-muted-foreground">
              {sortedTodos.length} shown
            </span>
          </div>
          <ScrollArea className="flex-1 min-h-0 pr-3">
            <TodoList
              todos={sortedTodos}
              editTodo={todoApi.editTodo}
              toggleTodo={todoApi.toggleTodo}
              deleteTodo={todoApi.deleteTodo}
              onSelectTodo={setSelectedTodoId}
              selectedTodoId={selectedTodoId}
            />
          </ScrollArea>
        </main>
        <ScrollArea className="flex min-h-screen">
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
        </ScrollArea>
      </div>
    </div>
  );
};

export default App;
