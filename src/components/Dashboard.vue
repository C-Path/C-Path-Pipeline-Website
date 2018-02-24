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
    </body>

    </html>
</template>

<script>
import axios from "axios";
import auth from "../auth.js"

export default {
  data() {
    return {
      NewProject: {
        name: '',
        description: '',
        username: auth.getUsername(),
        active: false,
      },
      projectNameTitle: "",
      description: "",
      projects: []
    };
  },
  mounted() {
    var $vm = this;
    axios
      .get("http://localhost:3000/projects", {
        params: {
          token: auth.getToken(),
          username: auth.getUsername()
        }
      })
      .then(function(res) {
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
    hide () {
      this.$modal.hide('NewProjectModal');
    },
    showAlert() {
      this.$modal.show("dialog", {
        title: '<html><head></head><body><p style="text-align:center;color:red;font-size:3em;"><span class="glyphicon glyphicon-alert"></span></p><h4 style="text-align:center;">A Project with that name already exists!</h4></body></html>',
        text: '<p style="text-align:center;">Please enter a different project name.</p>',
        buttons: [
          {
            title: "Close", // Button title
            default: true, // Will be triggered by default if 'Enter' pressed.
          },
        ]
      });
    },
    showFiles (nameOfProject, index) {
      localStorage.setItem('currentProject', nameOfProject)
      this.$router.push('/upload')
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
        name: '',
        description: '',
        username: auth.getUsername(),
        active: false,
      }
    },
    isExistingProject() {
      for (var i = 0; i < this.projects.length; i++) {
        if (this.projects[i].name.toLowerCase() === this.NewProject.name.toLowerCase()) {
          return true;
        }
      }
      return false;
     },
    createNewProject () {
      if (this.isExistingProject()) {
        this.showAlert();
      } else {
      /* TODO: place the url for POST in .envrc */
      var tokenParam = "?token=" + auth.getToken()
      axios.post("http://localhost:3000/projects" + tokenParam, this.NewProject).then((res) => {
          this.addProjectToTable(res.data)
          this.resetNewProject()
      }).catch(function(err) {
        console.log(err)
      })
      }
    },
  }
};
</script>

<style scoped>
.projectsTable {
  margin-left: 3em;
}

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
</style>
