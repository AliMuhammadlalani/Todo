import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [todotext, setTodotext] = useState("");

  useEffect(() => {
    const storedList = localStorage.getItem("list");
    if (storedList) {
      console.log("Loading from localStorage:", storedList);
      setList(JSON.parse(storedList));
    }
  }, []);

  const saveToLocalStorage = (todos) => {
    console.log("Saving to localStorage:", todos);
    localStorage.setItem("list", JSON.stringify(todos));
  };

  const handleOnChange = (e) => {
    setTodotext(e.target.value);
  };

  const handleOnClick = () => {
    if (todotext === "") {
      alert("Enter your todo");
      return;
    }
    const newList = [...list, { id: Date.now(), todotext }];
    console.log(typeof(newList));
    setList(newList);
    setTodotext("");
    saveToLocalStorage(newList);
  };

  const deleteTodo = (id) => {
    if (confirm("Are you sure?")) {
      const updatedList = list.filter((element) => element.id !== id);
      setList(updatedList);
      saveToLocalStorage(updatedList);
    }
  };

  const editTodo = (id) => {
    const todoToEdit = list.find((element) => element.id === id);
    setTodotext(todoToEdit.todotext);
    const updatedList = list.filter((element) => element.id !== id);
    setList(updatedList);
    saveToLocalStorage(updatedList);
  };

  return (
    <>
      <div className="Todo">
        <h1>Todo List</h1>
        <div>
          <input
            type="text"
            value={todotext}
            onChange={handleOnChange}
            name="Todo"
          />
          <button onClick={handleOnClick}>Add Todo</button>
        </div>
        {list.length === 0 && (
          <div style={{ marginTop: "12px" }} className="">
            No Todo to display
          </div>
        )}
        {list &&
          list.map((element) => {
            return (
              <div key={element.id} className="showtodo">
                <p>{element.todotext}</p>
                <button
                  className="deletebtn"
                  onClick={() => deleteTodo(element.id)}
                >
                  Delete Todo
                </button>
                <button
                  className="editbtn"
                  onClick={() => editTodo(element.id)}
                >
                  Edit Todo
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default App;
