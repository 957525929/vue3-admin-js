//手机号验证
export function checkPhone(value) {
    let regPhone = /^1[3456789][0-9]\d{8}$/;
    return regPhone.test(value);
}
//6-20数字+英文
export function checkPassword(value) {
    let regPassword = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}/;
    return regPassword.test(value);
}
//验证码  纯数字
export function checkCode(value) {
    let regCode = /^\d{6}$/;
    return regCode.test(value);
}

//验证码  纯数字
export function checkEmail(value) {
    let regEmail = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/;;
    return regEmail.test(value);
}

//汉字
export function checkTruename(value) {
    let regEmail = /^[\u2E80-\u9FFF]+$/;
    return regEmail.test(value);
}

//身份证
export function checkCardId(value) {
    let regCardId = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return regCardId.test(value);
}
