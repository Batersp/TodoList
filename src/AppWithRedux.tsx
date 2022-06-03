import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {FullInput} from "./components/FullInput";
import ButtonAppBar from "./ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";


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

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, dispatchToTodolists] = useReducer(todolistReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
    });

    const editTodoList = (todolistID: string, title: string) => {
        dispatchToTodolists(changeTodolistTitleAC(todolistID, title))
    }

    const editTask = (todolistID: string, taskId: string, title: string) => {
        dispatchToTasks(changeTaskTitleAC(todolistID, taskId, title))
    }

    const addTodoListHandler = (title: string) => {
        let action = addTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }


    const removeTodoList = (todoListId: string) => {
        let action = removeTodolistAC(todoListId)
        dispatchToTodolists(action)
        dispatchToTasks(action)

    }

    const removeTask = (todoListId: string, taskId: string) => {
        dispatchToTasks(removeTaskAC(taskId, todoListId))
    }

    const addTask = (todoListId: string, title: string) => {
        dispatchToTasks(addTaskAC(title, todoListId))
    }

    const changeFilter = (todoListId: string, filter: FilterValuesType) => {
        dispatchToTodolists(changeFilterAC(todoListId, filter))
    }

    const changeTasksStatus = (todoListId: string, taskId: string, isDone: boolean) => {
        dispatchToTasks(changeTaskStatusAC(taskId, isDone, todoListId))
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
                        let tasksForTodoList = tasks[el.id];
                        if (el.filter === 'active') {
                            tasksForTodoList = tasks[el.id].filter(t => !t.isDone)
                        }
                        if (el.filter === 'completed') {
                            tasksForTodoList = tasks[el.id].filter(t => t.isDone)
                        }
                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <TodoList
                                        key={el.id}
                                        todoListId={el.id}
                                        title={el.title}
                                        tasks={tasksForTodoList}
                                        filter={el.filter}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTasksStatus={changeTasksStatus}
                                        removeTodoList={removeTodoList}
                                        editTask={editTask}
                                        editTodoList={editTodoList}
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
