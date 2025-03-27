import request from '../utils/network'

// 通过QQ号查询密保手机
export const QQsearch = (data) => {
    return request({
        method: 'POST',
        url: '/qqapi',
        data
    })
}
// 通过手机号查询绑定QQ
export const Phonesearch = (data) => {
    return request({
        method: 'POST',
        url: '/qqphone',
        data
    })
}
// 通过QQ查询其LOL信息
export const LOLsearch = (data) => {
    return request({
        method: 'POST',
        url: '/qqlol',
        data
    })
}
// 通过LOL姓名查询其QQ信息
export const LOLnamesearch = (data) => {
    return request({
        method: 'POST',
        url: '/lolname',
        data
    })
}
// 通过QQ查询其可能(有可能是假的)老密
export const qqlmsearch = (data) => {
    return request({
        method: 'POST',
        url: '/qqlm',
        data
    })
}
// 通过微博的ID查询其绑定手机号
export const wbapisearch = (data) => {
    return request({
        method: 'POST',
        url: '/wbapi',
        data
    })
}
// 通过手机号查询其绑定微博ID
export const wbphonesearch = (data) => {
    return request({
        method: 'POST',
        url: '/wbphone',
        data
    })
}