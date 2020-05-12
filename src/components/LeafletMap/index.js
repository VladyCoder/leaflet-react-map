import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export var MapTypes = {
    _TRACKING_: 'TRACKING_MAP',
    _POSITION_: 'POSITION_MAP',
    _HEAT_: 'HEAT_MAP'
}

export class LMap {
    constructor(id, options, type = MapTypes._TRACKING_){
        this.map = L.map(id, options);
        this.mapType = type;
    }

    setType(type = MapTypes._TRACKING_){
        this.mapType = type;
    }
    getType(){
        return this.mapType;
    }

    setTileLayer(templateUrl, options) {
        L.tileLayer(templateUrl, options).addTo(this.map);
    }
}