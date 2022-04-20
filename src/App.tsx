import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";


export type FilterValuesType = 'all' | 'active' | 'completed'


function App() {

    const todoListTitle: string = 'What to learn'

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
    ])


    const removeTask = (taskId: string) => {
        const filteredTasks = tasks.filter(t => t.id !== taskId)
        setTasks(filteredTasks)
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        }

        setTasks([newTask, ...tasks])
    }

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const changeTasksStatus = (taskId: string, isDone: boolean ) => {
        setTasks(tasks.map(t => t.id === taskId? {...t, isDone: isDone} : t))
    }



    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={tasks}
                filter={filter}

                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTasksStatus={changeTasksStatus}/>

        </div>
    );
}

export default App;
