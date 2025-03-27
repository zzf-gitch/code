import request from '../../utils/request.js'

export const searchGril = (data) => {
    return request({
        method: 'GET',
        url: '/api-girl/index.php',
        params: data //body传参方式
        // params: data params传参方式
    })
}
