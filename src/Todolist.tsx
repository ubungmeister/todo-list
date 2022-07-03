import React, {useState} from "react";
import {filterValuetype} from "./App";
type TodolistPropsType ={
    title?: string
    tasks: Array<TasksPropsType>
    revomeTask:(taskID:string)=>void
    changeFilter:(value:filterValuetype)=>void
    addTask: (title:string)=>void
}
type TasksPropsType ={
    id: string,
    title:string,
    isDone:boolean
}
export const Todolist =(props: TodolistPropsType)=> {
    const[newTaskTitle, setNewTaskTitle] = useState('')

    return (
        <div className="App">
            <div>
                <img src='https://cdn.dribbble.com/users/10882/screenshots/15079731/media/b6a1353b0b4cd6398a3748675049cc41.png?compress=1&resize=400x300'
                alt='mm'/>
                <h3>{props.title}</h3>
                <div>
                    <input value={newTaskTitle} onChange={(el)=>{
                        setNewTaskTitle(el.currentTarget.value)}}
                    />
                    <button onClick={()=>{
                        props.addTask(newTaskTitle)
                        setNewTaskTitle('')
                    }}>+</button>
                </div>
                <ul>
                    {props.tasks.map((el,index)=>{
                        return(
                            <li key={el.id}>
                                <button onClick={()=>props.revomeTask(el.id)}>x</button>
                                <input type="checkbox" checked={el.isDone}/> <span>{el.title}</span>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <button onClick={()=> props.changeFilter('All')}>All</button>
                    <button onClick={()=> props.changeFilter('Active')}>Active</button>
                    <button onClick={()=> props.changeFilter('Completed')}>Completed</button>
                </div>
            </div>
        </div>
    );

}