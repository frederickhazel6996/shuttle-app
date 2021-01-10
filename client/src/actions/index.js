import { LOGIN, REGISTER, LOADING, AUTH_ERROR, ARRIVAL, LOCATION } from "./types";
import axios from "axios";
import setAuthorization from "../config/setAuthorization";
import jwt from "jsonwebtoken";

import { createBrowserHistory } from "history";

export const loading = () => {
    return {
        type: LOADING,
    };
};
export const location = (data) => {
    return {
        type: LOCATION,
        data,
    };
};
export const arrival_time = (message) => {
    return {
        type: ARRIVAL,
        message,
    };
};
// let url = 'http://localhost:3001/api/student/login';
// let url2 = 'http://localhost:3001/api/student/register';
let url = "https://shuttle-app-legon.herokuapp.com/api/student/login";
let url2 = "https://shuttle-app-legon.herokuapp.com/api/student/register";
export function signUserIn(data) {
    return function (dispatch) {
        dispatch(loading());
        axios
            .post(
                url,
                {
                    student_id: data.student_id,
                    password: data.password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                const token = response.data.access_token;
                const name = response.data.username;

                localStorage.setItem("username", name);
                localStorage.setItem("userToken", token);
                setAuthorization(token);
                var lol = jwt.decode(token);
                console.log(lol.name);
                dispatch({ type: LOGIN, name });
                data.history.push("/dashboard");
            })
            .catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
    };
}

export function signUserUp(data) {
    return function (dispatch) {
        dispatch(loading());
        axios
            .post(
                url2,
                {
                    student_id: data.student_id,
                    password: data.password,
                    hall: data.hall,
                    username: data.username,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                const token = response.data.access_token;
                const name = response.data.username;

                localStorage.setItem("username", name);
                localStorage.setItem("userToken", token);
                setAuthorization(token);
                var lol = jwt.decode(token);
                console.log(lol.name);
                dispatch({ type: REGISTER, name });

                data.history.push("/dashboard");
            })
            .catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
    };
}
