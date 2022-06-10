import React, {ChangeEvent, useCallback} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./components/EditableSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {TaskType} from "./TodoListWithTasks";

type TaskPropsType = {
    todolistId: string
    task: TaskType
}

export const Task = React.memo ( (props: TaskPropsType) => {




    const dispatch = useDispatch()
    const onChangeChangeStatus =  (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.task.id, e.currentTarget.checked, props.todolistId))
    }
    return (
        <li key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox defaultChecked
                      checked={props.task.isDone}
                      onChange={onChangeChangeStatus}/>
            <EditableSpan value={props.task.title}
                          callBack={useCallback ( (title: string) => dispatch(changeTaskTitleAC(props.todolistId, props.task.id, title)),[props.todolistId, props.task.id])}/>
            <IconButton aria-label="delete" color={"secondary"}>
                <Delete onClick={() => dispatch(removeTaskAC(props.task.id, props.todolistId))}/>
            </IconButton>
        </li>
    )
});



