import { Area, AreaName, Todo } from "./model";
import { generateId } from "../utils/idgenerator";

export function createTodo(important: boolean, urgent: boolean, allTodos: Todo[]): Todo {
  return {
    id: generateId(allTodos.map(t => t.id)),
    text: "",
    important: important,
    urgent: urgent,
    order: allTodos.reduce((max, todo) => Math.max(todo.order, max), 100) + 1,
  }
}

export function reorderTodos(oldOrder: number, newOrder: number, allTodos: Todo[], area: Area): Todo[] {

  const areaTodos = getTodosForArea_(allTodos, area.important, area.urgent)
  const notAreaTodos = allTodos.filter(todo => !areaTodos.includes(todo))

  const sortedAreaTodos = sortByOrder(areaTodos)

  const shift = (newOrder > oldOrder) ? -1 : +1
  for (let i = Math.min(oldOrder, newOrder); i <= Math.max(oldOrder, newOrder); i++) {
    const todo = sortedAreaTodos[i]
    todo.order += shift
  }
  sortedAreaTodos[oldOrder].order = newOrder


  return [...sortedAreaTodos, ...notAreaTodos]

}

export function sortByOrder(todos: Todo[]) {
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

export function getTodosForArea(todos: Todo[], areas: Area[], areaKey: AreaName) {
  const area = areas.find(area => area.name === areaKey)
  if (!area) throw new Error(`Area ${areaKey} not found`)
  return getTodosForArea_(todos, area.important, area.urgent)
}

function getTodosForArea_(todos: Todo[], important: boolean, urgent: boolean) {
  return todos.filter(todo => todo.important === important && todo.urgent === urgent)
}
