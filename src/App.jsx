import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleEdit = (index) => {
    // Implement edit functionality here
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleAdd = () => {
    if (todo.trim()) {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo("");
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex(item => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  return (
    <center>
      <Navbar />
      <div className="container my-5 rounded-xl bg-violet-100 p-5 min-h-[80vh] max-w-screen-md mx-auto">
        <div className="addTodo">
          <h1 className="text-xl font-bold">Add a Todo</h1>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-80"
          />
          <button
            onClick={handleAdd}
            className="bg-violet-400 rounded-md hover:bg-violet-300 p-2 py-1 text-white mx-4"
          >
            Add
          </button>
        </div>
        <h1 className="text-4xl font-bold text-blue-400">Your TODO</h1>
        <div className="todos">
          {todos.map((item, index) => (
            <div key={item.id} className="todo flex justify-between items-center my-2">
              <input
                name={item.id}
                onChange={handleCheckbox}
                type="checkbox"
                checked={item.isCompleted}
              />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              <div className="buttons flex gap-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-violet-400 text-white px-2 py-1 rounded hover:bg-violet-300 mx-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-400 text-white px-2 py-1 rounded hover:bg-red-300 mx-1"
                >
                  Delete
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
