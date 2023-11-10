import { DropResult } from "react-beautiful-dnd";
import { AreaModel, Todo } from "../model/model";
import { reorderTodos } from "../model/TodoController";

export const onDragEnd = (result: DropResult, todos: Todo[], areas: AreaModel[], setTodos: (value: Todo[]) => void) => {
  if (!result.destination) return;
  const { source, destination } = result;

  const destArea = areas.find(area => destination.droppableId === area.name)
  if (!destArea) throw new Error(`destArea "${destArea}" not found`)

  // CASE 1 : DRAG INSIDE THE SAME AREA (RE-ORDER)
  if (destination.droppableId === source.droppableId) {
    setTodos(reorderTodos(source.index, destination.index, todos, destArea));
  }

  // CASE 2 : DRAG ACCROSS DIFFERENT AREAS
  else {
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
  }


};
