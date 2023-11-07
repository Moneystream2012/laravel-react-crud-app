import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ToastContainer } from 'react-toastify';

import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";

import AdvertEdit from "./pages/Edit";
import AdvertList from "./pages/List";
import AdvertCreate from "./pages/Create";

const App = () => {
  return (
    <Router>
      
      <Navbar className="gradient-warning">
        <Container>
          <Link to={"/"} className="navbar-brand text-white">
            <b>React Crud App</b>
          </Link>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <Row>
          <Col md={12}>
            <Routes>
              <Route path="/adverts/create" element={<AdvertCreate />} />
              <Route path="/adverts/edit/:id" element={<AdvertEdit />} />
              <Route exact path='/' element={<AdvertList />} />
            </Routes>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </Router>
  );
}

export default App;
