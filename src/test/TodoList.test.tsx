import { describe, it, expect, beforeEach } from "vitest";
import { act, render, screen } from "@testing-library/react";
import TodoList from "../components/TodoList";
import useTodos from "../store";

describe("TodoList Component", () => {
  beforeEach(() => {
    useTodos.setState({ todos: [] });
  });

  it("renders empty state", () => {
    render(<TodoList />);
    expect(screen.getByText(/Ajoutez une tâche/i)).toBeInTheDocument();
  });

  it("renders todos when present", () => {
    useTodos.getState().addTodo("Test");
    render(<TodoList />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("updates when todo is added and removed", () => {
    render(<TodoList />);
    expect(screen.getByText(/Ajoutez une tâche/i)).toBeInTheDocument();

    act(() => {
      useTodos.getState().addTodo("Test");
    });
    expect(screen.getByText("Test")).toBeInTheDocument();

    const id = useTodos.getState().todos[0].id;
    act(() => {
      useTodos.getState().removeTodo(id);
    });
    expect(screen.getByText(/Ajoutez une tâche/i)).toBeInTheDocument();
  });
});
