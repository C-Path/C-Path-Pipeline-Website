<template lang="pug">
  section
    section
      //- h1(id="try-it-out") Try it out!
      div(id="dropzone")
        form(action="/upload" class="dropzone needsclick dz-clickable" id="demo-upload")
            div.dz-message.needsclick Drop files here or click to upload.
              //- <span class="note needsclick">(This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)</span>
</template>

<script>
export default {
};
</script>

<style>
section {
  background: #E8E9EC;
  /*padding: 1.4rem 1.4rem 2.8rem 1.4rem;*/

  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

section > * {
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
}

h1 {
  font-size: 1.8rem;
  color: #0087F7;
  -webkit-font-smoothing: antialiased;
  line-height: 2.2rem;
}

#dropzone {
  margin-bottom: 3rem;
}

.dropzone {
  border: 2px dashed #0087F7;
  border-radius: 5px;
  background: white;
  min-height: 150px;

  cursor: pointer;
}

.dropzone.dz-clickable .dz-message, .dropzone.dz-clickable .dz-message * {
}

.dropzone .dz-message {
  text-align: center;
  margin: 2em 0;
}
</style>

