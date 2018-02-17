<template lang="pug">
  article

    center
      h1 Detailed ASAP Results for Sample: {{ sample['@name'] }}
    table(border="2" rules="rows")
      tr
        th(colspan="2") Clinical Summary for Sample: {{ sample['@name'] }}

    h3
      em M. tuberculosis
      | identification for sample: {{ sample['@name'] }}

    table(border="2" width="100%")
      tr
        th Assay Name
        th Average Read Depth
        th Coverage Breadth
        th Significance
        th SNPs found(% reads containing SNP)

    h3 Drug resistance assays for sample: {{ sample['@name'] }}
    section.ampGraph
      h2 Amplicon Graph {{ chartID }}
      canvas.ampCanvas(ref="ampliconGraph" height="90vh")

    table(border="2" width="100%")
      tr
        th Assay Name
        th Average Read Depth
        th Known Mutations - # reads containing mutation(% reads) - Significance
        th Other SNPs found(% reads containing SNP)
      tr(
        v-for="assay in sample.assay"
        v-if="['SNP', 'ROI', 'mixed'].includes(assay['@type'])"
        @click="showChart(assay)"
      )
        td {{ assay['@name'] }}
        td {{ assay.amplicon.average_depth }}
        td(v-if="assay.amplicon['@reads'] > 0")
          span(v-for="snp in assay.amplicon.snp" v-if="snp['@name'] !== 'unknown'")
            span(v-if="snp['@name'] === 'position of interest'") {{ snp['@position'] + snp['@reference'] + '->' + snp['@snp_call'] }}
            span(v-else) {{ snp['@name'] }}
            span(v-if="snp.snp_call") - {{ snp.snp_call['@count'] }}({{ snp.snp_call['@percent'] }}%)
</template>

<script>
import axios from 'axios';
import Chart from 'chart.js';
import 'chartjs-plugin-zoom';

function newChart(canvas, sequence, depths, proportions) {
  return new Chart(canvas, {
    animation: false,
    type: 'bar',
    data: {
      labels: sequence,
      datasets: [
        {
          type: 'line',
          label: 'Consensus Proportion',
          yAxisID: 'proportion',
          data: proportions,
          borderColor: '#5F9EA0',
          borderWidth: 5,
          fill: false,
          pointRadius: 0,
          pointHoverRadius: 3,
          pointHoverBorderColor: '#B22222',
        },
        {
          type: 'bar',
          label: 'Read Depth',
          yAxisID: 'depth',
          data: depths,
          backgroundColor: '#FFDEAD',
          borderColor: '#DEB887',
          borderWidth: 1,
          hoverBorderColor: '#B22222',
        },
      ],
    },
    options: {
      responsive: true,
      hover: {
        mode: 'label',
      },
      tooltips: {
        mode: 'label',
      },
      scales: {
        yAxes: [
          {
            id: 'depth',
            position: 'left',
            ticks: {
              beginAtZero: true,
            },
          },
          {
            id: 'proportion',
            position: 'right',
            ticks: {
              beginAtZero: true,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              display: false,
            },
            categoryPercentage: 1.0,
          },
        ],
      },

      // Container for pan options
      pan: {
        // Boolean to enable panning
        enabled: true,

        // Panning directions. Remove the appropriate direction to disable
        // Eg. 'y' would only allow panning in the y direction
        mode: 'xy',
        rangeMin: {
          // Format of min pan range depends on scale type
          x: null,
          y: null,
        },
        rangeMax: {
          // Format of max pan range depends on scale type
          x: null,
          y: null,
        },
      },

      // Container for zoom options
      zoom: {
        // Boolean to enable zooming
        enabled: true,

        // Enable drag-to-zoom behavior
        drag: true,

        // Zooming directions. Remove the appropriate direction to disable
        // Eg. 'y' would only allow zooming in the y direction
        mode: 'xy',
        rangeMin: {
          // Format of min zoom range depends on scale type
          x: null,
          y: null,
        },
        rangeMax: {
          // Format of max zoom range depends on scale type
          x: null,
          y: null,
        },
      },
    },
  });
}

