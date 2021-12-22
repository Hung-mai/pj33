<template>
  <div class="x-content">
    <!-----------  Content Menu Tab Start   ------------>
    <div class="panel panel-default contentinside">
      <div class="panel-heading">Manage Department</div>

      <!----------------   Panel Body Start   --------------->
      <div class="panel-body">
        <ul class="nav nav-tabs doctor">
          <li role="presentation">
            <a href="#doctorlist" class="active">Department List</a>
          </li>
          <li role="presentation">
            <a href="#adddoctor">Add Department</a>
          </li>
        </ul>

        <!----------------   Display Department Data List start   --------------->

        <div id="doctorlist" class="switchgroup">
          <table class="table table-bordered table-hover">
            <tbody>
              <tr class="active">
                <td>Department ID</td>
                <td>Department Name</td>
                <td>Department Description</td>
                <td>Options</td>
              </tr>
              <tr>
                <td>123</td>
                <td>Neurology</td>
                <td>desc of neurology dept.</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-toggle="modal"
                    data-target="#myModal"
                  >
                    <span
                      class="glyphicon glyphicon-wrench"
                      aria-hidden="true"
                    ></span>
                  </button>
                  <a href="#" class="btn btn-danger"
                    ><span
                      class="glyphicon glyphicon-trash"
                      aria-hidden="true"
                    ></span
                  ></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!----------------   Display Department Data List ends   --------------->

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

        <!----------------   Add Department Start   --------------->
        <div id="adddoctor" class="switchgroup">
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
                  <label class="col-sm-4 control-label">Department Name</label>
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