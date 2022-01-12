<template>
  <div class="m-content">
    <!-----------  Content Menu Tab Start   ------------>
    <div class="content-heading">Quản lý điểm xét nghiệm</div>

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
                <th>Địa chỉ điểm xét nghiệm</th>
              </tr>
              </thead>
              <tbody>
              
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
                    >Testcamp Address
                    </label>
                    <input
                        type="text"
                        id="inpPatientName"
                        class="m-input m-col-9 m-col"
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

    <testcampInfo></testcampInfo>
  </div>
</template>

<script>
// import { store } from "../../../script/store";
import testcampInfo from "./testcampInfo.vue";

export default {
    components: {
        testcampInfo,
    },
  
  data() {
    return {
      errorMessage: "",
      successMessage: "",
      tableShow: true,
    };
  },
  computed: {

  }
};
</script>