function loadData(to, from, next) {
  axios
    .get(`/api/asap/results/${to.params.id}`)
    .then(response =>
      next(vm => {
        // It is assumed response.data is a JSON object of the form:
        // "<sha256>": <ASAP pipeline XML sample output encoded as JSON via the xmltodict python library>
        // Object.values is used to access the sample given the sha256 is unknown.
        //
        // eslint-disable-next-line no-param-reassign
        vm.sample = Object.values(response.data)[0].sample;
      }),
    )
    .catch(err => next(err));
}

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      sample: null,
      amplinconGraph: null,
    };
  },
  methods: {
    showChart(assay) {
      const amplicon = assay.amplicon;
      if (this.ampliconGraph) {
        this.ampliconGraph.destroy();
      }
      this.ampliconGraph = newChart(
        this.$refs.ampliconGraph,
        amplicon.consensus_sequence.split(''),
        amplicon.depths.split(','),
        amplicon.proportions.split(','),
      );
    },
  },
  beforeRouteEnter: loadData,
  beforeRouteUpdate: loadData,
};
</script>

<style>
/*
.table-header-rotated {
border-collapse: collapse;
}
.table-header-rotated td.rotate {
width: 45px;
}
.table-header-rotated td.norotate {
text-align: left;
white-space: nowrap;
}
.table-header-rotated th.norotate {
padding: 10px 40px;
vertical-align: bottom;
}
.table-header-rotated td {
text-align: center;
padding: 10px 5px;
border: 2px solid #aaa;
}
.table-header-rotated th.rotate {
height: 140px;
white-space: nowrap;
}
.table-header-rotated th.rotate <xsl-text disable-output-escaping="yes"><![CDATA[>]]></xsl-text> div {
-webkit-transform: translate(40px, 51px) rotate(315deg);
-ms-transform: translate(40px, 51px) rotate(315deg);
transform: translate(40px, 51px) rotate(315deg);
width: 30px;
}
.table-header-rotated th.rotate <xsl-text disable-output-escaping="yes"><![CDATA[>]]></xsl-text> div <xsl-text disable-output-escaping="yes"><![CDATA[>]]></xsl-text> span {
border-bottom: 2px solid #aaa;
padding: 5px 10px;
}
.table-header-rotated th.row-header {
padding: 0 10px;
border-bottom: 2px solid #aaa;
}
 */
</style>

<style>
/*
.ampGraph {
position: fixed;
top: 0;
right: 0;
bottom: 0;
left: 0;
background: rgba(80,80,80,0.8);
z-index: 99999;
opacity: 0;
-webkit-transition: opacity 400ms ease-in;
-moz-transition: opacity 400ms ease-in;
transition: opacity 400ms ease-in;
pointer-events: none;
}
.ampGraph:target {
  opacity:1;
  pointer-events: auto;
}
.ampGraph <xsl-text disable-output-escaping="yes"><![CDATA[>]]></xsl-text> div {
  width: 95vw;
  height: 60vh;
  position: relative;
  margin: 10% auto;
  padding: 5px 20px 13px 20px;
  border-radius: 10px;
  background: #fff;
  background: -moz-linear-gradient(#fff, #999);
  background: -webkit-linear-gradient(#fff, #999);
  background: -o-linear-gradient(#fff, #999);
}
.close {
  background: #606061;
  color: #FFFFFF;
  line-height: 25px;
  position: absolute;
  right: -12px;
  text-align: center;
  top: -10px;
  width: 24px;
  text-decoration: none;
  font-weight: bold;
  -webkit-border-radius: 12px;
  -moz-border-radius: 12px;
  border-radius: 12px;
  -moz-box-shadow: 1px 1px 3px #000;
  -webkit-box-shadow: 1px 1px 3px #000;
  box-shadow: 1px 1px 3px #000;
}
.close:hover { background: #00d9ff; }
.ampCanvas {
  overflow-x: auto;
}
 */
</style>
</style>
