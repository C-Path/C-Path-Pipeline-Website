<template lang="html">
    <html>
    <head>
    </head>
    <body>
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
            <!-- New Project Modal -->
            <modal name="NewProjectModal" height="auto" :scrollable="true">
               <h3 class="text-align-center">Create New Project</h3>
              <form @submit.prevent="createNewProject">
                <div class="text-align-center">
                    <label for="projectName">Project Name:</label>
                    <input class="input" type="text" id="projectName" placeholder="Project Name" name="projectName" v-model="NewProject.name" required>
                    </br>

                    <div class="mdl-textfield mdl-js-textfield">
                      <p>Description:</p>
                  <textarea class="mdl-textfield__input border-light" type="text" rows= "6" id="sample5" v-model="NewProject.description"></textarea>
                  </div>
                 </div>
                 <br>
                 <div class="text-align-center margin-bottom-2">
                     <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" type="submit">Add Project</button>
                   </div>
                </form>
           </modal>
           <!-- Project Files Modal -->
           <modal name="ProjectFilesModal" height="auto" :scrollable="true">
             <div class="text-align-center">
               <h3 class="text-underline">{{projectNameTitle}}</h3>

               <a href="/upload">
                <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect margin-right-2">Add / View File</button>
             </a>
                <button @click="showDescription()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect margin-right-2">Edit Description</button>
             </div>
               <br>
               <modal name="ProjectDescription" height="auto" :scrollable="true">
                 <h5 class="text-align-center">Enter a Description:</h5>
              <div class="text-align-center">
                <div class="mdl-textfield mdl-js-textfield">
                  <textarea class="mdl-textfield__input border-light" type="text" rows= "7" id="sample5" v-model="NewProject.description"></textarea>
                  <label class="mdl-textfield__label" for="sample5">Description</label>
                </div>
                </br>
                <button @click="hideDescription()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect margin-bottom-2">Submit</button>
              </div>
              </modal>
           </modal>


        </div>
    </body>

    </html>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      projectNameTitle: "",
      NewProject: {},
      projects: []
    };
  },
  mounted() {
    var $vm = this;
    /* For testing purposes, later this will include the person actually signed in: */
    document.cookie = "username=isaac@cpath.org;"
    axios
      .get("http://localhost:3000/projects", {
        params: { username: document.cookie.match(new RegExp("username" + '=([^;]+)'))[1] }
      })
      .then(function(response) {
        console.log("Mount: ", response)
        $vm.projects = response.data;
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
      this.NewProject.name = "";
      this.NewProject.description = "";
      this.$modal.hide("NewProjectModal");
    },
    showFiles: function(nameOfProject, index) {
      this.projectNameTitle = nameOfProject;
      this.$modal.show("ProjectFilesModal");
    },
    showDescription() {
      this.$modal.show("ProjectDescription");
    },
    hideDescription() {
      this.$modal.hide("ProjectDescription");
    },
    addProjectToTable: function(responseProject) {
      this.projects.push({ active: false, name: responseProject.name, description: responseProject.description });
      this.hide();
    },
    addDescriptionToTable: function() {
      this.projects.push({ active: false, name: this.NewProject.name, description: this.NewProject.description });
      this.hideDescription();
    },
    createNewProject () {
      let projectData = {
        username: this.getCookieValue("username"),
        project: this.NewProject,
        active: false
      };

      /* TODO: place the url for POST in .envrc */
      axios.post("http://localhost:3000/projects", projectData).then((res) => {
        console.log(res)
          this.addProjectToTable(res.data)
      }).catch(function(err) {
        console.log(err)
      })
    },
    addProjectNameToAPI() {
      let projectData = {
        username: this.getCookieValue("username"),
        project: this.NewProject,
        active: false
      };

      axios
        .post("http://localhost:3000/projects", projectData)
        .then(function(response) {})
        .catch(function(error) {
          console.log(error);
        });
      this.addProjectToTable();
      this.hide();
    },
    getCookieValue(a) {
      var b = document.cookie.match("(^|;)\\s*" + a + "\\s*=\\s*([^;]+)");
      return b ? b.pop() : "";
    }
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
