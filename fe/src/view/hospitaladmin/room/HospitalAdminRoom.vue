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
            id="nav-roomlist-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-roomlist"
            type="button"
            role="tab"
            @click="
              tableShow = true;
              errorMessage = '';
              successMessage = '';
            "
          >
            Danh sách phòng bệnh
          </button>
          <button
            class="nav-link"
            id="nav-addroom-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-addroom"
            type="button"
            role="tab"
            @click="
              tableShow = false;
            "
          >
            Thêm phòng bệnh
          </button>
        </div>
      </nav>

      <div class="tab-content">
        <!----------------   Display Department Data List start   --------------->

        <div
          id="nav-roomlist"
          class="tab-pane fade show active room-list"
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
                  <th>ID Phòng Bệnh</th>
                  <th>Số phòng</th>
                  <th>Số giường</th>
                  <th>Lựa chọn</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="room in roomList" :key="room.roomId">
                  <td>{{ room.roomId }}</td>
                  <td>{{ room.roomNumber }}</td>
                  <td>{{ room.beds }}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary btn-i btn-i-update me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#myRoomModal"
                      @click="
                        roomInfoPopupShow = true;
                        selectedRoomId = room.roomId;
                      "
                    ></button>
                    <button
                      href="#"
                      class="btn btn-danger btn-i btn-i-delete"
                      @click="deleteRoom(room.roomId)"
                    ></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!----------------   Display Department Data List ends   --------------->

        <!----------------   Add Department Start   --------------->
        <div id="nav-addroom" class="tab-pane fade" v-show="!tableShow">
          <div class="panel panel-default tab-pane-content">
            <div class="panel-body">
              <div class="form-horizontal">
                <div class="form-body w-50">
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label
                      for="inpRoomName"
                      class="m-label m-col m-col-3 m-auto"
                      >Room Number:
                    </label>
                    <input
                      v-model="roomInfo.roomNumber"
                      type="text"
                      name="roomName"
                      class="m-input m-col-9 m-col"
                    />
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label
                      for="inpRoomName"
                      class="m-label m-col m-col-3 m-auto"
                      >Beds:
                    </label>
                    <input
                      v-model="roomInfo.beds"
                      type="text"
                      name="roomName"
                      class="m-input m-col-9 m-col"
                    />
                  </div>
                  
                  <span class="m-label-error" v-show="errorMessage != ''">{{
                    errorMessage
                  }}</span>
                  <span class="m-label-success" v-show="successMessage != ''">{{
                    successMessage
                  }}</span>
                </div>
                <div class="form-footer">
                  <div class="col-sm-offset-4 col-sm-10">
                    <button
                      class="btn btn-primary"
                      @click="
                        $event.preventDefault();
                        addRoom();
                      "
                    >
                      Add Room
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
    <hospital-admin-room-info-popup
      :show="roomInfoPopupShow"
      :selectedRoomId="selectedRoomId"
      @popup-close="
        selectedRoomId = '';
        roomInfoPopupShow = false;
      "
      @popup-save="getRoomList()"
    ></hospital-admin-room-info-popup>
    <!----------------   Modal ends here  --------------->
  </div>
</template>

<script>
import { store } from "../../../script/store";
import HospitalAdminRoomInfoPopup from "./HospitalAdminRoomInfoPopup.vue";

export default {
  name: "Room",
  props: ['user'],
  components: {
    HospitalAdminRoomInfoPopup,
  },
  data() {
    return {
      storedState: this.$store.state,
      tableShow: true,
      roomList: [],
      roomInfo: {
        roomNumber: "",
        beds: ""
      },
      selectedRoomId: "",
      roomInfoPopupShow: false,
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
    async getRoomList() {
      const response = await fetch(`http://localhost:3000/api/room`, {
        credentials: "include",
      });
      this.roomList = await response.json();
    },
    async addRoom() {
      store.action.showLoading();
      this.successMessage = "";
      this.errorMessage = "";
      const response = await fetch(`http://localhost:3000/api/room`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.roomInfo),
      });
      if (response.status > 300) {
        this.errorMessage = await response.text();
        store.action.hideLoading();
      } else {
        this.roomInfo = {};
        this.successMessage = await response.text();
      }
      await this.getRoomList();
      store.action.hideLoading();
    },
    async deleteRoom(id) {
      const response = await fetch(`http://localhost:3000/api/room/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.status != 200) {
        const data = await response.text();
        console.log(data);
      }
      await this.getRoomList();
    }
  },
  created() {
    this.getRoomList();
  }
};
</script>