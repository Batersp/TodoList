import React, {useCallback} from 'react';
import {FullInput} from "./components/FullInput";
import {EditableSpan} from "./components/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TodolistsType} from "./AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC} from "./state/tasks-reducer";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";
import {Task} from "./Task";


type TodoListPropsType = {
    todolist: TodolistsType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoListWithTasks = React.memo( ({todolist}: TodoListPropsType) => {
    console.log('TodoListWithTasks')

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolist.id])

    if (todolist.filter === 'active') {
        tasks = tasks.filter(t => !t.isDone)
    }
    if (todolist.filter === 'completed') {
        tasks = tasks.filter(t => t.isDone)
    }

    const dispatch = useDispatch()

    const editTodoListHandler = useCallback ( (newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolist.id, newTitle))
    },[todolist.id])

    const addTask = useCallback ((title: string) => {
        dispatch(addTaskAC(title, todolist.id))
    }, [todolist.id])

    const removeTodoListHandler = useCallback( () => {
        dispatch(removeTodolistAC(todolist.id))
    },[todolist.id])


    const onAllClickHandler = useCallback ( () => dispatch(changeFilterAC(todolist.id, 'all')),[todolist.id])
    const onActiveClickHandler = useCallback ( () => dispatch(changeFilterAC(todolist.id, 'active')),[todolist.id])
    const onCompleteClickHandler = useCallback ( () => dispatch(changeFilterAC(todolist.id, 'completed')),[todolist.id])

    const tasksListItems = tasks.length
        ? tasks.map(t =>  <Task todolistId={todolist.id} task={t} key={t.id} />

          /*  const onChangeChangeStatus =  (e: ChangeEvent<HTMLInputElement>) => {
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
            )*/
        )
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
});

