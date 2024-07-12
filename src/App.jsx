import React, { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    const todosString = localStorage.getItem("todos");
    if (todosString) {
      const loadedTodos = JSON.parse(todosString);
      setTodos(loadedTodos);
    }
  }, []);

  const saveTodos = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinish = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (id) => {
    const itemToEdit = todos.find(item => item.id === id);
    if (itemToEdit) {
      setTodo(itemToEdit.todo);
      const newTodos = todos.filter(item => item.id !== id);
      setTodos(newTodos);
      saveTodos(newTodos);
    }
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveTodos(newTodos);
  };

  const handleAdd = () => {
    if (todo.trim()) {
      const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
      setTodos(newTodos);
      setTodo("");
      saveTodos(newTodos);
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex(item => item.id === id);
    if (index !== -1) {
      const newTodos = [...todos];
      newTodos[index].isCompleted = !newTodos[index].isCompleted;
      setTodos(newTodos);
      saveTodos(newTodos);
    }
  };

  return (
    <center>
      <Navbar />
      <div className="container my-5 rounded-xl bg-violet-100 p-5 min-h-[80vh] max-w-screen-md mx-auto sm:px-4">
        <div className="addTodo mb-4">
          <h1 className="text-xl font-bold">Add a Todo</h1>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full sm:w-80 p-2 border rounded"
          />
          <button
            onClick={handleAdd} disabled={todo.length<=3}
            className="bg-violet-400 rounded-md disabled:bg-violet-700 hover:bg-violet-300 p-2 py-1 text-white mx-4"
          >
            Save
          </button>
        </div>
        <div className="my-4">
          <input onChange={toggleFinish}
            type="checkbox"
            checked={showFinished}
          />{" "}
          Show Finished
        </div>
        <h1 className="text-4xl font-bold text-blue-400">Your TODO</h1>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Task is Given</div>}
          {todos
            .filter(item => (showFinished ? true : !item.isCompleted))
            .map(item => (
              <div key={item.id} className="todo flex justify-between items-center my-2 sm:ml-20">
                <input
                  name={item.id}
                  onChange={handleCheckbox}
                  type="checkbox"
                  checked={item.isCompleted}
                />
                <div className={`ml-2 flex-1 ${item.isCompleted ? "line-through" : ""}`}>{item.todo}</div>
                <div className="buttons flex gap-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-violet-400 text-white px-2 py-1 rounded hover:bg-violet-300 mx-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-400 text-white px-2 py-1 rounded hover:bg-red-300 mx-1"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </center>
  );
}

export default App;
