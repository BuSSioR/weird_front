import React from 'react'
import { Form, FormGroup, Button, Input, Container, Jumbotron } from 'reactstrap';
import styles from './inputOutputForm.css'
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

            <Input type="text"
              name="toEncode"
              id="toEncode"
              placeholder={props.placeholder}
              onChange={props.changed}
              value={props.toEncode}
            />

            <Input type="textarea"
              name="encoded"
              id="encoded"
              value={props.encoded}
            />
          </FormGroup>
          <Button onClick={props.click}>Submit</Button>
        </Form>
      </Jumbotron>
    </Container>
  </div>
)

export default InputOutputForm