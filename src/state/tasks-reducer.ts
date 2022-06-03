import {TasksStateType} from "../App";
import {TaskType} from "../TodoList";
import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType, todolistID1, todolistID2} from "./todolists-reducer";

const REMOVE_TASK = 'REMOVE_TASK'
const ADD_TASK = 'ADD_TASK'
const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'
const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'


const initialState: TasksStateType = {
    [todolistID1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistID2]: [
        {id: v1(), title: "HTML&CSS2", isDone: true},
        {id: v1(), title: "JS2", isDone: true},
        {id: v1(), title: "ReactJS2", isDone: false},
        {id: v1(), title: "Rest API2", isDone: false},
        {id: v1(), title: "GraphQL2", isDone: false},
    ]
}

export const tasksReducer = (state = initialState, action: ActionTypes):TasksStateType => {
    switch (action.type) {
        case REMOVE_TASK : {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(el => action.payload.taskId!== el.id)}
        }
        case ADD_TASK: {
            const newTask: TaskType = {
                id: v1(),
                title: action.payload.title,
                isDone: false
            }
            return{...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }
        case CHANGE_TASK_STATUS: {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId? {...el, isDone: action.payload.isDone}: el)}
        }
        case "CHANGE_TASK_TITLE": {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId? {...el, title: action.payload.title}: el)}
        }
        case "ADD-TODOLIST": {
            return {...state, [action.payload.newTodolistId] : []}
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.payload.todolistId1]
            return copyState
        }
        default:
            return state
    }
}

export type ActionTypes = RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | addTodolistACType
    | removeTodolistACType
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: REMOVE_TASK,
        payload: {taskId, todolistId}
    } as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: ADD_TASK,
        payload: {title, todolistId}
    } as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: CHANGE_TASK_STATUS,
        payload: {taskId, isDone, todolistId}
    } as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: CHANGE_TASK_TITLE,
        payload: {todolistId, taskId, title}
    } as const
}

