import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";

import RPT from "react-proptypes";
import { connect } from "react-redux";
import "./map.scss";
import LocalFirebase from "../../config/firebase";
import { arrival_time } from "../../actions/index";

import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow, DirectionsRenderer } from "react-google-maps";

const MainMap = ({ arrival_time, latitude, longitude }) => {
    const [selected_shuttle, setselected_shuttle] = useState(null);
    const [selected_student, setselected_student] = useState(null);
    const [directions, setdirections] = useState("");
    const [arrival, setarrival] = useState("Estimating");
    const [time, settime] = useState("");
    const [path_cordinates, setpath_cordinates] = useState([
        {
            lat: parseFloat(latitude),
            lng: parseFloat(longitude),
        },
        { lat: 5.650728, lng: -0.182724 },
    ]);

    useEffect(() => {
        const directionsService = new window.google.maps.DirectionsService();

        const origin = {
            lat: parseFloat(latitude),
            lng: parseFloat(longitude),
        };
        const destination = { lat: 5.650728, lng: -0.182724 };

        directionsService.route(
            {
                origin: origin,
                destination: destination,
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    setdirections(result);
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            }
        );
    }, [latitude, longitude]);

    useEffect(() => {
        var origin = `${latitude},${longitude}`;

        var destination = "5.650728,-0.182724 ";

        var service = new window.google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [origin],
                destinations: [destination],
                travelMode: window.google.maps.TravelMode.DRIVING,
                unitSystem: window.google.maps.UnitSystem.METRIC,
            },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    let arrival_times = result.rows[0].elements[0].duration.text;
                    arrival_time(arrival_times);
                }
            }
        );
    }, [latitude]);

    return (
        <GoogleMap
            defaultZoom={17}
            defaultCenter={{
                lat: parseFloat(latitude),
                lng: parseFloat(longitude),
            }}
        >
            <Marker
                position={{ lat: latitude, lng: longitude }}
                onClick={() => {
                    setselected_shuttle(1);
                }}
                icon={{
                    url: "/bus.svg",
                    scaledSize: new window.google.maps.Size(40, 40),
                }}
            />
            <Marker
                position={{ lat: 5.650728, lng: -0.182724 }}
                onClick={() => {
                    setselected_student(1);
                }}
                icon={{
                    url: "/student.svg",
                    scaledSize: new window.google.maps.Size(40, 40),
                }}
            />
            {directions && <DirectionsRenderer directions={directions} />}
            {selected_shuttle && (
                <InfoWindow
                    position={{
                        lat: parseFloat(latitude),
                        lng: parseFloat(longitude),
                    }}
                    onCloseClick={() => {
                        setselected_shuttle(null);
                    }}
                >
                    <div>University of Ghana Shuttle</div>
                </InfoWindow>
            )}
            {selected_student && (
                <InfoWindow
                    position={{ lat: 5.650728, lng: -0.182724 }}
                    onCloseClick={() => {
                        setselected_student(null);
                    }}
                >
                    <div>Your Location</div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
};
const mapStateToProps = (state) => {
    return {
        arrival_time: state.user.arrival_time,
        latitude: state.user.latitude,
        longitude: state.user.longitude,
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        arrival_time: (message) => {
            dispatch(arrival_time(message));
        },
    };
};
MainMap.propTypes = {
    arrival_time: RPT.func,
    latitude: RPT.number,
    longitude: RPT.number,
};

export default connect(mapStateToProps, mapDispatchtoProps)(withRouter(MainMap));
