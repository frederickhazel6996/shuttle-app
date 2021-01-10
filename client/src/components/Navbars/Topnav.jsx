import React from 'react';
import { Navbar } from 'react-bootstrap';
import './navbar.scss';
import { observer } from 'mobx-react';
const Topnav = observer(props => {
    return (
        <>
            <Navbar
                fixed="top"
                expand="lg"
                variant="light"
                className="text-center shadow-sm  mb-5 bg-white rounded topnav"
                display="flex">
                <Navbar.Brand>University of Ghana Shuttle System</Navbar.Brand>
                <Navbar.Text className="nav-title">
                    Student's Portal
                </Navbar.Text>
            </Navbar>
        </>
    );
});

export default Topnav;
