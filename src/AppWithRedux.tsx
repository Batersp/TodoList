import React from 'react';
import './App.css';
import {TaskType} from "./TodoList";
import {FullInput} from "./components/FullInput";
import ButtonAppBar from "./ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {addTodolistAC, changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodoListWithTasks} from "./TodoListWithTasks";


export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    let todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)

    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    let dispatch = useDispatch()


    const editTodoList = (todolistID: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistID, title))
    }

    const editTask = (todolistID: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskId, title))
    }

    const addTodoListHandler = (title: string) => {
        dispatch(addTodolistAC(title))
    }


    const removeTodoList = (todoListId: string) => {
        dispatch(removeTodolistAC(todoListId))
    }

    const removeTask = (todoListId: string, taskId: string) => {
        dispatch(removeTaskAC(taskId, todoListId))
    }

    const addTask = (todoListId: string, title: string) => {
        dispatch(addTaskAC(title, todoListId))
    }

    const changeFilter = (todoListId: string, filter: FilterValuesType) => {
        dispatch(changeFilterAC(todoListId, filter))
    }

    const changeTasksStatus = (todoListId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <FullInput callBack={addTodoListHandler}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(el => {

                        return (
                            <Grid item key={el.id}>
                                <Paper style={{padding: '10px'}}>
                                    <TodoListWithTasks
                                        todolist={el}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithRedux;
