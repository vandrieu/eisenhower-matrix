import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './AreaContent.css';
import TodoView from '../Todo/TodoView';
import { AreaName, Todo } from '../../model/model';
import { StrictModeDroppable } from '../Droppable/StrictModeDroppable';
import { sortByOrder } from '../../model/TodoController';

function AreaContent(props: AreaContentProps) {
  const { areaKey, todos, add, change, remove } = props;

  return (
    <div className={"area-content"} onDoubleClick={() => add(areaKey)}>

      <StrictModeDroppable key={areaKey} droppableId={areaKey} >
        {(provided, snapshot) => (

          <div className={"area-droppable" + (snapshot.isDraggingOver ? " dragging-over" : "")} {...provided.droppableProps} ref={provided.innerRef}>
            <TransitionGroup component={null}>

              {sortByOrder(todos).map((item, index) =>
                <CSSTransition key={item.id} classNames="item" timeout={300} exit={false}>
                  <TodoView key={item.id} data={item} index={index} change={change} remove={remove} />
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
  todos: Todo[],
  add: (key: AreaName) => void,
  change: (todoId: string, text: string) => void,
  remove: (todoId: string) => void
}

export default AreaContent;