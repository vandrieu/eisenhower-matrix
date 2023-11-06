import { AreaModel, AreaName, TodoModel } from "../model"

export function getTodosForArea(todos: TodoModel[], areas: AreaModel[], areaKey: AreaName) {
  const area = areas.find(area => area.name === areaKey)
  if (!area) throw new Error(`Area ${areaKey} not found`)
  return todos.filter(todo => todo.important === area.important && todo.urgent === area.urgent)
}