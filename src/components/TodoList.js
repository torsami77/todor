import { Close, Edit } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import TodoForm from './TodoForm';
import store from '../utilities/storage';
import '../styles/TodoList.css';


function TodoList() {
    const retrieveTodoList = store.retrieve('TodoList');
    const [ TodoList, SetTodoList ] = useState(retrieveTodoList ? retrieveTodoList : []);
    const [ RenderTodoList, SetRenderTodoList ] = useState([]);
    const [ EditMode, SetEditMode ] = useState(0);

    const UpdateTodoList = (theTodo) => {
        if((!theTodo.TodoTitle || /^\s*$/.test(theTodo.TodoTitle)) || 
        (!theTodo.TodoDescription || /^\s*$/.test(theTodo.TodoDescription))){
            return
        }
        if(theTodo.TodoId === null) {
            theTodo.TodoId = Math.floor(Math.random() * 1000);
            const UpdatedTodo = [theTodo, ...TodoList];
            SetTodoList(UpdatedTodo);
            store.write('TodoList', UpdatedTodo);
        } else {
            const UpdatedTodo = TodoList.map(todo => (todo.TodoId === theTodo.TodoId ? theTodo : todo))
            SetTodoList(UpdatedTodo)
            store.write('TodoList', UpdatedTodo);
            SetEditMode(null);
        }
    }

    const EditTodo = (TodoId) => {
        SetEditMode(TodoId);
    }

    const RemoveTodo = (TodoId) => {
        const RemovedFromTodo = TodoList.filter(todo =>
            todo.TodoId !== TodoId
        )
        SetTodoList(RemovedFromTodo);
        store.write('TodoList', RemovedFromTodo);
    }

    useEffect(() => {
       const TodoArray = [];
       TodoList.forEach((todo) => {
           if(todo.TodoId === EditMode){
               TodoArray.push(
                <div className="TodoItem">
                    <TodoForm TodoId={todo.TodoId} Title={todo.TodoTitle} Description={todo.TodoDescription} UpdateTodoList={UpdateTodoList} EditMode={true}/>
                </div>
               )
           } else {
                TodoArray.push(
                    <div className="TodoItem">
                        <span className="Controls">
                            <Edit className="Control-Icon" onClick={() => {EditTodo(todo.TodoId)}}/>
                            <Close className="Control-Icon" onClick={() => {RemoveTodo(todo.TodoId)}}/>
                        </span>
                        <li>
                            <span className="Title">{todo.TodoTitle}</span><br/>
                            <span className="Description">{todo.TodoDescription}</span>
                        </li>
                    </div>
                )
            }
       })
       SetRenderTodoList(TodoArray)
    }, [TodoList, EditMode])

    return (
        <div>
            <TodoForm UpdateTodoList={UpdateTodoList}/>
            <ol>
                {RenderTodoList}
            </ol>
        </div>
    )
}

export default TodoList;
