import { proxy, useSnapshot } from "valtio";
import { uniq } from "../../utils/uniq";

type Todo = {
  id: string;
  title: string;
  done: boolean;
};

interface State {
  todos: Todo[];
}

const todosState = proxy<State>({
  todos: [],
});

const addTodo = (item: { title: string }) => {
  todosState.todos.push({
    id: uniq("todo"),
    done: false,
    ...item,
  });
};

const removeTodo = (id: string) => {
  todosState.todos = todosState.todos.filter((todo) => todo.id !== id);
};

const toggleTodo = (id: string) => {
  const todo = todosState.todos.find((todo) => todo.id === id);
  if (todo) {
    todo.done = !todo.done;
  }
};

// Kinda tricky thing
// We need to access global state without snapshot first, and then create snapshot of item, thatwe find
// But it works, and valtio shows the best performance for this case
const useTodoItem = (id: string) => {
  const todoState = todosState.todos.find((todo) => todo.id === id)!;
  return useSnapshot(todoState);
};

export { todosState, addTodo, removeTodo, toggleTodo, useTodoItem };