import React, {ChangeEvent, useState} from 'react';

type EditableSpanType={
    title:string
    callBack:(changeTitle:string)=>void
}

export const EditableSpan = (props:EditableSpanType) => {
    const [error, setError] = useState<string | null>(null)
    const[edit,setEdit]=useState(false)

    const EditTrueHandler = () => {
      setEdit(!edit)
    }
    const [newTitle, setNewTitle] = useState(props.title)
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    const addTitle = () => {
        let changeTitle = newTitle;
        if (changeTitle !== "") {
            props.callBack(changeTitle);
            setNewTitle("");
        } else {
            setError("Title is required");
        }
    }
    return (
            edit
                ?<input
                    onBlur={EditTrueHandler}
                    autoFocus
                    value={newTitle}
                    onChange={onChangeInputHandler}
                /> :
                <span onDoubleClick={EditTrueHandler}>{newTitle}</span>

    );
};

