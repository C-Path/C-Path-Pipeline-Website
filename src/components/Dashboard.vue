<template lang="html">
    <html>
    <head>
    </head>
    <body class="margin-left-3">
        <h3>User Projects</h3>
        <div class="margin-botton-2">
            <table class="mdl-data-table mdl-js-data-table">
                <thead>
                    <tr>
                    <th class="mdl-data-table__cell--non-numeric">Active</th>
                    <th class="mdl-data-table__cell--non-numeric">Project Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(project, index) in projects">
                        <td class="mdl-data-table__cell--non-numeric">
                            <label class = "mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" :for = "index">
                            <input type = "checkbox" v-model=project.selected :id = "index" class = "mdl-checkbox__input">
                            </label>	 
                        </td>
                        <td class="mdl-data-table__cell--non-numeric">{{project.name}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect margin-right-2" @click="show">Create New Project</button>
            <modal name="NewProjectModal" height="auto" :scrollable="true">
               <h3 class="text-align-center">Create New Project</h3>
              <form action="#">
                <div class="text-align-center">
                    <label for="sample1">Project Name:</label>      
                    <input class="input" type="text" id="sample1" placeholder="Project Name">
                </div>
               </form>
               <br>
               <div class="text-align-center margin-botton-2">
                   <button @click="hide" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Add Project</button>
                </div>
           </modal>
           <a href="/#/fileupload">
                <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect margin-right-2">Add New File</button>
            </a>
            
        </div>
    </body>

    </html>
</template>

<script>
export default {

    data () {
        return {
     projects: [{selected: false, name: "Research Project 2"},{selected: false, name: "Surveillance Project 1"},{selected: false, name: "EU Study"}],
        }
    },


  
  methods: {
  show () {
    this.$modal.show('NewProjectModal');
  },
  hide () {
    this.$modal.hide('NewProjectModal');
  }
}
}

</script>

<style scoped>
.projectsTable {
  margin-left: 3em;
}

.text-align-center {
    text-align: center;
}

.margin-botton-2 {
    margin-bottom: 2em;
}

.margin-right-2 {
    margin-right: 2em;
}

.margin-left-3 {
    margin-left: 3em;
}
</style>