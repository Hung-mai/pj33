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
          <h4 class="modal-title" id="myModalLabel">Thông tin nhân viên y tế</h4>
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
                      >Tên nhân viên:
                    </label>
                    <div class="m-col-9 text-left">
                      {{ staffInfo.staffName }}
                    </div>
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpPhone" class="m-label m-col m-col-3 m-auto"
                      >Phone:
                    </label>
                    <div class="m-col-9 text-left">
                      {{ staffInfo.phone }}
                    </div>
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label class="m-label m-col m-col-3 m-auto"
                      >Ngày sinh:
                    </label>
                    <div class="m-col-9 text-left">
                      {{ toDDMMYYYY(staffInfo.dob) }}
                    </div>
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label
                      for="inpHospital"
                      class="m-label m-col m-col-3 m-auto"
                      >Điểm xét nghiệm:
                    </label>
                    <div class="m-col-9 text-left">
                      {{ staffInfo.hospitalName }}
                    </div>
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpRole" class="m-label m-col m-col-3 m-auto"
                      >Vị trí:
                    </label>
                    <div name="staffName" class="m-col-9 text-left">
                      Nhân viên điểm xét nghiệm
                    </div>
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label class="m-label m-col m-col-3 m-auto"
                      >Address:
                    </label>
                    <div name="staffName" class="m-col-9 text-left">
                      {{staffInfo.address}}
                    </div>
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
export default {
  name: "AdminStaffInfoPopup",
  props: ["show", "selectedStaffId"],
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
      errorMessage: "",
      successMessage: "",
    };
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
      }
    },
  },
  methods: {
    toDDMMYYYY(date) {
      const theDate = date ? new Date(date) : new Date();
      const day =
        theDate.getDate() < 10 ? `0${theDate.getDate()}` : theDate.getDate();
      const month =
        theDate.getMonth() < 9
          ? `0${theDate.getMonth() + 1}`
          : theDate.getMonth() + 1;
      const year = theDate.getFullYear();

      return `${day}/${month}/${year}`;
    }
  },
};
</script>