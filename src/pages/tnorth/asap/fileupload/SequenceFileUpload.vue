<template lang="pug">
section
  section.jumbotron
    div.container
      h1.display-4 Amplicon Sequencing Analysis Pipeline
      p.lead
          hr.my-4
      p.lead
        | Select
        |
        span(style="font-family: monospace") fastq.gz
        |
        | files to run through the ASAP pipeline on our
        |
        a(href="https://aws.amazon.com/")
          | AWS
          i.fas.fa-external-link-alt
        |
        | computer cluster.
      p.lead
        | Files are grouped as single/paired-end reads based on filename assuming the
        |
        a(href="https://support.illumina.com/help/BaseSpace_OLH_009008/Content/Source/Informatics/BS/NamingConvention_FASTQ-files-swBS.htm")
          | Illumina Naming Convention
          i.fas.fa-external-link-alt
  section.container
    h1.project-name.font-weight-200.font-size-5 {{currentProject}}
    h4.font-weight-200.font-size-2-5 Select the pipeline you would like to upload files to:
    div.font-size-1-5.font-weight-300
      label.margin-1.margin-right-2.font-weight-300
        input.margin-right-0-5(type='radio', name='pipeline-name', value=1, checked='')
        | ASAP
      label.font-weight-300
        input.margin-right-0-5(type='radio', name='pipeline-name', value=0, checked='')
        | UVP

    div.btn-group(role="group" aria-label="File Upload Controls")
      button.btn.btn-outline-primary.fileinput-button.font-weight-250(type="button")
        i.fa.fa-plus(aria-hidden="true")
        span Add files...
        input(type="file" name="files[]" multiple v-on:change="addFiles")
      button.btn.btn-outline-success.fileinput-button.font-weight-250(type="button" v-on:click="startUpload")
        i.fa.fa-play(aria-hidden="true") &nbsp;
        span Start upload
    div.card.font-size-2.font-weight-300
      div.card-header.d-flex.justify-content-between
        span Single-end Reads
        //- button.btn.btn-default.rounded-circle(type="button")
        //-   i.fa.fa-refresh(aria-hidden="true")
      ul.list-group.list-group-flush
        li.list-group-item.no-padding(v-for="sample in singleEndReads" v-bind:key="sample.name")
          upload-progress-bar.monospace(
            :file="sample.R1"
            :metadata="sample.metadata.then(m => m.R1)"
            :start="sample.start"
            @onSuccess="startNext(singleEndReads)"
            @onError="startNext(singleEndReads)")

    div.card.font-size-2.font-weight-300
      div.card-header.d-flex.justify-content-between
        span.tooltip--right(data-tooltip="Illumina Naming convention: .*_S\\d+_L\\d{3}_R[1,2]_001.fastq.gz") Paired-end Reads
        //- button.btn.btn-default.rounded-circle(type="button")
        //-   i.fa.fa-refresh(aria-hidden="true")
      ul.list-group.list-group-flush
        li.list-group-item.no-padding(v-for="sample in pairedEndReads" v-bind:key="sample.name")
          upload-progress-bar.monospace(
            :file="sample.R1"
            :metadata="sample.metadata.then(m => m.R1)"
            :start="sample.start"
            @onSuccess="startNext(pairedEndReads)"
            @onError="startNext(pairedEndReads)")
          upload-progress-bar.monospace(
            :file="sample.R2"
            :metadata="sample.metadata.then(m => m.R2)"
            :start="sample.start")
  section.jumbotron
    div.container
      p.lead
        | The table below lists samples you uploaded.
      p.lead
        a.btn.btn-primary.btn-lg.font-size-2.font-weight-200(href="https://pathogen.tgen.org/ASAP/TB_Example_Set.html" role="button")
          | Example ASAP Report
          i.fas.fa-external-link-alt
  section.container.font-size-1-5
    file-index(:endpoint="endpoint" :interval="30000")
