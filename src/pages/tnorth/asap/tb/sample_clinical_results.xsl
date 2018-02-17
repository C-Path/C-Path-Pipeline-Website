<!-- Per Sample Clinical Results -->
  <exsl-document method="html" href="{/analysis/@run_name}/{@name}.html">
    <html>
      <head>
        <title>Clinical Results for Sample: <xsl-value-of select="@name"/></title>
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
      </head>
      <body>
        <center><h1>TB Clinical ASAP Results for Sample: <xsl-value-of select="@name"/></h1></center>
        <br />
        <br />
        <table class="table-header-rotated">
          <tr>
            <th class="norotate">Sample</th>
            <th class="rotate"><div><span><em>M. tubercolosis</em> Confirmed</span></div></th>
            <th class="rotate"><div><span>Rifampin Resistance</span></div></th>
            <th class="rotate"><div><span>Isoniazid Resistance</span></div></th>
            <th class="rotate"><div><span>Quinolone Resistance</span></div></th>
            <th class="rotate"><div><span>Kanamycin Resistance</span></div></th>
            <th class="rotate"><div><span>Capreomycin Resistance</span></div></th>
            <th class="rotate"><div><span>Amikacin Resistance</span></div></th>
            <th class="rotate"><div><span>Pyrazinamide Resistance</span></div></th>
            <th class="rotate"><div><span>Ethambutal Resistance</span></div></th>
          </tr>
          <tr>
            <td class="norotate"><xsl-value-of select="@name"/></td>
            <td class="rotate" align="center"><xsl-choose><xsl-when test=".//significance[not(@flag)]='Mycobacterium tuberculosis confirmed'"><img src="../check.png" style="width:30px;height:30px;"/></xsl-when><xsl-otherwise><img src="../cross.png" style="width:30px;height:30px;"/></xsl-otherwise></xsl-choose></td>
            <td class="rotate" align="center"><xsl-choose>
                <xsl-when test=".//significance[not(@flag) and contains(@resistance, 'Rifampin')]"><font color="red">R</font></xsl-when>
                <xsl-when test=".//significance[@flag and contains(@resistance, 'Rifampin')]">Ind.</xsl-when>
                <xsl-otherwise>S</xsl-otherwise>
            </xsl-choose></td>
            <td class="rotate" align="center"><xsl-choose>
                <xsl-when test=".//significance[not(@flag) and contains(@resistance, 'Isoniazid')]"><font color="red">R</font></xsl-when>
                <xsl-when test=".//significance[@flag and contains(@resistance, 'Isoniazid')]">Ind.</xsl-when>
                <xsl-otherwise>S</xsl-otherwise>
            </xsl-choose></td>
            <td class="rotate" align="center"><xsl-choose>
                <xsl-when test=".//significance[not(@flag) and contains(@resistance, 'Quinolones')]"><font color="red">R</font></xsl-when>
                <xsl-when test=".//significance[@flag and contains(@resistance, 'Quinolones')]">Ind.</xsl-when>
                <xsl-otherwise>S</xsl-otherwise>
            </xsl-choose></td>
            <td class="rotate" align="center"><xsl-choose>
                <xsl-when test=".//significance[not(@flag) and contains(@resistance, 'Kanamycin')]"><font color="red">R</font></xsl-when>
                <xsl-when test=".//significance[@flag and contains(@resistance, 'Kanamycin')]">Ind.</xsl-when>
                <xsl-otherwise>S</xsl-otherwise>
            </xsl-choose></td>
            <td class="rotate" align="center"><xsl-choose>
                <xsl-when test=".//significance[not(@flag) and contains(@resistance, 'Capreomycin')]"><font color="red">R</font></xsl-when>
                <xsl-when test=".//significance[@flag and contains(@resistance, 'Capreomycin')]">Ind.</xsl-when>
                <xsl-otherwise>S</xsl-otherwise>
            </xsl-choose></td>
            <td class="rotate" align="center"><xsl-choose>
                <xsl-when test=".//significance[not(@flag) and contains(@resistance, 'Amikacin')]"><font color="red">R</font></xsl-when>
                <xsl-when test=".//significance[@flag and contains(@resistance, 'Amikacin')]">Ind.</xsl-when>
                <xsl-otherwise>S</xsl-otherwise>
            </xsl-choose></td>
            <td class="rotate" align="center"><xsl-choose>
                <xsl-when test=".//significance[not(@flag) and contains(@resistance, 'Pyrazinamide')]"><font color="red">R</font></xsl-when>
                <xsl-when test=".//significance[@flag and contains(@resistance, 'Pyrazinamide')]">Ind.</xsl-when>
                <xsl-otherwise>S</xsl-otherwise>
            </xsl-choose></td>
            <td class="rotate" align="center"><xsl-choose>
                <xsl-when test=".//significance[not(@flag) and contains(@resistance, 'Ethambutal')]"><font color="red">R</font></xsl-when>
                <xsl-when test=".//significance[@flag and contains(@resistance, 'Ethambutal')]">Ind.</xsl-when>
                <xsl-otherwise>S</xsl-otherwise>
            </xsl-choose></td>
          </tr>
        </table>
        <br />
        <br />
        <table border="2" rules="rows">
          <tr><th colspan="2">Clinical Summary for Sample: <xsl-value-of select="@name"/></th></tr>
          <xsl-for-each select=".//significance">
            <xsl-if test="not(./@flag) and not(./@changes)">
              <tr>
                <td><xsl-text disable-output-escaping="yes"><![CDATA[&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]]></xsl-text></td>
                <td><xsl-value-of select="."/></td>
              </tr>
            </xsl-if>
          </xsl-for-each>
        </table>
        <br />
        <br />
        <h3>Resistance Mutations Present in Sample: <xsl-value-of select="@name"/></h3>
        <table border="2" width="100%">
          <tr>
            <th>Gene Target:</th>
            <xsl-for-each select="assay">
              <xsl-choose>
                <xsl-when test="@type = 'SNP'"><th><xsl-value-of select="@name"/> SNP (% res)</th></xsl-when>
                <xsl-when test="@type = 'ROI'"><th><xsl-value-of select="@name"/> codon (% res)</th></xsl-when>
                <xsl-otherwise></xsl-otherwise>
              </xsl-choose>
            </xsl-for-each>
          </tr>
          <tr>
            <th>Mutations:</th>
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
        </table>
        <em>Percentages indicate the percentage of the sample containing that mutation, a value of 'none' indicates that no resistant mutations were present in that gene.</em>
        <br />
        <br />
        <a href="{@name}_details.html">Click here for more sample details</a>
        <br />
        <br />
        <a href="../{/analysis/@run_name}.html">Click here to return to the run summary</a>
      </body>
    </html>
  </exsl-document>

