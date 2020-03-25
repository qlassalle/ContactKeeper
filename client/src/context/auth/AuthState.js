import React, {useReducer} from 'react';
import AuthContext from "./authContext";
import authReducer from './authReducer';
import setAuthToken from "../../utils/setAuthToken";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
} from '../types';
import axios from "axios";

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        user: null,
        loading: true,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // load user
    const loadUser = async() => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get('/api/auth');
            dispatch({type: USER_LOADED, payload: res.data});
        } catch (err) {
            dispatch({type: AUTH_ERROR});
        }
    };

    // register user
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.post('/api/users', formData, config);
            dispatch({type: REGISTER_SUCCESS, payload: res.data});
            await loadUser();
        } catch (error) {
            console.log(error);
            dispatch({type: REGISTER_FAIL, payload: error.response.data.msg});
            console.log(error);
        }
    };
    // login user
    // logout
    // clear errors
    const clearErrors = () => dispatch({type: CLEAR_ERRORS});

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                loading: state.loading,
                error: state.error,
                register,
                clearErrors,
                loadUser
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthState;
