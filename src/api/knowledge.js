import fetch from '@/utils/fetch'
import store from '../store/index'

export default {
    // 添加知识点
    addKnowledge(data) {
        return fetch({
            url: '/api/knowledge/createOne',
            method: 'post',
            data
        })
    },

    // 删除知识点
    addKnowledge(data) {
        return fetch({
            url: '/api/knowledge/delOne',
            method: 'post',
            data
        })
    },

    // 分页查询知识点
    queryKnowledge(data) {
        return fetch({
            url: '/api/knowledge/queryByPage',
            method: 'post',
            data
        })
    },

    // 更新知识点
    updateKnowledge(data) {
        return fetch({
            url: '/api/knowledge/updateOne',
            method: 'post',
            data
        })
    }
}

