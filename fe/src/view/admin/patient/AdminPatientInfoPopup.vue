<template>
  <div
      class="modal fade"
      id="myPatientModal"
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
            Patient Information
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
                    <label
                        for="inpPatientName"
                        class="m-label m-col m-col-3 m-auto"
                    >Patient Name:
                    </label>
                    <input
                        v-model="patientInfo.patientName"
                        type="text"
                        class="m-input m-col-9 m-col"
                    />
                  </div>
                  <!-- <div class="m-row w-100 justify-content-center mb-2">
                    <label
                        for="inpPatientId"
                        class="m-label m-col m-col-3 m-auto"
                    >Patient ID:
                    </label>
                    <input
                        v-model="patientInfo.patientId"
                        type="text"
                        class="m-input m-col-9 m-col"
                    />
                  </div> -->
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpAddress" class="m-label m-col m-col-3 m-auto"
                    >Address:
                    </label>
                    <input
                        v-model="patientInfo.address"
                        type="text"
                        name="hospitalName"
                        class="m-input m-col-9 m-col"
                    />
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpPhone" class="m-label m-col m-col-3 m-auto"
                    >Phone:
                    </label>
                    <input
                        v-model="patientInfo.phone"
                        type="text"
                        name="hospitalName"
                        class="m-input m-col-9 m-col"
                    />
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpIdentifyNumber" class="m-label m-col m-col-3 m-auto"
                    >Identify Number:
                    </label>
                    <input
                        v-model="patientInfo.identifyNumber"
                        type="text"
                        name="hospitalName"
                        class="m-input m-col-9 m-col"
                    />
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpHealthInsuranceNumber" class="m-label m-col m-col-3 m-auto"
                    >Heal Insurance Number:
                    </label>
                    <input
                        v-model="patientInfo.healthInsuranceNumber"
                        type="text"
                        name="hospitalName"
                        class="m-input m-col-9 m-col"
                    />
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpDoB" class="m-label m-col m-col-3 m-auto"
                    >Date of Birth:
                    </label>
                    <input
                        v-model="patientInfo.dob"
                        type="date"
                        name="hospitalName"
                        class=" m-col-9"
                    />
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpHealthInsuranceNumber" class="m-label m-col m-col-3 m-auto"
                    >Sex:
                    </label>
                    <input
                        v-model="patientInfo.sex"
                        type="text"
                        name="hospitalName"
                        class="m-input m-col-9 m-col"
                    />
                  </div>
                  <!-- <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpHospitalName" class="m-label m-col m-col-3 m-auto"
                    >Hospital Name:
                    </label>
                    <select
                        v-model="patientInfo.hospitalName"
                        type="text"
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
                  </div> -->
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpHealthInsuranceNumber" class="m-label m-col m-col-3 m-auto"
                    >Hospital Name:
                    </label>
                    <input
                        v-model="patientInfo.hospitalName"
                        type="text"
                        name="hospitalName"
                        class="m-input m-col-9 m-col"
                    />
                  </div>
                  <!-- <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpRoomId" class="m-label m-col m-col-3 m-auto"
                    >Room Number:
                    </label>
                    <input
                        v-model="patientInfo.roomNumber"
                        type="text"
                        name="hospitalName"
                        class="m-input m-col-9"
                    />
                  </div> -->

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
                <!-- <button
                    type="button"
                    class="btn btn-default"
                    data-bs-dismiss="modal"
                    @click="$emit('popup-close')"
                >
                  Đóng
                </button>
                <button
                    class="btn btn-primary"
                    @click="updatePatientInfo()"
                >
                  Cập nhật
                </button> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {store} from "../../../script/store";

export default {
  props: ["show", "selectedPatientId", "hospitalList"],
  data() {
    return {
      patientInfo: {
        patientId: "",
        patientName: "",
        roomId: "",
        phone: "",
        address: "",
        sex: "",
        level: "",
        startTime: "",
        dob: "",
        identifyNumber: "",
        healthInsuranceNumber: "",
        hospitalId: "",
        hospitalName: ""
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
            `http://localhost:3000/api/patient/${this.selectedPatientId}`,
            {
              credentials: "include",
            }
        );
        this.patientInfo = await response.json();
        this.patientInfo = this.patientInfo[0];
        console.log(this.patientInfo);
        const hospitalResponse = await fetch(
            `http://localhost:3000/api/hospital/${this.patientInfo.hospitalId}`,
            {
              credentials: "include",
            }
        );
        const hospital = await hospitalResponse.json();

        this.patientInfo.hospitalName = hospital.name;
        this.patientInfo.dob = this.toYYYYMMDD(this.patientInfo.dob);        
        
        // this.patientInfo = await response.json();

        store.action.hideLoading();
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
    async updatePatientInfo() {
      store.action.showLoading();
      this.successMessage = "";
      this.errorMessage = "";
      const response = await fetch(
          `http://localhost:3000/api/patient/${this.selectedPatientId}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "Application/json",
            },
            body: JSON.stringify(this.patientInfo),
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