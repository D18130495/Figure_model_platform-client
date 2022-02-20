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
          <div class="title">Add receiver detail</div>
        </div>
        <div>
          <div class="sub-title">
            <div class="block"></div>
            Receiver detail
          </div>
          <div class="content-wrapper">
            <el-form
              :model="people"
              label-width="110px"
              label-position="left"
              ref="people"
              :rules="validateRules"
            >
              <el-form-item prop="name" label="Name:">
                <el-input
                  v-model="people.name"
                  placeholder="Please input full name"
                  class="input v-input"
                />
              </el-form-item>
              <el-form-item prop="certificatesType" label="Certificates:">
                <el-select
                  v-model="people.certificatesType"
                  placeholder="Please select certificates type"
                  class="v-select patient-select"
                >
                  <el-option
                    v-for="item in certificatesTypeList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="certificatesNo" label="Number:">
                <el-input
                  v-model="people.certificatesNo"
                  placeholder="Please input certificate No"
                  class="input v-input"
                  v-if="people.certificatesType == 0"
                  maxlength="9"
                />
                <el-input
                  v-model="people.certificatesNo"
                  placeholder="Please input passport"
                  class="input v-input"
                  v-if="people.certificatesType == 1"
                  maxlength="9"
                />
                 <el-input
                  v-model="people.certificatesNo"
                  placeholder="Please input PPSN"
                  class="input v-input"
                  v-if="people.certificatesType == 2"
                  maxlength="9"
                />
                 <el-input
                  v-model="people.certificatesNo"
                  placeholder="Please input GNIB"
                  class="input v-input"
                  v-if="people.certificatesType == 3"
                  maxlength="6"
                />
              </el-form-item>
              <el-form-item prop="sex" label="Sex:" style="padding-left: 10px">
                <el-radio-group v-model="people.sex">
                  <el-radio :label="1">Male</el-radio>
                  <el-radio :label="0">Female</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="birthdate" label="Birthday:">
                <el-date-picker
                  v-model="people.birthdate"
                  class="v-date-picker"
                  type="date"
                  placeholder="Select date"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item prop="phone" label="Phone:">
                <el-input
                  v-model="people.phone"
                  placeholder="Please input phone number"
                  maxlength="10"
                  class="input v-input"
                />
              </el-form-item>
              <el-form-item prop="address" label="Address:">
                <el-input
                  v-model="people.address"
                  placeholder="Plesae input address"
                  class="input v-input"
                />
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="bottom-wrapper">
          <div class="button-wrapper">
            <div class="v-button" @click="saveOrUpdate()">{{ submitBut }}</div>
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
import peopleApi from "@/api/people";

const defaultForm = {
  name: "",
  certificatesType: "",
  certificatesNo: "",
  sex: 1,
  status: 1,
  birthdate: "",
  phone: "",
  address: "",
  param: {}
}

export default {
  data() {
    return {
      people: defaultForm,
      certificatesTypeList: [],
      submitBut: "Save",
      validateRules: {
        name: [{ required: true, trigger: "blur", message: "Can not be empty" }],
        certificatesType: [
          { required: true, trigger: "blur", message: "Can not be empty" },
        ],
        certificatesNo: [
          { required: true, trigger: "blur", message: "Can not be empty" },
        ],
        birthdate: [{ required: true, trigger: "blur", message: "Can not be empty" }],
        phone: [{ required: true, trigger: "blur", message: "Can not be empty" }],
        addressSelected: [
          { required: true, trigger: "blur", message: "Can not be empty" },
        ],
        address: [{ required: true, trigger: "blur", message: "Can not be empty" }],
      }
    };
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if(this.$route.query.id) {
        const id = this.$route.query.id
        this.getPeopleById(id)
        this.submitBut = "Update"
      }else {
        this.people = { ...defaultForm }
      }
      this.getDict()
    },
    getPeopleById(id) {
      peopleApi.getPeopleById(id)
        .then(response => {
          this.people = response.data
        })
    },
    getDict() {
      dictApi.getDictListByDictCode("Certificates Type")
        .then((response) => {
          this.certificatesTypeList = response.data
        })
    },
    saveOrUpdate() {
      this.$refs.people.validate(valid => {
        if(valid) {
          if(!this.people.id) {
            this.saveData()
          }else {
            this.updateData()
          }
        }
      });
    },
    saveData() {
      if(this.submitBut == "Saving...") {
        this.$message.info("Repeat save")
        return
      }
      this.submitBut = "Saving..."
      peopleApi.savePeople(this.people)
        .then(response => {
          this.$message.success("Success")
          window.location.href = "/people"
        })
        .catch(error => {
          this.submitBut = "Save"
        })
    },
    updateData() {
      if (this.submitBut == "Updating...") {
        this.$message.info("Repeat update")
        return
      }
      this.submitBut = "Updating..."
      peopleApi.updatePeopleById(this.people)
        .then(response => {
          this.$message.success("Success")
          window.location.href = "/people"
        })
        .catch(error => {
          this.submitBut = "Update"
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
.sub-title {
  margin-top: 0;
}
.bottom-wrapper {
  padding: 0;
  margin: 0;
}
.bottom-wrapper .button-wrapper {
  margin-top: 0;
}
</style>