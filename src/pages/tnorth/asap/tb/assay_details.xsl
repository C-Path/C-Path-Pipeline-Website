<!-- Detailed Run Summary -->
    <exsl-document method="html" href="{@run_name}_details.html">
      <html>
        <head>
          <title>Run Summary for: <xsl-value-of select="@run_name"/></title>
        </head>
        <body>
          <center><h1>TB Detailed ASAP Run Summary for: <xsl-value-of select="@run_name"/></h1></center>
          <br/>
          <em>Number of reads aligning to each assay</em>
          <table border="1" cellpadding="3">
            <tr>
              <th>Sample</th>
              <xsl-for-each select="sample[1]">
                <xsl-for-each select="assay">
                  <th nowrap="true"><xsl-value-of select='@name'/></th>
                </xsl-for-each>
              </xsl-for-each>
            </tr>
            <xsl-for-each select="sample">
              <tr>
                <td><a href="{/analysis/@run_name}/{./@name}_details.html"><xsl-value-of select="@name"/></a></td>
                <xsl-for-each select="assay">
                  <td align="center"><xsl-for-each select="amplicon">
                      <xsl-value-of select="./@reads"/>
                  </xsl-for-each></td>
                </xsl-for-each>
              </tr>
              <xsl-apply-templates select="."/>
            </xsl-for-each>
          </table>
          <br />
          <br />
          <a href="{@run_name}.html">Click here for clinical summary</a>
        </body>
      </html>
    </exsl-document>
  </xsl-template>
