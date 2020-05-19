import React from 'react';
// import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import { CCard, CCardHeader, CCardBody, CRow, CCol } from '@coreui/react';
import { LMap, MapTypes } from '../../components/LeafletMap';

import { data } from './tempData';

export default class MapFunctions extends React.Component{
    componentDidMount(){
        this.positionMap = new LMap('position_map', MapTypes._POSITION_, { 
            center: [46.9547232,8.8598507],
            zoom: 8,
            clustering: true,
            sidebar: true,
            elevation: true,
            geosearch: true,
            routing: true,
            language: 'EN'
        });

        this.positionMap.addTileLayers([ '_OPENSTREET_', '_OPENTOPO_', '_AERIAL_', '_TERRAIN_', '_TRAFFIC_' ],{
            detectRetina: true,
            maxZoom: 19,
            maxNativeZoom: 17,
        });
        
        ////********* function for map *///////////
        this.positionMap.addElements(data.map_elem);

        var _allEl = this.positionMap.getAllElements();
        console.log('get all elements', _allEl);
        
        var _oneEl = this.positionMap.getElementByID("0001");
        console.log("get one element", _oneEl);

        // this.positionMap.removeElement("0001");
        // this.positionMap.removeAllElements();

        this.positionMap.drawZone('Zone', [
            [46.0295228,5.9216256],[47.0295228,5.9216256],[47.0295228,8.9216256],[46.0295228,8.9216256]
        ]);

        var _zones = this.positionMap.getAllZones();
        console.log('zones', _zones);

        var _zone = this.positionMap.getZoneByName('Zone');
        console.log('zone', _zone);

        ///////******* functions for Element *****////////
        var curStatus = _oneEl.getStatus();
        console.log('element status', curStatus);

        // _oneEl.setStatus('disabled');

        var curPos = _oneEl.getPosition();
        console.log('current element position', curPos);

        _oneEl.setPosition("50.234234,14.323424");
        _oneEl.setPosition({lat: 50.234234, lng: 14.323424});

        var curIcon = _oneEl.getIcon();
        console.log('current element icon', curIcon);

        _oneEl.setIcon({icon: 'fa fa-car', color: 'black'});
        
        var curColor = _oneEl.getColor();
        console.log('current element icon', curColor);

        _oneEl.setColor("#0014ff");

        _oneEl.showTrack();
        _oneEl.hideTrack();
        
        var curTrack = _oneEl.getTrack();
        console.log("current element track", curTrack);

        _oneEl.setTrack([
            {cord: '50.073658, 14.418540', timestamp: 2342342444},
            {cord: '50.173658, 14.518540', timestamp: 2342342444},
            {cord: '50.273658, 14.618540', timestamp: 2342342444},
            {cord: '50.373658, 14.718540', timestamp: 2342342444},
            {cord: '50.473658, 14.818540', timestamp: 2342342444},
            {cord: '50.573658, 14.918540', timestamp: 2342342444},
            {cord: '50.673658, 14.918540', timestamp: 2342342444},
            {cord: '50.773658, 14.818540', timestamp: 2342342444}
        ]);

        _oneEl.addTrack({cord: '50.773658, 14.818540', timestamp: 2342342444});

        var curProp = _oneEl.getProperties();
        console.log('current element Properties', curProp);

        _oneEl.setProperties({});
        _oneEl.addProperty({});


        var allData = _oneEl.getAllData();
        console.log('current element data', allData);

        _oneEl.refreshElement();
    };

    render(){
        
        return (
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Marker Clustering / Popup / Context Menu
                        </CCardHeader>
                        <CCardBody>
                            <div id="position_map" style={{height: '600px'}}></div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        );
    }
}