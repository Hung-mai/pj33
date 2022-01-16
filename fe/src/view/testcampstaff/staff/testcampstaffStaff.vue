<template>
  <div class="m-content">
    <!-----------  Content Menu Tab Start   ------------>
    <div class="content-heading">{{ user.hospitalName }}</div>

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
            @click="
              tableShow = true;
              errorMessage = '';
              successMessage = '';
            "
          >
            Danh sách nhân viên
          </button>
        </div>
      </nav>

      <div class="tab-content">

        <div
          id="nav-stafflist"
          class="tab-pane fade show active staff-list"
          v-show="tableShow"
        >
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
            <table class="m-table table table-bordered table-hover">
              <thead>
                <tr>
                  <th>ID Nhân viên</th>
                  <th>Tên nhân viên</th>
                  <th>Vị trí</th>
                  <th>Bệnh viện</th>
                  <th>Số điện thoại</th>
                  <th>Lựa chọn</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="staff in staffList" :key="staff.staffId">
                  <td>{{ staff.staffId }}</td>
                  <td>{{ staff.staffName }}</td>
                  <td>{{ staff.roleName }}</td>
                  <td>{{ staff.hospitalName }}</td>
                  <td>{{ staff.phone }}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary btn-i btn-i-update me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#myStaffModal"
                      @click="
                        staffInfoPopupShow = true;
                        selectedStaffId = staff.staffId;
                      "
                    ></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!------ Edit Department Modal Start ---------->
    </div>
    <!-----------  Content Menu Tab Ends   ------------>
    <testcampstaffStaffInfoPopup
      :show="staffInfoPopupShow"
      :selectedStaffId="selectedStaffId"
      @popup-close="
        selectedStaffId = '';
        staffInfoPopupShow = false;
      "
      @popup-save="getStaffList()"
    ></testcampstaffStaffInfoPopup>
    <!----------------   Modal ends here  --------------->
  </div>
</template>

<script>
import testcampstaffStaffInfoPopup from "./testcampstaffStaffInfoPopup.vue";

export default {
  name: "AdminStaff",
  props: ["user"],
  components: {
    testcampstaffStaffInfoPopup,
  },
  data() {
    return {
      storedState: this.$store.state,
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
      selectedStaffId: "",
      staffInfoPopupShow: false,
      errorMessage: "",
      successMessage: "",
    };
  },
  computed: {
    console() {
      return console;
    },
  },
  methods: {
    async getStaffList() {
      const response = await fetch(`http://localhost:3000/api/staff`, {
        credentials: "include",
      });
      this.staffList = await response.json();
    },
  },
  created() {
    this.getStaffList();
  }
};
</script>