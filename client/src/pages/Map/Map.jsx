import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Row, Col, Form, Spinner } from 'react-bootstrap';
import Topnav from '../../components/Navbars/Topnavextra';
import { location } from '../../actions/index';
import RPT from 'react-proptypes';
import { connect } from 'react-redux';
import './map.scss';
import LocalFirebase from '../../config/firebase';

import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker,
    InfoWindow
} from 'react-google-maps';
import school_map from './mainMap';

const WrappedMap = withScriptjs(withGoogleMap(school_map));

const Map = ({ arrival_time, setlocation, latitude, longitude }) => {
    const app = LocalFirebase;
    const database = app
        .database()
        .ref()
        .child('Shuttle_Location')
        .child('latitude');
    const database1 = app
        .database()
        .ref()
        .child('Shuttle_Location')
        .child('longitude');
    const [lons, setlons] = useState(-0.187073);
    const [las, setlas] = useState(5.652226);

    useEffect(() => {
        database.on('value', snap => {
            setlas(snap.val());
        });
        database1.on('value', snap => {
            setlons(snap.val());
        });

        let temp_location = {
            lat: las,
            lon: lons
        };
        setlocation(temp_location);

        return () => {
            database.off();
            database1.off();
        };
    });

    return (
        <div>
            <Topnav />
            <Container fluid>
                <Row>
                    <Col xl={3}>
                        <div className="estimate-box">
                            <h4>
                                The shuttle will arrive in{' '}
                                <div className="important">{arrival_time}</div>
                            </h4>
                        </div>
                    </Col>
                    <Col xl={9}>
                        <div className="map-box">
                            <WrappedMap
                                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${REACT_APP_GOOGLE_KEY}`}
                                loadingElement={
                                    <div
                                        style={{
                                            height: '100%',
                                            width: '100%'
                                        }}
                                    />
                                }
                                containerElement={
                                    <div
                                        style={{
                                            height: '100%',
                                            width: '100%'
                                        }}
                                    />
                                }
                                mapElement={
                                    <div
                                        style={{
                                            height: '100%',
                                            width: '100%'
                                        }}
                                    />
                                }
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        arrival_time: state.user.arrival_time,
        latitude: state.user.latitude,
        longitude: state.user.longitude
    };
};

const mapDispatchtoProps = dispatch => {
    return {
        setlocation: data => {
            dispatch(location(data));
        }
    };
};

Map.propTypes = {
    arrival_time: RPT.string,
    location: RPT.func
};

export default connect(mapStateToProps, mapDispatchtoProps)(withRouter(Map));
