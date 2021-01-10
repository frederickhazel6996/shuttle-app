import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Row, Col, Form, Spinner } from 'react-bootstrap';
import Topnav from '../../components/Navbars/Topnav';
import RPT from 'react-proptypes';
import { useForm } from 'react-hook-form';
import { signUserIn } from '../../actions/index';
import { connect } from 'react-redux';
import './sign.scss';

const Sign = ({ loading, name, signUserIn, history }) => {
    const { register, handleSubmit, watch, errors } = useForm();

    const submitHandler = data => {
        console.log(data);
        signUserIn({
            student_id: data.student_id,
            password: data.password,
            history: history
        });
    };
    return (
        <>
            <Topnav />
            <Container>
                <div className="form-login">
                    <Form onSubmit={handleSubmit(submitHandler)}>
                        <Row>
                            <Col
                                xs={12}
                                sm={12}
                                md={{ span: 8, offset: 2 }}
                                lg={{ span: 4, offset: 4 }}
                                xl={{ span: 4, offset: 4 }}>
                                {' '}
                                <div className="text-center login-text">
                                    Login
                                </div>
                                <hr />
                            </Col>
                        </Row>
                        <Row>
                            <Col
                                xs={12}
                                sm={12}
                                md={{ span: 8, offset: 2 }}
                                lg={{ span: 4, offset: 4 }}
                                xl={{ span: 4, offset: 4 }}>
                                {' '}
                                <Form.Group controlId="formBasicid">
                                    <Form.Label>Student ID</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter Student ID"
                                        name="student_id"
                                        ref={register({ required: true })}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col
                                xs={12}
                                sm={12}
                                md={{ span: 8, offset: 2 }}
                                lg={{ span: 4, offset: 4 }}
                                xl={{ span: 4, offset: 4 }}>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        ref={register({ required: true })}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            {' '}
                            <Col
                                xs={12}
                                sm={12}
                                md={{ span: 8, offset: 2 }}
                                lg={{ span: 4, offset: 4 }}
                                xl={{ span: 4, offset: 4 }}>
                                <Button type="submit" className="Login-button">
                                    {loading && (
                                        <Spinner
                                            animation="border"
                                            variant="light"
                                            size="sm"
                                        />
                                    )}{' '}
                                    Login
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            {' '}
                            <Col
                                xs={12}
                                sm={12}
                                md={{ span: 8, offset: 2 }}
                                lg={{ span: 4, offset: 4 }}
                                xl={{ span: 4, offset: 4 }}>
                                <div className="password-text">
                                    Click <Link to="/register">here</Link> to
                                    Register
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Container>
        </>
    );
};

const mapStateToProps = state => {
    return {
        name: state.user.name,
        loading: state.user.loading
    };
};

const mapDispatchtoProps = dispatch => {
    return {
        signUserIn: data => {
            dispatch(signUserIn(data));
        }
    };
};

Sign.propTypes = {
    name: RPT.string,
    signUserIn: RPT.func,
    loading: RPT.bool,
    history: RPT.object
};

export default connect(mapStateToProps, mapDispatchtoProps)(withRouter(Sign));
