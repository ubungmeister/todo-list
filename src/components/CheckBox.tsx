import React from "react";
import {ChangeEvent} from "react";
import {Checkbox} from "@mui/material";

type PropsType ={
    checked:boolean
    callback:(eventValue:boolean)=>void
}

export const CheckBox = (props:PropsType) => {

    const onChangeHandler=(event: ChangeEvent<HTMLInputElement>)=>{
        props.callback(event.currentTarget.checked)
    }
    return (

            // <input
            //     type="checkbox"
            //      checked={props.checked}
            //     onChange ={onChangeHandler}
            //
            // />
            <Checkbox
                      checked={props.checked}
                      onChange ={onChangeHandler} />


    )
}

