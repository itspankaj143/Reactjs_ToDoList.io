import React, { useState } from "react";
import "../components/Todolist.css";

const ToDOList = () => {
  const [todos, setTodos] = useState([]);
  const [inputvalue, setInputValue] = useState("");
  const [editMode, seteditMode] = useState(false);
  const [editId, seteditId] = useState(null);
  const [editValue, seteditValue] = useState("");
  const AddTODO = () => {
    if (inputvalue.trim() !== "") {
      const newTodo = {
        id: new Date().getTime(),
        text: inputvalue,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };
  const DeleteTodo = (id) => {
    const updateTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updateTodos);
  };
  const UpdateEditMode = (id, text) => {
    seteditMode(true);
    seteditId(id);
    seteditValue(text);
  };
  const updateTodo = () => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === editId) {
        return { ...todo, text: editValue };
      }
      return todo;
    });
    setTodos(updatedTodos);
    seteditMode(false);
    seteditId(null);
    seteditValue("");
  };

  return (
    <>
      <div className="todoContainer">
        <h2>To-Do-List</h2>
        <input
          type="text"
          value={inputvalue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {editMode ? (
          <div>
            <input
              type="text"
              value={editValue}
              onChange={(e) => seteditValue(e.target.value)}
            />
            <button onClick={updateTodo}>UpdatedValue</button>
          </div>
        ) : (
          <button onClick={AddTODO}>Add</button>
        )}

        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => DeleteTodo(todo.id)}>Delete</button>
              <button onClick={() => UpdateEditMode(todo.id, todo.text)}>
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ToDOList;
