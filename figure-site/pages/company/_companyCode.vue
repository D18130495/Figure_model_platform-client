<template>
  <!-- header -->
  <div class="nav-container page-component">
    <!-- left navigation bar -->
    <div class="nav left-nav">
      <div class="nav-item selected">
        <span class="v-link selected dark">Company Overview</span>
      </div>
      <div class="nav-item">
        <span class="v-link clickable dark">医院详情</span>
      </div>
      <div class="nav-item">
        <span class="v-link clickable dark">预约须知</span>
      </div>
      <div class="nav-item">
        <span class="v-link clickable dark">停诊信息</span>
      </div>
      <div class="nav-item">
        <span class="v-link clickable dark">查询/取消</span>
      </div>
    </div>
    <!-- ------------------------------------------------------- -->

    <!-- right content -->
    <div class="page-container">
      <div class="hospital-home">
        <div class="common-header">
          <div class="title-wrapper">
            <span class="hospital-title">{{ company.companyName }}</span>
          </div>
        </div>
        <div class="info-wrapper">
          <img class="hospital-img" :src="company.logoData"/>
          <div class="content-wrapper">
            <div>Order rule</div>
            <div class="line">
              <div>
                <span class="label">Order Start: </span>
                <span>{{ orderRule.releaseTime }}am</span>
              </div>
              <div class="space">
                <span class="label">Order Stop: </span>
                <span>{{ orderRule.stopTime }}pm</span>
              </div>
            </div>
            <div class="line">
              <span class="label">Delete order: </span>
              <span>{{ orderRule.rule }}</span>
            </div>
          </div>
        </div>
        <!-- ---------------------------------------------- -->

        <!-- Choose series -->
        <div class="title select-title">Choose category</div>
        <div class="select-dept-wrapper">
          <div class="department-wrapper">
            <div class="hospital-department">
              <div class="dept-list-wrapper el-scrollbar" style="height: 100%">
                <div class="dept-list el-scrollbar__wrap" style="margin-bottom: -17px; margin-right: -17px">
                  <div class="el-scrollbar__view">
                    <div
                      class="sub-item"
                      v-for="(item, index) in series"
                      :key="item.id"
                      :class="index == activeIndex ? 'selected' : ''"
                      @click="move(index, item.seriesCode)"
                    >
                      {{ item.seriesName }}
                    </div>
                  </div>
                </div>
                <div class="el-scrollbar__bar is-horizontal">
                  <div
                    class="el-scrollbar__thumb"
                    style="transform: translateX(0%)"
                  ></div>
                </div>
                <div class="el-scrollbar__bar is-vertical">
                  <div
                    class="el-scrollbar__thumb"
                    style="transform: translateY(0%); height: 91.4761%"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div class="sub-dept-container">
            <div
              v-for="(item, index) in series"
              :key="item.id"
              :class="index == 0 ? 'selected' : ''"
              class="sub-dept-wrapper"
              :id="item.seriesCode"
            >
              <div class="sub-title">
                <div class="block selected"></div>
                {{ item.seriesName }}
              </div>
              <div class="sub-item-wrapper">
                <div
                  v-for="it in item.children"
                  :key="it.id"
                  class="sub-item"
                  @click="schedule(it.seriesCode)"
                >
                  <span class="v-link clickable">{{ it.seriesName }} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- -------------------------------------------------------------- -->
  </div>
  <!-- footer -->
</template>

<script>
import "~/assets/css/hospital_personal.css";
import "~/assets/css/hospital.css";

import companypApi from "@/api/company";

export default {
  data() {
    return {
      companyCode: null,
      activeIndex: 0,
      company: [],
      orderRule: [],
      series: []
    };
  },
  created() {
    this.companyCode = this.$route.params.companyCode
    this.init()
    this.findSeriesByCompanyCode()
  },
  methods: {
    init() {
      companypApi.findCompanyByCompanyCode(this.companyCode)
        .then(respone => {
          this.company = respone.data.company
          this.orderRule = respone.data.bookingRule
          console.log(this.company)
        })
        .catch(error => {
          console.log(error)
        })  
    },
    findSeriesByCompanyCode() {
        companypApi.findSeriesByCompanyCode(this.companyCode)
          .then(respone => {
            this.series = respone.data
            console.log(this.series)
          })
          .catch(error => {
              console.log(error)
          })
    },
    move(index, seriesCode) {
        this.activeIndex = index
        document.getElementById(seriesCode).scrollIntoView()
    }
  }
};
</script>
