import React from "react";
import { TodoProvider } from "./context/TodoContext"; // Import the TodoProvider from your context directory
import TodoList from "./components/TodoList"; // Import TodoList component

const App = () => {
  return (
    <TodoProvider>
      <div>
        <h1>Todo App</h1>
        <TodoList /> {/* Use the TodoProvider to wrap the TodoList and provide context */}
      </div>
    </TodoProvider>
  );
};

export default App;