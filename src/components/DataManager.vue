<template lang="html">
    <html>
    <head>
    </head>
    <body>
      <div class="tableBody">
      <table>
        <tr>
          <th>Select</th>
          <th class="dataFile">Data File</th>
        </tr>
        <tr v-for="file in files">
          <td><input type="checkbox" v-model=file.selected></td>
          <td>{{file.name}}</td>
        </tr>
      </table>
      <div class="button">
        <button>Transfer</button>
    </div>
    </form>
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
