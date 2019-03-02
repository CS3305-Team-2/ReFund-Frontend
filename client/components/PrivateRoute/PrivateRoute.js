import React from 'react';
import { Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const user = localStorage.getItem("user");
    return (
        <Route {...rest} render={props => (
            user ? <Component {...props} user={JSON.parse(user)} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} />
    )
}

export default PrivateRoute;