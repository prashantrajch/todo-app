import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { BiEdit, BiSave } from "react-icons/bi";
import { FaCheck, FaCheckDouble } from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";
import { motion } from "framer-motion";

function Card({ todo, editTodo, deleteTodo, checkTodo, refrence }) {
  const [isEditable, setIsEditable] = useState(false);
  const [editableTodo, setEdtableTodo] = useState(todo);

  function handleEdit(e) {
    const { name, value } = e.target;
    editableTodo.check = false;
    setEdtableTodo({ ...editableTodo, [name]: value });
  }

  function handleEditSubmit() {
    setIsEditable(!isEditable);
    editTodo(editableTodo);
  }

  return (
    <motion.li
      drag
      dragConstraints={refrence}
      whileDrag={{ scale: "1.2" }}
      dragElastic={0.5}
      className={`w-60 text-white rounded-[20px] overflow-hidden self-start ${
        editableTodo.check ? "bg-green-900/90" : "bg-zinc-900/80"
      }`}
    >
      <div className="header px-4 py-2 flex items-center justify-between gap-4 border-b-2 border-blue-500">
        <TextareaAutosize
          name="title"
          value={editableTodo.title}
          className={`outline-none w-full bg-transparent border-2 resize-none text-lg tracking-wider font-bold ${
            isEditable ? "px-2 border-gray/10" : "border-transparent"
          } `}
          readOnly={!isEditable}
          onChange={handleEdit}
        ></TextareaAutosize>
        <button
          className="bg-red-700 p-1.5 rounded-full hover:bg-red-500"
          onClick={() => deleteTodo(todo.id)}
        >
          <MdDelete size="1.3em" />
        </button>
      </div>
      <TextareaAutosize
        type="text"
        name="todo"
        value={editableTodo.todo}
        className={`py-2 mt-2 outline-none w-full bg-transparent px-2 border-2 resize-none ${
          isEditable ? "border-gray/10" : "border-transparent"
        } ${editableTodo.check ? "line-through" : ""} `}
        readOnly={!isEditable}
        onChange={handleEdit}
      ></TextareaAutosize>
      <div className="footer py-2 px-4 flex items-center justify-between border-t-2 border-blue-500">
        {editableTodo.check ? (
          <button
            className="bg-green-600 w-20 flex items-center justify-center p-1.5 rounded-full hover:bg-green-500"
            onClick={() => checkTodo(todo.id)}
          >
            <FaCheckDouble size={"1.3em"} />
          </button>
        ) : (
          <button
            className="bg-green-700/50 w-20 flex items-center justify-center p-1.5 rounded-full hover:bg-green-700"
            onClick={() => checkTodo(todo.id)}
          >
            <FaCheck size={"1.3em"} />
          </button>
        )}

        {isEditable ? (
          <button
            onClick={handleEditSubmit}
            className="bg-purple-700 w-20 flex items-center justify-center p-1.5 rounded-full hover:bg-purple-500"
          >
            <BiSave size={"1.3em"} />
          </button>
        ) : (
          <button
            onClick={() => setIsEditable(!isEditable)}
            className="bg-pink-700 w-20 flex items-center justify-center p-1.5 rounded-full hover:bg-pink-500"
          >
            <BiEdit size={"1.3em"} />
          </button>
        )}
      </div>
    </motion.li>
  );
}

export default Card;
