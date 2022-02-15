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
      <!-- 搜索框 -->
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
      <!-- 右侧 -->
      <div class="right-wrapper">
        <span class="v-link clickable">帮助中心</span>
        <span v-if="name == ''" class="v-link clickable" id="loginDialog" @click="dialogUserFormVisible = true">登录/注册</span>
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
              <el-form>
                <el-form-item>
                  <el-input v-model="dialogAtrr.inputValue" :placeholder="dialogAtrr.placeholder" :maxlength="dialogAtrr.maxlength" class="input v-input">
                    <span slot="suffix" class="sendText v-link" v-if="dialogAtrr.second > 0"> 
                      {{ dialogAtrr.second }}s
                    </span>
                    <span slot="suffix" class="sendText v-link highlight clickable selected" v-if="dialogAtrr.second == 0" @click="getCodeFun()">
                      Send again
                    </span>
                  </el-input>
                </el-form-item>
              </el-form>
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
import companyApi from '@/api/company'

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
      dialogAtrr: defaultDialogAtrr
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
    }
  }
}
</script>

