import './App.css';
import { useEffect, useRef, useState } from 'react';
import { AiFillDelete, AiFillEdit, AiOutlineCheckSquare } from 'react-icons/ai';
function App() {
  const getLocalItems = () => {
    let list = localStorage.getItem('listTodo');
    if (list) {
      return JSON.parse(localStorage.getItem('listTodo'));
    } else {
      return [];
    }
  };
  const [listTodo, setListTodo] = useState(getLocalItems());
  const [todoInput, setTodoInput] = useState('');
  const [editTodo, setEditTodo] = useState('');
  const [isChecked, setIsChecked] = useState([]);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const inputRef = useRef();
  const editRef = useRef();
  useEffect(() => {
    localStorage.setItem('listTodo', JSON.stringify(listTodo));
  }, [listTodo]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^$/.test(todoInput)) {
      setTodoInput('');
      setListTodo((prev) => [...prev, todoInput]);
      inputRef.current.focus();
      setShow(!show);
    }
  };
  const handleSubmitEdit = (e, todoInput) => {
    e.preventDefault();
    const newEdit = [...listTodo];
    console.log(editTodo);
    newEdit.splice(listTodo.indexOf(todoInput), 1, editRef.current.value);
    console.log(newEdit);
    setListTodo(newEdit);
  };
  const handleDelete = (item) => {
    const newListTodo = [...listTodo];
    newListTodo.splice(listTodo.indexOf(item), 1);
    setListTodo(newListTodo);
  };
  const handleEdit = (item) => {
    setEditTodo(item);
    setTodoInput(item);
    setShow(true);
    setEdit(true);
  };
  const handleChecked = (e, item) => {
    if (e.target.checked) {
      setIsChecked((prev) => [...prev, item]);
    } else if (!e.target.checked) {
      const listChecked = [...isChecked];
      listChecked.splice(isChecked.indexOf(item), 1);
      setIsChecked(listChecked);
    }
  };
  const checkUncheck = (item) =>
    isChecked.includes(item) ? 'checked' : 'not-checked';
  const handleShowForm = () => {
    setShow(true);
    setTodoInput('');
    if (edit) {
      setEdit(!edit);
    }
    if (show) {
      setEdit(false);
      setTodoInput('');
      inputRef.current.focus();
    }
  };
  return (
    <div className="App">
      <div className="todo-app">
        <h1>
          <AiOutlineCheckSquare />
          Todo App
        </h1>
        <form className={show ? 'show-form' : 'hide-form'}>
          {!edit ? (
            <>
              <input
                type="text"
                placeholder="Add todo..."
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
                ref={inputRef}
                className="input-todo"
              />
              <button onClick={(e) => handleSubmit(e)} className="btn-submit">
                Add
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Edit Todo..."
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
                className="input-todo"
                ref={editRef}
              />
              <button
                onClick={(e) => handleSubmitEdit(e, todoInput)}
                className="btn-submit"
              >
                Edit
              </button>
            </>
          )}
        </form>
        <div className="list-todo">
          {listTodo.map((item, index) => {
            return (
              <div key={index} className={`list-item`}>
                <input
                  type="checkbox"
                  onChange={(e) => handleChecked(e, item)}
                />
                <span className={checkUncheck(item)}>{item}</span>
                <div className="list-icon">
                  <AiFillEdit
                    onClick={() => handleEdit(item)}
                    className="icon-edit"
                  />
                  <AiFillDelete
                    onClick={() => handleDelete(item)}
                    className="icon-delete"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="list-add" onClick={() => handleShowForm()}>
          +
        </div>
      </div>
    </div>
  );
}

export default App;
