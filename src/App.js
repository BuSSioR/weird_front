import React, { Component } from 'react';
import './App.css';
import InputOutputForm from './components/inputOutputForm/inputOutputForm'
import Header from './components/header/Header'
import DecodeAny from './components/decodeAnyForm/decodeAny'
import { Row, Col } from 'reactstrap';
class App extends Component {
  state = {
    toDecodeAny: '',
    toDecodeList: [],
    toDecode: '',
    toEncode: '',
    encoded: '',
    decoded: '',
    decodedAny: ''
  }
  toDecodeAnythingApiRequest = (event, url) => {
    const state = { ...this.state }
    const payload = {
      'sentence': state.toDecodeAny,
      'decode_list': state.toDecodeList
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(response => response.json()).then(data => { this.setState({ decodedAny: data['decoded'] }) })
  }
  toDecodeAnyChangeHandler = (event) => {
    let toDecodeAny = { ...this.state.toDecodeAny }
    toDecodeAny = event.target.value;
    this.setState({ toDecodeAny: toDecodeAny })
  }
  encodeApiRequest = (event, url) => {
    const toEncode = { ...this.state }
    const payload = { 'sentence': toEncode.toEncode }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(response => response.json()).then(data => { this.setState({ encoded: data['encoded'] }) })
  }
  decodeNativeApiRequest = (event, url) => {
    const toDecode = { ...this.state }
    const payload = { 'sentence': toDecode.toDecode }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(response => response.json()).then(data => { this.setState({ decoded: data['decoded'] }) })
  }

  toEncodeChangedHandler = (event, url) => {
    let toEncode = {
      ...this.state.toEncode
    };
    toEncode = event.target.value;
    this.setState({ toEncode: toEncode })
    if (toEncode.length > 4) {
      this.encodeApiRequest(event, url);
    }
  }

  listChangedHandler = (event) => {
    let list = { ...this.state.toDecodeList }
    list = event.target.value.split(' ')
    this.setState({ toDecodeList: list })
  }
  toDecodeChangedHandler = (event, url) => {
    let toDecode = {
      ...this.state.toEncode
    };
    toDecode = event.target.value;
    this.setState({ toDecode: toDecode })
    if (toDecode.length > 4) {
      this.decodeNativeApiRequest(event, url)
    }
  }
  render() {
    return (
      <div className="App">
        <Header></Header>
        <Row className="d-flex justify-content-center">
          <Col md='5'>
            <InputOutputForm
              //click={(event)=>this.getApiResource(event,'http://localhost:5000/v1/encode')}
              changed={(event) => this.toEncodeChangedHandler(event, 'http://localhost:5000/v1/encode', 'toEncode')}
              heading='Encoder'
              subHeading='Encode your stuff!'
              placeholder='Sentence to encode'
              encoded={this.state['encoded']}
              toEncode={this.state['toEncode']}>
            </InputOutputForm>
          </Col>
          <Col md='5'>
            <InputOutputForm
              //click={(event)=>this.getApiResource(event,'http://localhost:5000/v1/encode')}
              changed={(event) => this.toDecodeChangedHandler(event, 'http://localhost:5000/v1/decode_without_list', 'toDecode')}
              heading='Native Decoder'
              subHeading='Decode stuff encoded by this app!'
              placeholder='Sentence to decode'
              encoded={this.state['decoded']}
              toEncode={this.state['toDecode']}>
            </InputOutputForm>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col md='12'>
            < DecodeAny
              heading='Decoder'
              subHeading='Decode Anything!'
              placeholder='Sentence to decode'
              listPlaceholder='Type words you have used to this sentence!'
              listChanged={(event) => this.listChangedHandler(event)}
              toDecodeList={this.state.toDecodeList}
              click={(event) => this.toDecodeAnythingApiRequest(event, 'http://localhost:5000/v1/decode')}
              toEncode={this.state.toDecodeAny}
              toDecodeChanged={(event) => this.toDecodeAnyChangeHandler(event)}
              encoded={this.state.decodedAny}
            >
            </ DecodeAny>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
