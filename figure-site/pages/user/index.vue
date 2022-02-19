<template>
  <!-- header -->
  <div class="nav-container page-component">
    <!-- left menu #start -->
    <div class="nav left-nav">
      <div class="nav-item selected">
        <span
          class="v-link selected dark"
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

      <div class="nav-item">
        <span
          class="v-link clickable dark"
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
      <div>
        <div class="title">
          <el-button icon="el-icon-back" circle style="margin-right: 20px" :onclick="'javascript:window.location=\'/' + '\''"/>
          Certification
        </div>
        <div class="status-bar">
          <div class="status-wrapper">
            <span class="iconfont"></span>{{ userInfo.param.authStatusString }}
          </div>
        </div>
        <div class="tips">
          <span class="iconfont"></span>
          完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。
        </div>
        <div class="form-wrapper" v-if="userInfo.authStatus == 0">
          <div>
            <el-form
              :model="userAuah"
              label-width="110px"
              label-position="left"
            >
              <el-form-item prop="name" label="Name: " class="form-normal">
                <div class="name-input">
                  <el-input
                    v-model="userAuah.name"
                    placeholder="Please input the full name"
                    class="input v-input"
                  />
                </div>
              </el-form-item>
              <el-form-item prop="certificatesType" label="Certificates:">
                <el-select
                  v-model="userAuah.certificatesType"
                  placeholder="Please select certificates Type"
                  class="v-select patient-select"
                >
                  <el-option
                    v-for="item in certificatesTypeList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="certificatesNo" label="Number:">
                <el-input
                  v-model="userAuah.certificatesNo"
                  placeholder="Please input certificates number"
                  class="input v-input"
                />
              </el-form-item>
            </el-form>
            <div class="bottom-wrapper">
              <div class="button-wrapper">
                <div class="v-button" @click="saveUserAuah()">
                  {{ submitBnt }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <span v-if="userInfo.authStatus == 1" style="font-size: 20px; margin-left: 400px">Certification in process</span>
        <div class="context-container" v-if="userInfo.authStatus != 0">
          <div>
            <el-form
              :model="formData"
              label-width="110px"
              label-position="right"
              style="padding-bottom: 20px"
            >
              <el-form-item prop="name" label="Name: " class="form-normal">
                <div class="name-input">
                  {{ userInfo.name }}
                </div>
              </el-form-item>
              <el-form-item prop="name" label="Certificates: ">
                {{ userInfo.certificatesType }}
              </el-form-item>
              <el-form-item prop="name" label="Number: ">
                {{ userInfo.certificatesNo }}
              </el-form-item>
            </el-form>
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

import dictApi from "@/api/dict";
import userInfoApi from "@/api/userInfo";

const defaultForm = {
  name: "",
  certificatesType: "",
  certificatesNo: ""
};

export default {
  data() {
    return {
      userAuah: defaultForm,
      certificatesTypeList: [],
      userInfo: {
        param: {},
      },
      submitBnt: "Submit"
    };
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getUserInfo()
      this.getDict()
    },
    getUserInfo() {
      userInfoApi.getUserById()
        .then(response => {
        this.userInfo = response.data
      });
    },
    saveUserAuah() {
      if (this.submitBnt == "Uploading...") {
        this.$message.info("Repeat submit")
        return;
      }
      this.submitBnt = "Uploading...";
      userInfoApi.saveUserAuth(this.userAuah)
        .then(response => {
          this.$message.success("Successfully uploaded")
          window.location.reload()
        })
        .catch(error => {
          this.submitBnt = "Submit";
        });
    },
    getDict() {
      dictApi.getDictListByDictCode("Certificates Type")
        .then(response => {
        this.certificatesTypeList = response.data
        console.log(this.certificatesTypeList)
      })
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
.page-container .title {
  letter-spacing: 1px;
  font-weight: 700;
  color: #333;
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 20px;
}
.page-container .tips {
  width: 100%;
  padding-left: 0;
}
.page-container .form-wrapper {
  padding-left: 92px;
  width: 580px;
}
.form-normal {
  height: 40px;
}
.bottom-wrapper {
  width: 100%;
  padding: 0;
  margin-top: 0;
}
</style>
