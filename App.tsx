import NewTodo from './NewTodo';
import './App.css';
import { useState, useEffect } from 'react';
import Todo from './modules/todo';
import { saveData, loadData } from './storage';

function App() {
  const [todos, setTodos] =  useState<Todo[]>([]);
  const [prevTodos,setPrevTodo]= useState<Todo[]>([]);

  useEffect(() => {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos === null) {
    setTodos([]);
  } else {
    const parsedTodos = JSON.parse(storedTodos) as Todo[];
    setTodos(parsedTodos);
  }
}, []);

  function addTodoHandler(text: string){
    const todo = new Todo(text);
    setTodos((currentTodos: Todo[]) => [
      ...currentTodos, todo ]);
    saveData('todos', [...todos, todo]);
  }

  function undoHandler() {
    setTodos((prevTodos) => {
      setPrevTodo(prevTodos); 
      return prevTodos.slice(0, -1); 
    });
  }

  function buttonDeleteHandler (key: string){
    setPrevTodo(todos);
    const newTodos = todos.filter((todo) => todo.key !== key);
      setTodos(newTodos)
      saveData('todos',newTodos);
  }

  function containerClickHandler(todo: Todo) {
    setPrevTodo(todos);
    const confirmed = window.confirm(`The task is ${todo.text}. You already finished it?`);
    if (confirmed) {
      const updatedTodo = new Todo(todo.text);
      updatedTodo.complete = true;
      updatedTodo.key = todo.key;
      const newTodos = todos.map((t) =>
        t.key === updatedTodo.key ? updatedTodo : t
      );
      setTodos(newTodos);
      saveData('todos',newTodos)
    }
  }

  function buttonEditHandler(key: string, newText: string){
    setPrevTodo(todos);
    const updatedText = prompt('Enter new todo text:', newText);
    if (updatedText !== null && updatedText !== '') {
      const newTodos = todos.map((todo) =>
      todo.key === key ? { ...todo, text: updatedText } : todo
    );
    setTodos(newTodos);
    saveData('todos', newTodos);
    }
  }
  
  return (
    <div className="App">
     <NewTodo onAddTodo={addTodoHandler} undo={undoHandler}/>
    <ul className="center" >
      {todos.map((todo) => (
      <p
      className={`todo-container ${todo.complete ? 'completed' : ''}`}
      onDoubleClick={(e) => 
        {
          e.stopPropagation(); buttonEditHandler(todo.key, todo.text);
        }
    }
          >
          <span className="todo-text">{todo.text}</span>
          <span className="buttonDandC">
              {/* Render the Complete button */}
               <button  onClick={(e) =>{e.stopPropagation(); containerClickHandler(todo);}}>Complete</button>             
               <button onClick={(e) => {e.stopPropagation(); buttonDeleteHandler(todo.key);}}>Delete</button>
          </span>
       </p>
        ))}
    </ul>
  </div>
  );
}

export default App;
