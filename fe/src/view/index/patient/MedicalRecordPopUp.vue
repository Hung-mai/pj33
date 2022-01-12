<template>
  <div
      class="modal fade"
      id="medicalRecord"
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
            Medical Record
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
                    >Nhiệt độ:
                    </label>
                    <input
                        v-model="medicalRecord.bodyTemperature"
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
                    >Số mũi vacxin đã tiêm:
                    </label>
                    <input
                        v-model="medicalRecord.vaccinesAdministered"
                        type="text"
                        name="hospitalName"
                        class="m-input m-col-9 m-col"
                    />
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpPhone" class="m-label m-col m-col-3 m-auto"
                    >spO2:
                    </label>
                    <input
                        v-model="medicalRecord.spO2"
                        type="text"
                        name="hospitalName"
                        
                        class="m-input m-col-9 m-col"
                    />
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpIdentifyNumber" class="m-label m-col m-col-3 m-auto"
                    >Bệnh nền:
                    </label>
                    <input
                        v-model="medicalRecord.backgroundDisease"
                        type="text"
                        name="hospitalName"
                        
                        class="m-input m-col-9 m-col"
                    />
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpHealthInsuranceNumber" class="m-label m-col m-col-3 m-auto"
                    >Nhịp thở / phút:
                    </label>
                    <input
                        v-model="medicalRecord.breathingFrequency"
                        type="text"
                        name="hospitalName"
                        
                        class="m-input m-col-9 m-col"
                    />
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpRoomId" class="m-label m-col m-col-3 m-auto"
                    >Nhịp tim / phút:
                    </label>
                    <input
                        v-model="medicalRecord.heartbeat"
                        type="text"
                        name="hospitalName"
                        class="m-input m-col-9 m-col"
                    />
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpRoomId" class="m-label m-col m-col-3 m-auto"
                    >Huyết áp:
                    </label>
                    <input
                        v-model="medicalRecord.bloodPresure"
                        type="text"
                        name="hospitalName"
                        class="m-input m-col-9 m-col"
                    />
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpHospitalName" class="m-label m-col m-col-3 m-auto"
                    >Sốt:
                    </label>
                    <select
                        v-model="medicalRecord.isFever"
                        type="text"
                        class="m-input m-col-9"
                    >
                      <option
                          v-for="option in options"
                          :value="option.id"
                          :key="option.value"
                      >
                        {{ option.value }}
                      </option>
                    </select>
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpHospitalName" class="m-label m-col m-col-3 m-auto"
                    >Ho:
                    </label>
                    <select
                        v-model="medicalRecord.isCough"
                        type="text"
                        class="m-input m-col-9"
                    >
                      <option
                          v-for="option in options"
                          :value="option.id"
                          :key="option.value"
                      >
                        {{ option.value }}
                      </option>
                    </select>
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpHospitalName" class="m-label m-col m-col-3 m-auto"
                    >Đau họng:
                    </label>
                    <select
                        v-model="medicalRecord.isSoreThroat"
                        type="text"
                        class="m-input m-col-9"
                    >
                      <option
                          v-for="option in options"
                          :value="option.id"
                          :key="option.value"
                      >
                        {{ option.value }}
                      </option>
                    </select>
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpHospitalName" class="m-label m-col m-col-3 m-auto"
                    >Thở oxy:
                    </label>
                    <select
                        v-model="medicalRecord.isOxygenSupport"
                        type="text"
                        class="m-input m-col-9"
                    >
                      <option
                          v-for="option in options"
                          :value="option.id"
                          :key="option.value"
                      >
                        {{ option.value }}
                      </option>
                    </select>
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpHospitalName" class="m-label m-col m-col-3 m-auto"
                    >Khó thở:
                    </label>
                    <select
                        v-model="medicalRecord.isHardBreath"
                        type="text"
                        class="m-input m-col-9"
                    >
                      <option
                          v-for="option in options"
                          :value="option.id"
                          :key="option.value"
                      >
                        {{ option.value }}
                      </option>
                    </select>
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpHospitalName" class="m-label m-col m-col-3 m-auto"
                    >Mỏi cơ:
                    </label>
                    <select
                        v-model="medicalRecord.isMusclePain"
                        type="text"
                        class="m-input m-col-9"
                    >
                      <option
                          v-for="option in options"
                          :value="option.id"
                          :key="option.value"
                      >
                        {{ option.value }}
                      </option>
                    </select>
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpHospitalName" class="m-label m-col m-col-3 m-auto"
                    >Mất vị giác:
                    </label>
                    <select
                        v-model="medicalRecord.isLossOfTaste"
                        type="text"
                        class="m-input m-col-9"
                    >
                      <option
                          v-for="option in options"
                          :value="option.id"
                          :key="option.value"
                      >
                        {{ option.value }}
                      </option>
                    </select>
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
                    @click="addMedicalReocord()"
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

</template>

<script>
import {store} from "../../../script/store";

export default {
  name: "MedicalRecordPopUp",
  props: ["show", "selectedPatientId", "hospitalList"],
  data() {
    return {
      medicalRecord: {
        staffId: 1,
        patientId: this.selectedPatientId,
        treatmentTime: "",
        bodyTemperature: "",
        vaccinesAdministered: "",
        spO2: "",
        backgroundDisease: "",
        breathingFrequency: "",
        heartbeat: "",
        bloodPresure: "",
        isFever: "",
        isCough: "",
        isSoreThroat: "",
        isOxygenSupport: "",
        isHardBreath: "",
        isMusclePain: "",
        isLossOfTaste: ""
      },
      options: [{
          id: 0,
          value: "Không"
      },
      {
          id: 1,
          value: "Có"
      }
      ],
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
        let patientInfo = await response.json();
        patientInfo = patientInfo[0];
        this.medicalRecord.patientId = patientInfo.patientId;
        this.medicalRecord.treatmentTime = this.toYYYYMMDD(new Date());
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
    async addMedicalReocord() {
      store.action.showLoading();
      this.successMessage = "";
      this.errorMessage = "";
      const response = await fetch(`http://localhost:3000/api/record`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.medicalRecord),
      });
      if (response.status > 300) {
        this.errorMessage = await response.text();
      } else {
        this.medicalRecord = {};
        await this.getPatientList();
        this.successMessage = await response.text();
      }
      store.action.hideLoading();
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