import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Row, Col, Form, Spinner } from 'react-bootstrap';
import Topnav from '../../components/Navbars/Topnav';
import { useForm } from 'react-hook-form';
import RPT from 'react-proptypes';
import { signUserUp } from '../../actions/index';
import { connect } from 'react-redux';
import './register.scss';

const Register = ({ loading, name, signUserUp, history }) => {
    const { register, handleSubmit, watch, errors } = useForm();
    const submitHandler = data => {
        console.log(data);
        signUserUp({
            student_id: data.student_id,
            password: data.password,
            username: data.username,
            hall: data.hall,
            history: history
        });
    };
    return (
        <>
            <Topnav />
            <Container>
                <div className="form-register">
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
                                    Register
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
                                <Form.Group controlId="studentid">
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
                                {' '}
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter Email"
                                        name="username"
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
                                {' '}
                                <Form.Group controlId="hall">
                                    <Form.Label>Hall of Residence</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="hall"
                                        ref={register({ required: true })}>
                                        <option>Choose...</option>
                                        <option>Jean Nelson Akah Hall</option>
                                        <option>Elizabeth Sey Hall</option>
                                        <option>Alexander Kwapong Hall</option>
                                        <option>Hilla Limann Hall</option>
                                        <option>Pentagon</option>
                                        <option>TF</option>
                                        <option>Legon Hall</option>
                                        <option>Evandy Hall</option>
                                        <option>Commonwealth Hall</option>
                                        <option>Akuafo Hall</option>
                                        <option>Mensah Sarbah Hall</option>
                                        <option>Volta Hall</option>
                                        <option>Off Campus</option>
                                    </Form.Control>
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
                                    Register
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
                                    Click <Link to="/">here</Link> to Login
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
        signUserUp: data => {
            dispatch(signUserUp(data));
        }
    };
};

Register.propTypes = {
    name: RPT.string,
    signUserIn: RPT.func,
    loading: RPT.bool,
    history: RPT.object
};

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(withRouter(Register));
