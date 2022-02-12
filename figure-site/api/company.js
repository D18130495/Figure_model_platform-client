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
    }
}