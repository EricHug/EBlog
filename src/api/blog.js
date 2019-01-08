import request from '@/utils/request'
import store from '../store/index'

export default {
    create (data) {
        return request({
            url: '/api/post/add',
            method: 'post',
            data
        })
    },
    delete (data) {
        return request({
            url: '/api/post/delete',
            method: 'post',
            data
        })
    },
    update (data) {
        return request({
            url: '/api/post/update',
            method: 'post',
            data
        })
    },
    queryById (data) {
        return request({
            url: '/api/post/findById',
            method: 'post',
            data
        })
    },
    queryAroundById (data) {
        return request({
            url: '/api/post/findAroundById',
            method: 'post',
            data
        })
    },
    queryByPage (data) {
        return request({
            url: '/api/post/findByPage',
            method: 'post',
            data
        })
    }
}