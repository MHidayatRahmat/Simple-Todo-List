import React from 'react';
import { useState, useRef } from 'react';
import './NewTodo.css'

interface NewTodoProps {
  onAddTodo: (text: string) => void;
  undo: () => void;
}


function NewTodo(props: NewTodoProps) {
  const [isInputInstruction, setIsInputInstruction]=useState('Please insert your Todo list here ');
  const todoTextInputRef= useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const enteredText=todoTextInputRef.current!.value;
    if (enteredText.trim().length===0){
      window.alert("Please fill the input text first before submit");
      return;
    }
    props.onAddTodo(enteredText);
    todoTextInputRef.current!.value = "";
  }

  function inputFocus(){
    setIsInputInstruction('');
  }

  function inputBlurHandler(event: React.FocusEvent<HTMLInputElement>){
    if(!event.target.value){
      setIsInputInstruction('Please insert your Todo list here ');
    }
  }


  return (
    <form onSubmit={handleSubmit} className='center'>
      <div className='wrapper'>
      <label htmlFor="todo-text">My Todo List</label>
      <div className='scndWrapper'>
        <input 
        type="text"
        id="todo-text" 
        ref={todoTextInputRef}
        placeholder={isInputInstruction}
        onFocus={inputFocus}
        onBlur={inputBlurHandler}
        />
        <button type="submit">Add Todo</button>
      </div>
      <span className='undoButt'>
      <button onClick={props.undo}>Undo</button>
      </span>
      </div>
    </form>
  );
}

export default NewTodo;
