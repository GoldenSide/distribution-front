// 
import request from '../utils/request'
enum Api {
    loginPwd = '/distribution/distributor/login-by-pwd', // 账号密码登录
    loginCode = '/distribution/distributor/login-by-sms',// 验证码登录
    codeApi = '/distribution/common/send-sms-code', // 发送验证码
    useInfo = '/distribution/distributor/account-info',//用户信息
    registerApi = '/distribution/distributor/register'//注册  
}
export function loginPwd(data: any) {
    return request({
        url: Api.loginPwd,
        method: 'post',
        data
    })
}
export function loginCode(data: any) {
    return request({
        url: Api.loginCode,
        method: 'post',
        data
    })
}

export function sendCodeApi(data: any) {
    return request({
        url: Api.codeApi,
        method: 'post',
        data
    })
}

export function getUserInfo() {
    return request({
        url: Api.useInfo,
        method: 'post',
    })
}

export function registerAct(data: any) {
    return request({
        url: Api.registerApi,
        method: 'post',
        data
    })
}