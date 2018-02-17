<template lang="pug">

article

  header
    section
      h1 Sequencing Report Form: Mycobacterium tuberculosis complex

      table
        tr
          td(colspan="2") Labratory Information: Location
          td Report Date DD/MM/YYYY
        tr
          td(colspan="2") Accession Number: A12345678
          td [BARCODE FOR LIMS]
        tr
          td(colspan="3") Regulatory information: accredidation, validation, labratory developed test, etc.

    section
      table
        tr
          td Patient Identifier: XYZ
          td Birthdate: DD/MM/YYYY
          td Sex M or F
        tr
          td Submitted By: Dr. Jane
          td Submitter number: 123
          td Site Receiving Sample: Hospital
        tr
          td Specimen Type: sputum
          td Source: pulmonary
          td Collection Method: Induced
        tr
          td Date Collected: DD/MM/YYYY
          td(colspan="2") Date Received: DD/MM/YYYY

    section
      h1 Resistance Type: Pre-XDR-TB (aminoglycoside resistant)

  section
    h1 First Line Drug Mutations
    table
      tr
        th Drug
        th Interpretation
        th Confidence
        th Gene Target
        th Result
        th Additional Information
      tr(v-for="mutation in FirstLineDrugMutations")
        td(v-text="mutation.Drug")
        td(v-text="mutation.Interpretation")
        td(v-text="mutation.Confidence")
        td(v-text="mutation.GeneTarget")
        td
          div(v-for="result in mutation.Results" v-text="result")
        td
          div(v-for="message in mutation.AdditionalInformation" v-text="message")

  section
    h1 Second Line Drug Mutations
    table
      tr
        th Drug
        th Interpretation
        th Confidence
        th Gene Target
        th Result
        th Additional Information
      tr(v-for="mutation in SecondLineDrugMutations")
        td(v-text="mutation.Drug")
        td(v-text="mutation.Interpretation")
        td(v-text="mutation.Confidence")
        td(v-text="mutation.GeneTarget")
        td
          div(v-for="result in mutation.Results" v-text="result")
        td
          div(v-for="message in mutation.AdditionalInformation" v-text="message")

  section
    h1 Other Drug Mutations
    table
      tr
        th Drug
        th Interpretation
        th Confidence
        th Gene Target
        th Result
        th Additional Information
      tr(v-for="mutation in OtherDrugMutations")
        td(v-text="mutation.Drug")
        td(v-text="mutation.Interpretation")

  section
    h1 Sequencing Report

    header
      table
        tr
          td Sequencing Method Used: Illumina
          td Check one: amplicon WGS
        tr
          td Analytic Pipeline: ReSeqTBv3.2c
          td Reference Sequence: H37Rv TMC102 (ATCC 27294)

    table
      tr
        td Loci of interest
        td No. reads mapped (Depth of coverage)
        td Proportion of reads covered (Coverage width %)
        td Mutation (% alternate allele frequency)
        td Hetero-resitance Inference
      //-
        tr(v-for="locus in loci")
          th(v-text="locus.name")
          td(v-text="locus.Coverage")
          td(v-text="locus.Proportion")
          td(v-text="alleleFrequency"
          td(v-text="heteroResistanceInference")

  section.container-fluid
    h1 TB Lineage

  section
    h1 Drug Name Abbreviations:
    ul.container-fluid
      li.flex-item(v-for="drug in Drugs" v-text="drug")

  section
    h1 Supplemental Data

    h2 Interpretation Based on Likelihood Ratios of Resistance in ReSeqTB
    p LR - Likelihood ratio: Used in evidence-based medicine for assessing the value of performing a diagnostic test. The sensitivity and specificity of the test is used to determine whether a test result changes the probability that disease exists.

    h2 Resistance Reported by LR Value
    ul
      li Resitant = LR &ge; 5
      li No evidence of resistance = LR &lt; 1
      li Possible resistance = LR &ge; 1 and LR &lt; 5
      Insufficient data = LR value not available due to insufficient data to statistically assess association

    h2 Confidence Reported by LR Value
    ul
      li LR &ge; 10 - high confidence that the mutation confers or is associated with resistance
      li LR &ge; 5 and &lt; 10 - additional data desirable to improve evidence that the mutation confers or is associated with resistance
      li LR &ge; 1 and &lt; 5 - inconclusive evidence that the mutation confers or is associated with resistance
      //- Substantial additional data required.
      li LR &lt; 1 =- No evidence of association between mutation and resistance

</template>

<script>
export default {
  data() {
    return {
      FirstLineDrugMutations: [{
        Drug: 'RIF',
        Interpretation: 'Resistant',
        Confidence: 'High',
        GeneTarget: 'rpoB',
        Results: [
          'Ser531 Leu',
          'C1349 T',
        ],
        AdditionalInformation: [
          'Rifampin resistance predicted',
          'Rifabutin resistance likely',
          'Rifapentine resistance unknown',
        ],
      }],
      OtherDrugMutations: [{
        Drug: 'BDQ',
        Interpretation: 'Possible Resistance',
        Confidence: '',
        GeneTarget: 'atpE',
        Result: 'No mutation',
        AdditionalInformation: [
          'Gene target has shown in vitro resitance in published literature',
        ],
      }],
      /*
      Loci: [{
        GeneTarget: 'rpoB',
        Coverage: 83,
        Proportion: 100,
        Mutations: {
          Allele: 'Ser531',
          PercentAlleleFrequency: 100,
        },
        HeteroResistanceInference: '',
      }, {
        GeneTarget: 'inhA',
        Coverage: 91,
        Proportion: 100,
        // Mutation: {},
        HeteroResistanceInference: '',
      }],
      */
      Drugs: [
        'AMK - amikacin',
        'BDQ - bedaquiline',
        'CAP - capreomycin',
        'CFZ - clofazimine',
        'EMB - ethambutol',
        'ETO - ethionamide / prothionamide',
        'INH - isoniazid',
        'KAN - kanamycin',
        'LZD - linezolid',
        'MFX - moxifloxacin',
        'OFX - ofloxacin / levofloxacin',
        'PZA - pyrazinamide',
        'RIF - rifampin / rifampicin',
      ],
    };
  },
};
</script>

<style scoped>
section {
  padding: 1rem;
}

h1 {
  color: red;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: bold;
}

.container-fluid {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  /*
   * flex-flow (Applies to: parent flex container element)
   * This is a shorthand flex-direction and flex-wrap properties, which together
   * define the flex container's main and cross axes. Default is row nowrap.
   */
  flex-flow: row wrap;
  justify-content: space-around;
  /*flex-direction: column;*/ 
  text-align: left;
}
.flex-item {
  /*flex: 1 100%;*/
  flex: 0 0 25%;
  max-width: 25%;
}
</style>
