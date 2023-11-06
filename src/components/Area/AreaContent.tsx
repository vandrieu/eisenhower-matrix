import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './AreaContent.css';
import Todo from '../Todo/Todo';
import { AreaName, TodoModel } from '../../model';
import { StrictModeDroppable } from '../Droppable/StrictModeDroppable';

function AreaContent(props: AreaContentProps) {
  const { areaKey, todos, change, remove } = props;

  return (
    <div className={"area-content"}>

      <StrictModeDroppable key={areaKey} droppableId={areaKey} >
        {(provided, snapshot) => (

          <div className={"area-droppable" + (snapshot.isDraggingOver ? " dragging-over" : "")} {...provided.droppableProps} ref={provided.innerRef}>
            <TransitionGroup component={null}>

              {todos.map((item, index) =>
                <CSSTransition key={item.id} classNames="item" timeout={300} exit={false}>
                  <Todo key={item.id} data={item} index={index} change={change} remove={remove} />
                </CSSTransition>)
              }

            </TransitionGroup>
            {provided.placeholder}
          </div>

        )}
      </StrictModeDroppable>

    </div>
  )
}

type AreaContentProps = {
  areaKey: AreaName,
  todos: TodoModel[],
  change: (todoId: string, text: string) => void,
  remove: (todoId: string) => void
}

export default AreaContent;