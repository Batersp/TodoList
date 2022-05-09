import React, {ChangeEvent, KeyboardEvent, useState} from "react";

export type FullInputPropsType = {
    callBack: (title: string) => void
}

export const FullInput = (props: FullInputPropsType) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const inputClasses = error ? 'error' : ''

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
            <input value={title}
                   onChange={onChangeInput}
                   onKeyPress={onKeyPressInput}
                   className={inputClasses}
            />
            <button onClick={onClickAddTask}>+</button>
            {error && <div className='error-message'>Title is required</div>}

        </div>
    )
}