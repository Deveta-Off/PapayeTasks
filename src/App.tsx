import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="flex flex-col items-center max-h-screen">
      <h1 className="mt-6 font-bold text-3xl">PapayeTasks 😺</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
}

export default App;
