import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import Topnavextra from '../../components/Navbars/Topnavextra';
import Paystackbutton from 'react-paystack';
import { useForm } from 'react-hook-form';
import './dashboard.scss';
const spawn = require('spawn-password');

export default function Dashboard(props) {
    const [key, setkey] = useState(
        'pk_live_97ae3e979420f6ce1397b891448001f371f0e991'
    );
    const [email, setemail] = useState('atongowillis@gmail.com');
    const [currency, setcurrency] = useState('GHS');
    const [amount, setamount] = useState(100);

    const callback = response => {
        console.log(response);
        console.log(response.status);

        setTimeout(() => {
            document.getElementById('overlay-5').style.display = 'none';
        }, 2000);
    };

    const close = () => {
        console.log('Payment closed');
    };

    const getReference = () => {
        return spawn.spawnAlphaNumericLength(12);
    };
    const { register, handleSubmit, watch, errors } = useForm();
    const clicked = () => {
        document.getElementById('overlay-5').style.display = 'block';
    };

    const submitHandler = data => {
        console.log(data);
    };
    return (
        <div>
            <Topnavextra />
            <Container>
                <div>
                    <Row>
                        <Col
                            xs={12}
                            sm={12}
                            md={8}
                            lg={{ offset: 2, span: 4 }}
                            xl={{ offset: 2, span: 4 }}>
                            <div className="dashboard-cards" onClick={clicked}>
                                <div className="card-icon">
                                    <i className="fas fa-money-bill-wave"></i>
                                </div>
                                <div className="card-text">Make Payment</div>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={4} xl={4}>
                            <div
                                className="dashboard-cards"
                                onClick={() => {
                                    props.history.push('/map');
                                }}>
                                <div className="card-icon">
                                    <i className="fas fa-map-marked-alt"></i>
                                </div>
                                <div className="card-text">
                                    View Shuttle Map
                                </div>
                            </div>
                        </Col>
                        {/* <Col xs={12} sm={12} md={8} lg={4} xl={4}>
                            <div className="dashboard-cards">
                                <div className="card-icon">
                                    <i className="fas fa-receipt"></i>
                                </div>
                                <div className="card-text">
                                    Previous Payments
                                </div>
                            </div>
                        </Col> */}
                    </Row>
                </div>

                <div id="overlay-5">
                    <Row>
                        <Col
                            xs={{ offset: 1, span: 10 }}
                            sm={{ offset: 1, span: 10 }}
                            md={{ offset: 3, span: 5 }}
                            lg={{ offset: 4, span: 5 }}
                            xl={{ offset: 4, span: 5 }}>
                            <div className="pay-form">
                                <Form
                                    onSubmit={handleSubmit(submitHandler)}
                                    className="pay-form-pos">
                                    <Row>
                                        <Col
                                            xs={{ offset: 2, span: 8 }}
                                            sm={{ offset: 2, span: 8 }}
                                            md={{ offset: 2, span: 8 }}
                                            lg={{ offset: 2, span: 8 }}
                                            xl={{ offset: 2, span: 8 }}>
                                            {' '}
                                            <div
                                                className="text-right mt-2 close-button"
                                                onClick={() => {
                                                    document.getElementById(
                                                        'overlay-5'
                                                    ).style.display = 'none';
                                                }}>
                                                X
                                            </div>
                                            <div className="text-center login-text mt-4">
                                                Shuttle Payment
                                            </div>
                                            <hr />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col
                                            xs={{ offset: 2, span: 8 }}
                                            sm={{ offset: 2, span: 8 }}
                                            md={{ offset: 2, span: 8 }}
                                            lg={{ offset: 2, span: 8 }}
                                            xl={{ offset: 2, span: 8 }}>
                                            {' '}
                                            <Form.Group controlId="formBasicid">
                                                <Form.Label>
                                                    No. of People
                                                </Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Number of students"
                                                    name="number_people"
                                                    ref={register({
                                                        required: true
                                                    })}
                                                    onChange={e =>
                                                        setamount(
                                                            e.target.value * 100
                                                        )
                                                    }
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        {' '}
                                        <Col
                                            xs={{ offset: 2, span: 8 }}
                                            sm={{ offset: 2, span: 8 }}
                                            md={{ offset: 2, span: 8 }}
                                            lg={{ offset: 2, span: 8 }}
                                            xl={{ offset: 2, span: 8 }}>
                                            <Paystackbutton
                                                text="Pay for Shuttle"
                                                className="payButton btn Login-button pay-button-text mt-1 mb-3"
                                                callback={callback}
                                                close={close}
                                                disabled={false}
                                                embed={false}
                                                reference={getReference()}
                                                email={email}
                                                amount={amount}
                                                paystackkey={key}
                                                currency={currency}
                                                tag="button"
                                            />
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}
