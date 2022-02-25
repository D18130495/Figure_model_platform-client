<template>
  <!-- header -->
  <div class="nav-container page-component">
    <!-- left menu #start -->
    <div class="nav left-nav">
      <div class="nav-item selected">
        <span
          class="v-link selected dark"
          :onclick="'javascript:window.location=\'/company/' + '1000_4' + '\''"
        >
          Company Overview
        </span>
      </div>
      <div class="nav-item">
        <span
          class="v-link clickable dark"
          :onclick="'javascript:window.location=\'/company/detail/' + '1000_4' + '\''"
        >
          Company detail
        </span>
      </div>
      <div class="nav-item">
        <span
          class="v-link clickable dark"
          :onclick="'javascript:window.location=\'/company/notice/' + '1000_4' + '\''"
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
    <!-- left menu #end -->
    
    <!-- right content #start -->
    <div class="page-container">
      <div class="hospital-source-list">
        <div class="header-wrapper" style="justify-content: normal">
          <span class="v-link clickable" @click="show()">{{
            baseMap.hosname
          }}</span>
          <div class="split"></div>
          <div>{{ baseMap.bigname }}</div>
        </div>
        <div class="title mt20">{{ baseMap.depname }}</div>
        <!-- order date #start -->
        <div class="mt60">
          <div class="title-wrapper">{{ baseMap.workDateString }}</div>
          <div class="calendar-list-wrapper">
            <!-- item.depNumber == -1 ? 'gray space' : item.depNumber == 0 ? 'gray' : 'small small-space'-->
            <!-- selected , index == activeIndex ? 'selected' : ''-->
            <div
              :class="'calendar-item ' + item.curClass"
              style="width: 200px"
              v-for="(item, index) in bookingScheduleList"
              :key="item.id"
              @click="selectDate(item, index)"
            >
              <div class="date-wrapper" style="width: 165px">
                <span>{{ item.orderDate }}</span>
                <span class="week">{{ item.dayOfWeek }}</span>
              </div>
              <div class="status-wrapper" style="width: 165px" v-if="item.status == 0">
                {{
                  item.availableNumber == -1? "Unavailable" : item.availableNumber == 0? "Unavailable" : "Available"
                }}
              </div>
              <div class="status-wrapper" style="width: 165px" v-if="item.status == 1">Unavailable</div>
              <div class="status-wrapper" style="width: 165px" v-if="item.status == -1">Unavailable</div>
            </div>
          </div>
          <!-- pagnation -->
          <el-pagination
            class="pagination"
            layout="prev, pager, next"
            :current-page="current"
            :total="total"
            :page-size="limit"
            @current-change="getPage"
          >
          </el-pagination>
        </div>
        <!-- 即将放号 #start-->
        <div class="countdown-wrapper mt60" v-if="!tabShow">
          <div class="countdonw-title">
            {{ time }}<span class="v-link selected">{{ baseMap.releaseTime }} </span
            >放号
          </div>
          <div class="countdown-text">
            count down
            <div>
              <span class="number">{{ timeString }}</span>
            </div>
          </div>
        </div>
        <!-- 即将放号 #end-->
        <!-- pre-order list #end -->
        <!-- morning order #start -->
        <div class="mt60" v-if="tabShow">
          <div class="">
            <div class="list-title">
              <div class="block"></div>
              Morning
            </div>
            <div
              v-for="item in scheduleList" :key="item.id" v-if="item.orderTime == 0">
              <div class="list-item">
                <div class="item-wrapper">
                  <div class="title-wrapper">
                    <div class="title">{{ item.title }}</div>
                    <div class="split"></div>
                    <div class="name">{{ item.docname }}</div>
                  </div>
                  <div class="special-wrapper">{{ item.skill }}</div>
                </div>
                <div class="right-wrapper">
                  <div class="fee">￥{{ item.amount }}</div>
                  <div class="button-wrapper">
                    <div
                      class="v-button"
                      @click="booking(item.id, item.availableNumber)"
                      :style="
                        item.availableNumber == 0 || pageFirstStatus == -1
                          ? 'background-color: #7f828b;'
                          : ''
                      "
                    >
                      <span
                        >剩余<span class="number">{{
                          item.availableNumber
                        }}</span></span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 上午号源 #end -->
        <!-- 下午号源 #start -->
        <div class="mt60" v-if="tabShow">
          <div class="">
            <div class="list-title">
              <div class="block"></div>
              下午号源
            </div>
            <div
              v-for="item in scheduleList"
              :key="item.id"
              v-if="item.workTime == 1"
            >
              <div class="list-item">
                <div class="item-wrapper">
                  <div class="title-wrapper">
                    <div class="title">{{ item.title }}</div>
                    <div class="split"></div>
                    <div class="name">{{ item.docname }}</div>
                  </div>
                  <div class="special-wrapper">{{ item.skill }}</div>
                </div>
                <div class="right-wrapper">
                  <div class="fee">￥{{ item.amount }}</div>
                  <div class="button-wrapper">
                    <div
                      class="v-button"
                      @click="booking(item.id, item.availableNumber)"
                      :style="
                        item.availableNumber == 0 || pageFirstStatus == -1
                          ? 'background-color: #7f828b;'
                          : ''
                      "
                    >
                      <span
                        >剩余<span class="number">{{
                          item.availableNumber
                        }}</span></span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 下午号源 #end -->
      </div>
    </div>
    <!-- 右侧内容 #end -->
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
      hoscode: null,
      depcode: null,
      orderDate: null,
      bookingScheduleList: [],
      scheduleList: [],
      baseMap: {},
      nextWorkDate: null, // 下一页第一个日期
      preWorkDate: null, // 上一页第一个日期
      tabShow: true, //挂号列表与即将挂号切换
      activeIndex: 0,

      current: 1, // 当前页
      limit: 6, // 每页个数
      total: 1, // 总页码

      timeString: null,
      time: "Today",
      timer: null,

      pageFirstStatus: 0 // 第一页第一条数据状态
    };
  },
  created() {
    this.companyCode = this.$route.query.companyCode
    this.seriesCode = this.$route.query.seriesCode
    this.getBookingScheduleRule()
  },
  methods: {
    getPage(current = 1) {
      this.current = current
      this.orderDate = null
      this.activeIndex = 0
      this.getBookingScheduleRule()
    },
    getBookingScheduleRule() {
      companyApi.getBookingScheduleRule(this.current, this.limit, this.companyCode, this.seriesCode)
        .then((response) => {
          this.bookingScheduleList = response.data.bookingScheduleList
          this.total = response.data.total
          console.log(response.data.bookingScheduleList)
        // this.baseMap = response.data.baseMap;

          this.dealClass()

          // after pagination, select one
          if (this.orderDate == null) {
            this.orderDate = this.bookingScheduleList[0].orderDate
            this.bookingScheduleList[0].status == 1? this.tabShow = false : this.tabShow = true
          }
          //判断当天是否停止预约 status == -1 停止预约
          if (this.orderDate == this.getCurDate()) {
            this.pageFirstStatus = this.bookingScheduleList[0].status
          } else {
            this.pageFirstStatus = 0
          }
          this.findScheduleList()
        })
    },
    findScheduleList() {
      companyApi.findFigureList(this.companyCode, this.seriesCode, this.orderDate)
        .then((response) => {
          this.scheduleList = response.data
        })
    },
    selectDate(item, index) {
      this.orderDate = item.orderDate
      this.activeIndex = index

      //清理定时
    //   if (this.timer != null) clearInterval(this.timer)

      // 是否即将放号
      if (item.status == 1) {
        this.tabShow = false
        // 放号时间
        // let releaseTime = new Date(
        //   this.getCurDate() + " " + this.baseMap.releaseTime
        // ).getTime();
        // let nowTime = new Date().getTime();
        // this.countDown(releaseTime, nowTime);

        this.dealClass()
        this.getBookingScheduleRule()
      } else {
        this.tabShow = true

        this.getBookingScheduleRule()
      }
    },
    dealClass() {
      for (let i = 0; i < this.bookingScheduleList.length; i++) {
        // depNumber -1:无号 0：约满 >0：有号
        let curClass =
          this.bookingScheduleList[i].availableNumber == -1
            ? "gray space"
            : this.bookingScheduleList[i].availableNumber == 0
            ? "gray"
            : "small small-space"
        curClass += i == this.activeIndex ? " selected" : ""
        this.bookingScheduleList[i].curClass = curClass
      }
    },
    getCurDate() {
      let datetime = new Date()
      let year = datetime.getFullYear()
      let month = datetime.getMonth() + 1 < 10? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1
      let date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate()
      return year + "-" + month + "-" + date
    },

//     countDown(releaseTime, nowTime) {
//       //计算倒计时时长
//       let secondes = 0;
//       if (releaseTime > nowTime) {
//         this.time = "今天";
//         //当前时间到放号时间的时长
//         secondes = Math.floor((releaseTime - nowTime) / 1000);
//       } else {
//         this.time = "明天";
//         //计算明天放号时间
//         let releaseDate = new Date(releaseTime);
//         releaseTime = new Date(
//           releaseDate.setDate(releaseDate.getDate() + 1)
//         ).getTime();
//         //当前时间到明天放号时间的时长
//         secondes = Math.floor((releaseTime - nowTime) / 1000);
//       }

//       //定时任务
//       this.timer = setInterval(() => {
//         secondes = secondes - 1;
//         if (secondes <= 0) {
//           clearInterval(timer);
//           this.init();
//         }
//         this.timeString = this.convertTimeString(secondes);
//       }, 1000);
//       // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
//       this.$once("hook:beforeDestroy", () => {
//         clearInterval(timer);
//       });
//     },

//     convertTimeString(allseconds) {
//       if (allseconds <= 0) return "00:00:00";
//       // 计算天数
//       let days = Math.floor(allseconds / (60 * 60 * 24));
//       // 小时
//       let hours = Math.floor((allseconds - days * 60 * 60 * 24) / (60 * 60));
//       // 分钟
//       let minutes = Math.floor(
//         (allseconds - days * 60 * 60 * 24 - hours * 60 * 60) / 60
//       );
//       // 秒
//       let seconds =
//         allseconds - days * 60 * 60 * 24 - hours * 60 * 60 - minutes * 60;

//       //拼接时间
//       let timString = "";
//       if (days > 0) {
//         timString = days + "天:";
//       }
//       return (timString +=
//         hours + " 时 " + minutes + " 分 " + seconds + " 秒 ");
//     },

//     show() {
//       window.location.href = "/hosp/" + this.hoscode;
//     },

//     booking(scheduleId, availableNumber) {
//       debugger;
//       if (availableNumber == 0 || this.pageFirstStatus == -1) {
//         this.$message.error("不能预约");
//       } else {
//         window.location.href = "/hosp/booking?scheduleId=" + scheduleId;
//       }
//     },
  }
};
</script>
