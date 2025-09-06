import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AddTodo from "../components/AddTodo";
import useTodos from "../store";

function resetStore() {
  useTodos.getState().clearTodos();
}

describe("AddTodo Component", () => {
  beforeEach(() => {
    resetStore();
  });

  it("shows error for empty input", () => {
    render(<AddTodo />);
    fireEvent.click(screen.getByText(/Confirmer/i));
    expect(screen.getByText(/ne peut pas être vide/i)).toBeInTheDocument();
  });

  it("shows error for too long input", () => {
    render(<AddTodo />);
    fireEvent.change(screen.getByPlaceholderText(/Nouvelle tâche/i), {
      target: { value: "a".repeat(101) },
    });
    fireEvent.click(screen.getByText(/Confirmer/i));
    expect(screen.getByText(/trop long/i)).toBeInTheDocument();
  });

  it("adds todo and clears input on success", () => {
    render(<AddTodo />);
    const input = screen.getByPlaceholderText(/Nouvelle tâche/i);
    fireEvent.change(input, { target: { value: "Test" } });
    fireEvent.click(screen.getByText(/Confirmer/i));
    expect(input).toHaveValue("");
  });
});
