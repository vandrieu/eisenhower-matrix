import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Edit, CheckSquare, XSquare } from 'react-feather';
import useKeypress from "../../hooks/useKeyPress";
import TextareaAutosize from 'react-textarea-autosize';

import './Todo.css'

function Todo(props) {
  // TODO: Don't render all the changes all the time
  const { data, areaKey, index, change, remove } = props;

  const [isInputActive, setIsInputActive] = useState((data.setFocus && data.text.length === 0) ?? false); //focus new todo when created
  const [inputValue, setInputValue] = useState(data.text);

  const inputRef = useRef(null);

  const enter = useKeypress("Enter");
  const esc = useKeypress("Escape");

  const onEnter = useCallback(() => {
    if (enter) {
      change(areaKey, index, inputValue);
      setIsInputActive(false);
    }
  }, [enter, inputValue, change]);

  const onEsc = useCallback(() => {
    if (esc) {
      setInputValue(data.text);
      setIsInputActive(false);
    }
  }, [esc, data.text]);

  const onBlur = (e) => {
    change(areaKey, index, inputValue);
    setIsInputActive(false);
  }

  // focus the cursor when edit is active
  useEffect(() => {
    if (isInputActive) {
      const textarea = inputRef.current
      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
      textarea.scrollTop = textarea.scrollHeight;
    }
  }, [isInputActive]);

  useEffect(() => {
    if (isInputActive) {
      onEnter(); // save text changes 
      onEsc(); // revert text changes
    }
  }, [onEnter, onEsc, isInputActive]); // watch the Enter and Escape key presses

  const handleInputChange = useCallback(
    (event) => {
      // TODO: Sanitize input
      setInputValue(event.target.value);
    },
    [setInputValue]
  );

  const handleSave = () => {
    change(areaKey, index, inputValue);
    setIsInputActive(false);
  }

  const handleEdit = () => {
    setIsInputActive(true);
  }

  return (
    <Draggable key={data.id} draggableId={data.id} index={index}>
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
            <button className="action-button remove-button" onClick={() => remove(areaKey, index)}><XSquare /></button>
          </div>
        </div>
      }
    </Draggable>
  );
}

export default Todo;