import request from '@/utils/request'

export default {
    getDictListByDictCode(dictCode) {
        return request({
            url: `/admin/cmn/dict/getDictListByDictCode/${dictCode}`,
            method: 'get'
        })
    }
}