import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuetype} from "./App";
import {v1} from "uuid";
import {Button} from "./components/Button";
type TodolistPropsType = {
    title?: string
    tasks: Array<TasksPropsType>
    revomeTask: (taskID: string) => void
    changeFilter: (value: FilterValuetype) => void
    addTask: (title: string) => void
}
type TasksPropsType = {
    id: string,
    title: string,
    isDone: boolean
}
export const Todolist = (props: TodolistPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    // predavame pres Button novou tasku newTaskTitle
    const onButtonInputHandler = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle('')
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

    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={newTaskTitle} onChange={onChangeInputHandler} onKeyDown={onKeyPressHandler}
                    />
                    <Button name={'+'} callBack={onButtonInputHandler}/>
                </div>
                <ul>
                    {props.tasks.map((el, index) => {

                        return (
                            <li key={el.id}>
                                <Button name={'x'} callBack={()=>removeTaskHandler(el.id)}/>
                                <input type="checkbox" checked={el.isDone}/> <span>{el.title}</span>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <Button name={'All'} callBack={()=>ChangeFilterHandler('All')}/>
                    <Button name={'Active'} callBack={()=>ChangeFilterHandler('Active')}/>
                    <Button name={'Completed'} callBack={()=>ChangeFilterHandler('Completed')}/>
                </div>
            </div>
        </div>
    );

}