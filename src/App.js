import React from "react";
import Date from './Date'
import Time from './Time'
// import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "@mui/system";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <div class="h-100 d-flex align-items-center justify-content-center">
      <Container class = "d-flex justify-content-center">
        <Row className="rows">
          <Col className="cols"> <Date /> </Col>
          <Col className="cols"> <Time /> </Col>
        </Row>
      </Container>

    </div>
  )
}

export default App;
