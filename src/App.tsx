import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuetype = 'All' | 'Active' | 'Completed'

function App() {
    let [tasks1, setTask1] = useState( [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Python', isDone: false}
    ])
    // let[checkBox, setCheckBox] = useState(false)

    const checkBoxChanger =(taskId:string, value:boolean)=>{
        setTask1(tasks1.map(el=>el.id === taskId ? {...el, isDone:value}: el))
    }


   // smazeme tasku na kterou jsme klikli
    const removeTask = (taskID: string) => {
        let filteredTask = tasks1.filter((el) => el.id !== taskID)
        setTask1(filteredTask)
    }
    // pridame tasku
    const addTask =(title:string)=>{
        let newTask = {
            id: v1(),
            title:title,
            isDone: false
        }
        let newTasks = [newTask, ...tasks1]
        setTask1(newTasks )
    }
   //filtrujeme tasku
    let [filterValue, setFilterValue] = useState()
    let filteredTask = tasks1

    const changeFilter =(value:FilterValuetype)=> {
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
                checkBoxChanger={checkBoxChanger}
                title = {"Hello"}
                tasks ={filteredTask}
                revomeTask={removeTask}
                changeFilter ={changeFilter}
                addTask={addTask}
                filterValue={filterValue}


            />
        </div>
    );
}

export default App;
