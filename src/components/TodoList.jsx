import React from "react";
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { motion } from "framer-motion";
import { PartyPopper } from "lucide-react";

const TodoList = ({ todos, addTodo, editTodo, toggleTodo, deleteTodo }) => {
  // --- Calculations for Task Stats and Filtering ---
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const pending = total - completed;
  const [filter, setFilter] = useState("All");

  // --- Filtering Logic ---
  const visibleTodos =
    filter === "Completed"
      ? todos.filter((todo) => todo.completed)
      : filter === "Pending"
      ? todos.filter((todo) => !todo.completed)
      : todos;

  // --- Sort: Pending first, then Completed ---
  const sortedTodos = [...visibleTodos].sort(
    (a, b) => Number(a.completed) - Number(b.completed)
  );

  return (
    <div className="flex flex-col gap-2 m-20 w-full max-w-xl mx-auto">
      {/* --- Input area with add and filter --- */}
      <TodoInput addTodo={addTodo} onFilterChange={setFilter} filter={filter} />

      {/* --- Empty State or Todo List --- */}
      {sortedTodos.length === 0 ? (
        // --- Empty State Message ---
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-muted p-8 bg-muted/20 my-10">
          <div className="text-lg font-semibold mb-2 text-muted-foreground">
            {filter === "Completed" ? (
              "No completed tasks yet"
            ) : filter === "Pending" ? (
              <span>
                No pending tasks — nice work{" "}
                <PartyPopper className="inline w-5 h-5 align-[-0.125em]" />
              </span>
            ) : (
              "No tasks yet"
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            Try switching filters or add a new task
          </div>
        </div>
      ) : (
        // --- Render Todo List Items ---
        <motion.div layout className="flex flex-col gap-2">
          {sortedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              onEdit={editTodo}
              onToggle={toggleTodo}
            />
          ))}
        </motion.div>
      )}

      {/* --- Task Count Stats --- */}
      {sortedTodos.length > 0 && (
        <div>
          <Separator className="my-4" />
          <div className="flex h-5 items-center justify-center space-x-10 text-sm">
            <div>Total tasks: </div>
            <Badge variant="default">{total}</Badge>
            <Separator orientation="vertical" />
            <div>Completed: </div>
            <Badge variant="secondary">{completed}</Badge>
            <Separator orientation="vertical" />
            <div>Pending: </div>
            <Badge variant="outline">{pending}</Badge>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
