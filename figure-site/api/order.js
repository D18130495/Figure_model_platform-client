import request from '@/utils/request'

export default {
    saveOrders(scheduleId, peopleId) {
        return request({
            url: `/api/order/orderInfo/auth/submitOrder/${scheduleId}/${peopleId}`,
            method: 'post'
        })
    },
    getOrderById(orderId) {
        return request({
            url: `/api/order/orderInfo/auth/getOrderById/${orderId}`,
            method: 'get'
        })
    },
    cancelOrder(orderId) {
        return request({
            url: `/api/order/orderInfo/auth/deleteOrderById/${orderId}`,
            method: 'delete'
        })
    },
    purchaseOrder(orderId) {
        return request({
            url: `/api/order/orderInfo/auth/placeOrderById/${orderId}`,
            method: 'put'
        })
    },
    getOrderList(current, limit, searchObj) {
        return request({
            url: `/api/order/orderInfo/auth/${current}/${limit}`,
            method: 'get',
            params: searchObj
        })
    }
}