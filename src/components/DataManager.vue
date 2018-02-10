<template lang="html">
  <html>
    <head>
    </head>
    <body>
      <h3 class="margin-left-3">Data Manager</h3>
      <table class="align-center mdl-data-table mdl-shadow--2dp">
        <tr>
          <th class="mdl-data-table__cell--non-numeric">Select</th>
          <th class="mdl-data-table__cell--non-numeric dataFile">Data File</th>
        </tr>
        <tr v-for="file in files">
          <td><input class="mdl-checkbox" type="checkbox" v-model=file.selected></td>
          <td class="mdl-data-table__cell--non-numeric">{{file.name}}</td>
        </tr>
      </table>
      <section class="text-align-center">
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Transfer</button>
      </section>
    </body>
  </html>
</template>

<script>
export default {
  methods: {

  },
  data() {
    return {
      files: [{selected: true, name: "SRR_102237_1.fastq"},{selected: false, name: "SRR_3324_1.fastq.fastq"},{selected: false, name: "SRR_3475_1.fastq"},{selected: false, name: "SRR_3475_2.fastq"}],
      wsgQueue: '84',
      tgsQueue: '35',
    };
  },
};
</script>

<style scoped>
.dataFile {
  width: 80%;
}
</style>
