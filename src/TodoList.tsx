import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import {Button} from "./components/Button";
import {Input} from "./components/Input";

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

    const changeFilterHandler = (filter: FilterValuesType) => {
        props.changeFilter(filter)
    }

    const removeTask = (tId: string) => {
        props.removeTask(tId)
    }


    const tasksListItems = props.tasks.map(t => {
        return (
            <li key={t.id}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                />
                <span>{t.title}</span>
                <Button name={'delete'} callBack={() => removeTask(t.id)}/>
            </li>
        )
    })

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    {/*<input value={title}
                           onChange={onChangeInput}
                           onKeyPress={onKeyPressInput}
                    />*/}
                    <Input title={title} setTitle={setTitle} callBack={onClickAddTask}/>
                    <Button name={'+'} callBack={onClickAddTask}/>
                </div>
                <ul>

                    {tasksListItems}

                </ul>
                <div>
                    <Button name={'All'} callBack={() => changeFilterHandler('all')}/>
                    <Button name={'Active'} callBack={() => changeFilterHandler('active')}/>
                    <Button name={'Completed'} callBack={() => changeFilterHandler('completed')}/>
                </div>
            </div>
        </div>
    );
};

