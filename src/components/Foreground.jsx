import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Card from "./Card";

function Foreground() {
  const [todos, setTodos] = useState(getLocalStorage());

  const ulRef = useRef(null)

  // for edit todos
  function handleEditTodo(editedTodo) {
    setTodos((prevTodo) =>
      prevTodo.map((todo) => (todo.id == editedTodo.id ? editedTodo : todo))
    );
  }

  // for delete todos
  function handleDeletTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  // for check and uncheck todos
  function handleCheckTodo(id) {
    let filterTodo = todos.find((todo) => todo.id == id);
    filterTodo.check = !filterTodo.check;
    setTodos((prevTodo) =>
      prevTodo.map((todo) => (todo.id == id ? filterTodo : todo))
    );
  }

  // to get todos by localStorage
  function getLocalStorage() {
    console.log('im get item by local storage')
    let localTodo = localStorage.getItem("todos");
    if (localTodo) {
      return JSON.parse(localStorage.getItem("todos"));
    } else {
      return [];
    }
  }

  // to store todos in localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="w-full h-full fixed z-[4] top-0 left-0">
      <Header inputData={todos} setInputData={setTodos} />
      <ul ref={ulRef} className="flex flex-wrap gap-5 w-full h-full list-none border-t-2 p-2">
        {todos && todos.length == 0 ? (
          <li className="text-4xl mt-4 text-white w-full text-center leading-[50px]">
            You have No Todos.... Please Add Todo First
          </li>
        ) : (
          todos.map((todo) => (
            <Card
              key={todo.id}
              todo={todo}
              editTodo={handleEditTodo}
              deleteTodo={handleDeletTodo}
              checkTodo={handleCheckTodo}
              refrence={ulRef}
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default Foreground;
