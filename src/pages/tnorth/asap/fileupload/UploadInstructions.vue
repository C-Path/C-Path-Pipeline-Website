<template lang="pug">
div.card.card-inverse
  div.card-header
    ul.nav.nav-tabs.card-header-tabs
      li.nav-item
        a.nav-link.active(href="#") Quick Start
      li.nav-item
        a.nav-link(href="#") Link
      li.nav-item
        a.nav-link.disabled(href="#") Disabled
  div.card-block
    //- p.card-text Quick Start
    ol
      li Select fastq.gz files to analyze
      li Verify the reads are paired correctly
      li Click Start Upload
    //- a.btn.btn-primary(href="#") Go somewhere
</template>

<style scoped>
div.card.card-inverse {
 background-color: #333;
 border-color: #333;
 color: #fff;
}
</style>
