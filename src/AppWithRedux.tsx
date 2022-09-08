import React from 'react';
import './App.css';
import {TasksPropsType} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
} from "./state/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistNew} from "./TodolistNew";

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

    const todolists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const dispatch = useDispatch()

    //pridame dalsi TodoList + novou taksku, bez ktere bby neslo Todolist zmapovat
    const addTodoList = (title: string) => {
        let action = addTodolistAC(title) // generujeme jednu ID pro Todolist a T
        dispatch(action)
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <AddItemForm callBack={addTodoList}/>
                <Grid container spacing={3}>
                    {todolists.map((el) => {
                        return (
                            <Grid item key={el.id}>
                                <Paper style={{padding: '10px'}}>
                                    <TodolistNew todolist={el}/>
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
