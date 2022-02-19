<template>
  <!-- header -->
  <div class="nav-container page-component">
    <!-- left menu #start -->
    <div class="nav left-nav">
      <div class="nav-item">
        <span
          class="v-link clickable dark"
          onclick="javascript:window.location='/user'"
        >
          Certification
        </span>
      </div>

      <div class="nav-item">
        <span
          class="v-link clickable dark"
          onclick="javascript:window.location='/order'"
        >
          挂号订单
        </span>
      </div>

      <div class="nav-item selected">
        <span
          class="v-link selected dark"
          onclick="javascript:window.location='/people'"
        >
          Delivery detail
        </span>
      </div>

      <div class="nav-item">
        <span class="v-link clickable dark"> 修改账号信息 </span>
      </div>
      <div class="nav-item">
        <span class="v-link clickable dark"> 意见反馈 </span>
      </div>
    </div>
    <!-- left menu #end -->

    <!-- right content #start -->
    <div class="page-container">
      <div class="personal-patient">
        <div class="header-wrapper">
          <div class="title">
            <el-button icon="el-icon-back" circle style="margin-right: 20px" :onclick="'javascript:window.location=\'/' + '\''"/>
            Delivery detail
          </div>
        </div>
        <div class="content-wrapper">
          <el-card
            class="patient-card"
            shadow="always"
            v-for="item in peopleList"
            :key="item.id"
          >
            <div slot="header" class="clearfix">
              <div>
                <span class="name">{{ item.name }}</span>
                <div class="detail" @click="show(item.id)">
                  More detail <span class="iconfont"></span>
                </div>
              </div>
            </div>
            <div class="card SELF_PAY_CARD">
              <div class="info">
                <span>{{ item.param.certificatesType }}:</span>
                <span class="card-no">{{ item.certificatesNo }}</span>
              </div>
              <span class="operate"></span>
            </div>
            <div class="card">
              <div class="text bind-card">{{ item.address }}</div>
            </div>
          </el-card>
          <div class="item-add-wrapper v-card clickable" @click="add()">
            <div class="">
              <div>+ Add delivery detail</div>
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
import "~/assets/css/hospital_personal.css";
import "~/assets/css/hospital.css";
import "~/assets/css/personal.css";

import peopleApi from "@/api/people";

export default {
  data() {
    return {
      peopleList: []
    };
  },
  created() {
    this.findPeopleList()
  },
  methods: {
    findPeopleList() {
      peopleApi.findPeopleList()
        .then(response => {
          this.peopleList = response.data
          console.log(this.peopleList)
      })
    },
    add() {
      window.location.href = "/people/add"
    },
    show(id) {
      window.location.href = "/people/show?id=" + id
    }
  }
};
</script>

<style>
.header-wrapper .title {
  font-size: 16px;
  margin-top: 0;
}
.content-wrapper {
  margin-left: 0;
}
.patient-card .el-card__header .detail {
  font-size: 14px;
}
</style>