import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FormComponent = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xm={12} md={7}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormComponent;
