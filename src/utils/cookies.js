//cookie
import Cookies from "js-cookie";

const token = "tokenAdmin";
const username = "username";
//token
export function setToken(params) {
    Cookies.set(token, params.token);
}
export function getToken() {
    return Cookies.get(token);
}

export function removeToken() {
    Cookies.remove(token);
}
//用户名
export function setUsername(params) {
    Cookies.set(username, params.value);
}

export function getUsername() {
    return Cookies.get(username);
}

export function removeUsername() {
    Cookies.remove(username);
}