
var centerloc = {lat: 37.775, lng: -122.434};
dummydata = '[[[centerloc.lat,centerloc.lng],[centerloc.lat,centerloc.lng],[centerloc.lat,centerloc.lng]],[1,2,3]]]'
var new_data = dummydata;
DataURL = 'http://127.0.0.1:2000/getdata';



function httpGetAsync(callback)
{
    var xmlHttp = new XMLHttpRequest({mozSystem: true});
    console.log('Fuck this shit');
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);

    }
    console.log("Yeah, whatever");
    xmlHttp.open("GET", DataURL, true); // true for asynchronous
    xmlHttp.send(null);
}

function callbackfunc(response){
    console.log('in callback');
   var data_obj= JSON.parse(response);
   var weighted_mappoints = getPoints2(data_obj);
   heatmap.set('data', weighted_mappoints);
   console.log('in callback post setting');
   //alert(data_obj);
}



// This example requires the Visualization library. Include the libraries=visualization
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization">



function getPoints2(newdata){
    console.log('in getpoints');
    var list_points = new Array();
    var no_points_from_server = newdata[0].length;
    var point_index;
    for (point_index=0;point_index<no_points_from_server;point_index++){
        var datapoint = new Object();
        datapoint.location = new google.maps.LatLng(newdata[0][point_index][0],newdata[0][point_index][1]);
        datapoint.weight = newdata[1][point_index];
        list_points.push(datapoint);
    }
    console.log('returing getpoints2');
    return list_points;
}




var map, heatmap;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: centerloc,
        mapTypeId: 'satellite'
    });

    var heatMapData = [
  {location: new google.maps.LatLng(37.782, -122.447), weight: 0.5},
  new google.maps.LatLng(37.782, -122.445),
  {location: new google.maps.LatLng(37.782, -122.443), weight: 2},
  {location: new google.maps.LatLng(37.782, -122.441), weight: 3},
  {location: new google.maps.LatLng(37.782, -122.439), weight: 2},
  new google.maps.LatLng(37.782, -122.437),
  {location: new google.maps.LatLng(37.782, -122.435), weight: 0.5},

  {location: new google.maps.LatLng(37.785, -122.447), weight: 3},
  {location: new google.maps.LatLng(37.785, -122.445), weight: 2},
  new google.maps.LatLng(37.785, -122.443),
  {location: new google.maps.LatLng(37.785, -122.441), weight: 0.5},
  new google.maps.LatLng(37.785, -122.439),
  {location: new google.maps.LatLng(37.785, -122.437), weight: 2},
  {location: new google.maps.LatLng(37.785, -122.435), weight: 3}
];

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatMapData,
        map: map
    });
}








function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
    var gradient = [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
    ]
    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
    heatmap.set('radius', heatmap.get('radius') ? null : 20);
}

function changeOpacity() {
    heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}


  //Periodic Timer. 5000 millisec refresh rate.
  setTimeout(function(){
  httpGetAsync(callbackfunc);
  setTimeout(arguments.callee, 5000);
   }, 10000);
