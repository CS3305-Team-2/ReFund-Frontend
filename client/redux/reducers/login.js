import update from 'immutability-helper';
import axios from 'axios';
import { push } from 'connected-react-router';
import simpleAction from '../simpleAction';

export const FETCH_LOGIN_REQUEST = 'fetchLoginRequest/login';
export const FETCH_LOGIN_FAILURE = 'fetchLoginFailure/login';
export const FETCH_LOGIN_SUCCESS = 'fetchLoginSuccess/login';
export const LOGOUT = 'logout/login';

const initialState = {
    ui: {
        loading: false,
        error: '',
    },
    data: {
        loggedIn: false,
        user: null,
    }
};

export default function loginReducer(state = initialState, {type, payload}) {
    switch (type) {
    case FETCH_LOGIN_REQUEST: {
        return update(state, {
            ui: {
                loading: {$set: true},
                error: {$set: ''}
            }
        })
    }
    case FETCH_LOGIN_FAILURE: {
        return update(state, {
            ui: {
                loading: {$set: false},
                error: {$set: payload}
            }
        });
    }
    case FETCH_LOGIN_SUCCESS: {
        return {...initialState};
    }
    case LOGOUT: {
        return {...initialState};
    }
    }

    return state;
}

export const updateEmail = simpleAction(UPDATE_EMAIL);
export const updatePassword = simpleAction(UPDATE_PASSWORD);

const loginFailure = simpleAction(FETCH_LOGIN_FAILURE);

export function submitLogin(orcid, password) {
    return async (dispatch, getState) => {
        dispatch({type: FETCH_LOGIN_REQUEST});


        try {
            const formData = new FormData();
            formData.set("orcid", orcid);
            formData.set("password", password);

            const response = await axios.post('/prime/api/login', formData);
            console.log(response.status, response.data);
            /*if (response.data.error) {
        return dispatch(loginFailure(response.data.error));
      } else {
        dispatch(push('/'));

        return dispatch({
          type: FETCH_LOGIN_SUCCESS
        })
      }*/

        } catch (e) {
            console.log(e);
            return dispatch(loginFailure('Something went wrong'))
        }
    }
}

export function logout() {
    return async (dispatch) => {
        axios.get('/prime/api/logout');

        dispatch(push('/login'));

        dispatch({type: LOGOUT});
    }
}
