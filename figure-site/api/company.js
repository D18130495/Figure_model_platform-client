import request from '@/utils/request'

export default {
    getPaginationCompanySet(current, limit, searchObj) {
        return request({
            url: `/admin/comp/company/list/${current}/${limit}`,
            method: 'get',
            params: searchObj
        })
    },
    findCompanyByName(companyName) {
        return request({
            url: `/admin/comp/company/findCompanyByName/${companyName}`,
            method: 'get'
        })
    },
    findCompanyByCompanyCode(companyCode) {
        return request({
            url: `/admin/comp/company/showCompanyDetailByCompanyCode/${companyCode}`,
            method: 'get'
        })
    },
    findSeriesByCompanyCode(companyCode) {
        return request({
            url: `/admin/comp/series/getSeries/${companyCode}`,
            method: 'get'
        })
    },
    getBookingScheduleRule(current, limit, companyCode, series) {
        return request({
            url: `/admin/comp/schedule/auth/getScheduleRule/${current}/${limit}/${companyCode}/${seriesCode}`,
            method: 'get'
        })
    },
    findFigureList(companyCode, seriesCode, orderDate) {
        return request({
            url: `/admin/comp/schedule/getFigureDetails/${companyCode}/${seriesCode}/${orderDate}`,
            method: 'get'
        })
    }
}