import React, {ChangeEvent, useState} from "react";

export type EditableSpanPropsType = {
    value: string
    callBack: (title: string) => void
}

export const EditableSpan = React.memo ( (props: EditableSpanPropsType) => {
    console.log('EditableSpan')

    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.value)

    const onClickHandler = () => {
        setEdit(!edit)
    }

    const onBlurHandler = () => {
        setEdit(!edit)
        props.callBack(newTitle)
    }

    const onChangeHandler =  (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)

    }

    return (
        edit
            ? <input
                autoFocus
                value={newTitle}
                onBlur={onBlurHandler}
                onChange={onChangeHandler}
            />
            : <span onDoubleClick={onClickHandler}>{props.value}</span>
    )
})