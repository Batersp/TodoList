import React, {ChangeEvent} from 'react';
import {FullInput} from "./components/FullInput";
import {EditableSpan} from "./components/EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TodolistsType} from "./AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";


type TodoListPropsType = {
    todolist: TodolistsType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoListWithTasks = ({todolist}: TodoListPropsType) => {

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolist.id])

    if (todolist.filter === 'active') {
        tasks = tasks.filter(t => !t.isDone)
    }
    if (todolist.filter === 'completed') {
        tasks = tasks.filter(t => t.isDone)
    }

    const dispatch = useDispatch()

    const editTodoListHandler = (newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolist.id, newTitle))
    }

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, todolist.id))
    }

    const removeTodoListHandler = () => {
        dispatch(removeTodolistAC(todolist.id))
    }

    const onAllClickHandler = () => dispatch(changeFilterAC(todolist.id, 'all'))
    const onActiveClickHandler = () => dispatch(changeFilterAC(todolist.id, 'active'))
    const onCompleteClickHandler = () => dispatch(changeFilterAC(todolist.id, 'completed'))

    const tasksListItems = tasks.length
        ? tasks.map(t => {
            const onChangeChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, todolist.id))
            }
            return (
                <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                    <Checkbox defaultChecked
                              checked={t.isDone}
                              onChange={onChangeChangeStatus}/>

                    <EditableSpan value={t.title}
                                  callBack={(title: string) => dispatch(changeTaskTitleAC(todolist.id, t.id, title))}/>
                    <IconButton aria-label="delete" color={"secondary"}>
                        <Delete onClick={() => dispatch(removeTaskAC(t.id, todolist.id))}/>
                    </IconButton>
                </li>
            )
        })
        : <span>В списке нет задач</span>

    return (
        <div>
            <div>
                <h3><EditableSpan value={todolist.title} callBack={editTodoListHandler}/>
                    <IconButton aria-label="delete" color={"secondary"}>
                        <Delete onClick={removeTodoListHandler}/>
                    </IconButton>

                </h3>
                <FullInput callBack={addTask}/>
                <ul>

                    {tasksListItems}

                </ul>
                <div>
                    <Button variant={todolist.filter === "all" ? "contained" : "outlined"} color="success"
                            onClick={onAllClickHandler}>
                        All
                    </Button>

                    <Button variant={todolist.filter === "active" ? "contained" : "outlined"} color="secondary"
                            onClick={onActiveClickHandler}>
                        Active
                    </Button>

                    <Button variant={todolist.filter === "completed" ? "contained" : "outlined"} color="error"
                            onClick={onCompleteClickHandler}>
                        Completed
                    </Button>


                </div>
            </div>
        </div>
    );
};

