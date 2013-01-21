Connections Integration
=======================

This repository contains portlet samples that uses the IBM connections REST API

The examples are using the following third-party JS libraries:

+ Backbone.js
+ Handlebars.js
+ jQuery

CORS is used for allowing the Connections REST API to be accessed from the portal.  
About CORS: http://www.w3.org/TR/cors/

Enabling CORS
----------------

Because the examples uses Ajax to directly access the Connections REST API  and browsers implements the same origin policy, the server needs to be configured to send the following Access-Control response headers to the client:

<pre><code>
Access-Control-Allow-Credentials: 	true
Access-Control-Allow-Headers: 		content-type
Access-Control-Allow-Methods: 		POST GET OPTIONS
Access-Control-Allow-Origin: 		&lt;your-domain&gt;
Access-Control-Max-Age: 		    &lt;delta-seconds&gt;
</code></pre>

It is recommended to explicit specify permitted origins in the Allow-Origin list.

CMS portal
----------

1. Upload the resources to the WebDAV
2. Embed the libraries found in <code>/_public/ibm-connections/js/lib</code> within the &lt;head&gt; tag in your page template XSL. You may omit any library if it is already used in the page template XSL.
3. Embed the <code>/_public/ibm-connections/css/style.css</code> within the &lt;head&gt; tag in your page template XSL.
4. In <code>/\_public/ibm-connections/js/configuration.js</code> modify the JS constant CONNECTIONS\_SERVER\_ADDRESS to match your Connections server address
5. If the resources was uploaded to another file structure than in the one used in the example package you have to modify the resource refererences in the portlet XSL.
6. Create the portlets from the admin console. There are no datasources so only a name and a reference to the template XSL is necessary
7. Place the portlets on your page template / page.
