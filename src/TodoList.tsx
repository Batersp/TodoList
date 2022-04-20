import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {FilterValuesType} from "./App";


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTasksStatus: (taskId: string, isDone: boolean) => void
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
            props.addTask(title)
        } else {
            setError(true)
        }

        setTitle('')
    }

    const changeFilterHandler = (filter: FilterValuesType) => {
        props.changeFilter(filter)
    }

    const removeTask = (tId: string) => {
        props.removeTask(tId)
    }


    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        if(error) setError(false)
    }

    const onKeyPressInput = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && onClickAddTask()
    }

    const allBtnClasses = props.filter === 'all' ? 'active-filter' : ''
    const activeBtnClasses = props.filter === 'active' ? 'active-filter' : ''
    const completedBtnClasses = props.filter === 'completed' ? 'active-filter' : ''
    const inputClasses = error ? 'error' : ''

    const getTasksForRender = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        let tasksForRender;
        switch (filter) {
            case 'completed':
                tasksForRender = tasks.filter(t => t.isDone === true)
                break
            case 'active':
                tasksForRender = tasks.filter(t => t.isDone === false)
                break
            default:
                tasksForRender = tasks
        }
        return tasksForRender
    }

    const tasksForRender: Array<TaskType> = getTasksForRender(props.tasks, props.filter)

    const tasksListItems = tasksForRender.length
        ? tasksForRender.map(t => {
            const taskClasses = t.isDone ? 'is-done' : ''
            const onChangeChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTasksStatus(t.id, e.currentTarget.checked)
            }
            return (
                <li key={t.id}>
                    <input
                        type="checkbox"
                        checked={t.isDone}
                        onChange={onChangeChangeStatus}
                    />
                    <span className={taskClasses}>{t.title}</span>
                    <button onClick={() => removeTask(t.id)}>del</button>
                </li>
            )
        })
        : <span>В списке нет задач</span>

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
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
                        onClick={() => changeFilterHandler('all')}>All
                    </button>
                    <button
                        className={activeBtnClasses}
                        onClick={() => changeFilterHandler('active')}>Active
                    </button>
                    <button
                        className={completedBtnClasses}
                        onClick={() => changeFilterHandler('completed')}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
};

