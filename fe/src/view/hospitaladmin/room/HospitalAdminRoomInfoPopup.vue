<template>
  <div
    class="modal fade"
    id="myRoomModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="myModalLabel">Edit Room Information</h4>
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
                      >Room Name:
                    </label>
                    <input
                      v-model="roomInfo.roomNumber"
                      type="text"
                      name="roomName"
                      class="m-input m-col-9 m-col"
                    />
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpPhone" class="m-label m-col m-col-3 m-auto"
                      >Số giường:
                    </label>
                    <input
                      v-model="roomInfo.beds"
                      type="text"
                      name="roomName"
                      class="m-input m-col-9 m-col"
                    />
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label for="inpPhone" class="m-label m-col m-col-3 m-auto"
                      >Bệnh nhân:
                    </label>
                    <div class="m-col-9 m-col" style="text-align: left">
                      {{ roomInfo.patients }}
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
                    <button class="btn btn-primary" @click="updateRoomInfo()">
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
  name: "HospitalAdminRoomInfoPopup",
  props: ["show", "selectedRoomId"],
  data() {
    return {
      roomInfo: {
        roomNumber: "",
        beds: "",
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
        const response = await fetch(
          `http://localhost:3000/api/room/${this.selectedRoomId}`,
          {
            credentials: "include",
          }
        );
        this.roomInfo = await response.json();
      }
    },
  },
  methods: {
    async updateRoomInfo() {
      store.action.showLoading();
      this.successMessage = "";
      this.errorMessage = "";
      const response = await fetch(
        `http://localhost:3000/api/room/${this.selectedRoomId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify(this.roomInfo),
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