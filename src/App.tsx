import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {FullInput} from "./components/FullInput";
import ButtonAppBar from "./ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";


export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
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
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, title: title} : el))
    }

    const editTask = (todolistID: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, title: title} : el)})
    }

    const addTodoListHandler = (title: string) => {
        const newId = v1()
        setTodolists([{id: newId, title: title, filter: 'all'}, ...todolists])
        setTasks({...tasks, [newId]: []})
    }


    const removeTodoList = (todoListId: string) => {
        setTodolists(todolists.filter(el => el.id !== todoListId))
        delete tasks[todoListId]
    }

    const removeTask = (todoListId: string, taskId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(el => taskId !== el.id)})
    }

    const addTask = (todoListId: string, title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        }
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    const changeFilter = (todoListId: string, filter: FilterValuesType) => {
        setTodolists(todolists.map(el => todoListId === el.id ? {...el, filter: filter} : el))
    }

    const changeTasksStatus = (todoListId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(el => el.id === taskId ? {...el, isDone: isDone} : el)})
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

export default App;
