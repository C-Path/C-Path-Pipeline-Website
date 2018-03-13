<template lang="html">
    <html>
    <head>
    </head>
    <body>
      <h4 class="margin-left-1 error" v-if="$route.query.redirect && $route.query.redirect != '/login'">
        404: Url not found, redirected to /dashboard
      </h4>
        <h3 class="margin-left-1">User Projects</h3>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect new-project-btn" @click="show">Create New Project</button>
        <div class="margin-bottom-2 margin-left-3">
          <h5>Click on a Project to Add or View Files</h5>
            <table class="mdl-data-table mdl-shadow--2dp table-width">
                <thead>
                    <tr>
                    <th class="mdl-data-table__cell--non-numeric table-width-10">Active</th>
                    <th class="mdl-data-table__cell--non-numeric">Project Name</th>
                    <th class="mdl-data-table__cell--non-numeric">Description</th>
                    <th class="">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr  v-for="(project, index) in projects">
                        <td class="mdl-data-table__cell--non-numeric table-width-10">
                            <label class = "mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" :for = "index">
                            <input type = "checkbox" v-model=project.selected :id = "index" class = "mdl-checkbox__input">
                            </label>
                        </td>
                        <td @click="showFiles(project.name)" class="mdl-data-table__cell--non-numeric">{{project.name}}</td>
                        <td @click="showFiles(project.name)" class="mdl-data-table__cell--non-numeric">{{project.description}}</td>
                        <td @click="showDeleteModal(project)" class="delete__cell"><img src="../../static/images/ic_delete_black_24dp_1x.png" alt="Delete"></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="margin-left-3">
            <modal name="NewProjectModal" height="auto" :scrollable="true">
              <v-dialog/>
               <h3 class="text-align-center">Create New Project</h3>
              <form @submit.prevent="createNewProject">

                <div class="text-align-center">
                    <label for="projectName">Project Name:</label>
                    <input class="input" type="text" id="projectName" placeholder="Project Name" name="projectName" v-model.trim="NewProject.name" required>
                    </br>

                    <div class="mdl-textfield mdl-js-textfield">
                      <p>Description:</p>
                  <textarea class="mdl-textfield__input border-light" type="text" rows= "6" id="sample5" v-model.trim="NewProject.description"></textarea>
                  </div>
                 </div>
                 <br>
                 <div class="text-align-center margin-bottom-2">
                     <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" type="submit">Add Project</button>
                   </div>
                </form>
           </modal>
        </div>

        <modal class="delete-modal" name="DeleteModal" height="auto" :scrollable="true">
             <div class="text-align-center">
               <h3 class="text-underline">Confirm Deletion for: {{deletionProject.name}}</h3>
               <p>All data/files associated with this project will also be deleted, unless it has been marked for contribution. Are you sure you want to delete?</p>
             </div>
              <div class="text-align-center">
                <button @click="deleteProject()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect margin-bottom-2 delete-option">Delete</button>
                <button @click="hideDeleteModal()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect margin-bottom-2 delete-option">Cancel</button>
              </div>
              </modal>
           </modal>
    </body>

    </html>
</template>

<script>
import axios from "axios";
import auth from "../auth.js";

export default {
  data() {
    return {
      NewProject: {
        name: "",
        description: "",
        username: localStorage.getItem("username"),
        active: false
      },
      loggedIn: localStorage.getItem("token") != null,
      projectNameTitle: "",
      description: "",
      projects: [],
      deletionProject: ""
    };
  },

  mounted() {
    
    var $vm = this;
    $vm.loggedIn = localStorage.getItem("token") != null;
    axios
      .get(process.env.SERVER_URL + "/projects", {
        params: {
          token: localStorage.getItem("token"),
          username: localStorage.getItem("username")
        }
      })
      .then(function(res) {
        console.log("GOT", res.data)
        $vm.projects = res.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    show() {
      this.$modal.show("NewProjectModal");
    },
    hide() {
      this.$modal.hide("NewProjectModal");
    },
    showAlert() {
      this.$modal.show("dialog", {
        title:
          '<html><head></head><body><p style="text-align:center;color:red;font-size:3em;"><span class="glyphicon glyphicon-alert"></span></p><h4 style="text-align:center;">A Project with that name already exists!</h4></body></html>',
        text:
          '<p style="text-align:center;">Please enter a different project name.</p>',
        buttons: [
          {
            title: "Close", // Button title
            default: true // Will be triggered by default if 'Enter' pressed.
          }
        ]
      });
    },
    showFiles(nameOfProject, index) {
      localStorage.setItem("currentProject", nameOfProject);
      this.$router.push("/upload");
      // this.$router.replace(this.$route.query.redirect || '/upload')
    },
    showDescription() {
      this.$modal.show("ProjectDescription");
    },
    hideDescription() {
      this.$modal.hide("ProjectDescription");
    },
    addProjectToTable(responseProject) {
      this.projects.push(responseProject);
      this.hide();
    },
    resetNewProject() {
      this.NewProject = {
        name: "",
        description: "",
        username: auth.getUsername(),
        active: false
      };
    },
    isExistingProject() {
      for (var i = 0; i < this.projects.length; i++) {
        if (
          this.projects[i].name.toLowerCase() ===
          this.NewProject.name.toLowerCase()
        ) {
          return true;
        }
      }
      return false;
    },
    createNewProject() {
      if (this.isExistingProject()) {
        this.showAlert();
      } else {
        var tokenParam = "?token=" + localStorage.getItem("token");
        axios.post(process.env.SERVER_URL + "/projects" + tokenParam, this.NewProject).then((res) => {
            this.addProjectToTable(res.data)
            this.resetNewProject()
        }).catch(function(err) {
          console.log(err)
        })
      }
    },
    showDeleteModal(project) {
      this.$modal.show("DeleteModal");
      this.deletionProject = project;
    },
    hideDeleteModal() {
      this.$modal.hide("DeleteModal");
      this.deletionProject = "";
    },
    refreshData() {
      var $vm = this;
      axios
        .get(process.env.SERVER_URL + "/projects", {
          params: {
            token: localStorage.getItem("token"),
            username: localStorage.getItem("username")
          }
        })
        .then(function(res) {
          $vm.projects = res.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deleteProject() {
      var tokenParam = "?token=" + auth.getToken();
      axios
        .delete(
          process.env.SERVER_URL +
            "/projects/" +
            this.deletionProject._id +
            tokenParam
        )
        .then(res => {
          if (res.data.Deleted) {
            this.refreshData();
          }
        })
        .catch(function(err) {
          console.log(err);
        });
      this.hideDeleteModal();
    }
  }
};
</script>

<style scoped>
.table-width {
  width: 83%;
}

.table-width-10 {
  width: 10%;
}

.new-project-btn {
  margin: 0 3em 3em 3em;
}

.text-underline {
  text-decoration: underline;
}

.border-light {
  border: 1px solid gainsboro;
}

.delete-option {
  margin: 0em 2em;
}

.delete-modal * {
  padding: 0em 2em 2em 2em;
}
</style>
