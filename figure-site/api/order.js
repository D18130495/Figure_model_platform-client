import request from '@/utils/request'

export default {
    saveOrders(scheduleId, peopleId) {
        return request({
            url: `/api/order/orderInfo/auth/submitOrder/${scheduleId}/${peopleId}`,
            method: 'post'
        })
    }
}