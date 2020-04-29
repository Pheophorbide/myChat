import * as React from "react";
import {PureComponent} from "react";
import {Panel} from "../../components/Panel";
import {ChatForm} from "./components/ChatForm";
import classnames from "classnames";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {sendMessage, logout} from "../../api/server";
import {reset} from "redux-form";
import {LogoutIcon} from "./components/LogoutIcon";

interface HomePageState {
    isColumnVisible: boolean,
    currentContact: string | null
}

class HomePageComp extends PureComponent<RouteComponentProps, HomePageState> {
    componentDidMount(): void {
        if (!this.props.currentUser) {
            this.props.history.push("/")
        }
    }

    sendMessages = (values, form) => {
        const {users, dispatch, currentUser} = this.props;
        if (users.length === 0) return;
        sendMessage({name: currentUser, msg: values.msg});
        dispatch(reset(form))
    };

    onLogout = () => {
        const {currentUser, history} = this.props;
        logout(currentUser);
        history.push("/")
    };

    get availableUsers() {
        const {currentUser, users} = this.props;
        return users.filter((name) => name !== currentUser)
    }

    render() {
        const {currentUser, messages} = this.props;

        return (
            <Panel className={"chat"}>
                <div className={"chat__wrapper"}>
                    <div className={"chat__header"}>
                            <span>
                                {
                                    this.availableUsers.length !== 0
                                        ? `Ваши собеседники - ${this.availableUsers}`
                                        : "Пока никого нет, ждем собеседников"
                                }
                            </span>
                        <LogoutIcon onClick={this.onLogout} className={"chat__logout-icon"}/>
                    </div>
                    <div className={"chat__content"}>
                        <div className={"chat__messages"}>
                            {
                                messages.length !== 0
                                    ? messages.map((item, index) => (
                                        <div
                                            key={index}
                                            className={classnames("chat__message", {["chat__message_request"]: item.name !== currentUser})}
                                        >
                                            <div className={"chat__author"}>{item.name}</div>
                                            {item.msg}
                                        </div>))
                                    : `Привет, ${currentUser}! Тебе пока никто не написал ((`
                            }
                        </div>
                        <ChatForm
                            className={"chat__form"}
                            onSubmit={this.sendMessages}
                            readOnly={this.availableUsers.length === 0}
                        />
                    </div>
                </div>
            </Panel>
        )
    }
}

const mapStateToProps = (store) => ({
    users: store.store.users,
    currentUser: store.store.currentUser,
    messages: store.store.messages
});

export const HomePage = connect(mapStateToProps)(withRouter(HomePageComp));