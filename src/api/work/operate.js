import request from '@/utils/request'

// 查询电影操作列表
export function listOperate(query) {
  return request({
    url: '/work/operate/list',
    method: 'get',
    params: query
  })
}

// 查询电影操作详细
export function getOperate(movieOperateId) {
  return request({
    url: '/work/operate/' + movieOperateId,
    method: 'get'
  })
}

// 新增电影操作
export function addOperate(data) {
  return request({
    url: '/work/operate',
    method: 'post',
    data: data
  })
}

// 修改电影操作
export function updateOperate(data) {
  return request({
    url: '/work/operate',
    method: 'put',
    data: data
  })
}

// 删除电影操作
export function delOperate(movieOperateId) {
  return request({
    url: '/work/operate/' + movieOperateId,
    method: 'delete'
  })
}
