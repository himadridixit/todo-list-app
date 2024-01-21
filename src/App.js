import { useState, useEffect } from "react";
import './App.css';
import Draggable from 'react-draggable';

function App() {
  const [taskList, setTaskList] = useState(() => {
    const savedState = localStorage.getItem("list");
    const list = JSON.parse(savedState);
    return list || [];
  });
  const  [inputValue, setInputValue] =  useState('');
  const [itemNo, setItemNo] = useState(1);

  const  handleChange = (event) => {
		setInputValue(event.target.value);
	};

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTaskList = [...taskList, {"id": itemNo, "item":inputValue}];
    setTaskList(newTaskList);
    setItemNo(itemNo + 1);
    setInputValue('');
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(taskList));
  }, [taskList]);

  const removeTask = (id) => {
    let items =JSON.parse(localStorage.getItem("list"));
    items = items.filter((item) => item.id !== id);
    localStorage.setItem("list", JSON.stringify(items));
    setTaskList(items);
  }

    return ( 
        <div className = "App">
        <header className = "App-header" >
        <h1>ToDo List</h1>

        {taskList.map((item) => {return <Task task={item} onDelClick={() => removeTask(item["id"])}/>;})}
         
        <form onSubmit={handleSubmit}>
          <label>
          Add new task: <br/>
          <input type="text" id="task" value={inputValue} onChange={handleChange} /><br/>
          </label>
          <button type="submit">Add</button>
        </form>
        </header>
        </div>
    );
}

function Task({task,onDelClick}) {
    return ( 
    <Draggable axis="y">
      <div>
        <p>
          {task["item"]}
          <button onClick={onDelClick}>Delete</button>
        </p>
      </div>
    </Draggable>
    );
}

export default App;