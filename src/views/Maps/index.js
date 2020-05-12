import React from 'react';
import { Row, Col, Card, CardBody, CardColumns, CardHeader } from 'reactstrap';
import { LMap, MapTypes } from '../../components/LeafletMap';

export default class Maps extends React.Component{
    componentDidMount(){
        this.trackingMap = new LMap('mymap', { center: [58, 16], zoom: 6});
        this.trackingMap.setTileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            detectRetina: true,
            maxZoom: 19,
            maxNativeZoom: 17,
        });

        this.trackingMap.setType(MapTypes._POSITION_);
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
                            <div id="mymap" style={{height: '320px'}}></div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}