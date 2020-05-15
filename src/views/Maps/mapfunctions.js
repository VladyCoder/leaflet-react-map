import React from 'react';
import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import { LMap, MapTypes } from '../../components/LeafletMap';

import { data } from './tempData';

export default class MapFunctions extends React.Component{
    componentDidMount(){
        this.markersMap = new LMap('position_map', MapTypes._POSITION_, { 
            center: [46.9547232,8.8598507],
            zoom: 8,
            clustering: true,
            sidebar: true,
            elevation: true,
            geosearch: true,
            routing: true
        });

        this.markersMap.addTileLayers([ '_OPENSTREET_', '_OPENTOPO_', '_AERIAL_', '_TERRAIN_', '_TRAFFIC_' ],{
            detectRetina: true,
            maxZoom: 19,
            maxNativeZoom: 17,
        });
        
        this.markersMap.addElements(data.map_elem);
    };

    render(){
        
        return (
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            Marker Clustering / Popup / Context Menu
                        </CardHeader>
                        <CardBody>
                            <div id="position_map" style={{height: '600px'}}></div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}