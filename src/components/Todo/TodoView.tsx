import { ChangeEvent, FocusEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { XSquare } from 'react-feather';
import TextareaAutosize from 'react-textarea-autosize';
import useKeypress from "../../hooks/useKeyPress";

import './Todo.css';
import { Todo } from '../../model/Todo';

function TodoView(props: TodoProps) {
  // TODO: Don't render all the changes all the time
  const { data, index, change, remove } = props;

  const [isInputActive, setIsInputActive] = useState(data.text.length === 0 ?? false); //focus empty todo when created
  const [inputValue, setInputValue] = useState(data.text);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const enter = useKeypress("Enter");
  const esc = useKeypress("Escape");

  const onEnter = useCallback(() => {
    if (enter) {
      change(data.id, inputValue);
      setIsInputActive(false);
    }
  }, [enter, inputValue, change]);

  const onEsc = useCallback(() => {
    if (esc) {
      setInputValue(data.text);
      setIsInputActive(false);
    }
  }, [esc, data.text]);

  const onBlur = (e: FocusEvent<HTMLElement>) => {
    change(data.id, inputValue);
    setIsInputActive(false);
  }

  // focus the cursor when edit is active
  useEffect(() => {
    if (isInputActive) {
      const textarea = inputRef.current
      if (textarea) {
        textarea.focus();
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
        textarea.scrollTop = textarea.scrollHeight;
      }
    }
  }, [isInputActive]);

  useEffect(() => {
    if (isInputActive) {
      onEnter(); // save text changes 
      onEsc(); // revert text changes
    }
  }, [onEnter, onEsc, isInputActive]); // watch the Enter and Escape key presses

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLElement & { value: string }>) => {
      // TODO: Sanitize input
      setInputValue(event.target.value);
    },
    [setInputValue]
  );

  const handleEdit = () => {
    setIsInputActive(true);
  }

  return (
    <Draggable key={data.id} draggableId={data.id.toString()} index={index}>
      {(provided, snapshot) =>
        <div
          className={`todo ${snapshot.isDragging ? " active" : ""} ${isInputActive ? " active" : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={handleEdit}
        >
          <div className="text-section">
            {isInputActive ?
              <TextareaAutosize
                className="text-input"
                ref={inputRef}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={onBlur}
              />
              :
              <span className="text-input">
                {data.text}
              </span>
            }
          </div>
          <div className="button-section">
            <button className="action-button remove-button" onClick={() => remove(data.id)}><XSquare /></button>
          </div>
        </div>
      }
    </Draggable>
  );
}

type TodoProps = {
  data: Todo,
  index: number,
  change: (todoId: string, text: string) => void,
  remove: (todoId: string) => void
}

export default TodoView;