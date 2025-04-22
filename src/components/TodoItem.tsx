import React, { useState } from "react";
import { Todo } from "../types";

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim()) {
      setIsEditing(false);
      onEdit(todo.id, editText);
    }
  };

  return (
    <div className="flex items-center justify-between bg-white shadow-md rounded-xl p-3 mb-3">
      <div className="flex items-center gap-2 flex-1">
        <input
          className="
            peer relative appearance-none shrink-0 w-4 h-4 border-1 border-[#123458] rounded-sm mt-1 bg-white
            focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-[#123458]
            checked:bg-[#123458] checked:border-0
            disabled:border-steel-400 disabled:bg-steel-400
          "
          type="checkbox"
          checked={todo.checked}
          onChange={() => onToggle(todo.id)}
        />
        <svg
          className="absolute w-4 h-4 pointer-events-none hidden peer-checked:block stroke-white mt-1 outline-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        {isEditing ? (
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleEdit()}
            className="border rounded px-2 py-1 w-full"
          />
        ) : (
          <span
            className={`text-lg ${
              todo.checked ? "line-through text-gray-400" : "text-black"
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>
      <div className="flex gap-2 ml-2">
        {isEditing ? (
          <button
            onClick={handleEdit}
            className="text-sm text-white p-2 rounded-full bg-[#123458] hover:opacity-90"
          >
            💾
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-white p-2 rounded-full bg-[#123458] hover:opacity-90"
          >
            ✏️
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="text-sm text-white p-2 rounded-full bg-[#123458] hover:opacity-90"
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
