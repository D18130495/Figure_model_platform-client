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
          order
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
        <div class="title" style="margin-top: 0px; font-size: 16px">
          Receiver detail
        </div>
        <div>
          <div class="sub-title">
            <div class="block"></div>
            Detail
          </div>
          <div class="content-wrapper">
            <el-form :model="people" label-width="110px" label-position="left">
              <el-form-item label="Name:">
                <div class="">
                  <span>{{ people.name }}</span>
                </div>
              </el-form-item>
              <el-form-item label="Certificates">
                <div class="">
                  <span>{{ people.param.certificatesType }}</span>
                </div>
              </el-form-item>
              <el-form-item label="Number:">
                <div class="">
                  <span>{{ people.certificatesNo }} </span>
                </div>
              </el-form-item>
              <el-form-item label="Sex: ">
                <div class="">
                  <span>{{ people.sex == 1 ? "Male" : "Female" }} </span>
                </div>
              </el-form-item>
              <el-form-item label="Birthday:">
                <div class="">
                  <span>{{ people.birthdate }} </span>
                </div>
              </el-form-item>
              <el-form-item label="Phone:">
                <div class="">
                  <span>{{ people.phone }} </span>
                </div>
              </el-form-item>
              <el-form-item label="Address:">
                <div class="">
                  <span>{{ people.address }} </span>
                </div>
              </el-form-item>
              <br />
              <el-form-item>
                <el-button class="v-button" type="primary" @click="remove()">
                  Delete
                </el-button>
                <el-button class="v-button" type="primary white" @click="update()">
                  Update
                </el-button>
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

import peopleApi from "@/api/people";

export default {
  data() {
    return {
      people: {
        param: {},
      },
    };
  },
  created() {
    this.getPeopleById()
  },
  methods: {
    getPeopleById() {
      peopleApi.getPeopleById(this.$route.query.id)
        .then(response => {
          this.people = response.data
        })
    },
    remove() {
      peopleApi.removeById(this.people.id)
        .then(response => {
          this.$message.success("Successfully delete")
          window.location.href = "/people"
      })
    },
    update() {
      window.location.href = "/people/add?id=" + this.people.id
    }
  }
};
</script>

<style>
.info-wrapper {
  padding-left: 0;
  padding-top: 0;
}
.content-wrapper {
  color: #333;
  font-size: 14px;
  padding-bottom: 0;
}
.el-form-item {
  margin-bottom: 5px;
}
.bottom-wrapper {
  width: 100%;
}
.button-wrapper {
  margin: 0;
}
.bottom-wrapper .button-wrapper {
  margin-top: 0;
}
</style>