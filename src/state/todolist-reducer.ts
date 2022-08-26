import {TodoListType} from "../App";
import {v1} from "uuid";

export const todolistsReducer =(state:Array<TodoListType>,action:ActionTypes)=>{
    switch(action.type){
        case 'REMOVE-TODOLIST':{
          return state.filter(el=>el.id !== action.payload.todoListID)
        }
        case 'ADD-TODOLIST':{
            return [...state, {id: action.payload.todoListID, title:action.payload.newTodolistTitle, filter:'All'}]
        }
        case 'CHANGE-TODOLIST-TITLE':{
            return state.map(el=>el.id === action.payload.todoListID? {...el, title:action.payload.newTodolistTitle}: el)
        }
        case "CHANGE-TODOLIST-FILTER":{
            return state.map(el=>el.id === action.payload.todoListID? {...el, filter:action.payload.newFilter}: el)
        }
        default:
            return state
    }
}

type ActionTypes = removeTodolistACType | addTodolistACType | changeTodolistACType|changeFilterACType
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC=(todoListID:string)=>{
    return{
        type: 'REMOVE-TODOLIST',
        payload: {todoListID}
    } as const
}

export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC=(newTodolistTitle:string)=>{
    return{
        type: 'ADD-TODOLIST',
        payload: {newTodolistTitle, todoListID:v1()}
    } as const
}
type changeTodolistACType = ReturnType<typeof changeTodolistAC>
export const changeTodolistAC = (todoListID:string, newTodolistTitle:string)=>{
    return{
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {todoListID,newTodolistTitle}
    } as const
}

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todoListID:string,newFilter:string)=>{
    return{
        type: 'CHANGE-TODOLIST-FILTER',
        payload:{todoListID,newFilter}
    } as const
}