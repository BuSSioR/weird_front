import React, { Component } from 'react';
import './App.css';
import InputOutputForm from './components/inputOutputForm/inputOutputForm'
import Header from './components/header/Header'
import DecodeAny from './components/decodeAnyForm/decodeAny'
import { Row, Col } from 'reactstrap';
class App extends Component {
  // whole information about app is stored in state
  state = {
    toDecodeAny: '',
    toDecodeList: [],
    toDecode: '',
    toEncode: '',
    encoded: '',
    decoded: '',
    decodedAny: ''
  }

  // when Encoder input is changed, the value of field is stored ins state
  toEncodeChangedHandler = (event) => {
    const toEncode = event.target.value;
    this.setState({ toEncode: toEncode })
  }
  // on click submit button api request is performed
  toEncodeSubmitHandler = (event, url) => {
    let toEncode =
      [...this.state.toEncode];
    if (toEncode.length > 4) {
      this.encodeApiRequest(event, url);
    }else{
      this.setState({encoded:'You need at least 4 characters!'})
    }
  }

  // api request to backend
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

  //api request to v1/decode route, sends list of words and sentence to encode
  toDecodeAnythingApiRequest = (event, url) => {
    const state = { ...this.state }
    const payload = {
      'sentence': state.toDecodeAny,
      'decode_list': state.toDecodeList
    }
    if (payload.sentence.length<4){
      this.setState({ decodedAny: 'Sentence is too short!' })
    } else if (payload.sentence.split(' ').length!== payload.decode_list.length) {
      this.setState({ decodedAny: 'Provide all words used in sentence!' })
    } else {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(response => response.json()).then(data => { this.setState({ decodedAny: data['decoded'] }) })
    }
  }

  // toDecode value is stored in state
  toDecodeAnythingChangeHandler = (event) => {
    let toDecodeAny = { ...this.state.toDecodeAny }
    toDecodeAny = event.target.value;
    this.setState({ toDecodeAny: toDecodeAny })
  }

  //After list is changed value is stored in state
  listChangedHandler = (event) => {
    let list = { ...this.state.toDecodeList }
    list = event.target.value.split(' ')
    this.setState({ toDecodeList: list })
  }

  // api request to decode without list endpoint
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

  // on change value is stored in state
  toDecodeChangedHandler = (event) => {
    let toDecode = {
      ...this.state.toEncode
    };
    toDecode = event.target.value;
    this.setState({ toDecode: toDecode })
  }
  // handler to submit value from input to backend
  toDecodeSubmitHandler = (event, url) => {
    let toDecode =
      [...this.state.toDecode];
    if (toDecode.length > 4) {
      this.decodeNativeApiRequest(event, url);
    }else{
      this.setState({decoded:'You need at least 4 characters!'})
    }
  }
  
  render() {
    return (
      <div className="App">
        <Header></Header>
        <Row className="d-flex justify-content-center">
          <Col md='5'>
            <InputOutputForm
              click={(event) => this.toEncodeSubmitHandler(event, 'https://weird-text-2317.herokuapp.com/v1/encode')}
              changed={(event) => this.toEncodeChangedHandler(event)}
              heading='Encoder'
              subHeading='Encode your stuff!'
              placeholder='Sentence to encode'
              encoded={this.state['encoded']}
              toEncode={this.state['toEncode']}>
            </InputOutputForm>
          </Col>
          <Col md='5'>
            <InputOutputForm
              click={(event)=>this.toDecodeSubmitHandler(event,'https://weird-text-2317.herokuapp.com/v1/decode_without_list')}
              changed={(event) => this.toDecodeChangedHandler(event)}
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
              listPlaceholder='Orginal words in sentece separated with spaces'
              listChanged={(event) => this.listChangedHandler(event)}
              toDecodeList={this.state.toDecodeList}
              click={(event) => this.toDecodeAnythingApiRequest(event, 'https://weird-text-2317.herokuapp.com/v1/decode')}
              toEncode={this.state.toDecodeAny}
              toDecodeChanged={(event) => this.toDecodeAnythingChangeHandler(event)}
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
