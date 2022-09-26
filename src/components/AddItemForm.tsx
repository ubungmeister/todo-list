import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import s from "../TodoList.module.css";
import {Button, TextField} from "@mui/material";

type AddItemFormType ={
    callBack:(title: string)=>void
}

export const AddItemForm = memo((props:AddItemFormType) => {
    console.log('item')
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>('Title is required')
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
        setError(null)
    }
    const onKeyPressHandler = (event:KeyboardEvent<HTMLInputElement>) => {
        if(error) setError(null)
        if(event.key === 'Enter'){
            onButtonInputHandler()
        }
    }
    // predavame pres Button novou tasku newTaskTitle
    const onButtonInputHandler = () => {
        if(newTaskTitle.trim()!==''){
            props.callBack(newTaskTitle)
            setNewTaskTitle('')}
        else{
            setError('Title is required')
        }
    }
    return (
        <div>
            <TextField id="outlined-basic"
                       error={!!error}
                       label={error}
                       variant="outlined"
                       size="small"
                       className={error ? s.error: ''}
                       value={newTaskTitle}
                       onChange={onChangeInputHandler}
                       onKeyPress={onKeyPressHandler}/>

            {/*<button onClick={onButtonInputHandler}>+</button>*/}
            <Button onClick={onButtonInputHandler} variant="contained"
                    style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}>+</Button>
        </div>
    );
});

