import React from "react";
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { useState } from "react";

const TodoList = ({ todos, addTodo, editTodo, toggleTodo, deleteTodo }) => {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const pending = total - completed;
  const [filter, setFilter] = useState("all");
  const visibleTodos =
    filter === "completed"
      ? todos.filter((todo) => todo.completed)
      : filter === "pending"
      ? todos.filter((todo) => !todo.completed)
      : todos;

  return (
    <div className="flex flex-col gap-2 m-20 w-full max-w-xl mx-auto">
      <TodoInput addTodo={addTodo} onFilterChange={setFilter}/>
      {todos.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-muted p-8 bg-muted/20 my-10">
          <div className="text-lg font-semibold mb-2 text-muted-foreground">
            No tasks
          </div>
          <div className="text-sm text-muted-foreground">
            Create a task to get started
          </div>
        </div>
      ) : (
        visibleTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onEdit={editTodo}
            onToggle={toggleTodo}
          />
        ))
      )}
      {todos.length > 0 && (
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
