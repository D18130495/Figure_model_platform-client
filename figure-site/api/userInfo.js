import request from '@/utils/request'

export default {
    login(userInfo) {
        return request({
            url: `/api/user/login`,
            method: 'post',
            data: userInfo
        })
    }
}