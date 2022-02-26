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
              select delivery address
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
              Detail
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
              pre-order information
            </div>
            <div class="content-wrapper">
              <el-form ref="form">
                <el-form-item label="Figure name: ">
                  <div class="content">
                    <span>{{ schedule.figureName }} </span>
                  </div>
                </el-form-item>
                <el-form-item label="Figure description: ">
                  <div class="content">
                    <span>{{ schedule.desc }} </span>
                  </div>
                </el-form-item>
                <el-form-item label="Pre-order time: ">
                  <div class="content">
                    <span>
                      {{ schedule.orderDate }}
                    </span>
                  </div>
                </el-form-item>
                <el-form-item label="Available Number: ">
                  <div class="content">
                    <span>{{ schedule.availableNumber }} </span>
                  </div>
                </el-form-item>
                <el-form-item label="Reserved Number: ">
                  <div class="content">
                    <span>{{ schedule.reservedNumber }} </span>
                  </div>
                </el-form-item>
                <el-form-item label="Pre-order fee: ">
                  <div class="content">
                    <span>{{ schedule.preorderFee }} </span>
                  </div>
                </el-form-item>
              </el-form>
            </div>

            <!-- User information #start-->
            <div>
              <div class="sub-title">
                <div class="block"></div>
                Delivery information
              </div>
              <div class="content-wrapper">
                <el-form ref="form" :model="form">
                  <el-form-item label="Receiver name: ">
                    <div class="content">
                      {{ people.name }}
                    </div>
                  </el-form-item>
                  <el-form-item label="Delivery address: ">
                    <div class="content">
                      {{ people.address }}
                    </div>
                  </el-form-item>
                  <el-form-item label="Receiver phone: ">
                    <div class="content">
                      {{ people.phone }}
                    </div>
                  </el-form-item>
                  <el-form-item label="Receiver birthday: ">
                    <div class="content">
                      {{ people.birthdate }}
                    </div>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <!-- User information #end -->
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
    <!-- right content #end -->
  </div>
  <!-- footer -->
</template>

<script>
import "~/assets/css/hospital_personal.css"
import "~/assets/css/hospital.css"

import companyApi from "@/api/company"
import peopleApi from "@/api/people"
import orderApi from "@/api/order" 

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
          console.log(this.schedule)
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
    submitOrder() {
        if(this.submitBnt == 'Submitting...') {
          this.$message.error('Can not repeat submit')
          return
        }

        this.submitBnt = 'Submitting...'

        orderApi.saveOrders(this.scheduleId, this.people.id)
          .then(response => {
            let orderId = response.data.id
            window.location.href = '/order/show?orderId=' + orderId
            console.log(orderId)
          }).catch(error => {
            this.submitBnt = 'Confirm order'
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
