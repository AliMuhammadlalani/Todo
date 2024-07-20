import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [list, setlist] = useState([]);
  const [todotext, settodotext] = useState("");

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('list'));
    if (list) {
      setlist(list);
    }
  }, []);

const LS=()=>{
  localStorage.setItem('list',JSON.stringify(list));
}
 

  const HandleOnChange = (e) => {
    settodotext(e.target.value);
  };

  const HandleOnClick = () => {
    if (todotext === "") {
      alert("Enter your todo");
      return;
    }
    setlist([...list, {todotext}]);
    settodotext("");
    LS();
  };

  const DeleteTodo = (elem) => {
    if (confirm("Are you sure?")) {
      let updatedList = list.filter((element) => element.todotext !== elem);
      setlist(updatedList);
      LS();
  }};

  const EditTodo = (e) => {
    settodotext(e);
    let updatedList = list.filter((element) => element.todotext !== e);
      setlist(updatedList); 
      LS();  
  };

  return (
    <>
      <div className="Todo">
        <h1>Todo List</h1>
        <div>
          <input
            type="text"
            value={todotext}
            onChange={HandleOnChange}
            name="Todo"
          />
          <button onClick={HandleOnClick}>Add Todo</button>
        </div>
        {list.length === 0 && (
          <div style={{ marginTop: "12px" }} className="">
            No Todo to display
          </div>
        )}
        {list &&
          list.map((item) => {
            return (
              <div key={item.todotext} className="showtodo">
                <p>{item.todotext}</p>
                <button
                  className="deletebtn"
                  onClick={() => DeleteTodo(item.todotext)}
                >
                  Delete Todo
                </button>
                <button
                  className="editbtn"
                  onClick={() => EditTodo(item.todotext)}
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
