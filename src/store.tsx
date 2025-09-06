import { create } from "zustand";
import { v7 as uuidv7 } from "uuid";
import { toast } from "sonner";

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type TodoStore = {
  todos: Todo[];
  addTodo: (title: string) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  clearTodos: () => void;
};

const saveTodos = (todos: Todo[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const useTodos = create<TodoStore>((set) => ({
  todos: (() => {
    try {
      const stored = localStorage.getItem("todos");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  })(),

  addTodo: (title: string) => {
    if (title.length >= 100) {
      throw new Error("TITLE_LONG");
    }
    
    set((state) => {
      const newTodos = [
        ...state.todos,
        { id: uuidv7(), title, completed: false },
      ];
      saveTodos(newTodos);
      toast.success("Tâche ajoutée avec succès !");
      return { todos: newTodos };
    });
  },

  removeTodo: (id: string) =>
    set((state) => {
      const newTodos = state.todos.filter((todo) => todo.id !== id);

      saveTodos(newTodos);

      return { todos: newTodos };
    }),

  toggleTodo: (id: string) =>
    set((state) => {
      const newTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )

      saveTodos(newTodos)

      return { todos: newTodos}
    }),

    clearTodos: () => 
      set(() => {
        saveTodos([])
        return { todos: [] }
      })
}));

export default useTodos;
