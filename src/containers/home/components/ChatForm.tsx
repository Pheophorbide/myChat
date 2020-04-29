import * as React from "react";
import {FC} from "react";
import {Field, reduxForm, InjectedFormProps} from "redux-form";
import {Input} from "../../../components/Input";
import {maxMsgLength} from "../../../utils/formValidation";

interface ChatFormProps {
    className?: string,
    onSubmit: (values: { msg: string }) => void,
    form: string,
    readOnly: boolean
}

const ChatFormComp: FC<ChatFormProps & InjectedFormProps<{}, ChatFormProps>> = (
    {
        handleSubmit,
        className,
        onSubmit,
        form,
        readOnly
    }) => {
    function onHandleSubmit(values) {
        if (!values.msg) return;
        onSubmit(values, form);
    }

    return (
        <form className={className} onSubmit={handleSubmit(onHandleSubmit)}>
            <div className={"chat__form-wrapper"}>
                <Field
                    name={"msg"}
                    component={Input}
                    placeholder={"Напишите что-нибудь..."}
                    validate={[maxMsgLength]}
                    readOnly={readOnly}
                />
            </div>
        </form>
    )
};

export const ChatForm = reduxForm({
    form: "chat-form",
    enableReinitialize: true,
})(ChatFormComp);