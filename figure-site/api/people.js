import request from '@/utils/request'

export default {
    findPeopleList() {
        return request({
            url: `/api/user/people/auth/findAll`,
            method: 'get'
        })
    },
    getPeopleById(id) {
        return request({
            url: `/api/user/people/auth/get/${id}`,
            method: 'get'
        })
    },
    savePeople(people) {
        return request({
            url: `/api/user/people/auth/save`,
            method: 'post',
            data: people
        })
    },
    updatePeopleById(people) {
        return request({
            url: `/api/user/people/auth/update`,
            method: 'put',
            data: people
        })
    },
    removeById(id) {
        return request({
            url: `/api/user/people/auth/delete/${id}`,
            method: 'delete'
        })
    }
}