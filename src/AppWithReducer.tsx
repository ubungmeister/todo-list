import React, {useReducer} from 'react';
import './App.css';
import {TasksPropsType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuetype = 'All' | 'Active' | 'Completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuetype
}
export type TasksStateType = {
    [key: string]: Array<TasksPropsType>
}


function AppWithReducer() {
    let todoListID1 = v1()
    let todoListID2 = v1()


    let [todoList, dispatchTodoList] = useReducer(todolistsReducer,[
        {id: todoListID1, title: 'What to learn', filter: 'All'},
        {id: todoListID2, title: 'What to learn', filter: 'All'},
    ])


    let [tasks1, dispatchTasks] = useReducer(tasksReducer,{
        [todoListID1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'Python', isDone: true},
            {id: v1(), title: 'HTML', isDone: true}
        ],
        [todoListID2]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'Python', isDone: true},

        ]
    })


    const checkBoxChanger = (todoListID:string,taskID:string, value:boolean) => {
        // setTask1(tasks1.map(el=>el.id === taskId ? {...el, isDone:value}: el))
        // setTask1({
        //     ...tasks1,
        //     [todoListID]: tasks1[todoListID].map(el => el.id === taskId ? {...el, isDone: value} : el)
        // })
        dispatchTasks(changeTaskStatusAC(todoListID,taskID,value))
    }

    // smazeme tasku na kterou jsme klikli... Globali ID->Lokalni ID->Ostatni
    const removeTask = (todoListID: string, taskID: string) => {
        // setTask1({...tasks1, [todoListID]: tasks1[todoListID].filter(el => el.id !== taskID)})

        dispatchTasks(removeTaskAC(todoListID, taskID))
    }
    // pridame tasku
    const addTask = (todoListID: string, title: string) => {

        // let newTask = {
        //     id: v1(),
        //     title: title,
        //     isDone: false
        // }
        // let todolistTask = tasks1[todoListID]
        // tasks1[todoListID] =[newTask,...todolistTask]
        // setTask1({...tasks1})
        // setTask1({...tasks1, [todoListID]: [newTask, ...tasks1[todoListID]]})
        dispatchTasks(addTaskAC(todoListID, title))

    }

    //editace title nazvu jednotlive tasky
    const editTask = (todoListID: string, taskID: string, tasktitle: string) => {
        // setTask1({
        //     ...tasks1,
        //     [todoListID]: tasks1[todoListID].map(el => el.id === taskID ? {...el, title: tasktitle} : el)
        // })
        dispatchTasks(changeTaskTitleAC(todoListID,taskID,tasktitle))
    }
    //zmena filtru Todolist
    const changeFilter = (todoListID: string, filter: FilterValuetype) => {
        // setTodoList(todoList.map((e) => e.id === todoListID ? {...e, filter: value} : e))
        dispatchTodoList(changeFilterAC(todoListID,filter))

    }

    //pridame dalsi TodoList + novou taksku, bez ktere bby neslo Todolist zmapovat
    const addTodoList = (title: string) => {
        // let newID = v1()
        // let newTodoList: TodoListType = {
        //     id: newID,
        //     title: title,
        //     filter: 'All'
        // }
        // setTodoList([newTodoList, ...todoList])
        // setTask1({...tasks1, [newID]: []})
        let action = addTodolistAC(title) // generujeme jednu ID pro Todolist a T
        dispatchTodoList(action)
        dispatchTasks(action)
    }
    // remove TodoList
    const removeTodoList = (todoListID:string)=>{
        // setTodoList(todoList.filter((el)=>el.id !== listID))
        dispatchTodoList(removeTodolistAC(todoListID))
        dispatchTasks(removeTodolistAC(todoListID))
    }

    // editace nazvu Todolist
    const editTodoList = (todoListID: string, newTodolistTitle: string) => {
        // setTodoList(todoList.map(el => el.id === todoListID ? {...el, title: newTitle} : el))
        dispatchTodoList(changeTodolistAC(todoListID,newTodolistTitle))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding:'10px'}}>
            <AddItemForm callBack={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoList.map((el) => {
                        let filteredTask = tasks1[el.id]
                        let tasksForTodolist = filteredTask

                        if (el.filter === 'Active') {
                            tasksForTodolist = filteredTask.filter(el => el.isDone === false)
                        }
                        if (el.filter === 'Completed') {
                            tasksForTodolist = filteredTask.filter(el => el.isDone === true)
                        }
                        return (
                            <Grid item>
                                <Paper style = {{padding:'10px'}}>
                            <Todolist
                                key={el.id}
                                todoListID={el.id}
                                checkBoxChanger={checkBoxChanger}
                                title={el.title}
                                tasks={tasksForTodolist}
                                revomeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                filterValue={el.filter}
                                editTodoList={editTodoList}
                                editTask={editTask}
                                removeTodoList={removeTodoList}
                            />
                            </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducer;
