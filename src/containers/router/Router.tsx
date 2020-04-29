import * as React from "react";
import {PureComponent} from "react";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {Login} from "../login/Login";
import {HomePage} from "../home/HomePage";
import {Loading} from "../../components/Loading";

interface RouterProps {
    isLoading: boolean
}

class RouterComp extends PureComponent<RouterProps> {
    render() {
        const {isLoading} = this.props;

        return (
            <div className={"wrapper"}>
                {
                    isLoading
                        ? <Loading/>
                        : (
                            <Switch>
                                <Route exact path={"/"}><Login/></Route>
                                <Route exact path={"/home"}><HomePage/></Route>
                                <Route><Login/></Route>
                            </Switch>
                        )
                }
            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    isLoading: store.store.isLoading
});

export const Router = connect(mapStateToProps)(RouterComp);