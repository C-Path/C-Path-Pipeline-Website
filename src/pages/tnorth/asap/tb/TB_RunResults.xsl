<style>
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
</style>

<template lang="pug">
  //- <title>Run Summary for: <xsl-value-of select="@run_name"/></title>
  article
    center
      //- <h1>TB Clinical ASAP Run Summary for: <xsl-value-of select="@run_name"/></h1></center>
      //- TODO: instead of run name, put project or number of samples
      h1 TB Clinical ASAP Run Summary for:
    br
    br
    table.table-header-rotated
      tr
        th.norotate Sample
        th.rotate
					div
						span
							em M. tubercolosis
							| Confirmed
        th.rotate(v-for="drug in drugs")
					div
            span {{ drug }} Resistance
				tr(v-for="sample in samples")
          td.norotate
						//- a(href="{/analysis/@run_name}/{./@name}.html") {{ sample['@name'] }}
						a(href="run_name/./@name") {{ sample['@name'] }}
          td.rotate(align="center")
            //- if test=".//significance[not(@flag)]='Mycobacterium tuberculosis confirmed'">
            img(:src="true ? 'check.png' : 'cross.png'" style="width:30px;height:30px;")
            td.rotate(align="center" v-for="drug in drugs")
              //- TODO <font color="red">R | Ind. | S
              | {{ sampleResistance[drug] }}
    br
    br
    table(border="1" cellpadding="3")
      tr
        th Sample
        <xsl-for-each select="sample[position()&lt;=1]">
          <xsl-for-each select="assay[not(@type='presence/absence')]">
            <th nowrap="true">
              <xsl-choose>
                <xsl-when test="@type = 'SNP'"><xsl-value-of select="@name"/> SNP (% res)</xsl-when>
                <xsl-when test="@type = 'ROI'"><xsl-value-of select="@name"/> codon (% res)</xsl-when>
                <xsl-otherwise><xsl-value-of select="@name"/></xsl-otherwise>
              </xsl-choose>
            </th>
          </xsl-for-each>
        </xsl-for-each>
      </tr>
      tr(v-for="sample in samples")
        td(nowrap="true")
          a(href="{/analysis/@run_name}/{./@name}.html") {{ sample['@name'] }}
        td(v-for="assay in sample.assay" v-if="assay.type !== 'presence/absence'" align="center")
          span(v-for="amplicon in assay")
            span(v-if="amplicon.firstSignificanceFlag") {{ amplicon.firstSignificanceFlag }}
            span(v-else-if="amplicon.significance" v-for="snp in amplicon.snp")
              | {{ snp['@name' === 'position of interest'] ? `${snp['@position']}${snp['@reference']}->${snp['snp_call']}` : snp['@name'] }}
              | ({{ snp['snp_call'] / snp['@percent'] }}%)
            em(v-else) none
      <xsl-for-each select="sample">
        <xsl-variable name="prop_filter" select="@proportion_filter * 100"/>
        <tr>
          <td nowrap="true"><a href="{/analysis/@run_name}/{./@name}.html"><xsl-value-of select="@name"/></a></td>
          <xsl-for-each select="assay[not(@type='presence/absence')]">
            <td align="center"><xsl-for-each select="amplicon">
                <xsl-choose>
                  <xsl-when test=".//significance/@flag"><em><xsl-value-of select=".//significance/@flag"/></em></xsl-when>
                  <xsl-when test="snp/significance">
                    <xsl-for-each select="snp">
                      <xsl-if test="significance">
                        <xsl-choose>
                          <xsl-when test="@name = 'position of interest'"><xsl-value-of select="@position"/><xsl-value-of select="@reference"/>-><xsl-value-of select="snp_call"/></xsl-when>
                          <xsl-otherwise><xsl-value-of select="@name"/></xsl-otherwise>
                        </xsl-choose>
                        (<xsl-value-of select='format-number(snp_call/@percent, "##.##")'/>%)<br/>
                      </xsl-if>
                    </xsl-for-each>
                  </xsl-when>
                  <xsl-when test="region_of_interest/significance">
                    <xsl-for-each select="region_of_interest">
                      <xsl-if test="significance and not(significance/@changes)">
                        <xsl-for-each select="mutation">
                          <xsl-if test="@percent &gt; $prop_filter"><xsl-value-of select="@name"/> (<xsl-value-of select='format-number(@percent, "##.##")'/>%)<br/></xsl-if>
                        </xsl-for-each>
                      </xsl-if>
                    </xsl-for-each>
                  </xsl-when>
                  <xsl-otherwise><em>none</em></xsl-otherwise>
                </xsl-choose>
            </xsl-for-each></td>
          </xsl-for-each>
        </tr>
        //- <xsl-apply-templates select="."/>
        asap-sample(v-bind:sample="sample")
      </xsl-for-each>
    </table>
    em Percentages indicate the percentage of the sample containing that mutation, a value of 'none' indicates that no resistant mutations were present in that gene.
    br
    br
    a(href="{@run_name}_details.html") Click here for more details
</template>

<script>

// findResistance recursively searches for ''
function findResistance(object) {
	const resistance = {};

	const type = typeof(object);
	if (type === 'object') {
    for(let key in object) {
      if(key === 'Significance') {
        const significance = object[key];
        if('resistance' in significance && !(flag in significance)) {
          resistance[significance.resistance];
        }
      } else {
        // merge results found in the children of this key
        for(let k in findResistance(object[key])) {
          if(k in resistance) {
          }
        }
      }
    }
	} else if(type === 'array') {
		for(let key=0; key<object.length; key++) {
      // merge results found in the children of this key
      for(let k in findResistance(object[key])) {
        if(k in resistance) {
        }
      }
		}
  }

  return resistance;
}

import AsapSample from './AsapSample';

export default {
  data() {
    return {
      drugs: ['Rifampin', 'Isoniazid', 'Quinolones', 'Kanamycin', 'Capreomycin', 'Amikacin', 'Pyrazinamide', 'Ethambutal'];
    };
  },
  components: {
    AsapSample,
  }
};
</script>
