<template>
  <div class="m-content">
    <!-----------  Content Menu Tab Start   ------------>
    <div class="content-heading">Quản lý tiếp nhận bệnh nhân</div>

    <!----------------   Panel Body Start   --------------->
    <div class="content-body">
      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <button
              class="nav-link active"
              data-bs-toggle="tab"
              data-bs-target="#nav-hospitallist"
              type="button"
              role="tab"
              @click="tableShow = true"
          >
            Danh sách bệnh nhân chờ tiếp nhận
          </button> 
        </div>
      </nav>

      <div class="tab-content">
        <!----------------   Display Department Data List start   --------------->

        <div
            id="nav-hospitallist"
            class="tab-pane fade show active staff-list"
            v-show="tableShow"
        >
          <div class="search-bar">
            <div class="searchbox">
              <input type="search" class="m-input m-input-search" />
              <div class="mi mi-16 mi-search m-input-icon"></div>
            </div>
          </div>
          <div class="grid-table">
            <table class="table table-bordered table-hover">
              <thead>
              <tr>
                <th>Tên bệnh nhân</th>
                <th>Ngày sinh</th>
                <th>Căn cước công dân</th>
                <th>Số bảo hiểm y tế</th>
                <th>Địa chỉ</th>
                <th>Số điện thoại</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="patient in patientList" :key="patient.id">
                <td>{{ patient.patientName }}</td>
                <td>{{ patient.dob }}</td>
                <td>{{ patient.identifyNumber }}</td>
                <td>{{ patient.healthInsuranceNumber }}</td>
                <td>{{ patient.address }}</td>
                <td>{{ patient.phone }}</td>
                <td>
                  <button
                      type="button"
                      class="btn btn-primary btn-i btn-i-update me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#addPatientModel"
                      @click="
                        selectedPatient = patient;
                        patientInfoPopup = true;
                      "
                  ></button>
                  <!-- <button
                      type="button"
                      class="btn btn-primary btn-i btn-i-update me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#medicalRecord"
                      @click="
                        selectedPatientId = patient.patientId;
                        medicalRecordPopUp = true;
                      "
                  ></button>
                  <button
                      class="btn btn-danger btn-i btn-i-delete"
                      @click="deletePatient(patient.patientId)"
                  ></button> -->
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!----------------   Display Department Data List ends   --------------->

        <!----------------   Add Department Start   --------------->
        <div id="nav-addhospital" class="tab-pane fade" v-show="!tableShow">
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
                  <div class="m-row w-100 justify-content-center mb-2">
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
                  </div>
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
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpRoomId" class="m-label m-col m-col-3 m-auto"
                    >Room Number:
                    </label>
                    <input
                        v-model="patientInfo.roomNumber"
                        type="text"
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
                        addPatient();
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
    <!-----------  Content Menu Tab Ends   ------------>
    <AddPatientPopup
        :show="patientInfoPopup"
        :selectedPatient="selectedPatient"
        @popup-close="
        selectedPatient = {}
        patientInfoPopup = false;
      "
    ></AddPatientPopup>
    <!-- --------------   Modal ends here  ------------- -->
  </div>
</template>

<script>
import { store } from "../../../script/store";
import AddPatientPopup from "./AddPatientPopup";

export default {
  props: ["user"],
  components: {
    AddPatientPopup,
  },
  data() {
    return {
      tableShow: true,
      patientInfo: {
        // patientId: "",
        patientName: "",
        roomId: "1",
        roomNumber: "",
        phone: "",
        address: "",
        sex: "",
        level: 5,
        startTime: "",
        dob: "",
        identifyNumber: "",
        healthInsuranceNumber: "",
        hospitalId: 1,
        hospitalName: ""
      },
      errorMessage: "",
      successMessage: "",
      hospitalList: [],
      patientList: [],
      selectedPatient: {},
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
    async getTransferList() {
      // const transfers = await this.$storedAction.getTransferList();
      // const transfersByHospital = transfers.find((o) => o.afterId === this.$store.state.user.hospitalId);
      // console.log(transfers, 'transfers');
      this.patientList = await this.$storedAction.getTransferList();
      console.log(this.$store.state.user)
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
    this.getTransferList();
    this.getHospitalList();
  },
};
</script>