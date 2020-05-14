import L from 'leaflet';
import './vendor';

import maps from './maps.js';
import { MapMenu, MarkerMenu } from './contextMenus';
import lmapSidebar from './sidebar';

import {geojson} from './example_data';

export var MapTypes = {
    _TRACKING_: 'TRACKING_MAP',
    _POSITION_: 'POSITION_MAP',
    _HEAT_: 'HEAT_MAP'
}

const fullScreenOptions = {
    fullscreenControl: true,
    fullscreenControlOptions: {
        position: 'topleft'
    }
}

export class LMap {
    constructor(id, type = MapTypes._TRACKING_, options, ){
        this.map = L.map(id, {
            ...options,
            ...fullScreenOptions,
            ...MapMenu
        });

        this.mapType = type;
        this.options = options;

        if(this.options.sidebar){
            this.Sidebar = lmapSidebar(id);
            L.control.sidebar({
                autopan: false,
                closeButton: true,
                container: id + "__lmap-sidebar",
                position: 'left'
            }).addTo(this.map);
        }
        
        if(this.options.elevation){
            this.createElevation();
        }

        this.mapElements = [];
        this.clusterGroup = L.markerClusterGroup();
    }
    
    setView(options){
        this.map.setView(options);
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

    addElements(elements){
        if(!elements.length) return;

        elements.forEach(el => {
            let marker = this._createMarker(el);
            this.mapElements.push({
                element: el,
                marker: marker
            });

            if(this.options.clustering) this.clusterGroup.addLayer(marker);
            else marker.addTo(this.map);
        });

        if(this.options.clustering)
            this.map.addLayer(this.clusterGroup);
        if(this.options.sidebar)
            this.Sidebar.setData(elements);
    }

    removeElement(id){
        let _num = this._getElementIndex(id);
        let _el = this.mapElements.splice(_num, 1);

        if(this.options.clustering) this.clusterGroup.removeLayer(_el.marker);
        else this.map.removeLayer(_el.marker);

    }

    getAllElements(){
        var _els = [];
        this.mapElements.forEach( el => {
            _els.push(el.element);
        })

        return _els;
    }

    getElementByID(id){
        let _num = this._getElementIndex(id);
        
        if(_num > -1) return this.mapElements[_num];
        return null;
    }

    _createMarker(el){
        let _icon = el.icon;
        let _latlng = el.cord.split(',');

        let marker = L.marker(_latlng, {
            icon: this._getFontIcon(_icon.icon, _icon.color),
            ...MarkerMenu(el.name)
        });

        marker.bindPopup("<b>"+el.name+"</b><br>"+el.cord).openPopup();

        return marker;
    }

    _getElementIndex(id){
        for( let i = 0; i < this.mapElements.length; i++){
            let el = this.mapElements[i];
            if( el.element.id === id) return i;
        }
        return -1;
    }

    _getFontIcon(name, color, size = 'md'){
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

    createElevation(){
        var hg = L.control.heightgraph({
            position: 'bottomright',
            width: 800,
            height: 280
        });
        hg.addTo(this.map);
        hg.addData(geojson);
        L.geoJson(geojson).addTo(this.map);
    }
}