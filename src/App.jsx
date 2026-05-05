import React, { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import Sidebar from "./components/Sidebar";
import TodoList from "./components/TodoList";
import TodoDetail from "./components/TodoDetail";
import useTodos from "./hooks/useTodos";
import { ScrollArea } from "./components/ui/scroll-area";

const isSameDay = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const isThisWeek = (date, today) => {
  const startOfWeek = new Date(today);
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  startOfWeek.setDate(diff);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return date >= startOfWeek && date <= endOfWeek;
};

const getDateGroup = (todo, today) => {
  if (!todo.dueDate) return "noDate";

  const dueDate = new Date(todo.dueDate);
  dueDate.setHours(0, 0, 0, 0);

  const todayDate = new Date(today);
  todayDate.setHours(0, 0, 0, 0);

  if (dueDate < todayDate) return "overdue";
  if (isSameDay(dueDate, todayDate)) return "today";
  if (isThisWeek(dueDate, todayDate)) return "thisWeek";
  return "later";
};

const App = () => {
  const todoApi = useTodos();
  const { todos } = todoApi;

  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("default");
  const [viewMode, setViewMode] = useState("list");
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
    return Number(a.completed) - Number(b.completed);
  });

  const groupedTodos = useMemo(() => {
    const today = new Date();
    const groups = {
      overdue: [],
      today: [],
      thisWeek: [],
      later: [],
      noDate: [],
    };

    sortedTodos.forEach((todo) => {
      const group = getDateGroup(todo, today);
      groups[group].push(todo);
    });

    return groups;
  }, [sortedTodos]);

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
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      <div className="flex flex-1 h-screen">
        <main className="flex-1 p-5 flex flex-col gap-4 min-h-0">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Tasks</h2>
            <span className="text-sm text-muted-foreground">
              {sortedTodos.length} shown
            </span>
          </div>
          <ScrollArea className="flex-1 min-h-0">
            <div className="pr-3">
              <TodoList
                todos={sortedTodos}
                groupedTodos={groupedTodos}
                viewMode={viewMode}
                editTodo={todoApi.editTodo}
                toggleTodo={todoApi.toggleTodo}
                deleteTodo={todoApi.deleteTodo}
                onSelectTodo={setSelectedTodoId}
                selectedTodoId={selectedTodoId}
              />
            </div>
          </ScrollArea>
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
