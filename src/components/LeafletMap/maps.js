export default {
    _OPENSTREET_ : {
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        name: 'Street',
        provider: 'OpenStreetMap.Mapnik',
        type: 'leaflet',
        options: {
            maxZoom: 19,
	        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
    },
    _OPENTOPO_ : {
        url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        name: 'Topo',
        provider: 'OpenTopoMap',
        type: 'leaflet',
        options: {
            maxZoom: 17,
	        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }
    },
    _AERIAL_:{
        name: 'Aerial',
        type: 'google',
        options: {
            maxZoom: 24,
            type: 'satellite'
        }
    },
    _TERRAIN_:{
        name: 'Terrain',
        type: 'google',
        options: {
            maxZoom: 24,
            type: 'terrain'
        }
    },
    _TRAFFIC_:{
        name: 'Traffic',
        type: 'google',
        options: {
            maxZoom: 24,
            type: 'roadmap'
        }
    }
}