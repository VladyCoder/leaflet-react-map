import React from 'react';
import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import { LMap, MapTypes } from '../../components/LeafletMap';

import { data } from './tempData';

export default class Maps extends React.Component{
    componentDidMount(){
        this.trackingMap = new LMap('tracking_map', MapTypes._TRACKING_, { center: [50.073658, 14.418540], zoom: 6, clustering: true });
        this.trackingMap.addTileLayers([ '_OPENSTREET_', '_OPENTOPO_', '_AERIAL_', '_TERRAIN_', '_TRAFFIC_' ],{
            detectRetina: true,
            maxZoom: 19,
            maxNativeZoom: 17,
        });

        this.trackingMap.addElements(data.map_elem);


        this.positionMap = new LMap('position_map', MapTypes._POSITION_, { 
            center: [50.073658, 14.418540],
            zoom: 6
        });
        this.positionMap.addTileLayers([ '_OPENSTREET_', '_OPENTOPO_', '_AERIAL_', '_TERRAIN_', '_TRAFFIC_' ],{
            detectRetina: true,
            maxZoom: 19,
            maxNativeZoom: 17,
        });
        this.positionMap.addElements(data.map_elem);


        this.heatmap = new LMap('heat_map', MapTypes._HEAT_, {
            center: [50.073658, 14.418540],
            zoom: 6,
        });
        this.heatmap.addTileLayers([ '_OPENSTREET_', '_OPENTOPO_', '_AERIAL_', '_TERRAIN_', '_TRAFFIC_' ],{
            detectRetina: true,
            maxZoom: 19,
            maxNativeZoom: 17,
        });
        this.heatmap.addElements(data.map_elem);
    };

    render(){
        
        return (
            <Row>
                <Col sm="12" md="6" lg="4">
                    <Card>
                        <CardHeader>
                            Tracking Map
                        </CardHeader>
                        <CardBody>
                            <div id="tracking_map" style={{height: '400px'}}></div>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm="12" md="6"  lg="4">
                    <Card>
                        <CardHeader>
                            Position Map
                        </CardHeader>
                        <CardBody>
                            <div id="position_map" style={{height: '400px'}}></div>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm="12" md="6" lg="4">
                    <Card>
                        <CardHeader>
                            Heat Map
                        </CardHeader>
                        <CardBody>
                            <div id="heat_map" style={{height: '400px'}}></div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}