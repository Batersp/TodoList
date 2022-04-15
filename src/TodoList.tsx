import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>('')

    const onClickAddTask = () => {
        const trimmedTitle = title.trim() // УБИРАЕТ ПРОБЕЛЫ ПО КРАЯМ СТРОКИ
        if (trimmedTitle) {
            props.addTask(title)
        }

        setTitle('')
    }

    const onClickChangeFilterToAll = () => {
        props.changeFilter('all')
    }

    const onClickChangeFilterToActive = () => {
        props.changeFilter('active')
    }

    const onClickChangeFilterToCompleted = () => {
        props.changeFilter('completed')
    }

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressInput = (e: KeyboardEvent<HTMLInputElement>) => {
            e.key === 'Enter' && onClickAddTask()
    }

    const tasksListItems = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id)


        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>delete</button>
            </li>
        )
    })

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={title}
                           onChange={onChangeInput}
                           onKeyPress={onKeyPressInput}
                    />
                    <button onClick={onClickAddTask}>+</button>
                </div>
                <ul>

                    {tasksListItems}

                </ul>
                <div>
                    <button onClick={onClickChangeFilterToAll}>All</button>
                    <button onClick={onClickChangeFilterToActive}>Active</button>
                    <button onClick={onClickChangeFilterToCompleted}>Completed</button>
                </div>
            </div>
        </div>
    );
};

