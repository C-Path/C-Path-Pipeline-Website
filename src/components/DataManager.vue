<template lang="html">
  <html>
    <head>
    </head>
    <body>
      <h3 class="margin-left-3">Data Transfer</h3>
      <div class="tableBody">
      <table class="mdl-data-table mdl-shadow--2dp">
        <tr>
          <th class="mdl-data-table__cell--non-numeric">Select</th>
          <th class="mdl-data-table__cell--non-numeric dataFile">Data File</th>
        </tr>
        <tr v-for="file in files">
          <td><input class="mdl-checkbox" type="checkbox" v-model=file.selected></td>
          <td class="mdl-data-table__cell--non-numeric">{{file.name}}</td>
        </tr>
      </table>
      <div class="button">
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Transfer</button>
        </div>
      </div>
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
body {
  min-width: 750px;
}

.margin-left-3 {
    margin-left: 3em;
}

table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}

table {
  margin: auto;
  margin-bottom: 50px;
}

th {
  background-color: #D3D3D3;
  padding: 20px;
}

.tableBody {
  margin: auto;
  width: 80%;
  border: 3px solid gray;
  padding: 40px;
}

.dataFile {
  width: 80%;
}

.button {
  text-align: center;
}
</style>
