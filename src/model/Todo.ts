import { generateId } from "../utils/idgenerator";

export class Todo {

  id: string;
  text: string;
  important: boolean;
  urgent: boolean;
  order: number;

  constructor(important: boolean, urgent: boolean, allTodos: Todo[]) {
    this.id = generateId(allTodos.map(t => t.id))
    this.text = ""
    this.important = important
    this.urgent = urgent
    this.order = allTodos.reduce((max, todo) => Math.max(todo.order, max), 0) + 1
  }

}