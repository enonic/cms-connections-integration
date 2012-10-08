<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet exclude-result-prefixes="#all"
    xmlns="http://www.w3.org/1999/xhtml" version="2.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:portal="http://www.enonic.com/cms/xslt/portal">

    <xsl:output method="xhtml"/>
        <xsl:template match="/">
            <div id="ibm-conn-status-form" class="ibm-conn-status-form"></div>
            <div id="ibm-conn-status-list" class="ibm-conn-status-list"></div>
            <xsl:call-template name="handlebars-templates"/>
            <!-- Dependencies are embeded in the page template XSL -->
            <script type="text/javascript">
                window.connections.properties.userEmail = '<xsl:value-of select="/result/context/user/email"/>';
            </script>
            <script type="text/javascript" src="{portal:createResourceUrl('/_public/ibm-connections/js/statusupdates/Main.js')}"></script>
            <script type="text/javascript" src="{portal:createResourceUrl('/_public/ibm-connections/js/statusupdates/model/Message.js')}"></script>
            <script type="text/javascript" src="{portal:createResourceUrl('/_public/ibm-connections/js/statusupdates/model/MessageCollection.js')}"></script>
            <script type="text/javascript" src="{portal:createResourceUrl('/_public/ibm-connections/js/statusupdates/view/Main.js')}"></script>
            <script type="text/javascript" src="{portal:createResourceUrl('/_public/ibm-connections/js/statusupdates/view/Form.js')}"></script>
            <script type="text/javascript" src="{portal:createResourceUrl('/_public/ibm-connections/js/statusupdates/view/List.js')}"></script>
        </xsl:template>
    <xsl:template name="handlebars-templates">
        <script type="text/template" id="ibm-conn-tpl-status-form">
            <div>
                <textarea class="ibm-conn-status-message-textarea" placeholder="What are you doing now?"></textarea>
                <p>
                    <input type="button" value="Post Status"/>
                </p>
            </div>
        </script>
        <script type="text/template" id="ibm-conn-tpl-status-list">
            {{#each statusMessages}}
                <div>
                    <xsl:attribute name="class">
                        ibm-conn-status-item
                        {{#if is_comment}} ibm-conn-status-comment{{/if}}
                        {{#if is_first_comment}} ibm-conn-status-comment-first{{/if}}
                    </xsl:attribute>
                    <div>
                        <img class="ibm-conn-photo">
                            <xsl:attribute name="src">{{author.photo}}</xsl:attribute>        
                            <xsl:attribute name="alt">Photo of {{author.name}}</xsl:attribute>        
                        </img>
                        <div class="ibm-conn-info">
                            <h3 class="ibm-conn-profile-business-card">
                                <span class="vcard">
                                    <a href="javascript:void(0);" class="fn url">{{author.name}}</a>
                                    <span class="email" style="display: none;">{{author.email}}</span>
                                </span>
                            </h3>
                            <div class="ibm-conn-date">
                                <xsl:attribute name="title">{{published}}</xsl:attribute>
                                {{published_formatted}}
                            </div>
                            <div class="ibm-conn-message">
                                {{{title}}}
                            </div>
                            {{#if is_comment}}
                                <!-- -->
                            {{else}}
                                <a href="javascript:;" class="ibm-conn-status-add-comment">Add Comment</a>
                                <div style="display: none;">
                                    <textarea></textarea>
                                    <a href="javascript:;" rel="{{{{reply_url}}}}" class="ibm-conn-status-comment-submit">Submit</a>
                                     | <a href="javascript:;" class="ibm-conn-status-comment-cancel">Cancel</a>
                                </div>
                            {{/if}}
                        </div>
                    </div>
                </div>
            {{/each}}
			<div style="margin-top: .5em">
				<a href="#">Show more stories ...</a>
			</div>
        </script>
    </xsl:template>
</xsl:stylesheet>
