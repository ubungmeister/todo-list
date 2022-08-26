import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType} from "./todolist-reducer";


export const tasksReducer =(state:TasksStateType,action:ActionTypes)=>{
    switch(action.type){
        case 'REMOVE-TASK':
          return {
              ...state,
              [action.todoListID]:state[action.todoListID].filter(el=>el.id !== action.taskID)
          }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todoListID]: [{id: v1(), title: action.title, isDone: false},...state[action.todoListID]]
            }
        case 'CHANGE-STATUS':
            return {
                ...state,
                [action.todoListID]:state[action.todoListID].map(el=>el.id === action.taskID? {...el, isDone:action.isDone } :el)
            }
        case 'CHANGE-TITLE':
            return {
                ...state,
                [action.todoListID]:state[action.todoListID].map(el=>el.id === action.taskID? {...el, title:action.title } :el)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.payload.todoListID]:[]
            }
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.payload.todoListID]
            return  copyState
        default:
           return state
}}

type ActionTypes = removeTaskACType | addTaskACType
    |changeTaskStatusACType | changeTaskTitleACType|addTodolistACType| removeTodolistACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
 export const removeTaskAC=(taskID:string,todoListID:string )=>{
    return {
        type: 'REMOVE-TASK',taskID,todoListID
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC =(title:string, todoListID:string)=>{
    return{
        type: 'ADD-TASK', title, todoListID
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskID:string,isDone:boolean,todoListID:string)=>{
    return{
        type: 'CHANGE-STATUS', taskID,isDone,todoListID
    } as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskID:string,title:string,todoListID:string)=>{
    return{
        type: 'CHANGE-TITLE', taskID,title,todoListID
    } as const
}
