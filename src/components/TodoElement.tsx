import TrashIcon from "../icons/TrashIcon";
import type { Todo } from "../store";
import useTodos from "../store";
import { motion } from "motion/react";

export default function TodoElement({ todo }: { todo: Todo }) {
  const removeTodo = useTodos((state) => state.removeTodo);
  const toggleTodo = useTodos((state) => state.toggleTodo);

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      style={{ originY: 0 }}
      className="flex "
    >
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          onChange={() => toggleTodo(todo.id)}
          className="h-4 w-4"
        />
        <p
          className="text-base"
          style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        >
          {todo.title}
        </p>
      </div>
      <button
        className="cursor-pointer bg-red-500 rounded-md p-1"
        onClick={() => removeTodo(todo.id)}
      >
        <TrashIcon />
      </button>
    </motion.div>
  );
}
