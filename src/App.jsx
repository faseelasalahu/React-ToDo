import React, { useEffect, useState } from "react";
import "./App.css";
export default function App() {
  const [tasks, setTask] = useState(()=>{
    const savedTasks = localStorage.getItem("todo_tasks");
    return savedTasks ? JSON.parse(savedTasks) :[]
  }); //state to hold the list of all task
  const [todoList, setTodoList] = useState(""); // state to hold the current input value

  const [editId, setEditId] = useState(null); // to hold editted task id
 useEffect(()=>{
   localStorage.setItem("todo_tasks", JSON.stringify(tasks));
 },[tasks])

  const handleEdit = (taskItem) => {
    setEditId(taskItem.id);
    setTodoList(taskItem.text);
  };
  const handleInputChange = (e) => {
    setTodoList(e.target.value);
  };

  const handleAddBtn = () => {
    if (todoList.trim() === "") {
      return;
    }
    if (editId) {
      //update array if it edit mode
      const updatedTask = tasks.map((item) =>
        item.id === editId ? { ...item, text: todoList } : item
      );
      setTask(updatedTask);
      setEditId(null); // reset after edit
    } else {
      //add new task
      const newTask = {
        id: Date.now(),
        text: todoList,
        completed: false,
      };
      setTask([...tasks, newTask]);
    }
    setTodoList("");
  };
  const handleDelete = (id) => {
    const updatedList = tasks.filter((task) => task.id !== id);
    setTask(updatedList);
  };
  return (
    <div className="App">
      <div className="todo-container">

    
      <h1>ToDo-List</h1>
      <div className="tasklist">
        
<input 
          type="text"
          placeholder="Enter Your Task"
          value={todoList}
          onChange={handleInputChange}
        />
       <button className={editId ? 'update-btn' : 'add-btn'} onClick={handleAddBtn}>
            {editId ? 'Update' : 'Add'}
          </button>
        <ul className="taskList">
          {tasks.map((task) => (
            <li key={task.id} className="taskItems">
              <span className="task-text">{task.text}</span>
              <div className="action-buttons">

            
              <button className="delete-btn" onClick={() => handleDelete(task.id)}>Delete</button>
              <button className= 'edit-btn' onClick={()=>handleEdit(task)}>Edit
          </button>
          
          <div className="checkbox-group">
           <span className="check">Completed</span><input type="checkbox" className="input-check" ></input>
          </div>
                 
          
            </div>
            </li>
            
          ))}
        </ul>
        {tasks.length === 0 && <p className="empty-msg">No tasks added yet!</p>}
          </div>
      </div>
    </div>
  );
}
