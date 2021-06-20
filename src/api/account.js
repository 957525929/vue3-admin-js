import service from "@/utils/request.js";

//获取验证码
// export function Send(data) {
//     return service.request({
//         url: process.env.VUE_APP_APIURL + '/v1/send',
//         method: 'post', // default
//         data,
//     })
// }
//获取验证码
export function Send(data) {
    return service.request({
        url: process.env.VUE_APP_APIURL + '/v1/send',
        method: 'post', // default
        data,
    })
}
//检测用户名
export function CheckUsername(data) {
    return service.request({
        url: process.env.VUE_APP_APIURL + '/v1/account/check',
        method: 'post', // default
        data,
    })
}
//用户注册  
export function Register(data) {
    return service.request({
        url: process.env.VUE_APP_APIURL + '/v1/account/register',
        method: 'post', // default
        data,
    })
}

//用户登录  
export function Login(data) {
    return service.request({
        url: process.env.VUE_APP_APIURL + '/v1/account/login',
        method: 'post', // default
        data,
    })
}
// //
// export function InfoList(data) {
//     return service.request({
//         url: process.env.VUE_APP_FLAG_INFO + '/info/v1/list',
//         method: 'post', // default
//         data,
//     })
// }

// service.request({
//     url: '/user',
//     method: 'post', // default

//     data: {   //post请求
//         firstName: 'Fred'
//     },
// })