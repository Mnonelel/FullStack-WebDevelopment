import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.css';
import './login.css'; 

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Patient',
    phoneNumber: '',
    dateOfBirth: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Handle login form changes
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle register form changes
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle login submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data:', loginData);
    
    // Basic validation
    if (!loginData.email || !loginData.password) {
      showAlertMessage('Please fill in all fields');
      return;
    }

    // Simulate successful login
    showAlertMessage('Login successful! Redirecting...', 'success');
    
    // Reset form
    setLoginData({
      email: '',
      role:"Administrator",
      password: ''
    });
  };

  // Handle register submission
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log('Register Data:', registerData);

    // Basic validation
    if (!registerData.firstName || !registerData.lastName || !registerData.email || 
        !registerData.password || !registerData.confirmPassword) {
      showAlertMessage('Please fill in all required fields');
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      showAlertMessage('Passwords do not match');
      return;
    }

    if (registerData.password.length < 6) {
      showAlertMessage('Password must be at least 6 characters long');
      return;
    }

    // Simulate successful registration
    showAlertMessage('Registration successful! Please check your email for verification.', 'success');
    
    // Reset form
    setRegisterData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'Patient',
      phoneNumber: '',
      dateOfBirth: ''
    });
  };

  const showAlertMessage = (message, type = 'danger') => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  return (
    <Container fluid className="login-container">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col xs={12} sm={10} md={8} lg={6} xl={4}>
          <Card className="login-card shadow-lg">
            <Card.Body className="p-4">
              {/* Header */}
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">Nelson Mandela Academic Hospital +</h2>
                <p className="text-muted">Your Health Comes First</p>
              </div>

              {/* Alert */}
              {showAlert && (
                <Alert 
                  variant={alertMessage.includes('success') ? 'success' : 'danger'} 
                  dismissible 
                  onClose={() => setShowAlert(false)}
                >
                  {alertMessage}
                </Alert>
              )}

              {/* Tabs */}
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-4 custom-tabs"
                justify
              >
                {/* Login Tab */}
                <Tab eventKey="login" title={
                  <span className="fw-semibold">
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Sign In
                  </span>
                }>
                  <Form onSubmit={handleLoginSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        placeholder="Enter your email"
                        required
                        className="py-2"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Role</Form.Label>
                      <Form.Select
                        name="role"
                        value={loginData.role}
                        onChange={handleLoginChange}
                        className="py-2"
                      >
                        <option value="Administrator">Administrator</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Assistant">Medical Assistant</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        placeholder="Enter your password"
                        required
                        className="py-2"
                      />
                    </Form.Group>

                    <div className="d-grid">
                      <Button 
                        variant="primary" 
                        type="submit" 
                        size="lg"
                        className="fw-semibold"
                      >
                        Sign In
                      </Button>
                    </div>

                    <div className="text-center mt-3">
                      <a href="#forgot" className="text-decoration-none">
                        Forgot your password?
                      </a>
                    </div>
                  </Form>
                </Tab>

                {/* Register Tab */}
                <Tab eventKey="register" title={
                  <span className="fw-semibold">
                    <i className="bi bi-person-plus me-2"></i>
                    Register
                  </span>
                }>
                  <Form onSubmit={handleRegisterSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>First Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={registerData.firstName}
                            onChange={handleRegisterChange}
                            placeholder="First name"
                            required
                            className="py-2"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Last Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={registerData.lastName}
                            onChange={handleRegisterChange}
                            placeholder="Last name"
                            required
                            className="py-2"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Email Address *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={registerData.email}
                        onChange={handleRegisterChange}
                        placeholder="Enter your email"
                        required
                        className="py-2"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Role</Form.Label>
                      <Form.Select
                        name="role"
                        value={registerData.role}
                        onChange={handleRegisterChange}
                        className="py-2"
                      >
                        <option value="Assistant">Assistant</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Assistant">Medical Assistant</option>
                      </Form.Select>
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phoneNumber"
                            value={registerData.phoneNumber}
                            onChange={handleRegisterChange}
                            placeholder="Phone number"
                            className="py-2"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Date of Birth</Form.Label>
                          <Form.Control
                            type="date"
                            name="dateOfBirth"
                            value={registerData.dateOfBirth}
                            onChange={handleRegisterChange}
                            className="py-2"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Password *</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        placeholder="Create password"
                        required
                        className="py-2"
                      />
                      <Form.Text className="text-muted">
                        Password must be at least 6 characters long
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Confirm Password *</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={registerData.confirmPassword}
                        onChange={handleRegisterChange}
                        placeholder="Confirm password"
                        required
                        className="py-2"
                      />
                    </Form.Group>

                    <div className="d-grid">
                      <Button 
                        variant="success" 
                        type="submit" 
                        size="lg"
                        className="fw-semibold"
                      >
                        Create Account
                      </Button>
                    </div>

                    <Form.Text className="text-muted d-block mt-2">
                      By registering, you agree to our Terms of Service and Privacy Policy
                    </Form.Text>
                  </Form>
                </Tab>
              </Tabs>

              {/* Demo Credentials */}
              <Card className="bg-light border-0 mt-4">
                <Card.Body className="p-3">
                  <small className="text-muted">
                    <strong>Nelson Mandela Academic Hospital:</strong><br />
                    Email: info@nmah.co.za 
                  </small>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;