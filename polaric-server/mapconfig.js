/* 
 * Configuration file for polaric-webapp. This is actually javascript code.
 * 
 * Version 1.6 supports changing UTM projection for maps. 
 * Version 1.7 support mixing maps with different projections, languages and more..
 * 
 * For projections, you may need to add the EPSG definition, e.g. if you 
 * want to use UTM zone 35: 
 *
 * Proj4js.defs["EPSG:32635"] = "+proj=utm +zone=35 +ellps=WGS84 +datum=WGS84 +units=m +no_defs";*
 *
 * If you change projection/zone you may need to update max_extent and you 
 * may need to update layers and mapcache.xml as well. 
 *
 */

Proj4js.defs["EPSG:32100"] = "+proj=lcc +lat_1=49 +lat_2=45 +lat_0=44.25 +lon_0=-109.5 +x_0=600000 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs"

/*
 * Language for user interface: Supported languages are: 
 *  'no' = Norwegian
 *   Default is English (just comment out the next line)
 * 
 * It is also possible so change the language by using the 
 * URL parameter 'lang'
 */
/* LANGUAGE('no'); */


/*
 * Base URL of server. Leave it empty if the server
 * and the js document are at the same location. 
 */ 
var server_url = '';



/* 
 * Default system projection. Currently we assume that this 
 * is a UTM projection.  
 */
/* var utm_projection = "EPSG:32633"; */
var utm_projection = "EPSG:32100";



/*
 * Default map extents. Resolutions and number of zoom levels.
 * Can (probably) be overridden by the individual base layers.  
 */ 

/* var max_extent     = [127000, 284000, 227000, 379000] ; */
var max_extent     = [111848, 17695, 1030194, 547983] ; 
var max_resolution = 256; 
var min_resolution = 1;
var max_zoomlevels = 9; 

var default_attribution = 'Map Layers: <a href="http://geoinfo.msl.mt.gov/msdi">Montana Spatial Data Infrastructure</a>';


/*
 * Bacground color for maps
 */
var backgroundColor = '#A1C1C9';


/*
 * List of base layers. This is a fairly straightforward OpenLayers way
 * of setting up layers. Use the LAYER function to add a set of layers. This 
 * can be used more than once. 
 * 
 * The LAYERS function takes three arguments: 
 *    - if this is a base layer (boolean)
 *    - A predicate (a function returning a boolean value). This acts as a filter. 
 *      if evaluated to true the layers are shown in layer list. The predefined TRUE 
 *      always evaluates to true.
 *    - An array of layers. See OpenLayers documentation. 
 *
 * To add GPX vector layers, put the gpx files in directory /gpx and
 * use the function add_Gpx_Layer(name, file) to add them to the list like 
 * in the example below. 
 */


/* Polygon that draws a border around Norway */
var Norge = POLYGON( [
    {lat:58.979, lng:11.557}, {lat:58.692, lng:9.725},  {lat:57.819, lng:7.408},  {lat:58.911, lng:4.911}, 
    {lat:62.343, lng:4.428},  {lat:64.567, lng:9.962},  {lat:67.99,  lng:11.675}, {lat:70.029, lng:16.842}, 
    {lat:71.528, lng:26.154}, {lat:70.39,  lng:31.944}, {lat:69.19,  lng:29.1},   {lat:70.05,  lng:27.899}, 
    {lat:68.481, lng:24.854}, {lat:68.979, lng:21.04},  {lat:68.306, lng:20.021}, {lat:68.349, lng:18.581}, 
    {lat:64.618, lng:13.877}, {lat:64.414, lng:14.363}, {lat:63.957, lng:14.014}, {lat:63.963, lng:12.853},
    {lat:61.782, lng:12.287}, {lat:61.244, lng:12.971} 
]);

/* Polygon that draws a border around Montana */
var Montana = POLYGON( [
   {lat:44.237729, lon:-116.178388}, {lat:49.18901, lon:-116.178388}, 
   {lat:49.180901, lon:-103.61174}, {lat:44.237729, lon:-103.61174},
   {lat:44.237729, lon:-116.178388}
]);

