import L from 'leaflet';
const mapbox_token = "pk.eyJ1IjoiaHVkYWxpbmciLCJhIjoiY2thN2xobWU1MDQ5ZTMwbWt3dHdzZzNiNSJ9.h8fncaoyA-IUhfWcjFZWiw";

export function streetView(latlng){
    window.open("https://www.google.com/maps/@?api=1&map_action=pano&viewpoint="+latlng.lat + "," +latlng.lng, '_blank');
}

export function fontAwesomeIcon(name, color, size = 'md'){
    var _html = '<i class="' + name;
    if(size == 'sm') _html += ' fa-1x"';
    else if(size == 'lg') _html += ' fa-3x"';
    else _html += ' fa-2x"';

    _html += ' style="position: absolute; bottom: 0; left: -50%; color: ' + (color || 'black') + '"></i>';

    return L.divIcon({
        html: _html,
        className: 'fontAwesomeIcon'
    });
}

export function getDirections(data, callback){
    if(!data) return;
    if(!data.coordinates) return;

    let profiles = ['driving-traffic', 'driving', 'walking', 'cycling'];
    var profile = data.profile && profiles.includes(data.profile) ? data.profile : 'driving';
    
    var start = data.coordinates.start;
    var end = data.coordinates.end;
    if(!start || !end) return;


    let url = 'https://api.mapbox.com/directions/v5/mapbox/' + profile + '/' + start.lat + ',' + start.lng + ';' + end.lat + ',' + end.lng;
    url += '?overview=false&alternatives=true&steps=true&access_token=' + mapbox_token;

    var HttpRequest = new XMLHttpRequest();
    HttpRequest.onreadystatechange = function() { 
        if (HttpRequest.readyState == 4 && HttpRequest.status == 200)
            callback(HttpRequest.responseText);
    }

    HttpRequest.open( "GET", url, true );            
    HttpRequest.send( null );
}