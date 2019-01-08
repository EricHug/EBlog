import request from '@/utils/request'
import store from '../store/index'

export default {
    login (data) {
        return request({
            url: '/api/user/login',
            method: 'post',
            data
        })
    },
    register (data) {
        return request({
            url: '/api/user/register',
            method: 'post',
            data
        })
    },
}