import React, { useEffect, useState } from 'react';
import { Navbar, Button } from 'react-bootstrap';

import './navbarextra.scss';

const Topnavextra = props => {
    const [first, setfirst] = useState('');
    const [second, setsecond] = useState('');
    const [name, setname] = useState('');

    useEffect(() => {
        let full_name = 'Jack Sparrow';
        let token = full_name.split(' ');
        setname(sessionStorage.full_name);
        setfirst(token[0][0].toUpperCase());
        setsecond(token[1][0].toUpperCase());
    });

    return (
        <>
            <Navbar
                fixed="top"
                expand="lg"
                variant="light"
                className=" shadow-sm  mb-5 bg-white rounded topnavextra"
                display="flex">
                <Navbar.Brand>Student Shuttle System</Navbar.Brand>

                <Button variant="outline-success float-right extra-button">
                    Logout
                </Button>
                <span className="full-screen-topnav">
                    <Navbar.Text className="nav-title float-right margin-right-10">
                        {name}
                    </Navbar.Text>
                    <Navbar.Text className="nav-title initials float-right margin-right-10">
                        {first + second}
                    </Navbar.Text>

                    <Navbar.Text className="Text small-title ">
                        Dashboard
                    </Navbar.Text>
                </span>
            </Navbar>
        </>
    );
};
export default Topnavextra;
