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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

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

    const todolists = useSelector<AppRootStateType, Array<TodoListType>>(state=>state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const checkBoxChanger = (todoListID:string,taskID:string, value:boolean) => {
        dispatch(changeTaskStatusAC(todoListID,taskID,value))
    }

    // smazeme tasku na kterou jsme klikli... Globali ID->Lokalni ID->Ostatni
    const removeTask = (todoListID: string, taskID: string) => {
        dispatch(removeTaskAC(todoListID, taskID))
    }
    // pridame tasku
    const addTask = (todoListID: string, title: string) => {
        dispatch(addTaskAC(todoListID, title))

    }

    //editace title nazvu jednotlive tasky
    const editTask = (todoListID: string, taskID: string, tasktitle: string) => {
        dispatch(changeTaskTitleAC(todoListID,taskID,tasktitle))
    }
    //zmena filtru Todolist
    const changeFilter = (todoListID: string, filter: FilterValuetype) => {
        dispatch(changeFilterAC(todoListID,filter))

    }

    //pridame dalsi TodoList + novou taksku, bez ktere bby neslo Todolist zmapovat
    const addTodoList = (title: string) => {

        let action = addTodolistAC(title) // generujeme jednu ID pro Todolist a T
        dispatch(action)
    }
    // remove TodoList
    const removeTodoList = (todoListID:string)=>{
        let action = removeTodolistAC(todoListID)
        dispatch(action)
    }

    // editace nazvu Todolist
    const editTodoList = (todoListID: string, newTodolistTitle: string) => {
        dispatch(changeTodolistAC(todoListID,newTodolistTitle))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding:'10px'}}>
            <AddItemForm callBack={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((el) => {
                        let filteredTask = tasks[el.id]
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
