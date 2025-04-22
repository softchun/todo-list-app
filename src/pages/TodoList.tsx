import React, { useEffect, useState } from "react";
import { Todo } from "../types";
import TodoItem from "../components/TodoItem";

const LOCAL_STORAGE_KEY = "todo_list";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos, isInitialized]);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    const newItem: Todo = {
      id: Date.now(),
      text: newTodo,
      checked: false,
    };
    setTodos((prev) => [...prev, newItem]);
    setNewTodo("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: number, newText: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  return (
    <div className="min-h-screen w-screen bg-[#F1EFEC] sm:bg-[#D4C9BE] sm:py-10 sm:px-4">
      <div className="w-full max-w-screen sm:max-w-3xl sm:mx-auto bg-[#F1EFEC] sm:rounded-xl sm:shadow-lg sm:p-6">
        <div className="text-2xl sm:text-5xl font-bold sm:text-center text-[#030303] mb-6 bg-[#D4C9BE] sm:bg-transparent p-2 sm:p-0">
          🗒️ To-do List
        </div>
        <div className="px-4 sm:px-0">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
              placeholder="Add your task here..."
              className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#123458] text-black"
            />
            <button
              onClick={addTodo}
              className="text-white px-4 py-2 rounded-xl bg-[#123458] hover:opacity-90"
            >
              Add
            </button>
          </div>
          <div className="overflow-auto">
            {todos.length === 0 ? (
              <p className="text-center text-gray-500">
                There is nothing to do yet.
              </p>
            ) : (
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
