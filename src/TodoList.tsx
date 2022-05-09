import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {FullInput} from "./components/FullInput";
import {EditableSpan} from "./components/EditableSpan";


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
    editTask: (todolistID: string, taskId: string, title: string) => void
    editTodoList: (todolistID: string, title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = (props: TodoListPropsType) => {

    const editTodoListHandler = (newTitle: string) => {
        props.editTodoList(props.todoListId, newTitle)
    }

    const editTaskHandler = (taskId: string, title: string) => {
        props.editTask(props.todoListId, taskId, title)
    }

    const addTask = (title: string) => {
        props.addTask(props.todoListId, title)
    }

    const changeFilterHandler = (id: string, filter: FilterValuesType) => {
        props.changeFilter(id, filter)
    }
    const removeTask = (todoListId: string, tId: string) => {
        props.removeTask(todoListId, tId)
    }

    const allBtnClasses = props.filter === 'all' ? 'active-filter' : ''
    const activeBtnClasses = props.filter === 'active' ? 'active-filter' : ''
    const completedBtnClasses = props.filter === 'completed' ? 'active-filter' : ''


    const removeTodoListHandler = () => {
        props.removeTodoList(props.todoListId)
    }

    const tasksListItems = props.tasks.length
        ? props.tasks.map(t => {
            const onChangeChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTasksStatus(props.todoListId, t.id, e.currentTarget.checked)
            }
            return (
                <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                    <input
                        type="checkbox"
                        checked={t.isDone}
                        onChange={onChangeChangeStatus}
                    />
                    <EditableSpan value={t.title} callBack={(title: string) => editTaskHandler(t.id, title)}/>
                    <button onClick={() => removeTask(props.todoListId, t.id)}>del</button>
                </li>
            )
        })
        : <span>В списке нет задач</span>

    return (
        <div>
            <div>
                <h3><EditableSpan value={props.title} callBack={editTodoListHandler}/>
                    <button onClick={removeTodoListHandler}>x</button>
                </h3>
                <FullInput callBack={addTask}/>
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

