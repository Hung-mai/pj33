<template>
  <div class="m-content">
    <!-----------  Content Menu Tab Start   ------------>
    <div class="content-heading">{{ userHospital }}</div>

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
            @click="tableShow = true"
          >
            Staff List
          </button>
          <button
            class="nav-link"
            id="nav-addstaff-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-addstaff"
            type="button"
            role="tab"
            @click="tableShow = false"
          >
            Add Staff
          </button>
        </div>
      </nav>

      <div class="tab-content">
        <!----------------   Display Department Data List start   --------------->

        <div id="nav-stafflist" class="tab-pane fade show active staff-list" v-show="tableShow">
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
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Staff ID</th>
                  <th>Staff Name</th>
                  <th>Hospital</th>
                  <th>Role</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="staff in staffList" :key="staff.staffId">
                  <td>{{ staff.staffId }}</td>
                  <td>{{ staff.staffName }}</td>
                  <td>{{ idToHospital(staff.hospitalId) }}</td>
                  <td>{{ idToRole(staff.roleId) }}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary btn-i btn-i-update me-2"
                      data-toggle="modal"
                      data-target="#myModal"
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
              <form class="form-horizontal">
                <div class="m-row w-50 justify-content-center mb-2">
                  <label for="inpStaffName" class="m-label m-col m-col-3 m-auto"
                    >Staff Name:
                  </label>
                  <input
                    v-model="staffInfo.staffName"
                    type="text"
                    name="staffName"
                    id="inpStaffName"
                    class="m-input m-col-9 m-col"
                  />
                </div>
                <div class="m-row w-50 justify-content-center mb-2">
                  <label for="inpPhone" class="m-label m-col m-col-3 m-auto"
                    >Phone:
                  </label>
                  <input
                    v-model="staffInfo.phone"
                    type="text"
                    name="staffName"
                    id="inpPhone"
                    class="m-input m-col-9 m-col"
                  />
                </div>
                <div class="m-row w-50 justify-content-center mb-2">
                  <label for="inpPhone" class="m-label m-col m-col-3 m-auto"
                    >Date Of Birth:
                  </label>
                  <input
                    v-model="staffInfo.dob"
                    type="date"
                    name="staffName"
                    id="inpDoB"
                    class="m-input m-col-9 m-col"
                  />
                </div>
                <div class="m-row w-50 justify-content-center mb-2">
                  <label for="inpHospital" class="m-label m-col m-col-3 m-auto"
                    >Hospital:
                  </label>
                  <select
                    v-model="staffInfo.hospitalId"
                    type="text"
                    name="hospital"
                    id="inpHospital"
                    class="m-input m-col-9 m-col"
                  >
                    <option
                      v-for="hospital in hospitalList"
                      :value="hospital.hospitalId"
                      :key="hospital.hospitalId"
                    >
                      {{ hospital.name }}
                    </option>
                  </select>
                </div>
                <div class="m-row w-50 justify-content-center mb-2">
                  <label for="inpRole" class="m-label m-col m-col-3 m-auto"
                    >Role:
                  </label>
                  <select
                    v-model="staffInfo.roleId"
                    name="staffName"
                    id="inpRole"
                    class="m-input m-col-9 m-col"
                  >
                    <option
                      v-for="role in roleList"
                      :value="role.roleId"
                      :key="role.roleId"
                    >
                      {{ role.roleName }}
                    </option>
                  </select>
                </div>
                <div class="m-row w-50 justify-content-center mb-2">
                  <label for="inpAddress" class="m-label m-col m-col-3 m-auto"
                    >Address:
                  </label>
                  <input
                    v-model="staffInfo.address"
                    type="text"
                    name="staffName"
                    id="inpAddress"
                    class="m-input m-col-9 m-col"
                  />
                </div>
                <div class="form-group">
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
              </form>
            </div>
          </div>
        </div>
        <!----------------   Add Department Ends   --------------->
      </div>

      <!------ Edit Department Modal Start ---------->
    </div>
    <!-----------  Content Menu Tab Ends   ------------>
    <div
      class="modal fade"
      id="myModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
            <h4 class="modal-title" id="myModalLabel">
              Edit Department Information
            </h4>
          </div>

          <div class="modal-body">
            <div class="panel panel-default">
              <div class="panel-body">
                <form class="form-horizontal" action="#">
                  <div class="form-group">
                    <label class="col-sm-4 control-label">Department ID</label>
                    <div class="col-sm-4">
                      <input
                        type="number"
                        class="form-control"
                        name="deptId"
                        value=""
                        readonly="readonly"
                      />
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-sm-4 control-label"
                      >Department Name</label
                    >
                    <div class="col-sm-4">
                      <input
                        type="text"
                        class="form-control"
                        name="deptName"
                        value=""
                      />
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-sm-4 control-label"
                      >Department Description</label
                    >
                    <div class="col-sm-4">
                      <input
                        type="text"
                        class="form-control"
                        name="deptDesc"
                        value=""
                      />
                    </div>
                  </div>

                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-default"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <input
                      type="submit"
                      class="btn btn-primary"
                      value="Update"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!----------------   Modal ends here  --------------->
  </div>
</template>

<script>
import { store } from "../../../script/store";

export default {
  name: "Staff",
  props: ["user", "hospitalList", "roleList"],
  data() {
    return {
      tableShow: true,
      staffList: [],
      staffInfo: {
        staffName: "",
        phone: "",
        dob: "",
        address: "",
        hospitalId: "",
        roleId: "",
      },
    };
  },
  computed: {
    userHospital() {
      let hospitalName = "";
      for (const hospital of this.hospitalList) {
        if (hospital.hospitalId == this.user.hospitalId) {
          hospitalName = hospital.name;
          break;
        }
      }
      return hospitalName;
    },
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
  },
  methods: {
    async getStaffList() {
      const response = await fetch(`http://localhost:3000/api/staff`, {
        credentials: "include",
      });
      this.staffList = await response.json();
    },
    idToHospital(hospitalId) {
      for (const hospital of this.hospitalList) {
        if (hospital.hospitalId == hospitalId) return hospital.name;
      }
      return "Không xác định";
    },
    idToRole(roleId) {
      for (const role of this.roleList) {
        if (role.roleId == roleId) return role.roleName;
      }
      return "Không xác định";
    },
    async addStaff() {
      store.showLoading();
      const response = await fetch(`http://localhost:3000/api/staff`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.staffInfo),
      });
      if (response.status != 200) {
        let data = await response.json();
        console.log(data);
      } else {
        this.staffInfo = {};
        this.staffInfo.hospitalId = this.hospitalList[0]?.hospitalId;
        this.staffInfo.roleId = this.roleList[0]?.roleId;
      }
      await this.getStaffList();
      store.hideLoading();
    },
    async deleteStaff(id) {
      const response = await fetch(`http://localhost:3000/api/staff/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.status != 200) {
        const data = await response.json();
        console.log(data);
      }
      await this.getStaffList();
    },
  },
  async created() {
    store.showLoading();
    await this.getStaffList();
    this.staffInfo.hospitalId = this.hospitalList[0].hospitalId;
    this.staffInfo.roleId = this.roleList[0].roleId;
    store.hideLoading();
  },
};
</script>