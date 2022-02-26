<template>
  <!-- header -->
  <div class="nav-container page-component">
    <!-- left menu #start -->
    <div class="nav left-nav">
      <div class="nav-item selected">
        <span
          class="v-link selected dark"
          :onclick="'javascript:window.location=\'/company/' + schedule.companyCode + '\''"
        >
          Company Overview
        </span>
      </div>
      <div class="nav-item">
        <span
          class="v-link clickable dark"
          :onclick="'javascript:window.location=\'/company/detail/' + schedule.companyCode + '\''"
        >
          Company detail
        </span>
      </div>
      <div class="nav-item">
        <span
          class="v-link clickable dark"
          :onclick="'javascript:window.location=\'/company/notice/' + schedule.companyCode +'\''"
        >
          Rule of order
        </span>
      </div>
      <div class="nav-item">
        <span class="v-link clickable dark"> 停诊信息 </span>
      </div>
      <div class="nav-item">
        <span class="v-link clickable dark"> 查询/取消 </span>
      </div>
    </div>
    <!-- 左侧导航 #end -->

    <!-- 右侧内容 #start -->
    <div class="page-container">
      <div class="hospital-order">
        <div class="header-wrapper">
          <div class="title mt20">Select delivery information</div>
          <div>
            <div class="sub-title">
              <div class="block"/>
              select delivery address: 
            </div>
            <div class="patient-wrapper">
              <div>
                <div class="v-card clickable item">
                  <div
                    class="inline"
                    v-for="(item, index) in peopleList"
                    :key="item.id"
                    @click="selectPeople(index)"
                    style="margin-right: 20px"
                  >
                    <div :class="activeIndex == index? 'item-wrapper selected' : 'item-wrapper'">
                      <div>
                        <div class="item-title">{{ item.name }}</div>
                        <div>{{ item.param.certificatesType }}</div>
                        <div style="padding-top: 7px">{{ item.certificatesNo }}</div>
                      </div>
                      <img class="checked" src="//img.114yygh.com/static/web/checked.png"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item space add-patient v-card clickable">
                <div class="">
                  <div class="item-add-wrapper" @click="addPeople()">
                    + Add delivery address
                  </div>
                </div>
              </div>
              <div class="el-loading-mask" style="display: none">
                <div class="el-loading-spinner">
                  <svg viewBox="25 25 50 50" class="circular">
                    <circle
                      cx="50"
                      cy="50"
                      r="20"
                      fill="none"
                      class="path"
                    ></circle>
                  </svg>
                </div>
              </div>
            </div>

            <div class="sub-title" v-if="peopleList.length > 0">
              <div class="block"/>
              Detail:
            </div>

            <el-card
              class="patient-card"
              shadow="always"
              v-if="peopleList.length > 0"
            >
              <div slot="header" class="clearfix">
                <div>
                  <span class="name">
                    Name: {{ people.name }}
                  </span>
                  <span>
                    Phone: {{ people.phone }}
                  </span>
                </div>
              </div>
              <div class="card SELF_PAY_CARD">
                <div class="info">
                  <span class="card-no">No: {{ people.certificatesNo }}</span>
                  <span class="card-view">{{ people.param.certificatesType }}</span>
                </div>
                <span class="operate"></span>
              </div>
              <div class="card">
                <div class="text bind-card">Address: {{ people.address }}</div>
              </div>
            </el-card>

            <div class="sub-title">
              <div class="block"/>
              pre-order information:
            </div>
            <div class="content-wrapper">
              <el-form ref="form">
                <el-form-item label="就诊日期：">
                  <div class="content">
                    <span
                      >{{ schedule.workDate }} {{ schedule.param.dayOfWeek }}
                      {{ schedule.workTime == 0 ? "上午" : "下午" }}</span
                    >
                  </div>
                </el-form-item>
                <el-form-item label="就诊医院：">
                  <div class="content">
                    <span>{{ schedule.param.hosname }} </span>
                  </div>
                </el-form-item>
                <el-form-item label="就诊科室：">
                  <div class="content">
                    <span>{{ schedule.param.depname }} </span>
                  </div>
                </el-form-item>
                <el-form-item label="医生姓名：">
                  <div class="content">
                    <span>{{ schedule.docname }} </span>
                  </div>
                </el-form-item>
                <el-form-item label="医生职称：">
                  <div class="content">
                    <span>{{ schedule.title }} </span>
                  </div>
                </el-form-item>
                <el-form-item label="医生专长：">
                  <div class="content">
                    <span>{{ schedule.skill }}</span>
                  </div>
                </el-form-item>
                <el-form-item label="医事服务费：">
                  <div class="content">
                    <div class="fee">{{ schedule.amount }}元</div>
                  </div>
                </el-form-item>
              </el-form>
            </div>

            <!-- 用户信息 #start-->
            <div>
              <div class="sub-title">
                <div class="block"></div>
                用户信息
              </div>
              <div class="content-wrapper">
                <el-form ref="form" :model="form">
                  <el-form-item class="form-item" label="就诊人手机号：">
                    {{ people.phone }}
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <!-- 用户信息 #end -->
            <div class="bottom-wrapper">
              <div class="button-wrapper">
                <div class="v-button" @click="submitOrder()">
                  {{ submitBnt }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧内容 #end -->
  </div>
  <!-- footer -->
</template>

<script>
import "~/assets/css/hospital_personal.css"
import "~/assets/css/hospital.css"

import companyApi from "@/api/company"
import peopleApi from "@/api/people"
// import orderApi from "@/api/orderInfo" 

export default {
  data() {
    return {
      scheduleId: null,
      schedule: {
        param: {},
      },
      peopleList: [],
      people: {},

      activeIndex: 0,
      submitBnt: "Confirm order",
    };
  },
  created() {
    this.scheduleId = this.$route.query.scheduleId
    this.init()
  },
  methods: {
    init() {
      this.getSchedule()
      this.findPatientList()
    },
    getSchedule() {
      companyApi.findscheduleByFigureScheduleId(this.scheduleId)
        .then(response => {
          this.schedule = response.data
        })
    },
    findPatientList() {
      peopleApi.findPeopleList()
        .then(response => {
          this.peopleList = response.data
          console.log(response.data)
          if (this.peopleList.length > 0) {
            this.people = this.peopleList[0]
          }
      })
    },
    selectPeople(index) {
      this.activeIndex = index
      this.people = this.peopleList[index]
    },
    //生成订单
    submitOrder() {
        // 防止重复提交
        if(this.submitBnt == '正在提交...') {
        this.$message.error('不能重复提交')
        return
        }
        this.submitBnt = '正在提交...'
        orderApi.saveOrders(this.scheduleId, this.patient.id).then(response => {
        let orderId = response.data
        window.location.href = '/order/show?orderId=' + orderId
        }).catch(e => {
        this.submitBnt = '确认挂号'
        })
    },
    addPeople() {
      console.log('1')
      window.location.href = "/people/add"
    }
  }
}

</script>

<style>
.hospital-order .header-wrapper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: block !important;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.hospital-order .sub-title {
  letter-spacing: 1px;
  color: #999;
  margin-top: 60px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.hospital-order .content-wrapper .content {
  color: #333;
}
.el-form-item {
  margin-bottom: 5px;
}
.hospital-order .content-wrapper {
  margin-left: 140px;
  margin-top: 20px;
}
</style>
