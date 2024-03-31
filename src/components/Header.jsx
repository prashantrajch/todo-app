import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Header({ inputData, setInputData }) {
  const [todovalue, setTodoValue] = useState({
    title: "",
    todo: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setTodoValue({ ...todovalue, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (todovalue.title && todovalue.todo) {
      setInputData([
        ...inputData,
        {
          ...todovalue,
          id: uuidv4(),
          check: false,
        },
      ]);
      setTodoValue({
        title: "",
        todo: "",
      });
    }
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="w-full bg-zinc-900/50 p-2 flex gap-5 items-center flex-col md:flex-row">
        <div className="flex flex-col gap-1.5 flex-1 w-full">
          <label
            htmlFor="title"
            className="text-lg leading-none text-white font-bold"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter the title"
            className="px-3 py-1.5 text-md border-none outline-0"
            value={todovalue.title}
            onChange={handleChange}
          />
        </div>
        {todovalue.title && (
          <div className="flex flex-col gap-1.5 flex-1 w-full">
            <label
              htmlFor="todo"
              className="text-lg leading-none text-white font-bold"
            >
              Todo
            </label>
            <input
              type="text"
              name="todo"
              id="todo"
              placeholder="Enter the todo"
              className="px-3 py-1.5 text-md border-none outline-0"
              value={todovalue.todo}
              onChange={handleChange}
            />
          </div>
        )}
        <button className="w-full md:w-48 py-2 font-semibold text-lg rounded-lg bg-zinc-600 hover:bg-zinc-700 hover:text-white">
          Add Todo
        </button>
      </div>
    </form>
  );
}

export default Header;
