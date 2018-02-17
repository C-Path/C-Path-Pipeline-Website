<template lang="pug">
section
  transition(name="bounce")
    div.alert.alert-danger(role="alert" v-if="error")
      button.close(type="button" @click="error = ''") ×
      strong Whoops!
      |
      | {{ error }}

  //- https://router.vuejs.org/en/advanced/transitions.html
    section.book-header(role="navigation")
      a.btn.pull-left.js-toolbar-action(aria-label="" href="#")
        i.fa.fa-align-justify
      a.btn.pull-left.js-toolbar-action(aria-label="" href="#")
        i.fa.fa-edit
        | Edit This Page
      a.btn.pull-right.js-toolbar-action(aria-label="GitHub" href="#")
        i.fa.fa-github
      div.dropdown.pull-right.js-toolbar-action
        a.btn.toggle-dropdown(aria-label="Share" href="#")
          i.fa.fa-share-alt
        div.dropdown-menu.dropdown-left
          div.dropdown-caret
            span.caret-outer
            span.caret-inner
          div.buttons
            button.button.size-5 Facebook
            button.button.size-5 Google+
            button.button.size-5 Twitter
            button.button.size-5 Weibo
            button.button.size-5 Instapaper
      h1
        i.fa.fa-circle-o-notch.fa-spin
        a(href="..") Transitions

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
    //- p.lead foo bar baz
    a.btn.btn-primary.btn-lg(href="https://pathogen.tgen.org/ASAP/TB_Example_Set.html" role="button")
      | Example Report
      i.fas.fa-external-link-alt
</template>
