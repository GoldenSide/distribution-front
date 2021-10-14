import { removeToken, setToken } from "../utils/cookie";
import { loginPwd, loginCode, getUserInfo } from '../api/login'
import { imageToCanvas } from "../utils/downLoad";

const user = {
    namespaced: true,
    state: {
        userInfo: {}
    },
    mutations: {
        SET_USERINFO: (state: any, info: any) => {
            state.userInfo = info
        }
    },
    actions: {
        loginLeft({ commit }, data) {
            return new Promise((resolve, reject) => {
                loginPwd(data)
                    .then(response => {
                        if (response.code == 0) {
                            setToken(response.data.token);
                            resolve(response);
                        }
                    })
                    .catch(error => {
                        removeToken();
                        reject(error);
                    });
            });
        },
        loginRight({ commit }, data) {
            return new Promise((resolve, reject) => {
                loginCode(data)
                    .then(response => {
                        if (response.code == 0) {
                            setToken(response.data.token);
                            resolve(response);
                        }
                    })
                    .catch(error => {
                        removeToken();
                        reject(error);
                    });
            });
        },
        GetUserInfo({ commit, dispatch }) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(res => {
                    imageToCanvas(res.data.self_chanel_url).then(img=>{
                        res.data.qr_code = img
                        commit("SET_USERINFO", res.data);
                        resolve(res);
                    })
                }).catch(error => {
                    dispatch("logoutAct");
                    reject(error);
                });
            })
        },
        logoutAct({ commit }) {
            return new Promise((resolve, reject) => {
                commit("SET_USERINFO", {});
                removeToken();
                resolve(true)
            })

        }

    }
};
export default user