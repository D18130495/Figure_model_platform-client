import request from '@/utils/request'

export default {
    login(userInfo) {
        return request({
            url: `/api/user/login`,
            method: 'post',
            data: userInfo
        })
    },
    saveUserAuth(userAuth) {
        return request({
            url: `/api/user/auth/userAuth`,
            method: 'post',
            data: userAuth
        })
    },
    getUserById() {
        return request({
            url: `/api/user/auth/getUserInfo`,
            method: 'get'
        })
    }
}