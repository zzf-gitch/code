import request from '../../utils/request.js'

export const search = (data) => {
    return request({
        method: 'POST',
        url: '/api/trans/vip/translate',
        data: data //body传参方式
        // params: data params传参方式
    })
}
