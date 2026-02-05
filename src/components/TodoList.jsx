import React from "react";
import TodoItem from "./TodoItem";
import { motion } from "framer-motion";

const TodoList = ({
  todos,
  editTodo,
  toggleTodo,
  deleteTodo,
  onSelectTodo,
  selectedTodoId,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {/* --- Empty State or Todo List --- */}
      {todos.length === 0 ? (
        // --- Empty State Message ---
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-muted p-8 bg-muted/20 my-10">
          <div className="text-lg font-semibold mb-2 text-muted-foreground">
            <span>No tasks match your filters.</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Try changing your filters or adding a new task.
          </div>
        </div>
      ) : (
        // --- Render Todo List Items ---
        <motion.div
          layout="position"
          transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
          className="flex flex-col gap-2"
        >
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              onEdit={editTodo}
              onToggle={toggleTodo}
              onSelect={() => onSelectTodo(todo.id)}
              isSelected={todo.id === selectedTodoId}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default TodoList;
