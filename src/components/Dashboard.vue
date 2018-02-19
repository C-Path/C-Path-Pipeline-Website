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

            <modal name="NewProjectModal" height="auto" :scrollable="true">
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

          <!--  <modal name="ProjectFilesModal" height="auto" :scrollable="true">
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
                  <textarea class="mdl-textfield__input border-light" type="text" rows= "7" id="sample5" v-model="description"></textarea>
                  <label class="mdl-textfield__label" for="sample5">Description</label>
                </div>
                </br>
                <button @click="hideDescription()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect margin-bottom-2">Submit</button>
              </div>
              </modal>
           </modal> -->


        </div>
    </body>

    </html>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      NewProject: {
        name: '',
        description: '',
        username: this.getCookieValue("username"),
        active: false,
      },
      projectNameTitle: "",
      description:'',
      projects: []
    };
  },
  mounted() {
    var $vm = this;
    axios
      .get("http://localhost:3000/projects", {
        params: { username: this.getCookieValue("username") }
      })
      .then(function(response) {
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
    hide () {
      this.$modal.hide("NewProjectModal");
    },
    showFiles (nameOfProject, index) {
      localStorage.setItem('currentProject', nameOfProject)
      console.log(nameOfProject)
      this.$router.replace(this.$route.query.redirect || '/upload')
      // this.$modal.show("ProjectFilesModal");
    },
    showDescription () {
      this.$modal.show("ProjectDescription");
    },
    hideDescription () {
      this.$modal.hide("ProjectDescription");
    },
    addProjectToTable (responseProject) {
      this.projects.push(responseProject);
      this.hide();
    },
    resetNewProject () {
      this.NewProject = {
        name: '',
        description: '',
        username: this.getCookieValue("username"),
        active: false,
      }
    },
    createNewProject () {
      /* TODO: place the url for POST in .envrc */
      axios.post("http://localhost:3000/projects", this.NewProject).then((res) => {
          this.addProjectToTable(res.data)
          this.resetNewProject()
      }).catch(function(err) {
        console.log(err)
      })
    },
    getCookieValue (a) {
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