/* OpenStreetMap base layer */
/*
LAYERS (true, TRUE, [
     new OpenLayers.Layer.OSM("OpenStreetMap", null, {gray: '0.1'}),
     new OpenLayers.Layer.WMS("MSDI Transportation", 
        "http://gisservicemt.gov:80/arcgis/services/MSDI_Framework/TransportationSPC/MapServer/WmsServer?",
        { layers: "6,9,10,12,13,17,18,19,20,21", format: "image/png" })
]);
*/

/* Base layers, NAIP 2013 and shaded relief */
LAYERS(true, TRUE, [
      /* NAIP 2013 Raster. Cached locally */
      new OpenLayers.Layer.TMS(
         "Aerial Imagery", "http://%MY_IP%/mapcache/tms/",
         { layername : 'naip_2013', type: 'png' }
      ),
      new OpenLayers.Layer.TMS(
         "Shaded Relief", "http://%MY_IP%/mapcache/tms/",
         { layername : "hypsorelief", type: 'png' }
      )
]);

/* Overlay layers */
LAYERS(false, TRUE, [
      new OpenLayers.Layer.TMS(
         "Features", "http://%MY_IP%/mapcache/tms/",
         { layername: "features", type: "png" }
      ),
      new OpenLayers.Layer.TMS(
         "Contours", "http://%MY_IP%/mapcache/tms/",
         { layername: "contours", type: "png" }
      )
]);




/*
 * Menu of predefined map-extents.  
 * Extents are upper left corner (1) and lower right corner (2) in decimal degrees
 * [longitude-1, latitude-1, longitude-2, latitude-2] 
 */
var defaultView = 'default';
var mapViews = [
   { name: 'mineral',   title: 'Mineral',          extent: [-115.759, 46.697, -114.419, 47.497] },
   { name: 'missoula',  title: 'Missoula (County)',extent: [-114.797, 46.632, -113.303, 47.6] },
   { name: 'sanders',   title: 'Sanders',          extent: [-116.049, 47.121, -114.187, 48.264] },
   { name: 'alberton',  title: 'Alberton',         extent: [-114.494, 46.999, -114.467, 47.009] },
   { name: 'superior',  title: 'Superior',         extent: [-114.915, 47.184, -114.869, 47.202] },
   { name: 'plains',    title: 'Plains',           extent: [-114.896, 47.452, -114.872, 47.469] },
   { name: 'tfalls',    title: 'Thompson Falls',   extent: [-115.373, 47.589, -115.315, 47.607] },
   { name: 'hotsprings',title: 'Hot Springs',      extent: [-114.680, 47.605, -114.661, 47.615] },
   { name: 'mso',       title: 'Missoula (City)',  extent: [-114.126, 46.792, -113.897, 46.950] },
   { name: 'default',   title: 'Mineral',          extent: [-115.759, 46.697, -114.419, 47.497], hidden:true }
];


/* Filter menu. The actual filters are defined by aprsd in
 * /etc/polaric-aprsd/view.profiles. The name attribute refers to a profile-name. 
 * For non-public profiles, add attribute: restricted: 'true' 
 */

var filterViews = [
   { name: 'alle',   title: 'Everything' },
   { name: 'track',  title: 'Track' },
   { name: 'infra',  title: 'Infrastructure'},
   { name: 'ainfra', title: 'Active Infrastructure'},
   { name: 'moving', title: 'Moving'}
];

/* View to be selected by default */
var defaultFilterView = 'track';


/* Set to true to enable SAR URL */
var sarUrl = false; 


/* Use WPS service from Statkart to get elevation data, 
 * for now, you have to set up a proxy for this on the server
 * with the same domain name as your service. It is VERY important 
 * to remove all Authorization headers from proxied requests, to 
 * avoid leaking authentication info. 
 */

var statkartWPS_enable = false;
var statkartWPS_url = "/aprs/wps";


var statkartName_enable = false; 
var statkartName_url = "/namesearch";
var statkartAddr_url = "http://ws.geonorge.no/AdresseWS/adresse/sok";



/* Use service from met.no go get weather forecasts.
 * For now, you have to set up a proxy for this on the server
 * with the same domain name as your service. It is VERY important 
 * to remove all Authorization headers from proxied requests, to 
 * avoid leaking authentication info. 
 * 
 * To activate this, you should know what you are doing!
 */

var WXreport_enable = false;
var WXreport_url = "/aprs/wxdata";
