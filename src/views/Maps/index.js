import React from 'react';
import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import { LMap, MapTypes, MapIcons } from '../../components/LeafletMap';

function getRandomMarker(limit){
    var _markers = [];
    for(var i = 0; i < limit; i++){
        _markers.push({
            latlng: [Math.random()*60 + 20, Math.random()*60 - 15],
            icon: MapIcons[Object.keys(MapIcons)[Math.floor(Math.random()*2)]]
        });
    };
    return _markers;
}

export default class Maps extends React.Component{
    componentDidMount(){
        this.trackingMap = new LMap('tracking_map', { center: [50.073658, 14.418540], zoom: 6}, MapTypes._TRACKING_);
        this.trackingMap.addLayersControl([ '_OPENSTREET_', '_OPENTOPO_', '_AERIAL_', '_TERRAIN_', '_TRAFFIC_' ],{
            detectRetina: true,
            maxZoom: 19,
            maxNativeZoom: 17,
        });

        this.trackingMap.drawPath([
            [50.073658, 14.418540],
            [51, 16],
            [51.5, 15.8],
            [52, 15],
            [52, 13]
        ], {color: 'red'});


        this.positionMap = new LMap('position_map', { center: [50.073658, 14.418540], zoom: 6}, MapTypes._POSITION_);
        this.positionMap.addLayersControl([ '_OPENSTREET_', '_OPENTOPO_', '_AERIAL_', '_TERRAIN_', '_TRAFFIC_' ],{
            detectRetina: true,
            maxZoom: 19,
            maxNativeZoom: 17,
        });
        this.positionMap.drawMarker(getRandomMarker(50));
    };

    render(){
        
        return (
            <Row>
                <Col sm="12" md="6">
                    <Card>
                        <CardHeader>
                            Tracking Map
                        </CardHeader>
                        <CardBody>
                            <div id="tracking_map" style={{height: '400px'}}></div>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm="12" md="6">
                    <Card>
                        <CardHeader>
                            Position Map
                        </CardHeader>
                        <CardBody>
                            <div id="position_map" style={{height: '400px'}}></div>
                        </CardBody>
                    </Card>
                </Col>
                
            </Row>
        );
    }
}