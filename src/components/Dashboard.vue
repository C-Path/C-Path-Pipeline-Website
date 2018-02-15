<template lang="html">
    <html>
    <head>
    </head>
    <body>
        <h3 class="margin-left-1">User Projects</h3>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect new-project-btn" @click="show">Create New Project</button>
        <div class="margin-bottom-2 margin-left-3">
            <table class="mdl-data-table mdl-shadow--2dp table-width">
                <thead>
                    <tr>
                    <th class="mdl-data-table__cell--non-numeric table-width-10">Active</th>
                    <th class="mdl-data-table__cell--non-numeric">Project Name</th>
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
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="margin-left-3">
            <!-- New Project Modal -->
            <modal name="NewProjectModal" height="auto" :scrollable="true">
               <h3 class="text-align-center">Create New Project</h3>
              <form action="#">
                <div class="text-align-center">
                    <label for="projectName">Project Name:</label>
                    <input class="input" type="text" id="projectName" placeholder="Project Name" name="projectName" v-model="NewProject.name" required>
                </div>
               </form>
               <br>
               <div class="text-align-center margin-bottom-2">
                   <button v-on:click="addProjectNameToAPI()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Add Project</button>
                </div>
           </modal>
           <!-- Project Files Modal -->
           <modal name="ProjectFilesModal" height="auto" :scrollable="true">
               <h3 class="text-align-center">{{projectNameTitle}} Files:</h3>
                    <table class="mdl-data-table mdl-shadow--2dp margin-left-4 table-width">
                <thead>
                    <tr>
                    <th class="mdl-data-table__cell--non-numeric">Select</th>
                    <th class="mdl-data-table__cell--non-numeric">File Name</th>
                    <th class="mdl-data-table__cell--non-numeric">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr  v-for="(file, yindex) in files">
                        <td class="mdl-data-table__cell--non-numeric">
                            <label class = "mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" :for = "yindex">
                            <input type = "checkbox" v-model=file.selected :id = "yindex" class = "mdl-checkbox__input">
                            </label>
                        </td>
                        <td class="mdl-data-table__cell--non-numeric">{{file.name}}</td>
                        <td class="mdl-data-table__cell--non-numeric">{{file.status}}</td>
                    </tr>
                </tbody>
            </table>
               <br>

           </modal>
           <a href="/fileupload">
                <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect margin-right-2">Add New File</button>
            </a>

        </div>
    </body>

    </html>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      inputData: "",
      projectNameTitle: "",
      NewProject: { name: "", active: false },
      files: [
        { selected: false, name: "SRR_102237_1.fastq", status: "In Progress" },
        {
          selected: false,
          name: "SRR_3324_1.fastq.fastq",
          status: "Submitted"
        },
        { selected: false, name: "SRR_3475_1.fastq", status: "Completed" },
        { selected: false, name: "SRR_3475_2.fastq", status: "Rejected" }
      ],
      projects: [{ name: "" }]
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
        $vm.projects = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    show() {
      this.inputData = "";
      this.$modal.show("NewProjectModal");
    },
    hide() {
      this.$modal.hide("NewProjectModal");
    },
    showFiles: function(nameOfProject, index) {
      this.projectNameTitle = nameOfProject;
      this.$modal.show("ProjectFilesModal");
    },
    addProjectToTable: function() {
      this.projects.push({ active: false, name: this.NewProject.name });
      this.hide();
    },
    addProjectNameToAPI() {
      let projectData = {
        username: this.getCookieValue("username"),
        name: this.NewProject.name,
        active: false
      };
      /* TODO: place the url for POST in .envrc */
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
</style>
