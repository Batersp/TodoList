import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";


export const todolistReducer = (state: Array<TodolistsType>, action: tsarTypeForTodolistsReducer):Array<TodolistsType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.todolistId1)
        }
        case "ADD-TODOLIST": {
            let newTodolist: TodolistsType = {
                id: action.payload.newTodolistId,
                title: action.payload.title,
                filter: 'all'
            }
            return [newTodolist, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.payload.id? {...el, title: action.payload.title}: el)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(el => el.id === action.payload.id? {...el, filter: action.payload.filter}: el)
        }
        default:
            return state
    }
}

type tsarTypeForTodolistsReducer = removeTodolistACType | addTodolistACType | changeTodolistTitleACType | changeFilterACType
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type changeFilterACType = ReturnType<typeof changeFilterAC>

export const removeTodolistAC = (todolistId1: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todolistId1}
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {newTodolistId: v1(), title,}
    } as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {id, title}
    } as const
}

export const changeFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {id, filter}
    } as const
}