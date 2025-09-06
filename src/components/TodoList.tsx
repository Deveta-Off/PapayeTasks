import { AnimatePresence } from "motion/react";
import TodoElement from "./TodoElement";
import useTodos from "../store";

export default function TodoList() {
  const todos = useTodos((state) => state.todos);

  return (
    <div className="m-5 p-5 bg-[#f3a444] w-11/12 sm:w-2/3 rounded-md flex flex-col gap-1 overflow-y-scroll max-h-screen">
      <AnimatePresence>
        {todos.length > 0
          ? todos.map((todo) => <TodoElement todo={todo} key={todo.id} />)
          : <h1>Ajoutez une tâche ! 😸</h1>}
      </AnimatePresence>
    </div>
  );
}
