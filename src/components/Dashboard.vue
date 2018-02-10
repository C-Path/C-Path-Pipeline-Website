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
            <button @click="show">Create New Project</button>
           <modal name="NewProjectModal" height="auto" :scrollable="true">
               <h3 class="text-align-center">Create New Project</h3>
               <div class="text-align-center">
                   <label for="project-name">Project name:</label>
                   <input id="project-name" name="projectName" placeholder="Project name" required>
               </div>
               <br>
               <div class="text-align-center">
               <button  @click="hide">Create</button>

                </div>
           </modal>
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
</style>