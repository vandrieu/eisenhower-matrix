import { AreaModel, AreaName } from "../model"
import { Todo } from "../model/Todo"

export function getTodosForArea(todos: Todo[], areas: AreaModel[], areaKey: AreaName) {
  const area = areas.find(area => area.name === areaKey)
  if (!area) throw new Error(`Area ${areaKey} not found`)
  return todos.filter(todo => todo.important === area.important && todo.urgent === area.urgent)
}