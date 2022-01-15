<template>
  <div
      class="modal fade"
      id="addPatientModel"
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
            Add Patient Information
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
                        type="text"
                        name="hospitalName"
                        class=" m-col-9"
                    />
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpDoB" class="m-label m-col m-col-3 m-auto"
                    >Hospital Name:
                    </label>
                    <input
                        v-model="patientInfo.hospitalName"
                        type="text"
                        name="hospitalName"
                        class=" m-col-9"
                    />
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpRoomId" class="m-label m-col m-col-3 m-auto"
                    >Room Number:
                    </label>
                    <input
                        v-model="patientInfo.roomNumber"
                        type="text"
                        name="hospitalName"
                        class="m-input m-col-9"
                    />
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpDoB" class="m-label m-col m-col-3 m-auto"
                    >Hospitalized Day:
                    </label>
                    <input
                        v-model="patientInfo.startTime"
                        type="date"
                        class=" m-col-9"
                    />
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
                    @click="addPatient()"
                >
                  Thêm bệnh nhân
                </button>
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
  props: ["show", "selectedPatient", "hospitalList"],
  data() {
    return {
      patientInfo: {
        patientName: "",
        roomId: "1",
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
      roomsList: [],
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
        console.log(this.$store.state.user);
        this.patientInfo.patientName = this.selectedPatient.patientName
        this.patientInfo.phone = this.selectedPatient.phone
        this.patientInfo.address = this.selectedPatient.address
        this.patientInfo.healthInsuranceNumber = this.selectedPatient.healthInsuranceNumber
        this.patientInfo.sex = this.selectedPatient.sex
        this.patientInfo.identifyNumber = this.selectedPatient.identifyNumber
        this.patientInfo.dob = this.toYYYYMMDD(this.selectedPatient.dob)
        this.patientInfo.hospitalName = this.$store.state.user.hospitalName
        this.patientInfo.hospitalId = this.$store.state.user.hospitalId
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
          theDate.getMonth < 9
              ? `0${theDate.getMonth() + 1}`
              : theDate.getMonth() + 1;
      const year = theDate.getFullYear();

      return `${year}-${month}-${day}`;
    },
    async getRoomsList() {
      console.log(this.$store.state.user);
      let response = await fetch(`http://localhost:3000/api/room/1`, {
          credentials: 'include'
      })
      let rooms = await response.json();
      console.log(rooms)
      // this.roomsList = await this.$storedAction.getHospitalList();
    },
    async addPatient() {
      store.action.showLoading();
      this.successMessage = "";
      this.errorMessage = "";
      const response = await fetch(`http://localhost:3000/api/patient`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.patientInfo),
      });
      if (response.status > 300) {
        this.errorMessage = await response.text();
        store.action.hideLoading();
        return;
      } else {
        let data = await response.text();
        this.successMessage = data;
        await this.acceptTransfer();
        store.action.hideLoading();
        this.$emit("popup-save");
      }
    },
    async acceptTransfer() {
      store.action.showLoading();
      this.successMessage = "";
      this.errorMessage = "";
      await fetch(
          `http://localhost:3000/api/patient/transfer/${this.selectedPatient.id}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "Application/json",
            },
            body: JSON.stringify(this.patientInfo),
          }
      );
    },
  },
  created() {
    this.getRoomsList();
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