<template lang="pug">
section
  transition(name="bounce")
    div.alert.alert-danger(role="alert" v-if="error")
      button.close(type="button" @click="error = ''") ×
      strong Whoops!
      |
      | {{ error }}
  section.jumbotron
    h1.display-4 Amplicon Sequencing Analysis Pipeline
    p.lead
        hr.my-4
    p.lead
      | The
      |
      span(style="font-family: monospace") fastq.gz
      |
      | files you select will be uploaded and automatically run through the ASAP pipeline on a 
      |
      a(href="https://aws.amazon.com/")
        | AWS
        i.fas.fa-external-link-alt
      |
      | computer cluster.
    a.btn.btn-primary.btn-lg(href="https://pathogen.tgen.org/ASAP/TB_Example_Set.html" role="button")
      | Example Report
      i.fas.fa-external-link-alt
</template>
