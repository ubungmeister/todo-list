import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuetype} from "./App";
import s from "./TodoList.module.css";
import {CheckBox} from "./components/CheckBox";
type TodolistPropsType = {
    todoListID: string
    title?: string
    tasks: Array<TasksPropsType>
    revomeTask: (todoListID:string,taskID: string) => void
    changeFilter: (todoListID:string,value: FilterValuetype) => void
    addTask: (todoListID:string,title: string) => void
    checkBoxChanger:(todoListID:string,id:string, value:boolean)=>void
    filterValue: FilterValuetype


}
type TasksPropsType = {
    id: string,
    title: string,
    isDone: boolean
}
export const Todolist = (props: TodolistPropsType) => {


    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>('Title is required')

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
        setError(null)
    }
    // predavame pres Button novou tasku newTaskTitle
    const onButtonInputHandler = () => {
            if(newTaskTitle.trim()!==''){
                props.addTask(props.todoListID,newTaskTitle.trim())
                setNewTaskTitle('')
                setError('Title is required')
            }
    }
    //press Enter
    const onKeyPressHandler = (event:KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter'){
            onButtonInputHandler()
        }
    }
    /// filtr
    const ChangeFilterHandler = (todoListID:string, change:FilterValuetype) => {
        props.changeFilter(props.todoListID,change)
    }
    ///mapa remove task
    const removeTaskHandler = (todoListID:string, element:string) => {
        props.revomeTask(props.todoListID, element)
    }

    const checkBoxHandler = (todoListID:string,el:string, eventValue:boolean )=> {
        props.checkBoxChanger(props.todoListID, el, eventValue)
    }

    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input className={error ? s.error: ''}  value={newTaskTitle} onChange={onChangeInputHandler} onKeyDown={onKeyPressHandler}
                    />
                    <button onClick={onButtonInputHandler}>+</button>
                    {error && <div className={s.errorMessage}>{error}</div>}
                    {/*druha moznost jak lze zapsat bez state*/}
                    {/*{newTaskTitle === ''?<div className={s.errorMessage}> Title is required</div> : <div></div>}*/}
                </div>
                <ul>
                    {props.tasks.map((el, index) => {
                        return (
                            <li key={el.id} className={el.isDone !== true ? s.isDone: ''}>
                                <CheckBox  checked={el.isDone} callback={(eventValue)=>checkBoxHandler(props.todoListID, el.id, eventValue)}/>
                                {/*<input  type="checkbox" checked={el.i sDone}*/}
                                {/*       onChange={(event)=> {checkBoxHandler(el.id, event.currentTarget.checked)*/}
                                {/*       }}/>*/}
                                <button onClick={()=>removeTaskHandler(props.todoListID, el.id)}>x</button>
                                <span>{el.title}</span>
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