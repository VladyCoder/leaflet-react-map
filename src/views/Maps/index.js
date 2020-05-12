import React from 'react';
import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import { LMap, MapTypes, MapIcons } from '../../components/LeafletMap';

export default class Maps extends React.Component{
    componentDidMount(){
        this.trackingMap = new LMap('tracking_map', { center: [50.073658, 14.418540], zoom: 6}, MapTypes._TRACKING_);
        this.trackingMap.setTileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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
        this.positionMap.setTileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            detectRetina: true,
            maxZoom: 19,
            maxNativeZoom: 17,
        });
        this.positionMap.drawMarker([
            {
                latlng: [50.073658, 14.418540],
                icon: MapIcons._RED_
            },
            {
                latlng: [51, 16],
                icon: MapIcons._BULE_
            },
            {
                latlng: [51.5, 15.8],
                icon: MapIcons._GREEN_
            },
            {
                latlng: [52, 15],
                icon: MapIcons._RED_
            },
            {
                latlng: [52, 13],
                icon: MapIcons._BULE_
            }
        ]);
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
                            <div id="tracking_map" style={{height: '320px'}}></div>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm="12" md="6">
                    <Card>
                        <CardHeader>
                            Position Map
                        </CardHeader>
                        <CardBody>
                            <div id="position_map" style={{height: '320px'}}></div>
                        </CardBody>
                    </Card>
                </Col>
                
            </Row>
        );
    }
}