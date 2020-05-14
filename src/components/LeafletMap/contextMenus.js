export var MapMenu = {
    contextmenu: true,
    contextmenuWidth: 140,
    contextmenuItems: [{
        text: 'Show coordinates',
        // callback: showCoordinates
    }, {
        text: 'Center map here',
        // callback: centerMap
    }, '-', {
        text: 'Zoom in',
        // icon: 'images/zoom-in.png',
        // callback: zoomIn
    }, {
        text: 'Zoom out',
        // icon: 'images/zoom-out.png',
        // callback: zoomOut
    }]
}

export var MarkerMenu = function(name){

    return {
        contextmenu: true,
        contextmenuInheritItems	: false,
        contextmenuItems: [{
            text: name,
        }, '-' ,{
            text: 'StreetView',
            callback: showStreetView
        },{
            text: 'Center map here',
            // callback: centerMap
        }, '-', {
            text: 'Zoom in',
            // icon: 'images/zoom-in.png',
            // callback: zoomIn
        }, {
            text: 'Zoom out',
            // icon: 'images/zoom-out.png',
            // callback: zoomOut
        }]
    }
}

function showStreetView(e){
    var latlng = e.relatedTarget._latlng;
    window.open("https://www.google.com/maps/@?api=1&map_action=pano&viewpoint="+latlng.lat + "," +latlng.lng, '_blank');
    console.log(e);
}