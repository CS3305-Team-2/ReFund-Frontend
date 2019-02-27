/* eslint no-undef: 0, no-underscore-dangle: 0 */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import history from '../history';
import loginReducer from './reducers/login';

const reducers = combineReducers({
    login: loginReducer,
    router: connectRouter(history)
});

const store = createStore(
    reducers,
    compose(applyMiddleware(thunk, routerMiddleware(history))),
);

export default store;
