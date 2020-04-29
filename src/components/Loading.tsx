import * as React from 'react';
import {memo, useEffect} from 'react';
import Loader from 'react-loader-spinner';
import {withRouter}from 'react-router-dom';

const LoadingComp = ({history}) => {
    useEffect(() => {
        history.push('/');
    }, []);

    return (
        <Loader
            type={"BallTriangle"}
            color={"#2A8BF2"}
            className={"loading"}
        />
    )
};

export const Loading = memo(withRouter(LoadingComp));