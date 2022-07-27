import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuetype} from "./App";
import s from "./TodoList.module.css";
import {CheckBox} from "./components/CheckBox";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";

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

}
type TasksPropsType = {
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


    return (
        <div className="App">
            <div>
                <AddItemForm callBack={addTaskHandler}/>
                <h3><EditableSpan title={props.title} callBack={editTodoListHandler}/></h3>

                {/*<div>*/}
                {/*    <input className={error ? s.error: ''}*/}
                {/*           value={newTaskTitle}*/}
                {/*           onChange={onChangeInputHandler}*/}
                {/*           onKeyDown={onKeyPressHandler}*/}
                {/*    />*/}
                {/*    <button onClick={onButtonInputHandler}>+</button>*/}
                {/*    {error && <div className={s.errorMessage}>{error}</div>}*/}
                {/*</div>*/}
                <ul>
                    {props.tasks.map((el, index) => {
                        return (
                            <li key={el.id} className={el.isDone !== true ? s.isDone: ''}>
                                <CheckBox  checked={el.isDone} callback={(eventValue)=>checkBoxHandler(props.todoListID, el.id, eventValue)}/>
                                {/*<input  type="checkbox" checked={el.i sDone}*/}
                                {/*       onChange={(event)=> {checkBoxHandler(el.id, event.currentTarget.checked)*/}
                                {/*       }}/>*/}
                                <button onClick={()=>removeTaskHandler(props.todoListID, el.id)}>x</button>
                                <span>
                                    <EditableSpan title={props.title} callBack={(changeTitle)=>{editTaskHandler(el.id,changeTitle)}}/>
                                </span>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <button className={props.filterValue ==='All' ? s.activeFilter: ''} onClick={()=>ChangeFilterHandler(props.todoListID,'All')}>All</button>
                    <button className={props.filterValue ==='Active' ? s.activeFilter: ''} onClick={()=>ChangeFilterHandler(props.todoListID,'Active')}>Active</button>
                    <button className={props.filterValue ==='Completed' ? s.activeFilter: ''} onClick={()=>ChangeFilterHandler(props.todoListID,'Completed')}>Completed</button>
                </div>
            </div>
        </div>
    );

}