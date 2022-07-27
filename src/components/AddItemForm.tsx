import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "../TodoList.module.css";


type AddItemFormType ={
    callBack:(title: string)=>void
}

export const AddItemForm = (props:AddItemFormType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>('Title is required')
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
        setError(null)
    }
    const onKeyPressHandler = (event:KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter'){
            onButtonInputHandler()
        }
    }
    // predavame pres Button novou tasku newTaskTitle
    const onButtonInputHandler = () => {
        if(newTaskTitle.trim()!==''){
            props.callBack(newTaskTitle.trim())
            setNewTaskTitle('')
            setError('Title is required')
        }
    }
    return (
        <div>
            <input className={error ? s.error: ''}
                   value={newTaskTitle}
                   onChange={onChangeInputHandler}
                   onKeyDown={onKeyPressHandler}
            />
            <button onClick={onButtonInputHandler}>+</button>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    );
};

