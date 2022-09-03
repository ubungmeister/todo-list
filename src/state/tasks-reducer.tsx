import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType} from "./todolist-reducer";


export const tasksReducer =(state:TasksStateType,action:ActionTypes)=>{
    switch(action.type){
        case 'REMOVE-TASK':
        // {
        //     const stateCopy = {...state};
        //     const tasks = state[action.todoListID];
        //     const filteredTasks = tasks.filter(t => t.id !== action.taskID)
        //     stateCopy[action.todoListID] = filteredTasks;
        //     return stateCopy;
        // }

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
                [action.todoListID]:state[action.todoListID].map(el=>el.id === action.taskID? {...el, isDone:action.value } :el)
            }
        case 'CHANGE-TITLE':
            return {
                ...state,
                [action.todoListID]:state[action.todoListID].map(el=>el.id === action.taskID? {...el, title:action.tasktitle} :el)
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
 export const removeTaskAC=(todoListID:string,taskID:string )=>{
    return {
        type: 'REMOVE-TASK',todoListID,taskID
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC =(todoListID:string, title:string)=>{
    return{
        type: 'ADD-TASK', title, todoListID
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todoListID:string,taskID:string, value:boolean)=>{
    return{
        type: 'CHANGE-STATUS', todoListID,taskID,value
    } as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todoListID: string, taskID: string, tasktitle: string)=>{
    return{
        type: 'CHANGE-TITLE', todoListID,taskID,tasktitle
    } as const
}
