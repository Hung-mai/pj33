<template>
  <div
    class="modal fade"
    id="myStaffModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="myModalLabel">Edit Staff Information</h4>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="$emit('popup-close')"
          ></button>
        </div>

        <div class="modal-body">
          <div class="panel panel-default">
            <div class="panel-body">
              <div class="form-horizontal">
                <div class="form-body">
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label class="m-label m-col m-col-3 m-auto"
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
                    <label class="m-label m-col m-col-3 m-auto"
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
                    <div class="m-col m-col-9 text-left">
                      {{ hospitalName }}
                    </div>
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
                        v-for="role in roleList"
                        :value="role.roleId"
                        :key="role.roleId"
                      >
                        {{ role.roleName }}
                      </option>
                    </select>
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label class="m-label m-col m-col-3 m-auto"
                      >Address:
                    </label>
                    <input
                      v-model="staffInfo.address"
                      type="text"
                      name="staffName"
                      class="m-input m-col-9 m-col"
                    />
                  </div>
                  <div v-if="staffInfo.roleId == 2 || staffInfo.roleId == 3">
                    <table class="m-table table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th>ID Phòng bệnh</th>
                          <th>Số phòng</th>
                          <th>Chức năng</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="room in staffInfo.rooms" :key="room.roomId">
                          <td>{{ room.roomId }}</td>
                          <td>{{ room.roomNumber }}</td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-danger btn-i btn-i-delete me-2"
                              @click="unassignRoom(room.roomId)"
                            ></button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <button
                      class="m-btn m-btn-primary w-100"
                      @click="$emit('show-add-room')"
                      data-bs-toggle="modal"
                      data-bs-dismiss="modal"
                      data-bs-target="#myAddRoomModal"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <span class="m-label-error" v-show="errorMessage != ''">{{
                  errorMessage
                }}</span>
                <span class="m-label-success" v-show="successMessage != ''">{{
                  successMessage
                }}</span>
                <div class="form-group">
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-default"
                      data-bs-dismiss="modal"
                      @click="$emit('popup-close')"
                    >
                      Đóng
                    </button>
                    <button class="btn btn-primary" @click="updateStaffInfo()">
                      Cập nhật
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../../../script/store";

export default {
  name: "HospitalAdminStaffInfoPopup",
  props: ["show", "hospitalList", "selectedStaffId"],
  data() {
    return {
      staffInfo: {
        staffName: "",
        phone: "",
        dob: "",
        address: "",
        hospitalId: "",
        roleId: "",
      },
      isAddRoomShow: false,
      errorMessage: "",
      successMessage: "",
    };
  },
  computed: {
    hospitalName() {
      let result = "";
      for (const hospital of this.hospitalList) {
        if (hospital.hospitalId == this.staffInfo.hospitalId)
          return hospital.name;
      }
      return result;
    },
    roleList() {
      return [
        {
          roleId: 2,
          roleName: "Y tá",
        },
        {
          roleId: 3,
          roleName: "Bác sĩ",
        },
        {
          roleId: 5,
          roleName: "Quản lý bệnh viện",
        },
      ];
    },
  },
  watch: {
    show: async function () {
      if (this.show) {
        this.errorMessage = "";
        this.successMessage = "";
        const response = await fetch(
          `http://localhost:3000/api/staff/${this.selectedStaffId}`,
          {
            credentials: "include",
          }
        );
        this.staffInfo = await response.json();
        this.staffInfo.dob = this.toYYYYMMDD(this.staffInfo.dob);
      }
    },
  },
  methods: {
    async getStaffInfo() {
      this.$store.action.showLoading();
      this.errorMessage = "";
      this.successMessage = "";
      const response = await fetch(
        `http://localhost:3000/api/staff/${this.selectedStaffId}`,
        {
          credentials: "include",
        }
      );
      this.staffInfo = await response.json();
      this.staffInfo.dob = this.toYYYYMMDD(this.staffInfo.dob);
      this.$store.action.hideLoading();
    },
    toYYYYMMDD(date) {
      const theDate = date ? new Date(date) : new Date();
      const day =
        theDate.getDate() < 10 ? `0${theDate.getDate()}` : theDate.getDate();
      const month =
        theDate.getMonth() < 9
          ? `0${theDate.getMonth() + 1}`
          : theDate.getMonth() + 1;
      const year = theDate.getFullYear();

      return `${year}-${month}-${day}`;
    },
    async updateStaffInfo() {
      store.action.showLoading();
      this.successMessage = "";
      this.errorMessage = "";
      const response = await fetch(
        `http://localhost:3000/api/staff/hospitaladmin/${this.selectedStaffId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify(this.staffInfo),
        }
      );
      if (response.status > 300) {
        this.errorMessage = await response.text();
        store.action.hideLoading();
        return;
      } else {
        let data = await response.text();
        this.successMessage = data;
        store.action.hideLoading();
        this.$emit("popup-save");
      }
    },
    async unassignRoom(roomId) {
      this.$store.action.showLoading();
      let response = await fetch(`http://localhost:3000/api/staff/unassign`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId: roomId,
          staffId: this.selectedStaffId,
        }),
      });
      if (response.status >= 300) {
        await this.getStaffInfo();
        this.errorMessage = await response.text();
      } else {
        await this.getStaffInfo();
        this.successMessage = await response.text();
      }
      this.$store.action.hideLoading();
    },
  },
};
</script>