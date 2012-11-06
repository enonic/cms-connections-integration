<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet exclude-result-prefixes="#all"
    xmlns="http://www.w3.org/1999/xhtml" version="2.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:portal="http://www.enonic.com/cms/xslt/portal">

    <xsl:output method="xhtml"/>
        <xsl:template match="/">
            <div id="ibm-conn-peoplesearch-form" class="ibm-conn-peoplesearch-form"></div>
            <div id="ibm-conn-peoplesearch-list"></div>
            <xsl:call-template name="handlebars-templates"/>
            <!-- Dependencies are embeded in the page template XSL -->
            <script type="text/javascript" src="{portal:createResourceUrl('/_public/ibm-connections/js/peoplesearch/Main.js')}"></script>
            <script type="text/javascript" src="{portal:createResourceUrl('/_public/ibm-connections/js/peoplesearch/model/SearchResultEntry.js')}"></script>
            <script type="text/javascript" src="{portal:createResourceUrl('/_public/ibm-connections/js/peoplesearch/model/SearchResultEntryCollection.js')}"></script>
            <script type="text/javascript" src="{portal:createResourceUrl('/_public/ibm-connections/js/peoplesearch/view/Main.js')}"></script>
            <script type="text/javascript" src="{portal:createResourceUrl('/_public/ibm-connections/js/peoplesearch/view/Form.js')}"></script>
            <script type="text/javascript" src="{portal:createResourceUrl('/_public/ibm-connections/js/peoplesearch/view/List.js')}"></script>
        </xsl:template>
    <xsl:template name="handlebars-templates">
        <script type="text/template" id="ibm-conn-tpl-peoplesearch-form">
            <div>First name or last name</div>
            <div>
                <input type="text" class="text" style="width: 98%"/>
            </div>
        </script>
        <script type="text/template" id="ibm-conn-tpl-peoplesearch-list">
            <ul class="ibm-conn-peoplesearch">
                {{#each people}}
                    <li class="ibm-conn-peoplesearch-item">
                        <div style="display:table-row">
                            <img src="{{{{photo}}}}" alt="Photo of {{{{name}}}}" style="display:table-cell; vertical-align:top; margin-right:10px;"/>
                            <div style="display:table-cell; vertical-align:middle; width:100%" class="ibm-conn-profile-business-card">
                                <span class="vcard">
                                    <a href="{{{{link}}}}" class="fn url" style="display:block">{{name}}</a>
                                    <span class="email" style="display: none !important;">{{email}}</span>
                                    <span class="phone">{{phone}}</span>
                                </span>
                            </div>
                        </div>
                    </li>
                {{/each}}
            </ul>
        </script>
    </xsl:template>
</xsl:stylesheet>
