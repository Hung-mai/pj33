<template>
  <router-view
    :user="user"
    :hospitalList="hospitalList"
    :roleList="roleList"
  ></router-view>
</template>

<script>
export default {
  name: "TheContent",
  props: ["user", "hospitalList", "roleList"],
  // data() {
  //   return {
  //     staffList: [],
  //     staffInfo: {
  //       staffName: "",
  //       phone: "",
  //       dob: "",
  //       address: "",
  //       hospitalId: "",
  //       roleId: "",
  //     },
  //   };
  // },
  // computed: {
  //   userHospital() {
  //     let hospitalName = "";
  //     for (const hospital of this.hospitalList) {
  //       if (hospital.hospitalId == this.user.hospitalId) {
  //         hospitalName = hospital.name;
  //         break;
  //       }
  //     }
  //     return hospitalName;
  //   },
  //   queriedHospitalList() {
  //     let result = [
  //       {
  //         hospitalId: "",
  //         name: "Tất cả",
  //       },
  //     ];
  //     for (const hospital of this.hospitalList) {
  //       result.push({
  //         hospitalId: hospital.hospitalId,
  //         name: hospital.name,
  //       });
  //     }
  //     return result;
  //   },
  // },
  // methods: {
  //   async getStaffList() {
  //     const response = await fetch(`http://localhost:3000/api/staff`, {
  //       credentials: "include",
  //     });
  //     this.staffList = await response.json();
  //   },
  //   idToHospital(hospitalId) {
  //     for (const hospital of this.hospitalList) {
  //       if (hospital.hospitalId == hospitalId) return hospital.name;
  //     }
  //     return "Không xác định";
  //   },
  //   idToRole(roleId) {
  //     for (const role of this.roleList) {
  //       if (role.roleId == roleId) return role.roleName;
  //     }
  //     return "Không xác định";
  //   },
  //   async addStaff() {
  //     const response = await fetch(`http://localhost:3000/api/staff`, {
  //       credentials: "include",
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify(this.staffInfo),
  //     });
  //     if (response.status != 200) {
  //       let data = await response.json();
  //       console.log(data);
  //     } else {
  //       this.staff = {};
  //       this.staffInfo.hospitalId = this.hospitalList[0]?.hospitalId;
  //       this.staffInfo.roleId = this.roleList[0]?.roleId;
  //     }
  //     await this.getStaffList();
  //   },
  // },
  // async created() {
  //   await this.getStaffList();
  //   this.staffInfo.hospitalId = this.hospitalList[0].hospitalId;
  //   this.staffInfo.roleId = this.roleList[0].roleId;
  // },
};
</script>