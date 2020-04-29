import * as React from 'react';
import {FC, memo} from 'react';
import classnames from 'classnames';

interface InputProps {
    input: {
        value: string | number | null,
        onChange: (e) => void
    },
    placeholder?: string,
    label?: string,
    meta: {
        touched: boolean,
        error: boolean
    },
    className?: string,
    readOnly?: boolean
}
const InputComp: FC<InputProps> = (
    {
        input,
        placeholder,
        label,
        meta: { touched, error },
        className,
        readOnly
    }) => {
    return (
        <div className={classnames("form-group", className)}>
            {label && <label className={"form-group__label"}>{label}</label>}
            <input
                {...input}
                className={"form-group__input"}
                placeholder={placeholder}
                readOnly={readOnly}
            />
            {touched && error && <div className={"form-group__error"}>{error}</div>}
        </div>
    )
};

export const Input = memo(InputComp);