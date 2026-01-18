import React from "react";
import ModeToggle from "./providers/features/theme/mode-toggle";
import TodoList from "./components/TodoList";
import useTodos from "./hooks/useTodos";

const App = () => {
  const todoApi = useTodos();

  return (
    <div>
      <TodoList {...todoApi} />
      <ModeToggle />
    </div>
  );
};

export default App;
