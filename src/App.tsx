import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type filterValuetype = 'All' | 'Active' | 'Completed'

function App() {
    let [tasks1, setTask1] = useState( [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'DD', isDone: false}
    ])

    const removeTask = (taskID: string) => {
        let filteredTask = tasks1.filter((el) => el.id !== taskID)
        setTask1(filteredTask)
    }
    const addTask =(title:string)=>{
        let newTask = {
            id: v1(),
            title:title,
            isDone: false
        }
        let newTasks = [newTask, ...tasks1]
        setTask1(newTasks )
    }

    let [filterValue, setFilterValue] = useState()

    let filteredTask = tasks1

    const changeFilter =(value:filterValuetype)=> {
        setFilterValue(value)
    }

    if (filterValue === 'Active') {
        filteredTask = tasks1.filter(el => el.isDone === false)
    }
    if (filterValue === 'Completed') {
        filteredTask = tasks1.filter(el => el.isDone === true)
    }


    return (
        <div className="App">
            <Todolist
                title = {"Hello"}
                tasks ={filteredTask}
                revomeTask={removeTask}
                changeFilter ={changeFilter}
                addTask={addTask}

            />
        </div>
    );
}

export default App;
