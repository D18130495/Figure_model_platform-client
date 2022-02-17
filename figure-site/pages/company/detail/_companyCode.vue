<template>
  <!-- header -->
  <div class="nav-container page-component">
    <!-- left navigation bar -->
    <div class="nav left-nav">
      <div class="nav-item">
        <span class="v-link clickable dark" :onclick="'javascript:window.location=\'/company/' + companyCode + '\''">Company Overview</span>
      </div>
      <div class="nav-item selected">
        <span class="v-link selected dark" :onclick="'javascript:window.location=\'/company/detail/' + companyCode + '\''">Company detail</span>
      </div>
      <div class="nav-item">
        <span class="v-link clickable dark" :onclick="'javascript:window.location=\'/company/notice/' + companyCode + '\''">Rule of order</span>
      </div>
      <div class="nav-item">
        <span class="v-link clickable dark">停诊信息</span>
      </div>
      <div class="nav-item">
        <span class="v-link clickable dark">查询/取消</span>
      </div>
    </div>
    <!-- -------------------------------------------------------------- -->

    <!-- right content -->
    <div class="page-container">
      <div class="hospital-detail">
        <div class="common-header">
          <div class="title-wrapper">
            <el-button icon="el-icon-back" circle style="margin-right: 20px" :onclick="'javascript:window.location=\'/' + '\''"></el-button>
            <span class="hospital-title"></span>
            <div class="icon-wrapper">
              <span class="iconfont"></span>
            </div>
          </div>
        </div>
        <div class="info-wrapper">
          <img :src="company.logoData" :alt="Company_logo" style="width: 80px; height: 80px"/>
          <div class="content-wrapper">
            <div>
              <div class="icon-text-wrapper">
                <span class="iconfont prefix-icon"></span>
                <span class="text"
                  ><p></p> </span
                ><span class="iconfont right-icon"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="title mt40">Company name</div>
        <div class="detail-content mt40">
          <p style="font-size: 15px">{{ company.companyName }}</p>
        </div>
        <div class="title mt40">Company address</div>
        <div class="detail-content mt40">
          <p style="font-size: 15px">{{ company.address }}</p>
        </div>
        <div class="title mt40">Company description</div>
        <div class="detail-content mt40">
          <p style="font-size: 15px">{{ company.intro }}</p>
        </div>
      </div>
    </div>
    <!-- ----------------------------------------------------------- -->
  </div>
  <!-- footer -->
</template>

<script>
import "~/assets/css/hospital_personal.css";
import "~/assets/css/hospital.css";

import companyApi from "@/api/company";
export default {
  data() {
    return {
      companyCode: 0,
      company: []
    };
  },
  created() {
    this.companyCode = this.$route.params.companyCode
    this.init()
  },
  methods: {
      init() {
          companyApi.findCompanyByCompanyCode(this.companyCode)
            .then(response => {
              this.company = response.data.company
              console.log(this.company)
            })
            .catch(error => {
                console.log(error)
            })
      }
  },
};
</script>

<style>
.hospital-detail .info-wrapper {
  width: 100%;
  padding-left: 0;
  padding-top: 0;
  margin-top: 0;
  flex-direction: inherit;
}

.hospital-detail .info-wrapper .text {
  font-size: 14px;
}

.hospital-detail .content-wrapper p {
  text-indent: 0;
}
</style>
