import React from "react";
import {FilterValuetype} from './AppWithRedux'
import s from "./TodoList.module.css";
import {CheckBox} from "./components/CheckBox";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TodoListType} from "./AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {changeFilterAC, changeTodolistAC, removeTodolistAC} from "./state/todolist-reducer";


export type PropsType = {
    todolist: TodoListType
}

export type TasksPropsType = {
    id: string,
    title: string,
    isDone: boolean
}

export function TodolistNew ({todolist}: PropsType) {
    const {id,title,filter} = {...todolist}
    let tasks = useSelector<AppRootStateType, Array<TasksPropsType>>(state => state.tasks[id])
    const dispatch = useDispatch()


    /// filtr
    const ChangeFilterHandler = (id:string, filter:FilterValuetype) => {
        dispatch(changeFilterAC(id,filter))
    }
    ///mapa remove task
    const removeTaskHandler = (todoListID:string, element:string) => {
        dispatch(removeTaskAC(todoListID, element))
    }
    // changeBox prepinac
    const checkBoxHandler = (todoListID:string,el:string, eventValue:boolean )=> {
        dispatch(changeTaskStatusAC(todoListID, el, eventValue))
    }
    // pridame novou Tasku
    const addTaskHandler =(title:string)=>{
        // props.addTask(id, title)
        dispatch(addTaskAC(id, title))
    }
    // zmena nazvu Tasky
    const editTodoListHandler =(newTitle:string)=>{
        // props.editTodoList(id, newTitle)
        dispatch(changeTodolistAC(id,newTitle))
    }
    const editTaskHandler =(taskID:string, taskTitle:string)=>{
       dispatch(changeTaskTitleAC(id,taskID,taskTitle))
    }
    //remove Todolist
    const removeTodoList = (id:string)=>{
        // props.removeTodoList(todoListID)
        dispatch(removeTodolistAC(id))
    }

    if (filter === 'Active') {
        tasks = tasks.filter(el => !el.isDone)
    }
    if (filter === 'Completed') {
        tasks = tasks.filter(el => el.isDone)
    }

    return (
        <div className="App">
            <div>
                <h3>
                    <EditableSpan title={title} callBack={editTodoListHandler}/>
                    <IconButton aria-label="delete"> <Delete onClick={()=>removeTodoList(id)}  /> </IconButton>
                </h3>
                <AddItemForm callBack={addTaskHandler}/>
                <ul>
                    {tasks.map((el, index) => {

                        return (
                            <li key={el.id} className={!el.isDone ? s.isDone: ''}>
                                <CheckBox  checked={el.isDone} callback={(eventValue)=>checkBoxHandler(id, el.id, eventValue)}/>

                                <IconButton aria-label="delete"><Delete
                                    onClick={()=>removeTaskHandler(id, el.id)}/></IconButton>
                                <span>
                                    <EditableSpan title={el.title}
                                                  callBack={(changeTitle)=>{editTaskHandler(el.id,changeTitle)}}/>
                                </span>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <Button variant={filter ==='Active' ? "outlined":"contained"} color="success" size={'small'}
                            onClick={()=>ChangeFilterHandler(id,'Active')}>Active</Button>
                    <Button variant={filter ==='Completed' ? "outlined":"contained"} color="error" size={'small'}
                            onClick={()=>ChangeFilterHandler(id,'Completed')}>Completed</Button>
                    <Button variant= {filter ==='All' ? "outlined":"contained"} color="secondary" size={'small'}
                            onClick={()=>ChangeFilterHandler(id,'All')}>All</Button>

                </div>
            </div>
        </div>
    );

}