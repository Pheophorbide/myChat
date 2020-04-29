import * as React from 'react';
import {FC} from 'react';
import {Field, reduxForm, InjectedFormProps} from 'redux-form';
import {Input} from "../../../components/Input";
import {Button} from "../../../components/Button";
import {required, maxLength} from "../../../utils/formValidation";

interface LoginFormProps {
    className?: string
}

const LoginFormComp: FC<LoginFormProps & InjectedFormProps<{}, LoginFormProps>> = ({handleSubmit, pristine, submitting, className, onSubmit}) => {
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={className}>
            <h2 className={"login__title"}>MyChat</h2>
            <Field
                name={"name"}
                className={"login__field"}
                component={Input}
                placeholder={"Введите ваше имя"}
                validate={[required, maxLength]}
            />
            <Button
                color={"primary"}
                disabled={pristine || submitting}
                htmlType={"submit"}
            >
                Отправить
            </Button>
        </form>
    )
};

export const LoginForm = reduxForm({
    form: 'login-form',
    enableReinitialize: true,
})(LoginFormComp);