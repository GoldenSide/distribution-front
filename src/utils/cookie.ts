import Cookies from "js-cookie";
let token_sign = 'token_sign';

export function haveToken() {
    return Cookies.get(token_sign)
}
export function setToken(token: string) {
    return Cookies.set(token_sign, token)
}

export function removeToken() {
    return Cookies.remove(token_sign)
}