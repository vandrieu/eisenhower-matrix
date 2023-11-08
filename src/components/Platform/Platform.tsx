import { DragDropContext } from 'react-beautiful-dnd';
import { onDragEnd } from '../../utils/drag';

import Area from '../Area/Area';

import { AreaName, initialAreas } from '../../model';
import './Platform.css';
import useTodos from '../../hooks/useTodos';
import { getTodosForArea } from '../../utils/misc';
import { Todo } from '../../model/Todo';


function Platform() {
  const areas = initialAreas
  const [todos, setTodos] = useTodos()

  const addTodo = (key: AreaName) => {
    let area = areas.find(area => area.name === key)
    if (!area) throw new Error(`Area ${key} not found`)
    const newTodo: Todo = new Todo(area.important, area.urgent, todos)
    setTodos([...todos, newTodo])
  }

  const removeTodo = (todoId: string) => {
    setTodos(todos.filter(todo => todo.id !== todoId))
  }

  const changeTodo = (todoId: string, text: string) => {
    if (!text?.trim()) {
      return removeTodo(todoId)
    }
    setTodos(todos.map(todo => todo.id === todoId ? { ...todo, text } : todo))
  }

  return (
    <div className="platform">

      <div className="label urgent">Urgent</div>
      <div className="label not-urgent">Not urgent</div>
      <div className="label important">Important</div>
      <div className="label not-important">Not important</div>

      <DragDropContext onDragEnd={result => onDragEnd(result, todos, areas, setTodos)}>
        {areas.map((area, index) =>
          <Area key={area.name} areaKey={area.name} data={getTodosForArea(todos, areas, area.name)} add={addTodo} change={changeTodo} remove={removeTodo} />
        )}
      </DragDropContext>
    </div>
  )
}

export default Platform;