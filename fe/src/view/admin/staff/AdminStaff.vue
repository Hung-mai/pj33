<template>
  <div class="m-content">
    <!-----------  Content Menu Tab Start   ------------>
    <div class="content-heading">{{ user.hospitalName }}</div>

    <!----------------   Panel Body Start   --------------->
    <div class="content-body">
      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            class="nav-link active"
            id="nav-stafflist-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-stafflist"
            type="button"
            role="tab"
            @click="
              tableShow = true;
              errorMessage = '';
              successMessage = '';
            "
          >
            Danh sách nhân viên
          </button>
          <button
            class="nav-link"
            id="nav-addstaff-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-addstaff"
            type="button"
            role="tab"
            @click="
              tableShow = false;
              staffInfo.hospitalId = hospitalList[0].hospitalId;
              staffInfo.roleId = roleList[0].roleId;
            "
          >
            Thêm nhân viên
          </button>
        </div>
      </nav>

      <div class="tab-content">
        <!----------------   Display Department Data List start   --------------->

        <div
          id="nav-stafflist"
          class="tab-pane fade show active staff-list"
          v-show="tableShow"
        >
          <div class="search-bar">
            <div class="searchbox">
              <input type="search" class="m-input m-input-search" />
              <div class="mi mi-16 mi-search m-input-icon"></div>
            </div>
            <div class="hospital-select" v-if="user.hospitalId == 1">
              <select
                name="hostpitalId"
                id="hospitalId"
                class="m-input m-combobox"
              >
                <option
                  v-for="hospital in queriedHospitalList"
                  :key="hospital.hospitalId"
                  :value="hospital.hospitalId"
                >
                  {{ hospital.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="grid-table">
            <table class="m-table table table-bordered table-hover">
              <thead>
                <tr>
                  <th>ID Nhân viên</th>
                  <th>Tên nhân viên</th>
                  <th>Cơ sở</th>
                  <th>Vị trí</th>
                  <th>Số điện thoại</th>
                  <th>Lựa chọn</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="staff in staffList" :key="staff.staffId">
                  <td>{{ staff.staffId }}</td>
                  <td>{{ staff.staffName }}</td>
                  <td>{{ staff.hospitalName }}</td>
                  <td>{{ staff.roleName }}</td>
                  <td>{{ staff.phone }}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary btn-i btn-i-update me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#myStaffModal"
                      @click="
                        staffInfoPopupShow = true;
                        selectedStaffId = staff.staffId;
                      "
                    ></button>
                    <button
                      href="#"
                      class="btn btn-danger btn-i btn-i-delete"
                      @click="deleteStaff(staff.staffId)"
                    ></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!----------------   Display Department Data List ends   --------------->

        <!----------------   Add Department Start   --------------->
        <div id="nav-addstaff" class="tab-pane fade" v-show="!tableShow">
          <div class="panel panel-default tab-pane-content">
            <div class="panel-body">
              <div class="form-horizontal">
                <div class="form-body w-50">
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label
                      for="inpStaffName"
                      class="m-label m-col m-col-3 m-auto"
                      >Staff Name:
                    </label>
                    <input
                      v-model="staffInfo.staffName"
                      type="text"
                      name="staffName"
                      class="m-input m-col-9 m-col"
                    />
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpPhone" class="m-label m-col m-col-3 m-auto"
                      >Phone:
                    </label>
                    <input
                      v-model="staffInfo.phone"
                      type="text"
                      name="staffName"
                      class="m-input m-col-9 m-col"
                    />
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpPhone" class="m-label m-col m-col-3 m-auto"
                      >Date Of Birth:
                    </label>
                    <input
                      v-model="staffInfo.dob"
                      type="date"
                      name="staffName"
                      class="m-input m-col-9"
                    />
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label
                      for="inpHospital"
                      class="m-label m-col m-col-3 m-auto"
                      >Hospital:
                    </label>
                    <select
                      v-model="staffInfo.hospitalId"
                      type="text"
                      name="hospital"
                      class="m-input m-col-9"
                    >
                      <option
                        v-for="hospital in normalizedHospitalList"
                        :value="hospital.hospitalId"
                        :key="hospital.hospitalId"
                      >
                        {{ hospital.name }}
                      </option>
                    </select>
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpRole" class="m-label m-col m-col-3 m-auto"
                      >Role:
                    </label>
                    <select
                      v-model="staffInfo.roleId"
                      name="staffName"
                      class="m-input m-col-9"
                    >
                      <option
                        v-for="role in normalizedRoleList"
                        :value="role.roleId"
                        :key="role.roleId"
                      >
                        {{ role.roleName }}
                      </option>
                    </select>
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpAddress" class="m-label m-col m-col-3 m-auto"
                      >Address:
                    </label>
                    <input
                      v-model="staffInfo.address"
                      type="text"
                      name="staffName"
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
                <div class="form-footer">
                  <div class="col-sm-offset-4 col-sm-10">
                    <button
                      class="btn btn-primary"
                      @click="
                        $event.preventDefault();
                        addStaff();
                      "
                    >
                      Add Staff
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
    <admin-staff-info-popup
      :show="staffInfoPopupShow"
      :selectedStaffId="selectedStaffId"
      :hospitalList="hospitalList"
      :roleList="roleList"
      @popup-close="
        selectedStaffId = '';
        staffInfoPopupShow = false;
      "
      @popup-save="getStaffList()"
    ></admin-staff-info-popup>
    <!----------------   Modal ends here  --------------->
  </div>
</template>

<script>
import { store } from "../../../script/store";
import AdminStaffInfoPopup from "./AdminStaffInfoPopup.vue";

export default {
  name: "AdminStaff",
  props: ['user'],
  components: {
    AdminStaffInfoPopup,
  },
  data() {
    return {
      storedState: this.$store.state,
      tableShow: true,
      staffList: [],
      hospitalList: [],
      roleList: [],
      staffInfo: {
        staffName: "",
        phone: "",
        dob: "",
        address: "",
        hospitalId: "",
        roleId: "",
      },
      selectedStaffId: "",
      staffInfoPopupShow: false,
      errorMessage: "",
      successMessage: "",
    };
  },
  computed: {
    queriedHospitalList() {
      let result = [
        {
          hospitalId: "",
          name: "Tất cả",
        },
      ];
      for (const hospital of this.hospitalList) {
        result.push({
          hospitalId: hospital.hospitalId,
          name: hospital.name,
        });
      }
      return result;
    },
    normalizedRoleList() {
      let result = [];
      if (this.user.hospitalId != 1) {
        result = this.roleList.filter(role => role.roleId != 1 && role.roleId != 4);
      } else {
        result = this.roleList;
      }
      return result;
    },
    normalizedHospitalList() {
      let result = [];
      if (this.storedState.user.roleId != 1) {
        result = [{
          hospitalId: this.user.hospitalId,
          name: this.user.hospitalName
        }];
      } else {
        result = this.hospitalList;
      }
      return result;
    },
    console() {
      return console;
    },
  },
  methods: {
    async getStaffList() {
      const response = await fetch(`http://localhost:3000/api/staff`, {
        credentials: "include",
      });
      this.staffList = await response.json();
    },
    async addStaff() {
      store.action.showLoading();
      this.successMessage = "";
      this.errorMessage = "";
      const response = await fetch(`http://localhost:3000/api/staff/admin`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.staffInfo),
      });
      if (response.status > 300) {
        this.errorMessage = await response.text();
        store.action.hideLoading();
      } else {
        this.staffInfo = {};
        this.staffInfo.hospitalId = this.hospitalList[0].hospitalId;
        this.staffInfo.roleId = this.roleList[0].roleId;
        this.successMessage = await response.text();
      }
      await this.getStaffList();
      store.action.hideLoading();
    },
    async deleteStaff(id) {
      const response = await fetch(`http://localhost:3000/api/staff/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.status != 200) {
        const data = await response.text();
        console.log(data);
      }
      await this.getStaffList();
    },
    async getHospitalList() {
      this.hospitalList = await this.$storedAction.getHospitalList();
    },
    async getRoleList() {
      this.roleList = await this.$storedAction.getRoleList();
    },
  },
  created() {
    this.getRoleList();
    this.getHospitalList();
    this.getStaffList();
  },
  mounted() {
    this.staffInfo.hospitalId = this.hospitalList[0]?.hospitalId;
    this.staffInfo.roleId = this.roleList[0]?.roleId;
  },
};
</script>