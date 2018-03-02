<template lang="pug">
table.table
  thead
    tr
      th Project
      th Sample Name
      th Last Modified
      //- th Created At
      th Submitted At
      //- th Started At
      th Completed At
  tbody
    tr(v-for="(run, index) in files" @click="$router.push(`/tnorth/asap/0.5.0/projects/default/reports/tb/samples/${run.Xml}`)")
      td {{ currentProject }}
      td {{ run.Fastq.SampleName }}
      td {{ run.Fastq.R1.LastModified | formatDate }}
      //- td {{ run.Fastq.R1.CreatedAt | formatDate }}
      td {{ run.Fastq.SubmittedAt | formatDate }}
      //- td {{ run.Fastq.StartedAt | formatDate }}
      td {{ run.Fastq.CompletedAt | formatDate }}
      td {{ run.Xml }}
</template>

<script>
import axios from 'axios';

export default {
  filters: {
    formatDate(unixTimestamp) {
      if (!unixTimestamp) return '';
      const date = new Date(unixTimestamp * 1000);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    },
  },
  props: {
    endpoint: {
      type: String,
      default: '/api/files',
    },
    interval: {
      type: Number,
      default: 30000,
    },
  },
  data() {
    return {
      files: [],
      currentProject: localStorage.getItem('currentProject')
    };
  },
  mounted() {
    this.loadData();
    setInterval(() => {
      this.loadData();
    }, this.interval);
  },
  methods: {
    loadData() {
      /* TODO: hit the database and pull in file names to display*/
    //   console.log('loadData', this.endpoint, this.interval);
    //   axios
    //     .get(this.endpoint)
    //     .then(response => {
    //       // TODO: document the expected response.
    //       // eslint-disable-next-line no-param-reassign
    //       this.files = response.data;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       throw err;
    //     });
    },
  },
};
</script>

<style src="bootstrap/dist/css/bootstrap.min.css">

</style>
