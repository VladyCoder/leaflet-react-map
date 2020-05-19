import L from 'leaflet';
import { streetView, fontAwesomeIcon, getDirections } from './Utils';
import {t} from './languages';
import {direction} from './demo-direction';

class LElement {
    constructor(data, parent){
        this._parent = parent;
        this._data = data;
        this._initialize();
    }

    _initialize(){
        this._status = this._data.status;
        this.setPosition(this._data.cord);

        if(this._track) this._track.remove();
        this._track = null;
        this._trackStatus = false;
        this._updateTrack();

        if(this._marker) this._removeFromMap();
        this._marker = null;
        this._marker = this._createMarker();

        if(this._status == 'enabled') this._addToMap();
    }

    _updateData(){
        if(this._status == 'enabled') {
           this._addToMap();
        }else {
           this._removeFromMap();
        }

        this._data = {
            ...this.data,
            status: this._status,
        }
    }

    getStatus(){
        return this._status;
    }

    setStatus(status){
        this._status = status;
        this._updateData();
    }

    getPosition(){
        return this._curPosition;
    }

    setPosition(latlng){
        if(typeof latlng == 'string'){
            let _ln = latlng.split(',');
            this._curPosition = {lat: _ln[0] || 0, lng: _ln[1] || 0};
        }else{
            this._curPosition = latlng;
        } 
    }

    getIcon(){
        return this._data.icon;
    }

    setIcon(icon){
        if(!icon || typeof icon != 'object') return;
        this._data.icon = icon;
        this._marker.setIcon(fontAwesomeIcon(this._data.icon.icon, this._data.icon.color));
    }

    getColor(){
        return this._data.icon.color;
    }

    setColor(color){
        this._data.icon.color = color;
        this._marker.setIcon(fontAwesomeIcon(this._data.icon.icon, this._data.icon.color));
    }

    showTrack(){
        if(!this._track) return;
        this._track.addTo(this._parent.map);
        this._trackStatus = true;
    }

    hideTrack(){
        if(!this._track) return;
        this._track.remove();
        this._trackStatus = false;
    }

    getTrack(){
        return this._data.data;
    }

    setTrack(track){
        if(typeof track != 'object') return;
        this._data.data = track;
        this._updateTrack();
    }

    addTrack(track){
        if(typeof track != 'object') return;

        if(!this._data.data || !this._data.data.length) this._data.data = [];
        if(track.length){
            this._data.data = this._data.data.concat(track);
        }else{
            this._data.data.push(track);
        }
        this._updateTrack();
    }

    _updateTrack(){
        if(!this._data.data || typeof this._data.data != 'object') return;

        if(this._track) {
            this._track.remove();
            this._track = null;
        }

        if(this._data.data.length) {
            console.log(this._data.name)
            var _this = this;
            let _lns = [];
            for(var i = 0; i < this._data.data.length; i++){
                let _ln = this._data.data[i].cord;
                _ln = _ln.split(',');
                _lns.push({lat: _ln[0], lng: _ln[1]});
            }

            getDirections({ coordinates: _lns}, function(res){
                var json = JSON.parse(res);
                if(json.code != "Ok") return;
                _this.drawTracks(json);
            });
            
        }
    }

    drawTracks(geoJson){
        this._geoTracks = geoJson;
        
        let coords = this._geoTracks.routes[0].geometry.coordinates;
        var points = [];
        for(var i = 0; i< coords.length; i++){
            var point = coords[i];
            points.push([point[1], point[0]]);
        }
        // var color = "#" + Math.floor(Math.random()*16777215).toString(16);
        this._track = L.polyline(points, {color: this.getColor()});
        if(this._trackStatus) this._track.addTo(this._parent.map);


        // let legs = this._geoTracks.routes[0].legs;
        // for(var i=0; i< legs.length; i++){
        //     let steps = legs[i].steps;
        //     var points = [];            
        //     for(var j = 0; j < steps.length; j++){
        //         let intersec = steps[j].intersections;
        //         for(var k = 0; k < intersec.length; k++){
        //             var point = intersec[k].location;
        //             points.push([point[1], point[0]]);
        //         }
        //     }
        //     console.log(points);
        //     var color = "#" + Math.floor(Math.random()*16777215).toString(16);
        //     var _track = L.polyline(points, {color: color}).addTo(this._parent.map);
        // }
    }

    getProperties(){
        return this._data.prop;
    }

    setProperties(props){
        this._data.prop = props;
    }

    addProperty(prop){
        this._data.prop = {...this._data.prop, ...prop};
    }

    getAllData(){
        return this._data;
    }

    refreshElement(){
        this._initialize();
    }

    goto(){
        this._parent.map.panTo(this._curPosition);
    }

    _createMarker(){
        let _icon = this._data.icon;

        let marker = L.marker(this._curPosition, {
            name: this._data.name,
            icon: fontAwesomeIcon(_icon.icon, _icon.color),
            ...this._createMarkerContextMenu()
        });

        marker.bindPopup("<b>"+this._data.name+"</b><br>"+this._data.cord).openPopup();
        // marker.on('click', this._markerClickHandler, this);

        return marker;
    }

    _createMarkerContextMenu(){
        let _this = this;
        let _contextItems = [
            {
                text: t('Street View'),
                callback: function(e){
                    streetView(e.relatedTarget._latlng);
                }
            },{
                text: t('Center map here'),
                callback: function(e){
                    _this.goto();
                }
            },'-',{
                text: t('Show track'),
                callback: function(e){
                    _this.showTrack();
                }
            },{
                text: t('Hide track'),
                callback: function(e){
                    _this.hideTrack();
                }
            },'-',{
                text: t('Zoom in'),
                callback: function(e){
                    _this._parent.map.zoomIn();
                }
            },{
                text: t('Zoom out'),
                callback: function(e){
                    _this._parent.map.zoomOut();
                }
            }
        ];

        return {
            contextmenu: true,
            contextmenuInheritItems	: false,
            contextmenuItems: _contextItems
        }
    }

    // _markerClickHandler(e){
    //     this.dispatchEvent(e);
    // }

    _addToMap(){
        let pOptions = this._parent.options;
        if(pOptions.clustering) this._parent.clusterGroup.addLayer(this._marker);
        else this._marker.addTo(this._parent.map);

        if(this._trackStatus) this.showTrack();
    }

    _removeFromMap(){
        let pOptions = this._parent.options;
        if(pOptions.clustering) this._parent.clusterGroup.removeLayer(this._marker);
        else this._marker.remove();

        this.hideTrack();
    }

    on(event, callback, target){
        if(!this._marker) return false;
        this._marker.on(event, callback, target);
    }
}

export default function createElement(data, parent){
    return new LElement(data, parent);
} 