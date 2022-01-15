<template>
  <div
    class="modal fade"
    id="myTestcampModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="myModalLabel">Edit Testcamp Information</h4>
          <button
            id="buttonCloseModalTestcamp"
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
                    >Testcamp Address:
                  </label>
                  <input
                    v-model="testcamp.address"
                    type="text"
                    name="staffName"
                    class="m-input m-col-9 m-col"
                  />
                </div>
                
                </div>
                <span class="m-label-error" v-show="errorMessage != ''">{{errorMessage}}</span>
                <span class="m-label-success" v-show="successMessage != ''">{{successMessage}}</span>
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
                    <button class="btn btn-primary" @click="updateTestcampInfo()">
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
import {store} from '../../../script/store';
import Vue from 'vue'

export default {
    props: ["show", "selectedTestcampId"],
    data() {
        return {
            testcamp: {
                address: "",
            },
            errorMessage: '',
            successMessage: ''
        };
    },
    watch: {
        show: async function () {
            console.log(12121)
            if (this.show) {
                this.errorMessage = '';
                this.successMessage = '';
                const response = await fetch(
                `http://localhost:3000/api/testcamp/${this.selectedTestcampId}`,
                {
                    credentials: "include",
                }
                );
                let data = await response.json();
                this.testcamp = data[0]
                console.log(this.testcamp)
            }
        },
    },
    methods: {
        async updateTestcampInfo() {
            store.action.showLoading();
            this.successMessage = '';
            this.errorMessage = '';
            const response = await fetch(`http://localhost:3000/api/testcamp/${this.selectedTestcampId}`, {
                method: "PUT",
                credentials: 'include',
                headers: {
                'Content-Type': 'Application/json'
                },
                body: JSON.stringify(this.testcamp)
            })
            if (response.status > 300) {
                this.errorMessage = await response.text();
                store.action.hideLoading();
                return;
            } else {
                let data = await response.text();
                this.successMessage = data;
                store.action.hideLoading();
                this.$emit('popup-save');
                document.getElementById("buttonCloseModalTestcamp").click();
                Vue.notify({
                    group: 'foo',
                    title: 'Thành công!',
                    text: 'Testcamp có id ' + this.selectedTestcampId + " đã được cập nhật địa điểm thành " + this.testcamp.address,
                    type: "success",
                })
            }
        }
    }
};
</script>