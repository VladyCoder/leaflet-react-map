import L from 'leaflet';
import './leaflet-map.css';
import './vendor';
import {t, setLanguage} from './languages';


import maps from './maps.js';
import lmapSidebar from './sidebar';
import createElement from './LElement';

// import {geojson} from './example_data';
// import { demoTracks, blueMountain } from './demo-tracks';

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

const mapbox_token = "pk.eyJ1IjoiaHVkYWxpbmciLCJhIjoiY2thN2xobWU1MDQ5ZTMwbWt3dHdzZzNiNSJ9.h8fncaoyA-IUhfWcjFZWiw";

export class LMap {
    constructor(id, type = MapTypes._TRACKING_, options, ){
        this.map = L.map(id, {
            ...options,
            ...fullScreenOptions,
            ...this._createGlobalMenu()
        });

        this.mapType = type;
        this.domID = id;
        this.options = options;
        this.mapElements = [];
        this.zones = [];
        this.status = null;
        this.clusterGroup = L.markerClusterGroup();

        this._initialize();
    }

    _initialize(){
        let _this = this;
        this.map.spin(true);
        setTimeout(function(){
            _this.map.spin(false);
        }, 1000);

        this.setLanguage(this.options.language);
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

        this.addPlayBackControl();
        this.addPrintControl();
    }

    setView(options){
        this.map.setView(options);
    }

    setLanguage(ln){
        if(!ln) setLanguage('EN');
        else setLanguage(ln);
    }

    getMapType(){
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

    //_________________ Element functions ______________
    addElements(elements){
        if(!elements.length) return;

        elements.forEach(data => {
            let _el = createElement(data, this);
            _el.on('click', this.elementClickHandler, this);
            this.mapElements.push(_el);
        });

        if(this.options.clustering)
            this.map.addLayer(this.clusterGroup);
        if(this.options.sidebar)
            this.Sidebar.setData(elements);
    }

    getElementByID(id){
        for( let i = 0; i < this.mapElements.length; i++){
            let el = this.mapElements[i];
            if( el._data.id === id) return el;
        }
        return null;
    }

    getAllElements(){
        return this.mapElements;
    }

    removeElement(id){
        let _el = this._popElement(id);
        _el._removeFromMap();
        _el = null;
    }

    removeAllElements(){
        for( let i = 0; i < this.mapElements.length; i++){
            let el = this.mapElements[i];
            el._removeFromMap();
            el = null;
        }

        this.mapElements = [];
    }

    _popElement(id){
        for( let i = 0; i < this.mapElements.length; i++){
            let el = this.mapElements[i];
            if( el._data.id === id) return this.mapElements.splice(i, 1);
        }
        return null;
    }
    // ________________________________________________________

    drawZone(name, coordinates){
        let zone = L.polygon(coordinates, {name: name}).addTo(this.map);
        this.zones.push(zone);
    }

    getZoneByName(name){
        for( let i = 0; i < this.zones.length; i++){
            let z = this.zones[i];
            if( z.options.name === name) return z;
        }
        return null;
    }

    getAllZones(){
        return this.zones;
    }
    // ___________________________________________________________

    addPrintControl(){
        L.easyPrint({
            filename: 'map',
            position: 'topleft',
            sizeModes: ['Current', 'A4Portrait', 'A4Landscape'],
            exportOnly: true,
            hideControlContainer: true
        }).addTo(this.map);
    }

    

    addElevation(){
        var hg = L.control.heightgraph({
            position: 'bottomright',
            width: 800,
            height: 280,
            expand: false,
            translation: {
                distance: t("Distance"),
                elevation: t("Elevation"),
                segment_length: t("Segment length"),
                type: t("Type"),
                legend: t("Legend")
            }
        });
        hg.addTo(this.map);
        // hg.addData(geojson);
        // L.geoJson(geojson).addTo(this.map);
    }

    addGeoSearching(){
        L.Control.geocoder({
            position: 'topleft',
            geocoder: L.Control.Geocoder.mapbox(mapbox_token, 
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
            router: L.Routing.mapbox(mapbox_token),
            geocoder: L.Control.Geocoder.mapbox(mapbox_token, 
                {
                    serviceUrl: "https://api.mapbox.com/geocoding/v5/mapbox.places/"
                }
            )
        });
    }

    enableRoutingContainer(){
        this.status = "ROUTING";
        this.routingControlPan.addTo(this.map);
    }
    disableRoutingContainer(){
        this.status = null;
        this.routingControlPan.remove();
    }

    addPlayBackControl(){
        // var playbackOptions = {        
        //     layer: {
        //         pointToLayer : function(featureData, latlng){
        //             var result = {};
                    
        //             if (featureData && featureData.properties && featureData.properties.path_options){
        //                 result = featureData.properties.path_options;
        //             }
                    
        //             if (!result.radius){
        //                 result.radius = 5;
        //             }
                    
        //             return new L.CircleMarker(latlng, result);
        //         }
        //     }
        // };

        // this.playback = new L.Playback(this.map, demoTracks, null, playbackOptions);

        // var control = new L.Playback.Control(this.playback);
        // control.addTo(this.map);

        // this.playback.addData(blueMountain);
        
        // this.map.spin(true);
    }

    mapClickHandler(e){
        console.log('map', e);
    }

    elementClickHandler(e){
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

    _showStreetView(e){
        var latlng = e.relatedTarget._latlng;
        window.open("https://www.google.com/maps/@?api=1&map_action=pano&viewpoint="+latlng.lat + "," +latlng.lng, '_blank');
    }

    showAllTracks(){
        for( let i = 0; i < this.mapElements.length; i++){
            let el = this.mapElements[i];
            el.showTrack();
        }
    }

    hideAllTracks(){
        for( let i = 0; i < this.mapElements.length; i++){
            let el = this.mapElements[i];
            el.hideTrack();
        }
    }

    refreshMap(){
        let _this = this;
        this.map.spin(true);
        setTimeout(function(){
            _this.map.spin(false);
        }, 1000);

        for( let i = 0; i < this.mapElements.length; i++){
            let el = this.mapElements[i];
            el.refreshElement();
        }
    }

    _createGlobalMenu(){
        let _this = this;
        return {
            contextmenu: true,
            contextmenuWidth: 140,
            contextmenuItems: [{
                text: t('Show all tracks'),
                callback: function(e){
                    _this.showAllTracks();
                } 
            },{
                text: t('Hide all tracks'),
                callback: function(e){
                    _this.hideAllTracks();
                } 
            },{
                text: t('Refresh Map'),
                callback: function(e){
                    _this.refreshMap();
                }
            }, '-',{
                text: t('Remove all elements'),
                callback: function(){
                    _this.removeAllElements();
                }
            }, '-', {
                text: t('Zoom in'),
                callback: function(e){
                    _this.map.zoomIn();
                }
            }, {
                text: t('Zoom out'),
                callback: function(e){
                    _this.map.zoomOut();
                }
            }]
        };
    }
}