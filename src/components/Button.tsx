import * as React from "react";
import {FC, memo} from "react";
import classnames from 'classnames';

interface ButtonProps {
    disabled?: boolean,
    htmlType?: "submit" | "button",
    children: string,
    color?: string
}

const ButtonComp: FC<ButtonProps> = (
    {disabled, htmlType = "button", children, color}) => {
    return (
        <button
            type={htmlType}
            disabled={disabled}
            className={classnames(
                "button",
                disabled ? "button_disabled" : "",
                color ? `button_${color}` : ""
            )}
        >
            {children}
        </button>
    )
};

export const Button = memo(ButtonComp);