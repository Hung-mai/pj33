<template>
  <div class="m-content">
    <!-----------  Content Menu Tab Start   ------------>
    <div class="content-heading">Đăng ký bệnh nhân</div>

    <!----------------   Panel Body Start   --------------->
    <div class="content-body">
      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <button
              class="nav-link active"
              id="nav-addhospital-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-addpatient"
              type="button"
              role="tab"
          >
            Thêm bệnh nhân
          </button>
        </div>
      </nav>

      <div class="tab-content">
        <!----------------   Add Department Start   --------------->
        <div id="nav-addpatient" class="tab-pane">
          <div class="panel panel-default tab-pane-content">
            <div class="panel-body">
              <div class="form-horizontal">
                <div class="form-body w-50">
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
                        class="m-input m-col-9 m-col"
                    />
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpHospitalName" class="m-label m-col m-col-3 m-auto"
                    >Hospital Name:
                    </label>
                    <select
                        v-model="patientInfo.afterId"
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
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpDoB" class="m-label m-col m-col-3 m-auto"
                    >Ngày ghi nhận:
                    </label>
                    <input
                        v-model="patientInfo.leaveDate"
                        type="date"
                        class=" m-col-9"
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
                        addTransferRequest();
                      "
                    >
                      Add Patient
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
  </div>
</template>

<script>
import { store } from "../../../script/store";

export default {
  props: ["user"],
  data() {
    return {
      patientInfo: {
        // patientId: "",
        patientName: "",
        phone: "",
        address: "",
        sex: "",
        dob: "",
        identifyNumber: "",
        healthInsuranceNumber: "",
        beforeId: "",
        afterId: "",
        leaveDate: "",
        status: "0",
      },
      errorMessage: "",
      successMessage: "",
      hospitalList: [],
      patientList: [],
      selectedPatientId: "",
      patientInfoPopup: false,
      medicalRecordPopUp: false,
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
  },
  methods: {
    async addTransferRequest() {
      store.action.showLoading();
      this.successMessage = "";
      this.errorMessage = "";
      this.patientInfo.beforeId = this.$store.state.user.hospitalId;
      const response = await fetch(`http://localhost:3000/api/patient/transfer`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.patientInfo),
      });
      if (response.status > 300) {
        this.errorMessage = await response.text();
      } else {
        this.patientInfo = {};
        await this.getPatientList();
        this.successMessage = await response.text();
      }
      store.action.hideLoading();
    },
    async getPatientList() {
      this.patientList = await this.$store.action.getPatientList();
    },
    async getHospitalList() {
      this.hospitalList = await this.$storedAction.getHospitalList();
    },
    async deletePatient(id) {
      store.action.showLoading();
      let response = await fetch(`http://localhost:3000/api/patient/${id}`, {
        credentials: "include",
        method: "DELETE",
      });
      let data = await response.text();
      console.log(data);
      this.getPatientList();
      store.action.hideLoading();
    },
    formatLevel(level) {
      switch(level) {
        case 1:
          return "Thấp";
        case 2:
          return "Trung Bình";
        case 3:
          return "Cao";
        case 4:
          return "Rất Cao";
        case 5:
          return "Chưa Rõ";
        default:
      }
    }
  },
  created() {
    this.getPatientList();
    this.getHospitalList()
  },
};
</script>