<template>
  <div
    class="modal fade"
    id="myAddRoomModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="myModalLabel">Assign room</h4>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            data-bs-toggle="modal"
            data-bs-target="#myStaffModal"
            @click="$emit('add-room-close')"
          ></button>
        </div>

        <div class="modal-body">
          <div class="panel panel-default">
            <div class="panel-body">
              <div class="form-horizontal">
                <div class="form-body">
                  <div>
                    <table class="m-table table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th>ID Phòng bệnh</th>
                          <th>Số phòng</th>
                          <th>Chức năng</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="room in roomList" :key="room.roomId">
                          <td>{{ room.roomId }}</td>
                          <td>{{ room.roomNumber }}</td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-primary btn-i btn-i-add me-2"
                              @click="assignRoom(room.roomId)"
                            ></button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
                      data-bs-toggle="modal"
                      data-bs-target="#myStaffModal"
                      @click="$emit('add-room-close')"
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
  name: "HospitalAdminStaffAddRoom",
  props: ["show", "hospitalId", "selectedStaffId"],
  data() {
    return {
      roomList: [],
      errorMessage: "",
      successMessage: "",
    };
  },
  watch: {
    show: async function () {
      if (this.show) {
        await this.getRooms();
      }
    },
  },
  methods: {
    async getRooms() {
      this.$store.action.showLoading();
      this.errorMessage = "";
      this.successMessage = "";
      const response = await fetch(
        `http://localhost:3000/api/room/hospital/${this.hospitalId}/staff/${this.selectedStaffId}`,
        {
          credentials: "include",
        }
      );
      this.roomList = await response.json();
      this.$store.action.hideLoading();
    },
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
    async assignRoom(roomId) {
      this.$store.action.showLoading();
      let response = await fetch(`http://localhost:3000/api/staff/assign`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId: roomId,
          staffId: this.selectedStaffId,
        }),
      });
      if (response.status >= 300) {
        await this.getRooms();
        this.errorMessage = await response.text();
      } else {
        await this.getRooms();
        this.successMessage = await response.text();
      }
      this.$store.action.hideLoading();
    },
  },
};
</script>