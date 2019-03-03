import React from 'react';
import { Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authData = localStorage.getItem("authData");
    return (
        <Route {...rest} render={props => (
            authData ? <Component {...props} authData={JSON.parse(authData)} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} />
    )
}

export default PrivateRoute;