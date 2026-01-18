import React from "react";
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";

const TodoList = ({ todos, addTodo, editTodo, toggleTodo, deleteTodo }) => {
  return (
    <div className="flex flex-col gap-2 m-20 w-full max-w-xl mx-auto">
      <TodoInput addTodo={addTodo} />
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={deleteTodo}
          onEdit={editTodo}
          onToggle={toggleTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
