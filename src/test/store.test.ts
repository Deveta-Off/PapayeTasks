import { describe, it, expect, beforeEach } from "vitest";
import useTodos from "../store";

function resetStore() {
  useTodos.setState({ todos: [] });
}

describe("Todo Store", () => {
  beforeEach(() => {
    resetStore();
  });

  it("should add a todo", () => {
    useTodos.getState().addTodo("Test");
    expect(useTodos.getState().todos.length).toBe(1);
    expect(useTodos.getState().todos[0].title).toBe("Test");
  });

  it("should throw error for too long title", () => {
    expect(() => useTodos.getState().addTodo("a".repeat(101))).toThrow();
  });

  it("should remove a todo", () => {
    useTodos.getState().addTodo("Test");
    const id = useTodos.getState().todos[0].id;
    useTodos.getState().removeTodo(id);
    expect(useTodos.getState().todos.length).toBe(0);
  });

  it("should toggle a todo", () => {
    useTodos.getState().addTodo("Test");
    const id = useTodos.getState().todos[0].id;
    useTodos.getState().toggleTodo(id);
    expect(useTodos.getState().todos[0].completed).toBe(true);
  });

  it("should clear all todos", () => {
    useTodos.getState().addTodo("Test");
    useTodos.getState().addTodo("Test2");
    useTodos.getState().clearTodos();
    expect(useTodos.getState().todos.length).toBe(0);
  });
});
