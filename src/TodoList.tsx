import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {FullInput} from "./components/FullInput";
import {EditableSpan} from "./components/EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";


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
                    <Checkbox defaultChecked
                              checked={t.isDone}
                              onChange={onChangeChangeStatus}/>

                    <EditableSpan value={t.title} callBack={(title: string) => editTaskHandler(t.id, title)}/>
                    <IconButton aria-label="delete" color={"secondary"}>
                        <Delete onClick={() => removeTask(props.todoListId, t.id)}/>
                    </IconButton>
                </li>
            )
        })
        : <span>В списке нет задач</span>

    return (
        <div>
            <div>
                <h3><EditableSpan value={props.title} callBack={editTodoListHandler}/>
                    <IconButton aria-label="delete" color={"secondary"}>
                        <Delete onClick={removeTodoListHandler}/>
                    </IconButton>

                </h3>
                <FullInput callBack={addTask}/>
                <ul>

                    {tasksListItems}

                </ul>
                <div>
                    <Button variant={props.filter === "all" ? "contained" : "outlined"} color="success"
                            onClick={() => changeFilterHandler(props.todoListId, 'all')}>
                        All
                    </Button>

                    <Button variant={props.filter === "active" ? "contained" : "outlined"} color="secondary"
                            onClick={() => changeFilterHandler(props.todoListId, 'active')}>
                        Active
                    </Button>

                    <Button variant={props.filter === "completed" ? "contained" : "outlined"} color="error"
                            onClick={() => changeFilterHandler(props.todoListId, 'completed')}>
                        Completed
                    </Button>


                </div>
            </div>
        </div>
    );
};

