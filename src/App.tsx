import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";


export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistsType = {
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
            {todolists.map(el => {
                let tasksForTodoList = tasks[el.id];
                if (el.filter === 'active') {
                    tasksForTodoList = tasks[el.id].filter(t => t.isDone === false)
                }
                if (el.filter === 'completed') {
                    tasksForTodoList = tasks[el.id].filter(t => t.isDone === true)
                }
                return (
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
                    />
                )
            })}

        </div>
    );
}

export default App;
