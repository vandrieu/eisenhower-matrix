import { DropResult } from "react-beautiful-dnd";
import { AreaModel, TodoModel } from "../model";

export const onDragEnd = (result: DropResult, todos: TodoModel[], areas: AreaModel[], setTodos: (value: TodoModel[]) => void) => {
  if (!result.destination) return;
  const { destination } = result;

  const destArea = areas.find(area => destination.droppableId === area.name)
  if (!destArea) throw new Error(`destArea "${destArea}" not found`)

  setTodos(todos.map(todo => {
    if (todo.id === result.draggableId) {
      return {
        ...todo,
        important: destArea.important,
        urgent: destArea.urgent,
      }
    }
    return todo
  }
  ))

};