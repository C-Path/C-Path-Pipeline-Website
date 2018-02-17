<template lang="pug">
article
  //-
    center
      h1 TB Clinical ASAP Run Summary for: <xsl:value-of select="@run_name"/></h1></center>
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
    tr(v-for="(sample,index) in samples")
      td.norotate
        router-link(:to="`samples/${index}`" append) {{ sample['@name'] }}
      td.rotate(align="center")
        //- FIXME: toggle between check and cross
        img(src="check.png")
      //- FIXME: check each sample for resistance
      td.rotate(v-for="drug in drugs") Ind.
  br
  br
  table(border="1" cellpadding="3")
    tr
      th Sample
      //- FIXME: guard potential samples array index out of bounds exception
      th(v-for="assay in samples[0].assay" v-if="assay['@type'] !== 'presence/absence'")
        span(v-if="assay['@type'] === 'SNP'") {{ assay['@name'] }} SNP (% res)
        span(v-else-if="assay['@type'] === 'ROI'") {{ assay['@name'] }} codon (% res)
        //- assay type is 'gene-variant' or 'mixed'
        span(v-else) {{ assay['@name'] }}
    tr(v-for="(sample, index) in samples")
      td(nowrap="true")
        //- a(href="{/analysis/@run_name}/{./@name}.html") {{ sample['@name'] }}
        router-link(:to="`sample/${index}`" append) Click here for more details
      td(align="center" v-for="assay in sample.assay" v-if="assay['@type'] !== 'presence/absence'")
        //- NB: ignored xslt:for-each select="amplicon"
        //- NB: <when test=".//significance/@flag"> should select the first
            significance flag of any child of amplicon, but the following tests
            suggest it was intended to be the amplicon significance:
            (i.e. ./significance/@flag)
        em(v-if="assay.amplicon.significance && assay.amplicon.significance['@flag']") {{ assay.amplicon.significance['@flag'] }}
        span(v-for="snp in assay.amplicon.snp" v-if="snp.significance")
          span(v-if="snp['@name'] === 'position of interest'") {{ `${snp['@position']}${snp['@reference']}->${snp.snp_call['#text']}` }}
          span(v-else) {{ snp.snp_call['#text'] }}
          span ({{ snp.snp_call['@percent']}}%)
          br
        span(v-for="roi in assay.amplicon.region_of_interest" v-if="roi.significance && !roi.significance['@changes']")
          span(v-for="mutation in roi" v-if="mutation['@percent'] > proportionThreshold")
            | {{ `${mutation['@name']} (${mutation['@percent']}%)}`}}
            br

  em Percentages indicate the percentage of the sample containing that mutation, a value of 'none' indicates that no resistant mutations were present in that gene.
  br
  br
  //- a(href="{@run_name}_details.html") Click here for more details
  router-link(:to="{ path: 'detail' }" append) Click here for more details
</template>

<script>
import sample from './data.sample';
// import samples from './data.samples';

/*
function resistance(sample) {
  const resistance = {};

  const assays = sample.assay;
  for(let i=0; i<assays.length; i++) {
    const amplicons = typeof(assay[i].amplicon) === 'array' ? assay[i].amplicon : [assay[i].amplicon];
    for(let j=0; j<amplicons.length; j++) {
      const amplicon = amplicons[j];
      if (amplicon.significance && amplicon.significance['@flag'] && )
    }
  }
  sample.assay.forEach(assay => {
    const amplicons = typeof(assay.amplicon) === 'array' ? assay.amplicon : [assay.amplicon];
    amplicons.forEach(amplicon => {
    })
    assay.amplicon.
  });
}
*/

const samples = [Object.values(sample)[0].sample];

/*
// eslint-disable-next-line no-unused-vars,no-shadow
function resistance(sample, drugs) {
  // <drug>: true means resistance
  // <drug>: false means indeterminant
  const resistance = {};

  if (sample.assay) {
  }

  sample.assay.forEach(assay => {
    assay.amplicon.forEach(amplicon => {
      amplicon.snp.forEach(snp => {
        if (snp.significance && snp.significance['@flag'])
      });
      amplicon.region_of_interest.forEach(roi => {});
    });
  });
}
*/

export default {
  data() {
    return {
      samples,
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
};
</script>

<style src="./resistance.css">

</style>
