<template lang="html">
    <html>
    <head>
    </head>
    <body>
        <h3>User Projects</h3>
        <div>
            <!-- table -->
        </div>
        <div>
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" @click="show">Create New Project</button>
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
           <form action="/#/fileupload">
            <input class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" type="submit" value="Add New File" />
            </form>
        </div>
    </body>

    </html>
</template>

<script>
export default {
  
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
</style>