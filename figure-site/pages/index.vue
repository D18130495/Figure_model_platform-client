<template>
  <div class="home page-component">
    <el-carousel>
      <el-carousel-item>
        <img src="~assets/images/banner.jpg" alt="banner" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="~assets/images/banner1.jpg" alt="banner1" />
      </el-carousel-item>
    </el-carousel>
    <!-- Search -->
    <div class="search-container">
      <div class="search-wrapper">
        <div class="hospital-search">
          <el-autocomplete
            class="search-input"
            prefix-icon="el-icon-search"
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="Please insert company"
            @select="handleSelect"
          >
            <span
              slot="suffix"
              class="search-btn v-link highlight clickable selected"
              >Search
            </span>
          </el-autocomplete>
        </div>
      </div>
    </div>
    <!-- bottom -->
    <div class="bottom">
      <div class="left">
        <div class="home-filter-wrapper">
          <div class="title">Company</div>
          <div>
            <div class="filter-wrapper">
              <span style="padding-bottom: 5px;">Company type:</span>
              <div class="condition-wrapper">
                <span 
                  class="item v-link clickable"
                  :class="companytypeActiveIndex == index ? 'selected' : ''"
                  v-for="(item, index) in companyTypeList"
                  :key="item.id"
                  @click="companyTypeSelect(item.value, index)"
                  >{{ item.name }}</span
                >

              </div>
            </div>
            <div class="filter-wrapper">
              <span style="padding-bottom: 5px;">Country:</span>
              <div class="condition-wrapper">
               <span 
                  class="item v-link clickable"
                  :class="countryActiveIndex == index ? 'selected' : ''"
                  v-for="(item, index) in countryList"
                  :key="item.id"
                  @click="countrySelect(item.id, index)"
                  >{{ item.name }}</span
                >
              </div>
            </div>
          </div>
        </div>
        
        <div class="v-scroll-list hospital-list">
          <div v-for="(item, index) in list" :key="index" class="v-card clickable list-item" @click="show(item.companyCode)">
            <div class="">
              <div class="hospital-list-item hos-item" index="0">
                <div class="wrapper">
                  <div class="hospital-title">{{ item.companyName }}</div>
                  <div class="bottom-container">
                    <div class="icon-wrapper">
                      {{ item.param.country }}
                    </div>
                    <div class="icon-wrapper">
                      {{ item.param.city }}
                    </div>
                  </div>
                </div>
                <img :src="item.logoData" :alt="item.companyName" class="hospital-img"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="common-dept">
          <div class="header-wrapper">
            <div class="title">常见科室</div>
            <div class="all-wrapper">
              <span>全部</span>
              <span class="iconfont icon"></span>
            </div>
          </div>
          <div class="content-wrapper">
            <span class="item v-link clickable dark">神经内科 </span>
            <span class="item v-link clickable dark">消化内科 </span>
            <span class="item v-link clickable dark">呼吸内科 </span>
            <span class="item v-link clickable dark">内科 </span>
            <span class="item v-link clickable dark">神经外科 </span>
            <span class="item v-link clickable dark">妇科 </span>
            <span class="item v-link clickable dark"> 产科 </span>
            <span class="item v-link clickable dark">儿科 </span>
          </div>
        </div>
        <div class="space">
          <div class="header-wrapper">
            <div class="title-wrapper">
              <div class="icon-wrapper">
                <span class="iconfont title-icon"></span>
              </div>
              <span class="title">平台公告</span>
            </div>
            <div class="all-wrapper">
              <span>全部</span>
              <span class="iconfont icon"></span>
            </div>
          </div>
          <div class="content-wrapper">
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice v-link clickable dark"
                >关于延长北京大学国际医院放假的通知
              </span>
            </div>
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice v-link clickable dark"
                >北京中医药大学东方医院部分科室医生门诊医
              </span>
            </div>
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice v-link clickable dark">
                武警总医院号源暂停更新通知
              </span>
            </div>
          </div>
        </div>
        <div class="suspend-notice-list space">
          <div class="header-wrapper">
            <div class="title-wrapper">
              <div class="icon-wrapper">
                <span class="iconfont title-icon"></span>
              </div>
              <span class="title">停诊公告</span>
            </div>
            <div class="all-wrapper">
              <span>全部</span>
              <span class="iconfont icon"></span>
            </div>
          </div>
          <div class="content-wrapper">
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice v-link clickable dark">
                中国人民解放军总医院第六医学中心(原海军总医院)呼吸内科门诊停诊公告
              </span>
            </div>
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice v-link clickable dark">
                首都医科大学附属北京潞河医院老年医学科门诊停诊公告
              </span>
            </div>
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice v-link clickable dark"
                >中日友好医院中西医结合心内科门诊停诊公告
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dictApi from '@/api/dict'
import companyApi from '@/api/company'
export default {
  asyncData({ params, error }) {
    return companyApi.getPaginationCompanySet(0, 4, null)
      .then(respone => {
        return {
          list: respone.data.content,
          imagesList: []
        }
      })
  },
  data() {
    return {
      state: '',
      queryCompanyName: [],
      searchObj: {},
      current: 0,
      limit: 4,
      list: [],
      companyTypeList: [],
      countryList: [],
      countryActiveIndex: 0,
      companytypeActiveIndex: 0
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      dictApi. getDictListByDictCode("Company Type")
        .then(respone => {
          this.companyTypeList = []
          this.companyTypeList.push({"name":"All", "value":""})
          for(var i = 0; i < respone.data.length; i++) {
            this.companyTypeList.push(respone.data[i])
          }
        })
        .catch(error => {
          console.log(error)
        })
      dictApi.getDictListByDictCode("Country")
      .then(respone => {
          this.countryList = []
          this.countryList.push({"name":"All", "value":""})
          for(var i = 0; i < respone.data.length; i++) {
            this.countryList.push(respone.data[i])
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getList() {
      companyApi.getPaginationCompanySet(this.current, this.limit, this.searchObj)
        .then(respone => {
          this.list = respone.data.content
        })
    },
    companyTypeSelect(companyType, index) {
      this.list = []
      this.searchObj = {}
      this.current = 0
      this.companytypeActiveIndex = index
      this.searchObj.companyType = companyType
      this.getList()
    },
    countrySelect(countryCode, index) {
      this.list = []
      this.searchObj = {}
      this.current = 0
      this.countryActiveIndex = index
      this.searchObj.countryCode = countryCode
      this.getList()
    },
    querySearchAsync(queryString, callback) {
      this.searchObj = {}
      if(queryString == '') return
      companyApi.findCompanyByName(queryString)
        .then(respone => {
          for(var i = 0; i < respone.data.length; i++) {
            respone.data[i].value = respone.data[i].companyName
          }
          callback(respone.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleSelect(item) {
      window.location.href = '/company/' + item.companyCode
    },
    show(companyCode) {
      window.location.href = '/company/' + companyCode
    }
  }
}
</script>