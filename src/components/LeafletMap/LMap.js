import L, { latLng } from 'leaflet';
import './vendor';
import {t, setLanguage} from './languages';
import './leaflet-map.css';

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
        this.domID = id;
        this.options = options;
        this.mapElements = [];
        this.status = null;
        this.clusterGroup = L.markerClusterGroup();

        this._initialize();
    }

    _initialize(){
        this.map.on('click', this.mapClickHandler, this);
        if(this.options.sidebar){
            this.Sidebar = lmapSidebar(this.domID);
            L.control.sidebar({
                autopan: false,
                closeButton: true,
                container: this.domID + "__lmap-sidebar",
                position: 'left'
            }).addTo(this.map);
        }
        
        if(this.options.elevation) this.addElevation();
        if(this.options.geosearch) this.addGeoSearching();
        if(this.options.routing) this.addRouting();

        if(this.options.language) setLanguage(this.options.language);
        this.setLanguage("RU");
        console.log(t('leaflet'));
    }
    
    setView(options){
        this.map.setView(options);
    }

    setLanguage(ln){
        setLanguage(ln);
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

    addTileLayers(layers, options){
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
        if(this.routingControl) {
            this.routingControl.remove();
            this.routingControl.addTo(this.map);
        }
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
        let _this = this;
        let _icon = el.icon;
        let _latlng = el.cord.split(',');

        let marker = L.marker(_latlng, {
            name: el.name,
            icon: this._getFontIcon(_icon.icon, _icon.color),
            ...MarkerMenu(el.name)
        });

        marker.bindPopup("<b>"+el.name+"</b><br>"+el.cord).openPopup();
        marker.on('click', this.markerClickHandler, this);

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

    addElevation(){
        var hg = L.control.heightgraph({
            position: 'bottomright',
            width: 800,
            height: 280,
            expand: false
        });
        hg.addTo(this.map);
        hg.addData(geojson);
        L.geoJson(geojson).addTo(this.map);
        console.log(hg);
    }

    addGeoSearching(){
        L.Control.geocoder({
            position: 'topleft',
            geocoder: L.Control.Geocoder.mapbox('pk.eyJ1IjoiaHVkYWxpbmciLCJhIjoiY2thN2xobWU1MDQ5ZTMwbWt3dHdzZzNiNSJ9.h8fncaoyA-IUhfWcjFZWiw', 
                {
                    serviceUrl: "https://api.mapbox.com/geocoding/v5/mapbox.places/"
                }
            )
        }).addTo(this.map);
    }

    addRouting(){
        var _this = this;
        this.routingControl = L.control.custom({
            position: 'topright',
            content : '<button type="button" class="leaflet-control-routing-icon"></button>',
            classes : 'btn-group-vertical btn-group-sm leaflet-control-routing-btn',
            style   :
            {
                margin: '10px 10px 0px 0px',
                padding: '0px 0 0 0',
                cursor: 'pointer',
                'background-color': 'white',
                'border-radius': '5px',
                'box-shadow': '0 0 5px 0px #8e8e8e'
            },
            events:
            {
                click: function(e)
                {
                    this.classList.toggle("open");
                    if(this.classList.contains('open'))
                        _this.enableRoutingContainer();
                    else
                        _this.disableRoutingContainer();
                }
            }
        }).addTo(this.map);
        
        this.routingControlPan = L.Routing.control({
            router: L.Routing.mapbox('pk.eyJ1IjoiaHVkYWxpbmciLCJhIjoiY2thN2xobWU1MDQ5ZTMwbWt3dHdzZzNiNSJ9.h8fncaoyA-IUhfWcjFZWiw'),
            geocoder: L.Control.Geocoder.mapbox('pk.eyJ1IjoiaHVkYWxpbmciLCJhIjoiY2thN2xobWU1MDQ5ZTMwbWt3dHdzZzNiNSJ9.h8fncaoyA-IUhfWcjFZWiw', 
                {
                    serviceUrl: "https://api.mapbox.com/geocoding/v5/mapbox.places/"
                }
            )
        });
        console.log(this.routingControlPan);
    }

    enableRoutingContainer(){
        this.status = "ROUTING";
        this.routingControlPan.addTo(this.map);
    }
    disableRoutingContainer(){
        this.status = null;
        this.routingControlPan.remove();
    }

    mapClickHandler(e){
        console.log('map', e);
    }

    markerClickHandler(e){
        var latlng = e.target._latlng;
        var name = e.target.options.name;
        this._addRoutingPoint(latlng, name);
        console.log('marker', e);
    }

    _addRoutingPoint(latlng, name){
        if(this.status !== 'ROUTING' || !this.options.routing) return;

        var curPoints = this.routingControlPan.getWaypoints();
        if(curPoints.length == 2){
            if(!curPoints[0].latLng) {
                curPoints[0].latLng = latlng;
                curPoints[0].name = name;
                this.routingControlPan.setWaypoints(curPoints);
                return;
            }
            if(!curPoints[1].latLng){
                curPoints[1].latLng = latlng;
                curPoints[1].name = name;
                this.routingControlPan.setWaypoints(curPoints);
                return;
            }
        }

        curPoints.push(L.Routing.waypoint(latlng, name));
        this.routingControlPan.setWaypoints(curPoints);

    }
}