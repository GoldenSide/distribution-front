import request from '../utils/request'
enum Api {
    dataList = '/distribution/distributor/channel-list', // 渠道列表
    createChanel = "/distribution/distributor/add-channel",   //生成渠道

}
export function custDataList(data: any) {
    return request({
        url: Api.dataList,
        method: 'post',
        data
    })
}


export function createChanel(data: any) {
    return request({
        url: Api.createChanel,
        method: 'post',
        data
    })
}