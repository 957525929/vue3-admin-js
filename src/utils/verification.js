//手机号验证
export function checkPhone(value) {
    let regPhone = /^1[3456789][0-9]\d{9}$/;
    return regPhone.test(value);
}
//6-20数字+英文
export function checkPassword(value) {
    let regPassword = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}/;
    return regPassword.test(value);
}
//验证码
export function checkCode(value) {
    let regCode = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6}/;
    return regCode.test(value);
}
