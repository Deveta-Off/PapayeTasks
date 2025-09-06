"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import useTodos from "../store";

export default function AddTodo() {
  const addTodo = useTodos((state) => state.addTodo);
  const clearTodos = useTodos((state) => state.clearTodos);
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = inputRef.current?.value?.trim() ?? "";

    // Validation
    if (!title) {
      setError("Le titre ne peut pas être vide");
      toast.error("Le titre ne peut pas être vide");
      return;
    }
    if (title.length > 100) {
      setError(`Titre trop long (max 100 caractères)`);
      toast.error("Titre de la tâche trop long !");
      return;
    }

    addTodo(title);
    e.currentTarget.reset();
    setError(null);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="mt-6 w-11/12 sm:w-2/3 flex flex-col gap-2"
    >
      {/* Responsive layout: mobile stacks, desktop in a row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-col flex-1">
          <input
            type="text"
            placeholder="Nouvelle tâche..."
            name="title"
            ref={inputRef}
            className={`p-2 bg-white rounded-md flex-1 border ${
              error ? "border-red-500" : "border-transparent"
            }`}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <div className="flex flex-row gap-2 sm:flex-row sm:gap-2 sm:ml-4">
          <button
            type="submit"
            className="p-2 w-1/2 sm:w-auto bg-[#e58e26] hover:bg-[#c7730d] rounded-md text-white transition-all duration-200 ease-in-out"
          >
            Confirmer
          </button>
          <button
            className="p-2 w-1/2 sm:w-auto bg-[#e54c26] hover:bg-[#d43912] rounded-md text-white transition-all duration-200 ease-in-out"
            onClick={(e) => {
              e.preventDefault();
              clearTodos();
            }}
          >
            Effacer
          </button>
        </div>
      </div>
    </form>
  );
}
