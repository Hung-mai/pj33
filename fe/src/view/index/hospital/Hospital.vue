<template>
  <div class="m-content">
    <!-----------  Content Menu Tab Start   ------------>
    <div class="content-heading">Quản lý bệnh viện</div>

    <!----------------   Panel Body Start   --------------->
    <div class="content-body">
      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            class="nav-link active"
            data-bs-toggle="tab"
            data-bs-target="#nav-hospitallist"
            type="button"
            role="tab"
            @click="tableShow = true"
          >
            Danh sách bệnh viện
          </button>
          <button
            class="nav-link"
            id="nav-addhospital-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-addhospital"
            type="button"
            role="tab"
            @click="tableShow = false"
          >
            Thêm bệnh viện
          </button>
        </div>
      </nav>

      <div class="tab-content">
        <!----------------   Display Department Data List start   --------------->

        <div
          id="nav-hospitallist"
          class="tab-pane fade show active staff-list"
          v-show="tableShow"
        >
          <div class="search-bar">
            <div class="searchbox">
              <input type="search" class="m-input m-input-search" />
              <div class="mi mi-16 mi-search m-input-icon"></div>
            </div>
          </div>
          <div class="grid-table">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Mã bệnh viện</th>
                  <th>Tên bệnh viện</th>
                  <th>Số phòng</th>
                  <th>Địa chỉ</th>
                  <th>Chức năng</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="hospital in hospitalList" :key="hospital.hospitalId">
                  <td>{{ hospital.hospitalId }}</td>
                  <td>{{ hospital.name }}</td>
                  <td>{{ hospital.rooms }}</td>
                  <td>{{ hospital.address }}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary btn-i btn-i-update me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#myHospitalModal"
                      @click="
                        selectedHospitalId = hospital.hospitalId;
                        hospitalInfoPopupShow = true;
                      "
                    ></button>
                    <button
                      class="btn btn-danger btn-i btn-i-delete"
                      @click="deleteHospital(hospital.hospitalId)"
                    ></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!----------------   Display Department Data List ends   --------------->

        <!----------------   Add Department Start   --------------->
        <div id="nav-addhospital" class="tab-pane fade" v-show="!tableShow">
          <div class="panel panel-default tab-pane-content">
            <div class="panel-body">
              <div class="form-horizontal">
                <div class="form-body w-50">
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label
                      for="inpHospitalName"
                      class="m-label m-col m-col-3 m-auto"
                      >Hospital Name:
                    </label>
                    <input
                      v-model="hospitalInfo.name"
                      type="text"
                      class="m-input m-col-9 m-col"
                    />
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpAddress" class="m-label m-col m-col-3 m-auto"
                      >Address:
                    </label>
                    <input
                      v-model="hospitalInfo.address"
                      type="text"
                      name="hospitalName"
                      class="m-input m-col-9 m-col"
                    />
                  </div>
                  <span class="m-label-error" v-show="errorMessage != ''">{{
                    errorMessage
                  }}</span>
                  <span class="m-label-success" v-show="successMessage != ''">{{
                    successMessage
                  }}</span>
                </div>
                <div class="form-group">
                  <div class="col-sm-offset-4 col-sm-10">
                    <button
                      class="btn btn-primary"
                      @click="
                        $event.preventDefault();
                        addHospital();
                      "
                    >
                      Add Hospital
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!----------------   Add Department Ends   --------------->
      </div>

      <!------ Edit Department Modal Start ---------->
    </div>
    <!-----------  Content Menu Tab Ends   ------------>
    <hospital-info-popup
      :show="hospitalInfoPopupShow"
      :selectedHospitalId="selectedHospitalId"
      @popup-close="
        selectedHospitalId = '';
        hospitalInfoPopupShow = false;
      "
    ></hospital-info-popup>
    <!----------------   Modal ends here  --------------->
  </div>
</template>

<script>
import { store } from "../../../script/store";
import HospitalInfoPopup from "./HospitalInfoPopup.vue";

export default {
  components: { HospitalInfoPopup },
  name: "Hospital",
  props: ["user"],
  component: {
    HospitalInfoPopup,
  },
  data() {
    return {
      tableShow: true,
      hospitalInfo: {
        name: "",
        address: "",
      },
      errorMessage: "",
      successMessage: "",
      hospitalList: [],
      selectedHospitalId: "",
      hospitalInfoPopupShow: false,
    };
  },
  methods: {
    async addHospital() {
      store.action.showLoading();
      this.successMessage = "";
      this.errorMessage = "";
      const response = await fetch(`http://localhost:3000/api/hospital`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.hospitalInfo),
      });
      if (response.status > 300) {
        this.errorMessage = await response.text();
      } else {
        this.hospitalInfo = {};
        await this.getHospitalList();
        this.successMessage = await response.text();
      }
      store.action.hideLoading();
    },
    async getHospitalList() {
      this.hospitalList = await this.$store.action.getHospitalList();
    },
    async deleteHospital(id) {
      store.action.showLoading();
      let response = await fetch(`http://localhost:3000/api/hospital/${id}`, {
        credentials: "include",
        method: "DELETE",
      });
      let data = await response.text();
      console.log(data);
      this.getHospitalList();
      store.action.hideLoading();
    },
  },
  created() {
    this.getHospitalList();
  },
};
</script>