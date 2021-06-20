import service from "@/utils/request.js";

export function GetCode(data) {
    console.log(data)
    return service.request({
        url: '/user',
        method: 'post', // default
        data,
    })
}