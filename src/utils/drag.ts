import { DropResult } from "react-beautiful-dnd";
import { AreaModel } from "../model";
import { Todo } from "../model/Todo";

export const onDragEnd = (result: DropResult, todos: Todo[], areas: AreaModel[], setTodos: (value: Todo[]) => void) => {
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