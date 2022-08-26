import React from "react";
import {FilterValuetype} from "./App";
import s from "./TodoList.module.css";
import {CheckBox} from "./components/CheckBox";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";


type TodolistPropsType = {
    todoListID: string
    title: string
    tasks: Array<TasksPropsType>
    revomeTask: (todoListID:string,taskID: string) => void
    changeFilter: (todoListID:string,value: FilterValuetype) => void
    addTask: (todoListID:string,title: string) => void
    checkBoxChanger:(todoListID:string,id:string, value:boolean)=>void
    filterValue: FilterValuetype
    editTodoList:(todoListID:string,newTitle: string) => void
    editTask:(todoListID:string,taskID:string, tasktitle:string)=>void
    removeTodoList:(todoListID:string)=>void

}
export type TasksPropsType = {
    id: string,
    title: string,
    isDone: boolean
}
export const Todolist = (props: TodolistPropsType) => {

    /// filtr
    const ChangeFilterHandler = (todoListID:string, change:FilterValuetype) => {
        props.changeFilter(props.todoListID,change)
    }
    ///mapa remove task
    const removeTaskHandler = (todoListID:string, element:string) => {
        props.revomeTask(props.todoListID, element)
    }

    // changeBox prepinac
    const checkBoxHandler = (todoListID:string,el:string, eventValue:boolean )=> {
        props.checkBoxChanger(props.todoListID, el, eventValue)
    }
    // pridame novou Tasku
    const addTaskHandler =(title:string)=>{
        props.addTask(props.todoListID, title)
    }
    // zmena nazvu Tasky
    const editTodoListHandler =(newTitle:string)=>{
        props.editTodoList(props.todoListID, newTitle)
    }
    const editTaskHandler =(taskID:string, taskTitle:string)=>{
       props.editTask(props.todoListID,taskID,taskTitle)
    }
    //remove Todolist
    const removeTodoList = (todoListID:string)=>{
        props.removeTodoList(todoListID)
    }


    return (
        <div className="App">
            <div>
                <h3>
                    <EditableSpan title={props.title} callBack={editTodoListHandler}/>
                    <IconButton aria-label="delete"> <Delete onClick={()=>removeTodoList(props.todoListID)}  /> </IconButton>
                </h3>
                <AddItemForm callBack={addTaskHandler}/>
                <ul>
                    {props.tasks.map((el, index) => {
                        return (
                            <li key={el.id} className={el.isDone !== true ? s.isDone: ''}>
                                <CheckBox  checked={el.isDone} callback={(eventValue)=>checkBoxHandler(props.todoListID, el.id, eventValue)}/>

                                {/*<input  type="checkbox" checked={el.i sDone}*/}
                                {/*       onChange={(event)=> {checkBoxHandler(el.id, event.currentTarget.checked)*/}
                                {/*       }}/>*/}
                                {/*<button onClick={()=>removeTaskHandler(props.todoListID, el.id)}>x</button>*/}
                                {/* eslint-disable-next-line react/jsx-no-undef */}
                                <IconButton aria-label="delete"><Delete
                                    onClick={()=>removeTaskHandler(props.todoListID, el.id)}/></IconButton>
                                <span>
                                    <EditableSpan title={el.title}
                                                  callBack={(changeTitle)=>{editTaskHandler(el.id,changeTitle)}}/>
                                </span>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    {/*<button className={props.filterValue ==='All' ? s.activeFilter: ''} onClick={()=>ChangeFilterHandler(props.todoListID,'All')}>All</button>*/}
                    {/*<button className={props.filterValue ==='Active' ? s.activeFilter: ''} onClick={()=>ChangeFilterHandler(props.todoListID,'Active')}>Active</button>*/}
                    {/*<button className={props.filterValue ==='Completed' ? s.activeFilter: ''} onClick={()=>ChangeFilterHandler(props.todoListID,'Completed')}>Completed</button>*/}
                    <Button variant= {props.filterValue ==='All' ? "outlined":"contained"} color="secondary" size={'small'}
                            onClick={()=>ChangeFilterHandler(props.todoListID,'All')}>All</Button>
                    <Button variant={props.filterValue ==='Active' ? "outlined":"contained"} color="success" size={'small'}
                            onClick={()=>ChangeFilterHandler(props.todoListID,'Active')}>Active</Button>
                    <Button variant={props.filterValue ==='Completed' ? "outlined":"contained"} color="error" size={'small'}
                            onClick={()=>ChangeFilterHandler(props.todoListID,'Completed')}>Completed</Button>

                </div>
            </div>
        </div>
    );

}