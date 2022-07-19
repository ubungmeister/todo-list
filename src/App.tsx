import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuetype = 'All' | 'Active' | 'Completed'
type TodoListType = {
    id: string
    title:string
    filter:FilterValuetype
}

function App() {
    let todoListID1=v1()
    let todoListID2 = v1()

    let[todoList, setTodoList] = useState<Array<TodoListType>>([
        {id: todoListID1, title: 'What to learn', filter:'All'},
        {id: todoListID2, title: 'What to learn', filter:'All'},
    ])
    let [tasks1, setTask1] =useState({
        [todoListID1]:[
            {id:v1(), title:'HTML', isDone:true},
            {id:v1(), title:'JS', isDone:true},
            {id:v1(), title:'Python', isDone:true},
            {id:v1(), title:'HTML', isDone:true}
        ],
        [todoListID2]:[
            {id:v1(), title:'HTML', isDone:true},
            {id:v1(), title:'JS', isDone:true},
            {id:v1(), title:'Python', isDone:true},
            {id:v1(), title:'HTML', isDone:true}
        ]
    })


    // let [tasks1, setTask1] = useState( [
    //     {id: v1(), title: 'HTML&CSS', isDone: true},
    //     {id: v1(), title: 'JS', isDone: true},
    //     {id: v1(), title: 'ReactJS', isDone: false},
    //     {id: v1(), title: 'Python', isDone: false}
    // ])
    // let[checkBox, setCheckBox] = useState(false)

    const checkBoxChanger =(todoListID:string, taskId:string, value:boolean)=>{
        // setTask1(tasks1.map(el=>el.id === taskId ? {...el, isDone:value}: el))
        setTask1({...tasks1, [todoListID]:tasks1[todoListID].map(el=>el.id === taskId? {...el, isDone: value}:el)})
    }

   // smazeme tasku na kterou jsme klikli... Globali ID->Lokalni ID->Ostatni
    const removeTask = (todoListID:string, taskID: string) => {
        setTask1({...tasks1, [todoListID]:tasks1[todoListID].filter(el=>el.id !== taskID)})
    }
    // pridame tasku
    const addTask =(todoListID:string,  title:string)=>{


        let newTask = {
            id: v1(),
            title:title,
            isDone: false
        }
        setTask1({...tasks1,[todoListID]:[newTask,...tasks1[todoListID]]})
    }
   //filtrujeme tasku
    let [filterValue, setFilterValue] = useState()


    const changeFilter =(todoListID:string ,value:FilterValuetype)=> {
            setTodoList(todoList.map((e)=>e.id===todoListID? {...e, filter:value}: e))
    }



    return (
        <div className="App">


            {todoList.map((el)=>{
                let filteredTask = tasks1[el.id]

                if (el.filter === 'Active') {
                    filteredTask = tasks1[el.id].filter(el => el.isDone === false)
                }
                if (el.filter === 'Completed') {
                    filteredTask = tasks1[el.id].filter(el => el.isDone === true)
                }
                return(
                    <Todolist
                        key ={el.id}
                        todoListID={el.id}
                        checkBoxChanger={checkBoxChanger}
                        title = {el.title}
                        tasks ={filteredTask}
                        revomeTask={removeTask}
                        changeFilter ={changeFilter}
                        addTask={addTask}
                        filterValue={el.filter}
                    />
                )
            })}

        </div>
    );
}

export default App;
