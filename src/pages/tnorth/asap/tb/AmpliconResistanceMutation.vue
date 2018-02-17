<template lang="pug">
//-
  1. Display first flagged significance
  2. Display all SNP significance
  3. Display all Region Of Interest significance
span
  em(v-if="containsSignificanceFlag" v-text="firstSignificanceFlag")
  span(v-else-if="containsSnpSignificance")
    span(v-for="snp in amplicon" v-if="snp.significance")
  span(v-else-if="containsRegionOfInterestSignificance")
  span(v-else) none
</template>

<script>
export default {
  props: {
    amplicon: {
      type: Object
      required: true,
    },
  },
  computed: {
    firstSignificanceFlag() {},
  },
};
</script>
