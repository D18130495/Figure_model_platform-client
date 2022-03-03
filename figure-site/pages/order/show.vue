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

    <!-- right menu #start -->
    <div class="page-container">
      <div class="order-detail">
        <div class="title">Order detail</div>
        <div class="status-bar">
          <div class="left-wrapper">
            <div class="status-wrapper BOOKING_SUCCESS">
              <span class="iconfont"></span>
              {{ orderInfo.param.orderStatusString }}
            </div>
          </div>
          <div class="right-wrapper">
            <img
              src="//img.114yygh.com/static/web/code_order_detail.png"
              class="code-img"
            />
            <div class="content-wrapper">
              <div>
                微信<span class="iconfont"></span>关注“北京114预约挂号”
              </div>
              <div class="watch-wrapper">快速挂号，轻松就医</div>
            </div>
          </div>
        </div>
        <div class="info-wrapper">
          <div class="title-wrapper">
            <div class="block"></div>
            <div>Order information</div>
          </div>
          <div class="info-form">
            <el-form ref="form" :model="form">
              <el-form-item label="Recipient name: ">
                <div class="content">
                  <span>{{ orderInfo.peopleName }}</span>
                </div>
              </el-form-item>
              <el-form-item label="Recipient address: ">
                <div class="content">
                  <span>{{ orderInfo.fetchAddress }} </span>
                </div>
              </el-form-item>
              
              <el-form-item label="Company name: ">
                <div class="content">
                  <span>{{ orderInfo.companyName }} </span>
                </div>
              </el-form-item>
              <el-form-item label="Figure series:">
                <div class="content">
                  <span>{{ orderInfo.seriesName }} </span>
                </div>
              </el-form-item>
              
              <el-form-item label="Paid fee: ">
                <div class="content">
                  <div class="fee">{{ orderInfo.amount }}</div>
                </div>
              </el-form-item>
              <el-form-item label="Order number: ">
                <div class="content">
                  <span>{{ orderInfo.outTradeNo }} </span>
                </div>
              </el-form-item>
              <el-form-item label="Order time: ">
                <div class="content">
                  <span>{{ orderInfo.createTime }}</span>
                </div>
              </el-form-item>
              <el-form-item label="Estimated arrival time: ">
                <div class="content">
                  <span>
                    {{ orderInfo.fetchTime }}
                    {{ orderInfo.reserveTime == 0 ? "AM" : "PM" }}
                  </span>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="rule-wrapper mt40">
          <div class="rule-title">注意事项</div>
          <div>
            1、请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；<br />
            <span style="color: red"
              >2、【取号】就诊当天需在{{
                orderInfo.fetchTime
              }}在医院取号，未取号视为爽约，该号不退不换；</span
            ><br />
            3、【退号】在{{ orderInfo.quitTime }}前可在线退号
            ，逾期将不可办理退号退费；<br />
            4、北京114预约挂号支持自费患者使用身份证预约, 同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号；<br />
            5、请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。
          </div>
        </div>
        <div
          class="bottom-wrapper mt60"
          v-if="orderInfo.orderStatus == 0 || orderInfo.orderStatus == 1"
        >
          <div class="button-wrapper" v-if="orderInfo.orderStatus != -1">
            <div class="v-button white" @click="cancelOrder()">Cancel order</div>
          </div>
          <div class="button-wrapper ml20" v-if="orderInfo.orderStatus == 0">
            <div class="v-button" @click="pay()">Purchase</div>
          </div>
        </div>
      </div>
    </div>
    <!-- right menu #end -->
  </div>
  <!-- footer -->
</template>
<script>
import "~/assets/css/hospital_personal.css";
import "~/assets/css/hospital.css";

import orderApi from "@/api/order"

export default {
  data() {
    return {
      orderId: null,
      orderInfo: {
        param: {},
      },
      dialogPayVisible: false,
      payObj: {},
      timer: null
    };
  },
  created() {
    this.orderId = this.$route.query.orderId
    this.init()
  },
  methods: {
    init() {
      orderApi.getOrderById(this.orderId)
        .then(response => {
          console.log(response.data)
          this.orderInfo = response.data
        })
    },
    queryPayStatus(orderId) {
      weixinApi.queryPayStatus(orderId)
        .then(response => {
          if (response.message == "purchasing...") {
            return
          }
          clearInterval(this.timer)
          window.location.reload()
      })
    },
    pay() {
      weixinApi.createNative(this.orderId)
        .then(response => {
          this.payObj = response.data
        if (this.payObj.codeUrl == "") {
          this.dialogPayVisible = false;
          this.$message.error("支付错误")
        } else {
          this.timer = setInterval(() => {
            this.queryPayStatus(this.orderId)
          }, 3000)
        }
      })
    },
    cancelOrder() {
      this.$confirm("Are you sure to Cancel this order?", "Inform", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          return orderApi.cancelOrder(this.orderId)
        })
        .then(response => {
          this.$message.success("Cancel order")
          window.location.href = '/order/show?orderId=' + this.orderId
        })
        .catch(() => {
          this.$message.info("Order canceled")
        })
    }
  },
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
.bottom-wrapper {
  width: 100%;
}
.button-wrapper {
  margin: 0;
}
.el-form-item {
  margin-bottom: 5px;
}
.bottom-wrapper .button-wrapper {
  margin-top: 0;
}
</style>
