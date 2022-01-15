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
                  <label for="inpHospital" class="m-label m-col m-col-3 m-auto"
                    >Hospital:
                  </label>
                  <select
                    v-model="staffInfo.hospitalId"
                    type="text"
                    name="hospital"
                    class="m-input m-col-9"
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
                  <label class="m-label m-col m-col-3 m-auto">Address: </label>
                  <input
                    v-model="staffInfo.address"
                    type="text"
                    name="staffName"
                    class="m-input m-col-9 m-col"
                  />
                </div>
                </div>
                <span class="m-label-error" v-show="errorMessage != ''">{{errorMessage}}</span>
                <span class="m-label-success" v-show="successMessage != ''">{{successMessage}}</span>
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
import {store} from '../../../script/store';

export default {
  name: "StaffInfoPopup",
  props: ["show", "hospitalList", "roleList", "selectedStaffId"],
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
      errorMessage: '',
      successMessage: ''
    };
  },
  watch: {
    show: async function () {
      if (this.show) {
        this.errorMessage = '';
        this.successMessage = '';
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
      this.successMessage = '';
      this.errorMessage = '';
      const response = await fetch(`http://localhost:3000/api/staff/testcampstaff/${this.selectedStaffId}`, {
        method: "PUT",
        credentials: 'include',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify(this.staffInfo)
      })
      if (response.status > 300) {
        this.errorMessage = await response.text();
        store.action.hideLoading();
        return;
      } else {
        let data = await response.text();
        this.successMessage = data;
        store.action.hideLoading();
        this.$emit('popup-save');
      }
      
    }
  }
};
</script>