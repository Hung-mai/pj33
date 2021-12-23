<template>
  <div class="x-content">
    <!-----------  Content Menu Tab Start   ------------>
    <div class="panel">
      <div class="panel-heading">Bệnh viện Bạch Mai</div>

      <!----------------   Panel Body Start   --------------->
      <div class="panel-body">
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              class="nav-link active"
              id="nav-stafflist-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-stafflist"
              type="button"
              role="tab"
            >
              Staff List
            </button>
            <button
              class="nav-link"
              id="nav-addstaff-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-addstaff"
              type="button"
              role="tab"
            >
              Add Staff
            </button>
          </div>
        </nav>

        <div class="tab-content">
          <!----------------   Display Department Data List start   --------------->

          <div id="nav-stafflist" class="tab-pane fade show active">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Staff ID</th>
                  <th>Staff Name</th>
                  <th>Hospital</th>
                  <th>Role</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>123</td>
                  <td>Neurology</td>
                  <td>desc of neurology dept.</td>
                  <td>Nurse</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary btn-i btn-i-update"
                      data-toggle="modal"
                      data-target="#myModal"
                    ></button>
                    <button
                      href="#"
                      class="btn btn-danger btn-i btn-i-delete"
                    ></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!----------------   Display Department Data List ends   --------------->

          <!----------------   Add Department Start   --------------->
          <div id="nav-addstaff" class="tab-pane fade">
            <div class="panel panel-default">
              <div class="panel-body">
                <form class="form-horizontal" action="#">
                  <div class="form-group">
                    <label class="col-sm-4 control-label">Department ID</label>
                    <div class="col-sm-4">
                      <input
                        type="number"
                        class="form-control"
                        name="deptId"
                        placeholder="Enter Department Name"
                      />
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-sm-4 control-label"
                      >Department Name</label
                    >
                    <div class="col-sm-4">
                      <input
                        type="text"
                        class="form-control"
                        name="deptName"
                        placeholder="Enter Department Name"
                      />
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-sm-4 control-label"
                      >Department Description</label
                    >
                    <div class="col-sm-4">
                      <input
                        type="text"
                        class="form-control"
                        name="deptDesc"
                        placeholder="Enter Department Description here..."
                      />
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="col-sm-offset-4 col-sm-10">
                      <button type="submit" class="btn btn-primary">
                        Add Department
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <!----------------   Add Department Ends   --------------->
        </div>

        <!------ Edit Department Modal Start ---------->

        <div
          class="modal fade"
          id="myModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">
                  Edit Department Information
                </h4>
              </div>

              <div class="modal-body">
                <div class="panel panel-default">
                  <div class="panel-body">
                    <form class="form-horizontal" action="#">
                      <div class="form-group">
                        <label class="col-sm-4 control-label"
                          >Department ID</label
                        >
                        <div class="col-sm-4">
                          <input
                            type="number"
                            class="form-control"
                            name="deptId"
                            value=""
                            readonly="readonly"
                          />
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="col-sm-4 control-label"
                          >Department Name</label
                        >
                        <div class="col-sm-4">
                          <input
                            type="text"
                            class="form-control"
                            name="deptName"
                            value=""
                          />
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="col-sm-4 control-label"
                          >Department Description</label
                        >
                        <div class="col-sm-4">
                          <input
                            type="text"
                            class="form-control"
                            name="deptDesc"
                            value=""
                          />
                        </div>
                      </div>

                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-default"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <input
                          type="submit"
                          class="btn btn-primary"
                          value="Update"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!----------------   Modal ends here  --------------->
      </div>
      <!----------------   Panel Body Ends   --------------->
    </div>
    <!-----------  Content Menu Tab Ends   ------------>
  </div>
</template>

<script>
export default {
  name: "TheContent",
};
</script>