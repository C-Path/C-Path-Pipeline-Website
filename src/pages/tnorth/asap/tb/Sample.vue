<template lang="pug">
article
  center
    h1 TB Clinical ASAP Results for Sample: {{ sample['@name'] }}
    br
    br
    table.table-header-rotated
      tr
        th.norotate Sample
        th.rotate
          div
            span
              em M. tubercolosis
              |  Confirmed
        th.rotate(v-for="drug in drugs")
          div
            span {{ drug }} Resistance
      tr
        td.norotate {{ sample['@name'] }}
        td.rotate(align="center")
          //- FIXME: toggle between check and cross
          img(src="check.png")
        //- FIXME: check each sample for resistance
        td.rotate(v-for="drug in drugs") Ind.
  br
  br

  table(border="2" rules="rows")
    tr
      th(colspan="2") Clinical Summary for Sample: {{ sample['@name'] }}
    tr(v-for="significance in allSignificance" v-if="!(significance['@flag'] || significance['@changes'])")
      td TODO
      td {{ significance['#text'] }}

  br
  br

  h3 Resistance Mutations Present in Sample: {{ sample['@name'] }}

  table(border="2" width="100%")
    tr
      th Gene Target:
      th(v-for="assay in sample.assay" v-if="['SNP', 'ROI'].includes(assay['@type'])")
        | {{ assay['@name'] }} {{ assay['@type'] === 'SNP' ? 'SNP' : 'codon' }} (% res)
    tr
      th Mutations:
      td(v-for="assay in sample.assay" v-if="assay['@type'] !== 'presence/absence'" align="center")
        em(v-if="assay.amplicon.significance && assay.amplicon.significance['@flag']")
          | {{ assay.amplicon.significance['@flag'] }}

  em Percentages indicate the percentage of the sample containing that mutation, a value of 'none' indicates that no resistant mutations were present in that gene.
  br
  br
  //- <a href="{@name}_details.html">Click here for more sample details</a>
  router-link(:to="{ path: 'detail' }" append) Click here for more sample details
  br
  br
  //- a(href="../{/analysis/@run_name}.html") Click here to return to the run summary
  router-link(:to="{ path: '../..' }" append) Click here to return to the run summary
</template>

<script>
// import axios from 'axios';
import sample from './data.sample';

// eslint-disable-next-line no-unused-vars
function significance(object) {
  return Object.keys(object).some(key => key);
}

function loadData(to, from, next) {
  /*
  axios.get(`/api/asap/results/${to.params.id}`).then(response =>
    next(vm => {
      // eslint-disable-next-line no-param-reassign
      vm.sample = Object.values(response.data)[0].sample;
    }),
  );
  */
  next(vm => {
    // eslint-disable-next-line no-param-reassign
    vm.sample = Object.values(sample)[0].sample;
  });
}

export default {
  props: {
    id: {
      type: Number,
      default: 0,
      // FIXME: reenable
      // required: true,
    },
  },
  data() {
    return {
      sample: {},
      drugs: [
        'Rifampin',
        'Isoniazid',
        'Quinolone',
        'Kanamycin',
        'Capreomycin',
        'Amikacin',
        'Pyrazinamide',
        'Ethambutal',
      ],
    };
  },
  beforeRouteEnter: loadData,
  beforeRouteUpdate: loadData,
};
</script>

<style src="./resistance.css">

</style>