</template>

<script>
import FileIndex from "@/pages/tnorth/asap/FileIndex";
import UploadProgressBar from "./UploadProgressBar";
import Sha256Worker from "./sha256.worker";
import resolveMetadata from "./resolveMetadata";

export default {
  components: {
    UploadProgressBar,
    FileIndex
  },
  data() {
    return {
      endpoint: "/api/files",
      error: "TODO: remove test error",
      projectName: localStorage.getItem("currentProject"),
      pairedEndReads: [],
      singleEndReads: [],
      unmatchedReads: [],
      currentProject: localStorage.getItem("currentProject"),
      pipelineName: localStorage.getItem("currentPipeline"),
      pipelineVersion: localStorage.getItem("pipelineVersion")
    };
  },
  methods: {
    partitionFilesByName(filesByName) {
      Object.values(filesByName).forEach(file => {
        if (!(file instanceof File)) {
          throw new TypeError(
            "expected parameter to be an object where the " +
              "values are instances of File"
          );
        }
      });

      const fastqExtension = ".fastq.gz";
      const fastqByReadNumber = Object.values(filesByName)
        .filter(file => file.name.endsWith(fastqExtension))
        .reduce((obj, file) => {
          // See: https://support.illumina.com/help/BaseSpace_OLH_009008/Content/Source/Informatics/BS/NamingConvention_FASTQ-files-swBS.htm
          const illuminaRegex = /^(.*(?:_S\d+)?(?:_L\d{3})?)_(R[12])_001.fastq.gz$/i;
          const match = illuminaRegex.exec(file.name);

          let sampleName = file.name.slice(0, -fastqExtension.length);
          let readNumber = "R1";

          if (match) {
            [sampleName, readNumber] = [match[1], match[2]];
          }

          // Ensure the property is initialized
          obj[sampleName] = obj[sampleName] || {};

          if (obj[sampleName][readNumber]) {
            throw new Error("TODO: throw overwriting readNumber error");
          }

          obj[sampleName][readNumber] = file;

          return obj;
        }, {});

      // Partition into paired/single end reads and attach metadata to signal
      // the server when it should check for a corresponding file.
      const pairedEndReads = [];
      const singleEndReads = [];
      const unmatchedReads = [];
      for (const sampleName in fastqByReadNumber) {
        if (fastqByReadNumber.hasOwnProperty(sampleName)) {
          const sample = fastqByReadNumber[sampleName];

          sample.name = sampleName;
          sample.start = false;
          sample.metadata = resolveMetadata(
            this.endpoint,
            this.projectName,
            sample.name,
            sample.R1,
            sample.R2,
            sample.contributed,
            sample.toBeDeleted,
            this.pipelineName,
            this.pipelineVersion
          );

          if (sample.R1 && sample.R2) {
            pairedEndReads.push(sample);
          } else if (sample.R1) {
            singleEndReads.push(sample);
          } else {
            unmatchedReads.push(sample);
          }
        }
      }

      // TODO: add cram/bam
      return {
        pairedEndReads,
        singleEndReads,
        unmatchedReads
      };
    },

    // addFiles merges the previously selected files with the newly selected files.
    //
    // To avoid adding duplicates, the files are hashed by filename.
    // Existing files are hashed first so they are not replaced by the new files.
    //
    // The scenario of different files sharing the same name is ignored
    // primarily because it is considered a fringe use-case and I do not
    // know how to detect it in a browser.
    //
    // TODO: add support for Bam files.
    addFiles(event) {
      const fileList = event.target.files;
      const filesByName = {};

      for (let i = 0; i < this.pairedEndReads.length; i += 1) {
        const sample = this.pairedEndReads[i];
        filesByName[sample.R1.name] = sample.R1;
        filesByName[sample.R2.name] = sample.R2;
      }

      for (let i = 0; i < this.singleEndReads.length; i += 1) {
        const sample = this.singleEndReads[i];
        filesByName[sample.R1.name] = sample.R1;
      }

      // Add new files ignoring duplicates by filename.
      for (let i = 0; i < fileList.length; i += 1) {
        const file = fileList[i];

        filesByName[file.name] = file;
      }

      ({
        singleEndReads: this.singleEndReads,
        pairedEndReads: this.pairedEndReads,
        unmatchedReads: this.unmatchedReads
      } = this.partitionFilesByName(filesByName));
    },
    startNext(array) {
      for (let i = 0; i < array.length; i += 1) {
        if (!array[i].start) {
          // eslint-disable-next-line no-param-reassign
          array[i].start = true;
          break;
        }
      }
    },
    startUpload() {
      this.startNext(this.singleEndReads);
      this.startNext(this.pairedEndReads);
    }
  }
};
</script>

