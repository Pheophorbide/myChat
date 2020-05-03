import * as React from "react";
import {PureComponent} from "react";
import {Panel} from "../../components/Panel";
import { connect } from "react-redux";
import {LoginForm} from "./components/LoginForm";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {
    registerUser
} from "../../api/server";
import {store} from "react-notifications-component";

interface LoginState {
    currentUser: string | null
}

class LoginComp extends PureComponent<{} & RouteComponentProps, LoginState> {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        }
    }

    onSubmit = (values) => {
        if (!values) return;
        const {name} = values;
        this.setState({
            currentUser: name
        }, () => {
            registerUser(name, this.redirect);
        });
    };
    
    redirect = (error) => {
        const {history, dispatch} = this.props;

        if(error) {
            store.addNotification({
                type: "danger",
                message: error,
                container: "top-right",
                dismiss: {
                    duration: 3000
                }
            })
        } else {
            dispatch({type: 'SET_CURRENT_USER', payload: this.state.currentUser});
            history.push("/home");
        }
    };

    render() {
        return (
            <div className={"login"}>
                <Panel className={"login__wrapper"}>
                    <LoginForm
                        onSubmit={this.onSubmit}
                        className={"login__form"}
                    />
                </Panel>
            </div>
        )
    }
}

export const Login = connect()(withRouter(LoginComp));