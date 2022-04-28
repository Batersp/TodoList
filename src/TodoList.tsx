import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {FilterValuesType} from "./App";


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (todoListId: string, taskId: string) => void
    changeFilter: (id: string, filter: FilterValuesType) => void
    addTask: (todoListId: string, title: string) => void
    changeTasksStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    todoListId: string
    removeTodoList: (todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onClickAddTask = () => {
        const trimmedTitle = title.trim() // УБИРАЕТ ПРОБЕЛЫ ПО КРАЯМ СТРОКИ
        if (trimmedTitle) {
            props.addTask(props.todoListId, title)
        } else {
            setError(true)
        }

        setTitle('')
    }

    const changeFilterHandler = (id: string, filter: FilterValuesType) => {
        props.changeFilter(id, filter)
    }

    const removeTask = (todoListId: string, tId: string) => {
        props.removeTask(todoListId, tId)
    }


    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        if (error) setError(false)
    }

    const onKeyPressInput = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && onClickAddTask()
    }

    const allBtnClasses = props.filter === 'all' ? 'active-filter' : ''
    const activeBtnClasses = props.filter === 'active' ? 'active-filter' : ''
    const completedBtnClasses = props.filter === 'completed' ? 'active-filter' : ''
    const inputClasses = error ? 'error' : ''

    const removeTodoListHandler = () => {
        props.removeTodoList(props.todoListId)
    }

    const tasksListItems = props.tasks.length
        ? props.tasks.map(t => {
            const taskClasses = t.isDone ? 'is-done' : ''
            const onChangeChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTasksStatus(props.todoListId, t.id, e.currentTarget.checked)
            }
            return (
                <li key={t.id}>
                    <input
                        type="checkbox"
                        checked={t.isDone}
                        onChange={onChangeChangeStatus}
                    />
                    <span className={taskClasses}>{t.title}</span>
                    <button onClick={() => removeTask(props.todoListId, t.id)}>del</button>
                </li>
            )
        })
        : <span>В списке нет задач</span>

    return (
        <div>
            <div>
                <h3>{props.title}
                    <button onClick={removeTodoListHandler}>x</button>
                </h3>

                <div>
                    <input value={title}
                           onChange={onChangeInput}
                           onKeyPress={onKeyPressInput}
                           className={inputClasses}
                    />
                    <button onClick={onClickAddTask}>+</button>
                    {error && <div className='error-message'>Title is required</div>}

                </div>
                <ul>

                    {tasksListItems}

                </ul>
                <div>
                    <button
                        className={allBtnClasses}
                        onClick={() => changeFilterHandler(props.todoListId, 'all')}>All
                    </button>
                    <button
                        className={activeBtnClasses}
                        onClick={() => changeFilterHandler(props.todoListId, 'active')}>Active
                    </button>
                    <button
                        className={completedBtnClasses}
                        onClick={() => changeFilterHandler(props.todoListId, 'completed')}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
};

