import React, { useState } from "react";
import TodoList from "./TodoList"
import swal from "sweetalert"

function CreateTodo() {

    const [todo, setTodo] = useState({ title: "", done: false })
    const [todoArr, setTodoArr] = useState([])

    let todos = localStorage.hasOwnProperty("todos")
        ? JSON.parse(localStorage.getItem("todos"))
        : []

    const onChange = (event) => {
        let { value } = event.target
        let obj = {}
        obj["title"] = value
        obj["done"] = false
        setTodo(obj)
    }

    const createTodo = (event) => {
        const { name } = event.target
        if (event.key === "Enter" || name === "addTodo") {
            if (todo.title !== "") {
                todos.unshift(todo)
                localStorage.setItem('todos', JSON.stringify(todos))
                setTodo({ title: "", done: false })
            } else {
                swal("Ops!", "Please write todo first", "error")
            }
        }
    }

    const completeTodo = (i) => {
        if (todos[i]["done"] !== true) {
            todos[i]["done"] = true
            localStorage.setItem("todos", JSON.stringify(todos))
            setTodoArr(todos)
            swal("Good job!", "Completed!", "success");
        }
    }

    const deleteTodo = (i) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this file!",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then(res => {
            if (res) {
                todos.splice(i, 1)
                localStorage.setItem('todos', JSON.stringify(todos))
                setTodoArr(todos)
            }
        })
    }




    return (
        <>
            <div className="box">
                <h1>My Todo's</h1>
                <div className="text-addTodo">
                    <input className="input" type="text" name="todo" aria-label="Write here.." placeholder="Write here.."
                        value={todo.title} onKeyPress={createTodo} onChange={onChange} />
                    <button className="btn-addTodo" type="button" name="addTodo" aria-label="Add todo" onClick={createTodo}>Add Todo</button>
                </div>
            </div>
            <TodoList todoArr={todoArr}
                completeTodo={completeTodo}
                deleteTodo={deleteTodo} />
        </>
    );
}


export default CreateTodo;