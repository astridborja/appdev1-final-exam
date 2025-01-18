import React, { createContext, useState, useEffect } from "react";

const TodoContext = createContext();

const fetchTodos = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
  const data = await response.json();
  return data;
};

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTodos = async () => {
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
      setLoading(false);
    };
    loadTodos();
  }, []);

  const addTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, {id: todos.length + 1, title: newTodo, completed: false} ]);
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prevTodos) => 
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <TodoContext.Provider
      value={{ todos, loading, addTodo, deleteTodo, toggleComplete }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = React.useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
};