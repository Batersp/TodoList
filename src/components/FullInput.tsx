import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";

export type FullInputPropsType = {
    callBack: (title: string) => void
}

export const FullInput = (props: FullInputPropsType) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)


    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        if (error) setError(false)
    }

    const onKeyPressInput = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && onClickAddTask()
    }

    const onClickAddTask = () => {
        const trimmedTitle = title.trim() // УБИРАЕТ ПРОБЕЛЫ ПО КРАЯМ СТРОКИ
        if (trimmedTitle) {
            props.callBack(title)
        } else {
            setError(true)
        }

        setTitle('')
    }

    return (
        <div>
            <TextField id="outlined-basic"
                       label={error? 'Title is required': "Enter text"}
                       variant="outlined"
                       value={title}
                       onChange={onChangeInput}
                       onKeyPress={onKeyPressInput}
                       size={"small"}
                       error={error}
            />

            <Button variant="contained"
                    style={{maxWidth: '38px', maxHeight: '38px', minWidth: '38px', minHeight: '38px'}}
                    onClick={onClickAddTask}>+</Button>
            {error && <div className='error-message'>Title is required</div>}

        </div>
    )
}