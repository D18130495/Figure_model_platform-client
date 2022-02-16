<template>
  <div class="header-container">
    <div class="wrapper">
      <!-- logo -->
      <div class="left-wrapper v-link selected">
        <img
          style="width: 50px"
          width="50"
          height="50"
          src="~assets/images/duoduochicken.jpg"
        />
        <span class="text">Figure pre-order platform</span>
      </div>
      <!-- search bar -->
      <div class="search-wrapper">
        <div class="hospital-search animation-show">
          <el-autocomplete
            class="search-input small"
            prefix-icon="el-icon-search"
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="Please insert company name"
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
      <!-- right -->
      <div class="right-wrapper">
        <span v-if="name == ''" class="v-link clickable" id="loginDialog" @click="dialogUserFormVisible = true">Login/Join</span>
        <!-- <el-dropdown v-if="name != ''" @command="loginMenu">
          <span class="el-dropdown-link">
            {{ name }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu class="user-name-wrapper" slot="dropdown">
            <el-dropdown-item command="/user">实名认证</el-dropdown-item>
            <el-dropdown-item command="/order">挂号订单</el-dropdown-item>
            <el-dropdown-item command="/patient">就诊人管理</el-dropdown-item>
            <el-dropdown-item command="/logout" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
      </div>

      <el-dialog
      v-if="dialogUserFormVisible"
      :visible.sync="dialogUserFormVisible"
      style="text-align: left"
      top="50px"
      :append-to-body="true"
      width="960px"
      @close="closeDialog()"
    >
      <div class="container">
        <!-- phone login #start -->
        <div class="operate-view" v-if="dialogAtrr.showLoginType === 'phone'">
          <div class="wrapper" style="width: 100%">
            <div class="mobile-wrapper" style="position: static; width: 70%">
              <span class="title">{{ dialogAtrr.labelTips }}</span>
                <el-input v-model="dialogAtrr.inputValue" :placeholder="dialogAtrr.placeholder" :maxlength="dialogAtrr.maxlength" @change="btnClick()" class="input v-input">
                  <span slot="suffix" class="sendText v-link" v-if="dialogAtrr.second > 0"> 
                    {{ dialogAtrr.second }}s
                  </span>
                  <span slot="suffix" class="sendText v-link highlight clickable selected" v-if="dialogAtrr.second == 0" @click="getCodeFun()">
                    Send again
                  </span>
                </el-input>
              <div class="send-button v-button" @click="btnClick()">
                {{ dialogAtrr.loginBtn }}
              </div>
            </div>
          </div>
        </div>
        <!-- phone login #end -->
      </div>
    </el-dialog>
    </div>
  </div>
</template>
<script>
import cookie from "js-cookie";

import companyApi from '@/api/company'
import msmApi from '@/api/msm'
import userInfoApi from '@/api/userInfo'

const defaultDialogAtrr = {
  showLoginType: 'phone',
  labelTips: "Phone number",
  inputValue: "",
  placeholder: "Please insert your phone number",
  maxlength: 11,
  loginBtn: "Get code",
  sending: true,
  second: -1,
  clearSmsTime: null,
}
export default {
  data() {
    return {
      state: '',
      searchObj: {},
      name: '',
      dialogUserFormVisible: false,
      dialogAtrr: defaultDialogAtrr,
      userInfo: {}
    }
  },
  created() {
  },
  methods: {
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
    btnClick() {
      if (this.dialogAtrr.loginBtn == "Get code") {
        this.userInfo.phone = this.dialogAtrr.inputValue;
        this.getCodeFun();
      } else {
        this.login();
      }
    },
    closeDialog() {
      if (this.clearSmsTime) {
        clearInterval(this.clearSmsTime);
      }
    },
    getCodeFun() {
       if (!/^0[34578]\d{8}$/.test(this.userInfo.phone)) {
        this.$message.error("Format incorrect");
        return;
      }

      this.dialogAtrr.inputValue = "";
      this.dialogAtrr.placeholder = "Please input the code";
      this.dialogAtrr.maxlength = 6;
      this.dialogAtrr.loginBtn = "Login";

      this.dialogAtrr.sending = false;
      msmApi.sendCode(this.userInfo.phone)
        .then(response => {
          this.timeDown();
        })
        .catch(error => {
          console.log(error)
          this.showLogin();
        });
    },
    timeDown() {
      if (this.clearSmsTime) {
        clearInterval(this.clearSmsTime);
      }
      this.dialogAtrr.second = 60;

      this.dialogAtrr.labelTips = "Code sent to " + this.userInfo.phone;
      this.clearSmsTime = setInterval(() => {
        --this.dialogAtrr.second;
        if (this.dialogAtrr.second < 1) {
          clearInterval(this.clearSmsTime);
          this.dialogAtrr.sending = true;
          this.dialogAtrr.second = 0;
        }
      }, 1000);
    },
    login() {
      this.userInfo.code = this.dialogAtrr.inputValue;

      if (this.dialogAtrr.loginBtn == "Login...") {
        this.$message.error("repeat submit");
        return;
      }
      if (this.userInfo.code == "") {
        this.$message.error("Please input the code");
        return;
      }
      if (this.userInfo.code.length != 6) {
        this.$message.error("Code format incorrect");
        return;
      }
      this.dialogAtrr.loginBtn = "Login...";
      userInfoApi.login(this.userInfo)
        .then(response => {
          console.log(response.data);
          // set cookie
          this.setCookies(response.data.name, response.data.token);
        })
        .catch(error => {
          this.dialogAtrr.loginBtn = "Login now";
        });
    },
    setCookies(name, token) {
      cookie.set("token", token, { domain: "localhost" });
      cookie.set("name", name, { domain: "localhost" });
      window.location.reload();
    }
  }
}
</script>

