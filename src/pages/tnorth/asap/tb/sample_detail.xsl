<!-- Per Sample Detailed Results -->
  <exsl-document method="html" href="{/analysis/@run_name}/{@name}_details.html">
    <html>
      <head>
        <title>Detailed Results for Sample: <xsl-value-of select="@name"/></title>
        <xsl-text disable-output-escaping="yes"><![CDATA[<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.1.0/Chart.min.js"></script>]]></xsl-text>
        <style>
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
        </style>
      </head>
      <body>
        <center><h1>Detailed ASAP Results for Sample: <xsl-value-of select="@name"/></h1></center>
        <br/>
        <table border="2" rules="rows">
          <tr><th colspan="2">Clinical Summary for Sample: <xsl-value-of select="@name"/></th></tr>
          <xsl-for-each select=".//significance">
            <xsl-if test="not(./@flag)">
              <tr>
                <td><xsl-text disable-output-escaping="yes"><![CDATA[&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]]></xsl-text></td>
                <td><xsl-value-of select="."/></td>
              </tr>
            </xsl-if>
          </xsl-for-each>
        </table>
        <br />
        <br />
        <h3><em>M. tuberculosis</em> identification for sample: <xsl-value-of select="@name"/></h3>
        <table border="2" width="100%">
          <tr>
            <th>Assay Name</th>
            <th>Average Read Depth</th>
            <th>Coverage Breadth</th>
            <th>Significance</th>
            <th>SNPs found(% reads containing SNP)</th>
          </tr>
          <xsl-for-each select="assay">
            <xsl-if test="@name = 'IS6110'">
              <xsl-call-template name="amplicon-graph"></xsl-call-template>
              <tr>
                <td><a href="#{@name}-graph"><xsl-value-of select="@name"/></a></td>
                <td><xsl-value-of select='format-number(amplicon/average_depth, "#.##")'/></td>
                <td><xsl-value-of select='format-number(amplicon/breadth, "##.##")'/>%</td>
                <td><xsl-value-of select="amplicon/significance"/><xsl-if test="amplicon/significance/@flag"> (<xsl-value-of select="amplicon/significance/@flag"/>)</xsl-if></td>
                <td><xsl-for-each select="amplicon/snp">
                    <xsl-value-of select="@position"/><xsl-value-of select="@reference"/>-><xsl-value-of select="snp_call"/>(<xsl-value-of select='format-number(snp_call/@percent, "##.##")'/>%)<br/>
                </xsl-for-each></td>
              </tr>
            </xsl-if>
          </xsl-for-each>
        </table>
        <br />
        <h3>Drug resistance assays for sample: <xsl-value-of select="@name"/></h3>
        <table border="2" width="100%">
          <tr>
            <th>Assay Name</th>
            <th>Average Read Depth</th>
            <th>Known Mutations - # reads containing mutation(% reads) - Significance</th>
            <th>Other SNPs found(% reads containing SNP)</th>
          </tr>
          <xsl-for-each select="assay">
            <xsl-if test="@type = 'SNP' or @type = 'ROI' or @type = 'mixed'">
              <xsl-call-template name="amplicon-graph"></xsl-call-template>
              <tr>
                <td><a href="#{@name}-graph"><xsl-value-of select="@name"/></a></td>
                <td><xsl-value-of select='format-number(amplicon/average_depth, "#.##")'/></td>
                <xsl-if test="amplicon/@reads &gt; 0">
                  <td>
                    <xsl-for-each select="amplicon/snp">
                      <xsl-if test="./@name != 'unknown'">
                        <xsl-choose>
                          <xsl-when test="./@name = 'position of interest'"><xsl-value-of select="@position"/><xsl-value-of select="@reference"/>-><xsl-value-of select="snp_call"/></xsl-when>
                          <xsl-otherwise><xsl-value-of select="./@name"/></xsl-otherwise>
                        </xsl-choose>
                        - <xsl-value-of select='./snp_call/@count'/>(<xsl-value-of select='format-number(./snp_call/@percent, "##.##")'/>%)
                        <xsl-if test="significance"> - <xsl-value-of select="significance"/><xsl-if test="significance/@flag">(<xsl-value-of select="significance/@flag"/>)</xsl-if></xsl-if>
                        <br/>
                      </xsl-if>
                    </xsl-for-each>
                    <xsl-for-each select="amplicon/region_of_interest">
                      <xsl-for-each select="mutation">
                        <xsl-value-of select="./@name"/> - <xsl-value-of select='./@count'/>(<xsl-value-of select='format-number(./@percent, "##.##")'/>%)
                        <xsl-if test="../significance and ./@percent &gt; $prop_filter"> - <xsl-value-of select="../significance"/><xsl-if test="../significance/@flag">(<xsl-value-of select="../significance/@flag"/>)</xsl-if></xsl-if>
                        <br/>
                      </xsl-for-each>
                    </xsl-for-each>
                  </td>
                  <td>
                    <xsl-for-each select="amplicon/snp">
                      <xsl-if test="./@name = 'unknown'">
                        <xsl-value-of select="@position"/><xsl-value-of select="@reference"/>-><xsl-value-of select="snp_call"/>(<xsl-value-of select='format-number(snp_call/@percent, "##.##")'/>%)<br/>
                      </xsl-if>
                    </xsl-for-each>
                  </td>
                </xsl-if>
              </tr>
            </xsl-if>
          </xsl-for-each>
        </table>
        <br />
        <br />
        <a href="{@name}.html">Click here for clinical sample results</a>
        <br />
        <br />
        <a href="../{/analysis/@run_name}.html">Click here to return to the run summary</a>
      </body>
    </html>
  </exsl-document>
