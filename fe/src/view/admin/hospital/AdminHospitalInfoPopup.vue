<template>
  <div
    class="modal fade"
    id="myHospitalModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="myModalLabel">
            Edit Hospital Information
          </h4>
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
                      >Hospital Name:
                    </label>
                    <input
                      v-model="hospitalInfo.name"
                      type="text"
                      name="hospitalName"
                      class="m-input m-col-9 m-col"
                    />
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpPhone" class="m-label m-col m-col-3 m-auto"
                      >Address:
                    </label>
                    <input
                      v-model="hospitalInfo.address"
                      type="text"
                      name="hospitalAddress"
                      class="m-input m-col-9 m-col"
                    />
                  </div>
                  <div class="m-row">
                    <div class="m-col m-col-6">
                      <div class="m-row">
                        <div class="m-col">Số phòng: </div>
                        <div class="m-col text-right">{{ hospitalInfo.rooms }}</div>
                      </div>
                      <div class="m-row">
                        <div class="m-col">Bệnh nhân: </div>
                        <div class="m-col text-right">{{ hospitalInfo.patients }}</div>
                      </div>
                    </div>
                    <div class="m-col m-col-6">
                      <div class="m-row">
                        <div class="m-col">Y tá:</div>
                        <div class="m-col text-right">{{ hospitalInfo.nurses }}</div>
                      </div>
                      <div class="m-row">
                        <div class="m-col">Bác sĩ:</div>
                        <div class="m-col text-right">{{ hospitalInfo.doctors }}</div>
                      </div>
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
                    <button
                      class="btn btn-primary"
                      @click="updateHospitalInfo()"
                    >
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
  name: "AdminHospitalInfoPopup",
  props: ["show", "selectedHospitalId"],
  data() {
    return {
      hospitalInfo: {
        hospitalId: "",
        name: "",
        rooms: "",
        nurses: "",
        doctors: "",
        patients: "",
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
        store.action.showLoading();
        const response = await fetch(
          `http://localhost:3000/api/hospital/${this.selectedHospitalId}`,
          {
            credentials: "include",
          }
        );
        this.hospitalInfo = await response.json();
        store.action.hideLoading();
      }
    },
  },
  methods: {
    async updateHospitalInfo() {
      store.action.showLoading();
      this.successMessage = "";
      this.errorMessage = "";
      const response = await fetch(
        `http://localhost:3000/api/hospital/${this.selectedHospitalId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify(this.hospitalInfo),
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
  },
};
</script>

<style scoped>
* {
    text-align: left;
}

.text-right {
    text-align: right;
}

.m-col {
    padding: 0px 4px;
}
</style>