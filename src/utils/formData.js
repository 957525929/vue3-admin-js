const init_data = {
    status: {
        0: false,
        1: true
    }
}

//json key 匹配
export function matchKey(field, value) {
    //获取初始化的数据
    const data = init_data[field];
    // console.log(data)
    //不存在时，返回false
    if (!data) {
        return false;
    }
    // console.log(data[value])
    return data[value];
}

//响应文本数据转换
// export function requestDataFormat(data, field, matchField) {
/**
 * 
 * @param {Object} data  响应报文数据
 * @param {Object} form  表单的key
 * @param {Object} form  表单的key
 */
export function requestDataFormat(params) {
    const request_data = params.data;
    const keys = Object.keys(request_data);
    //form
    const formState = params.form;
    //匹配字段
    for (let key in formState) {
        // request_data.keys();
        // console.log(key);
        if (keys.includes(key)) {  //匹配响应报文和表单的字段
            // console.log(key);
            if (params.match && params.match.includes(key)) { //匹配是否转换数据的字段
                formState[key] = matchKey(key, request_data[key]);
            } else {
                formState[key] = request_data[key];
            }

        }
    }
}

