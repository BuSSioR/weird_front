import React from 'react'
import { Row, Col, ListGroup, ListGroupItem, Container, Jumbotron } from 'reactstrap';
import Logo from './logo.png'
const Header = (props) => (
    <Row>
        <Col md='12'>
            <Jumbotron>
                <Row>
                    <Col md='3'>
                        <img src={Logo} alt=''></img>
                    </Col>
                    <Col md='1'></Col>
                    <Col md='4' >
                        <Container className='d-flex justify-content-end'>
                            <ListGroup flush={true}>
                                <ListGroupItem><h5>Use encoder to encode your message!</h5></ListGroupItem>
                                <ListGroupItem><h5>Use native decoder to decode message you have encoded with this decoder!</h5></ListGroupItem>
                                <ListGroupItem><h5>Use custom decoder to decode ANY message!</h5></ListGroupItem>
                            </ListGroup>
                        </Container>
                    </Col>
                </Row>

            </Jumbotron>
        </Col>
    </Row>
)
export default Header