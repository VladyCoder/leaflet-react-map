import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.gridlayer.googlemutant/Leaflet.GoogleMutant';

import maps from './maps.js';

export var MapTypes = {
    _TRACKING_: 'TRACKING_MAP',
    _POSITION_: 'POSITION_MAP',
    _HEAT_: 'HEAT_MAP'
}

export var MapIcons = {
    _RED_: 'assets/img/icons/r_marker.png',
    _BULE_: 'assets/img/icons/b_marker.png',
    _GREEN_: 'assets/img/icons/g_marker.png'
}

export class LMap {
    constructor(id, options, type = MapTypes._TRACKING_){
        this.map = L.map(id, options);
        this.mapType = type;
        this.clusterGroup = L.markerClusterGroup();
    }

    setType(type = MapTypes._TRACKING_){
        this.mapType = type;
    }
    getType(){
        return this.mapType;
    }

    setTileLayer(templateUrl, options) {
        // L.tileLayer(templateUrl, options).addTo(this.map);
        // L.gridLayer.googleMutant({
		// 	maxZoom: 24,
		// 	type:'roadmap'
		// }).addTo(this.map);
    }

    addLayersControl(layers, options){
        var baseMaps = {};
        layers.forEach(l => {
            var _map = maps[l], _layer;

            if(_map.type == 'leaflet')
                _layer = L.tileLayer(_map.url, {..._map.options, ...options});
            else
                _layer = L.gridLayer.googleMutant(_map.options);

            if(!Object.keys(baseMaps).length) _layer.addTo(this.map);
            baseMaps[_map.name] = _layer;
        });

        L.control.layers(baseMaps).addTo(this.map);
    }

    drawPath(latlngs, options){
        if(!latlngs || !latlngs.length) return;
        L.polyline(latlngs, options).addTo(this.map);
    }

    drawMarker(markers){
        markers.forEach(m => {
            var myIcon = L.icon({
                iconUrl: m.icon,
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [-3, -76],
                shadowUrl: null,
                shadowSize: null,
                shadowAnchor: null
            });
            var marker = L.marker(m.latlng, {icon: myIcon});
            this.clusterGroup.addLayer(marker);
        });

        this.map.addLayer(this.clusterGroup);
    }

}