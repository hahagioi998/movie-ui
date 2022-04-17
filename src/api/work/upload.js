import request from '@/utils/request'

// 查询电影源信息列表
export function listUpload(query) {
  return request({
    url: '/work/upload/list',
    method: 'get',
    params: query
  })
}

// 查询电影源信息详细
export function getUpload(movieSourceId) {
  return request({
    url: '/work/upload/' + movieSourceId,
    method: 'get'
  })
}

// 新增电影源信息
export function addUpload(data) {
  return request({
    url: '/work/upload',
    method: 'post',
    data: data
  })
}

// 修改电影源信息
export function updateUpload(data) {
  return request({
    url: '/work/upload',
    method: 'put',
    data: data
  })
}

// 删除电影源信息
export function delUpload(movieSourceId) {
  return request({
    url: '/work/upload/' + movieSourceId,
    method: 'delete'
  })
}
