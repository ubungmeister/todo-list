import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuetype} from "./App";
import s from "./TodoList.module.css";
import {CheckBox} from "./components/CheckBox";
type TodolistPropsType = {
    title?: string
    tasks: Array<TasksPropsType>
    revomeTask: (taskID: string) => void
    changeFilter: (value: FilterValuetype) => void
    addTask: (title: string) => void
    checkBoxChanger:(id:string, value:boolean)=>void
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
                props.addTask(newTaskTitle.trim())
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
    const ChangeFilterHandler = (change:FilterValuetype) => {
        props.changeFilter(change)
    }
    ///mapa remove task
    const removeTaskHandler = (element:string) => {
        props.revomeTask(element)
    }

    const checkBoxHandler = (el:string, eventValue:boolean )=> {
        props.checkBoxChanger(el, eventValue)
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
                                <CheckBox  checked={el.isDone} callback={(eventValue)=>checkBoxHandler(el.id, eventValue)}/>
                                {/*<input  type="checkbox" checked={el.i sDone}*/}
                                {/*       onChange={(event)=> {checkBoxHandler(el.id, event.currentTarget.checked)*/}
                                {/*       }}/>*/}
                                <button onClick={()=>removeTaskHandler(el.id)}>x</button>
                                <span>{el.title}</span>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <button className={props.filterValue ==='All' ? s.activeFilter: ''} onClick={()=>ChangeFilterHandler('All')}>All</button>
                    <button className={props.filterValue ==='Active' ? s.activeFilter: ''} onClick={()=>ChangeFilterHandler('Active')}>Active</button>
                    <button className={props.filterValue ==='Completed' ? s.activeFilter: ''} onClick={()=>ChangeFilterHandler('Completed')}>Cpmpleted</button>
                </div>
            </div>
        </div>
    );

}