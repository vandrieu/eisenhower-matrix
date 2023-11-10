import { AreaModel, AreaName } from "../model";
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
    this.order = allTodos.reduce((max, todo) => Math.max(todo.order, max), 100) + 1
  }

  static findById(id: string, todos: Todo[]) {
    const todo = todos.find(t => t.id === id)
    if (!todo) throw new Error(`Todo ${id} not found`)
    return todo
  }

  static reorderTodos(oldOrder: number, newOrder: number, allTodos: Todo[], area: AreaModel): Todo[] {

    const areaTodos = Todo.getTodosForArea_(allTodos, area.important, area.urgent)
    const notAreaTodos = allTodos.filter(todo => !areaTodos.includes(todo))

    const sortedAreaTodos = Todo.sortByOrder(areaTodos)

    const shift = (newOrder > oldOrder) ? -1 : +1
    for (let i = Math.min(oldOrder, newOrder); i <= Math.max(oldOrder, newOrder); i++) {
      const todo = sortedAreaTodos[i]
      todo.order += shift
    }
    sortedAreaTodos[oldOrder].order = newOrder


    return [...sortedAreaTodos, ...notAreaTodos]

  }

  static sortByOrder(todos: Todo[]) {
    function comparator(t1: Todo, t2: Todo) {
      if (t1.order < t2.order) {
        return -1;
      }
      if (t1.order > t2.order) {
        return 1;
      }
      return 0;
    }
    const arrayClone = [...todos]
    arrayClone.sort(comparator)
    for (let i = 0; i < arrayClone.length; i++) {
      arrayClone[i].order = i
    }
    return arrayClone
  }

  static getTodosForArea(todos: Todo[], areas: AreaModel[], areaKey: AreaName) {
    const area = areas.find(area => area.name === areaKey)
    if (!area) throw new Error(`Area ${areaKey} not found`)
    return this.getTodosForArea_(todos, area.important, area.urgent)
  }

  static getTodosForArea_(todos: Todo[], important: boolean, urgent: boolean) {
    return todos.filter(todo => todo.important === important && todo.urgent === urgent)
  }

}