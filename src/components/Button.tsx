import React from 'react';

type ButtonPropsName = {
    name:string
    callBack: ()=>void
}

export const Button = (props:ButtonPropsName) => {
    const onClickHandler = () => {
            props.callBack()
    }
    return (
        <button onClick={onClickHandler}>{props.name}</button>
    );
};
