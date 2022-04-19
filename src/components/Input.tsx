import React, {ChangeEvent, KeyboardEvent} from "react";

type InputPropsType = {
    title: string
    setTitle: (title: string) => void
    callBack: () => void
}

export const Input = (props: InputPropsType) => {

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value)
    }

    const onKeyPressInput = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && props.callBack()
    }

    return (
        <input value={props.title}
               onChange={onChangeInput}
               onKeyPress={onKeyPressInput}
        />
    )
}