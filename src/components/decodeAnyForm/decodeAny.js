import React from 'react'
import { Form, FormGroup, Button, Input, Container, Jumbotron, Row, Col } from 'reactstrap';
import styles from './decodeAny.css'
// Element to decode anything purpouses
const InputOutputForm = (props) => (
    <div>
        <Container>
            <Jumbotron className={styles.container}>
                <Form>
                    <FormGroup>
                        <h4>
                            {props.heading}
                        </h4>
                        <small className="text-muted">{props.subHeading}</small>
                        <Row>
                            <Col md='6'>
                                <Input type="text"
                                    name="toEncode"
                                    id="toEncode"
                                    placeholder={props.placeholder}
                                    onChange={props.toDecodeChanged}
                                    value={props.toEncode}
                                />
                            </Col>
                            <Col md='6'>
                                <Input type="text"
                                    name="toEncode"
                                    id="toEncode"
                                    placeholder={props.listPlaceholder}
                                    onChange={props.listChanged}
                                />
                            </Col>

                        </Row>
                        <Row>
                            <Input type="textarea"
                                name="encoded"
                                id="encoded"
                                value={props.encoded}
                            />
                        </Row>
                    </FormGroup>
                    <Button onClick={props.click}>Submit</Button>
                </Form>
            </Jumbotron>
        </Container>
    </div>
)

export default InputOutputForm