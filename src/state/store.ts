import { tasksReducer } from './tasks-reducer'
import {combineReducers, legacy_createStore} from 'redux'
import {todolistsReducer} from "./todolist-reducer";


// pomoci combineReducer spojujeme dva reducery
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
//vytvarime store
export const store = legacy_createStore(rootReducer)
//auto typizece
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store