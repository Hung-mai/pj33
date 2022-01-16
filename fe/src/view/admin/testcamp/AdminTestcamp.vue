<template>
  <div class="m-content">
    <!-----------  Content Menu Tab Start   ------------>
    <div class="content-heading">Quản lý điểm xét nghiệm</div>

    <!----------------   Panel Body Start   --------------->
    <div class="content-body">
      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <button
                id="testcampListBut"
                class="nav-link active"
                data-bs-toggle="tab"
                data-bs-target="#nav-hospitallist"
                type="button"
                role="tab"
                @click="
                    tableShow = true;
                "
          >
            Danh sách điểm xét nghiệm
          </button>
          <button
              class="nav-link"
              id="nav-addhospital-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-addhospital"
              type="button"
              role="tab"
              @click="
                tableShow = false;
                "
          >
            Thêm điểm xét nghiệm
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
                <th>ID điểm xét nghiệm</th>
                <th>Tên điểm xét nghiệm</th>
                <th>Địa chỉ điểm xét nghiệm</th>
              </tr>
              </thead>
              <tbody v-if="testcampList.length">
                <tr v-for="testcamp in testcampList" :key="testcamp.hospitalId">
                    <td>{{ testcamp.hospitalId }}</td>
                    <td>{{ testcamp.name }}</td>
                    <td>{{ testcamp.address }}</td>
                    <td>
                        <button
                            type="button"
                            class="btn btn-primary btn-i btn-i-update me-2"
                            data-bs-toggle="modal"
                            data-bs-target="#myTestcampModal"
                            @click="
                                testcampInfoPopupShow = true;
                                selectedTestcampId = testcamp.hospitalId;
                            "
                        ></button>
                        <button
                            href="#"
                            class="btn btn-danger btn-i btn-i-delete"
                            @click="deleteTestcamp(testcamp.hospitalId)"
                        >
                        </button>
                    </td>
                </tr>
              </tbody>
              <tbody v-else>
                    <tr>
                        <td colspan="2" class="justify-content-center">Không có dữ liệu</td>
                    </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!----------------   Display Department Data List ends   --------------->

        <!----------------   Add Department Start   --------------->
        <div id="nav-addhospital" class="tab-pane fade" v-show="!tableShow">
          <div class="panel panel-default tab-pane-content" style="margin-top: auto; margin-bottom: auto; ">
            <div class="panel-body">
              <div class="form-horizontal">
                <div class="form-body w-50 ">
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label
                        for="inpPatientName"
                        class="m-label m-col m-col-3 m-auto"
                    >Tên
                    </label>
                    <input
                        type="text"
                        id="inpPatientName"
                        class="m-input m-col-9 m-col"
                        v-model="newTestcamp.name"
                    />
                  </div>
                  <div class="m-row w-100 justify-content-center mb-2">
                    <label
                        for="inpPatientName"
                        class="m-label m-col m-col-3 m-auto"
                    >Địa chỉ
                    </label>
                    <input
                        type="text"
                        id="inpPatientName"
                        class="m-input m-col-9 m-col"
                        v-model="newTestcamp.address"
                    />
                  </div>
                  <span class="m-label-error">{{
                      errorMessage
                    }}</span>
                  <span class="m-label-success">{{
                      successMessage
                    }}</span>
                </div>
                <div class="form-group">
                  <div class="col-sm-offset-4 col-sm-10">
                    <button
                        class="btn btn-primary"
                        @click="addTestcamp"
                    >
                      Add Testcamp
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

    <admin-testcamp-info
        :show="testcampInfoPopupShow"
        :selectedTestcampId="selectedTestcampId"
        @popup-close="
            selectedTestcampId = '';
            testcampInfoPopupShow = false;
        "
        @popup-save="getTestcampList()"
    ></admin-testcamp-info>
    <notifications group="foo" position="bottom left" width="500" />
  </div>
</template>

<script>
import { store } from "../../../script/store";
import Vue from 'vue'
import AdminTestcampInfo from "./AdminTestcampInfo.vue";

export default {
    components: {
        AdminTestcampInfo,
    },
  
    data() {
        return {
            errorMessage: "",
            successMessage: "",
            tableShow: true,
            testcampList: [],
            newTestcamp:{
                address: "",
                name: ""
            },
            testcampInfoPopupShow: false,
            selectedTestcampId: "",
        };
    },
    computed: {

    },
    methods:{
        async getTestcampList(){
            const response = await fetch(`http://localhost:3000/api/testcamp`, {
                credentials: "include",
            });
        this.testcampList = await response.json();
        // console.log(this.testcampList);
        },
        async deleteTestcamp(id) {
            const response = await fetch(`http://localhost:3000/api/testcamp/${id}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (response.status != 200) {
                const data = await response.text();
                console.log(data);

                Vue.notify({
                    group: 'foo',
                    title: 'Thất bại!',
                    text: 'Bệnh viện vẫn còn nhân viên, không thể xóa',
                    type: "error",
                })

            }
            await this.getTestcampList();
        },
        async addTestcamp() {
            store.action.showLoading();
            this.successMessage = "";
            this.errorMessage = "";
            const response = await fetch(`http://localhost:3000/api/testcamp`, {
                credentials: "include",
                method: "POST",
                headers: {
                "Content-type": "application/json",
                },
                body: JSON.stringify(this.newTestcamp),
            });
            if (response.status > 300) {
                this.errorMessage = JSON.parse(await response.text()).error;
                // this.errorMessage = "All fields are required"
                store.action.hideLoading();
            } else {
                this.tableShow = true;
                this.newTestcamp = {}
                document.getElementById("testcampListBut").click();
                Vue.notify({
                    group: 'foo',
                    title: 'Thành công!',
                    text: 'Bạn đã thêm mới một điểm xét nghiệm',
                    type: "success",
                })
            }
            
            await this.getTestcampList();
            store.action.hideLoading();
        },
    },
    created() {
        this.getTestcampList();
    },
};
</script>