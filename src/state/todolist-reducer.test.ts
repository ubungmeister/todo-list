import {addTodolistAC, changeFilterAC, changeTodolistAC, removeTodolistAC, todolistsReducer} from './todolist-reducer'
import { v1 } from 'uuid'
import {FilterValuetype, TasksStateType, TodoListType} from "../App";
import {tasksReducer} from "./tasks-reducer";

let todolistId1:string
let todolistId2:string
let startState:Array<TodoListType>
beforeEach(()=>{
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]
})



test('correct todolist should be removed', () => {

     const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length ).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {

    let newTodolistTitle = 'New Todolist'

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})
test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist'

    const endState = todolistsReducer(startState, changeTodolistAC(todolistId2,newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})


test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuetype = 'Completed'

    const endState = todolistsReducer(startState, changeFilterAC(todolistId2,newFilter))

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(newFilter)
})

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})