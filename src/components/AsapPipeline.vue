<template lang="pug">
section
  //- TODO: extract the drop-zone accepted extensions as a parameter.
  drop-zone(@change='addFiles')
  progress-bar(v-for='file in sortedFiles' v-bind:key="file.name" v-bind:file='file')
</template>

<script>
import DropZone from '@/components/DropZone2';
import ProgressBar from '@/components/ProgressBar';

export default {
  data() {
    return {
      files: {},
    };
  },
  computed: {
    sortedFiles() {
      return Object.values(this.files).map((e) => {
        // Get the SampleName assuming the following naming convention:
        // SampleName_S1_L001_R1_001.fastq.gz
        const idx = e.name.lastIndexOf('_S');
        let sampleName = '';

        if (idx > 0) {
          sampleName = e.name.slice(0, idx);
        } else {
          sampleName = 'error: expected Illumina naming convention';
        }

        return {
          name: e.name,
          sampleName,
          isIllumina: idx > 0,
          file: e,
        };
      }).sort((a, b) => {
        // Put errors at the top of the list, then sort by name.
        if ((!a.isIllumina && b.isIllumina) || a.name < b.name) {
          return -1;
        }
        if ((a.isIllumina && !b.isIllumina) || a.name > b.name) {
          return 1;
        }
        return 0;
      });
    },
  },
  methods: {
    addFiles(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i += 1) {
        this.$set(this.files, files[i].name, files[i]);
      }
    },
  },
  components: {
    DropZone,
    ProgressBar,
  },
};
</script>

<style scoped>
section {
  margin: 4rem;
}
</style>
