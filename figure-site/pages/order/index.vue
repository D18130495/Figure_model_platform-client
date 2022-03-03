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
      <div class="nav-item selected">
        <span
          class="v-link selected dark"
          onclick="javascript:window.location='/order'"
        >
          Order
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
        <span class="v-link clickable dark">Suggestion</span>
      </div>
    </div>
    <!-- left menu #end -->

    <!-- right content #start -->
    <div class="page-container">
      <div class="personal-order">
        <div class="title">
          <el-button icon="el-icon-back" circle style="margin-right: 20px" :onclick="'javascript:window.location=\'/' + '\''"/>
          Order history
        </div>
        <el-form :inline="true">
          <el-form-item label="Recipient: ">
            <el-select
              v-model="searchObj.peopleName"
              placeholder="Please select recipient"
              class="v-select patient-select"
            >
              <el-option
                v-for="item in peopleList"
                :key="item.name"
                :label="item.name + '【' + item.certificatesNo + '】'"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="text"
              class="search-button v-link highlight clickable selected"
              @click="getOrderList()"
            >
              Search
            </el-button>
          </el-form-item>
        </el-form>
        <div class="table-wrapper table">
          <el-table :data="list" stripe style="width: 100%">
            <el-table-column label="Order Time" width="160" align="center">
              <template slot-scope="scope">
                {{ scope.row.createTime }}
              </template>
            </el-table-column>
            <el-table-column prop="peopleName" label="Recipient" align="center">
            </el-table-column>
            <el-table-column prop="param.figureName" label="Figure Name" align="center" width="250">
            </el-table-column>
            <el-table-column prop="companyName" label="Comapny" align="center">
            </el-table-column>
            <el-table-column prop="seriesName" label="Series" align="center"> </el-table-column>
            <el-table-column prop="amount" label="Paid" align="center">
            </el-table-column>
            <el-table-column label="Order status" align="center" width="120">
              <template slot-scope="scope">
                {{ scope.row.orderStatus == 0? "Unpaid" : 
                scope.row.orderStatus == 1? "Paid" : "Cancelled"}}
              </template>
            </el-table-column>
            <el-table-column label="Operation" align="center">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  class="v-link highlight clickable selected"
                  @click="show(scope.row.id)"
                >
                  Detail
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- pagenation -->
        <el-pagination
          class="pagination"
          layout="prev, pager, next"
          :current-page="current"
          :total="total"
          :page-size="limit"
          @current-change="getOrderList"
        >
        </el-pagination>
      </div>
    </div>
    <!-- right content #end -->
  </div>
  <!-- footer -->
</template>
<script>

import "~/assets/css/hospital_personal.css"
import "~/assets/css/hospital.css"

import orderApi from "@/api/order"
import peopleApi from "@/api/people"

export default {
  data() {
    return {
      list: [],
      total: 0,
      current: 1,
      limit: 5,
      searchObj: {},
      peopleList: [],
      statusList: []
    };
  },
  created() {
    this.orderId = this.$route.query.orderId
    this.getOrderList()
    this.findPeopleList()
  },
  methods: {
    getOrderList(current = 1) {
      this.current = current
      orderApi.getOrderList(this.current, this.limit, this.searchObj)
        .then((response) => {
          console.log(response.data)
          this.list = response.data.records
          this.total = response.data.total
        })
    },
    findPeopleList() {
      peopleApi.findPeopleList()
        .then((response) => {
          this.peopleList.push({"name":"", "certificatesNo":"All"})
          for(var i = 0; i < response.data.length; i++) {
            this.peopleList.push(response.data[i])
          }
        })
    },
    show(id) {
      window.location.href = "/order/show?orderId=" + id
    }
  }
};
</script>