<style src="bootstrap/dist/css/bootstrap.min.css"></style>

<style scoped>
.fileinput-button {
  position: relative;
  overflow: hidden;
  display: inline-block;
  font-size: 2rem;
}

.fileinput-button input {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  opacity: 0;
  -ms-filter: "alpha(opacity=0)";
  font-size: 200px !important;
  direction: ltr;
  cursor: pointer;
}

.project-name {
  border-bottom: 3px solid black;
  width: 21%;
}

.font-size-2 {
  font-size: 2rem;
}

.font-size-2-5 {
  font-size: 2.5rem;
}

.font-size-5 {
  font-size: 5rem;
}

.font-weight-200 {
  font-weight: 200;
}

.font-weight-300 {
  font-weight: 300;
}

.font-weight-250 {
  font-weight: 250;
}

.margin-right-2 {
  margin-right: 2rem;
}

.card {
  margin: 1.5rem 0;
  /* box-shadow was copied from https://mdbootstrap.com/components/cards/ to give the card depth */
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}

/*
Override Bootstrap .list-group-item { padding: 0.75rem 1.25rem; }
The progress-bar should fill the entire element.
 */
.no-padding {
  padding: 0;
}

.monospace {
  font-family: monospace;
}
</style>

<style lang="scss">
$cubic: cubic-bezier(0.64, 0.09, 0.08, 1);

[class^="tooltip"] {
  position: relative;
  &:after {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    content: attr(data-tooltip);
    padding: 6px 10px;
    top: 1.4em;
    left: 50%;
    transform: translateX(-50%) translateY(-2px);
    background: grey;
    color: white;
    white-space: nowrap;
    z-index: 2;
    border-radius: 2px;
    transition: opacity 0.2s $cubic, transform 0.2s $cubic;
  }
  &:hover {
    &:after {
      display: block;
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) translateY(0);
    }
  }
}

.tooltip--left {
  &:after {
    top: -4px;
    left: 0;
    transform: translateX(-112%) translateY(0);
  }
  &:hover {
    &:after {
      transform: translateX(-110%) translateY(0);
    }
  }
}

.font-size-1-5 {
  font-size: 1.5rem;
}
.margin-1 {
  margin: 1rem;
}
.margin-right-0-5 {
  margin-right: 0.5rem !important;
}

.tooltip--right {
  &:after {
    top: -4px;
    left: 100%;
    transform: translateX(12%) translateY(0);
  }
  &:hover {
    &:after {
      transform: translateX(10%) translateY(0);
    }
  }
}

.tooltip--triangle {
  &:before {
    content: "";
    width: 0;
    height: 0;
    border-left: solid 5px transparent;
    border-right: solid 5px transparent;
    border-bottom: solid 5px grey;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    transform: translateX(-50%) translateY(-2px);
    top: 1.1em;
    left: 50%;
    transition: opacity 0.2s $cubic, transform 0.2s $cubic;
    z-index: 3;
  }
  &:hover {
    &:before {
      display: block;
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) translateY(0);
    }
  }
}
</style>
