import React, { useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'bootstrap/dist/css/bootstrap.css';
import './MEDCRUD.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import axios from "axios";
const MEDCRUD = () => {
  const [show, setShow] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [data, setData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState('patients');

  // Consultation visits data
  const [consultations, setConsultations] = useState([
    {
      id: 1,
      patientId: 1,
      patientName: "John Smith",
      date: "2024-01-15",
      time: "10:00 AM",
      doctor: "Dr. James Wilson",
      reason: "Routine Checkup",
      diagnosis: "Healthy",
      prescription: "Multivitamins",
      notes: "Patient in good health"
    },
    {
      id: 2,
      patientId: 2,
      patientName: "Sarah Johnson",
      date: "2024-01-16",
      time: "2:30 PM",
      doctor: "Dr. Maria Garcia",
      reason: "Headache",
      diagnosis: "Migraine",
      prescription: "Ibuprofen 400mg",
      notes: "Follow up in 2 weeks"
    }
  ]);

  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [editingConsultation, setEditingConsultation] = useState(null);

  // Mock user data
  const user = {
    name: "Dr Silangwe",
    role: "General Practioner"
  };

  const patientData = [
    {
      id: 1,
      Name: "John",
      Surname: "Smith",
      Username: "john.smith",
      Gender: "Male",
      HomeAddress: "123 Main Street, Johannesburg, 2000",
      PhoneNumber: "+27 11 123 4567",
      MedicalAid: true,
      MedicalAidCompany: "Discovery Health"
    },
    {
      id: 2,
      Name: "Sarah",
      Surname: "Johnson",
      Username: "sarah.j",
      Gender: "Female",
      HomeAddress: "45 Oak Avenue, Cape Town, 8001",
      PhoneNumber: "+27 21 987 6543",
      MedicalAid: true,
      MedicalAidCompany: "Momentum"
    }
  ];

  const [editName, setEditName] = useState('');
  const [editSurname, setEditSurname] = useState('');
  const [editUsername, setEditUsername] = useState('');
  const [editGender, setEditGender] = useState('');
  const [editHomeAddress, setEditHomeAddress] = useState('');
  const [editPhoneNumber, setEditPhoneNumber] = useState('');
  const [editMedicalAid, setEditMedicalAid] = useState(false);
  const [editMedicalAidCompany, setEditMedicalAidCompany] = useState('');

  // Consultation form state
  const [newConsultation, setNewConsultation] = useState({
    patientId: "",
    date: "",
    time: "",
    doctor: "",
    reason: "",
    diagnosis: "",
    prescription: "",
    notes: ""
  });

  const [editConsultation, setEditConsultation] = useState({
    patientId: "",
    date: "",
    time: "",
    doctor: "",
    reason: "",
    diagnosis: "",
    prescription: "",
    notes: ""
  });

  const [newPatient, setNewPatient] = useState({
    Name: "",
    Surname: "",
    Username: "",
    Gender: "Male",
    HomeAddress: "",
    PhoneNumber: "",
    MedicalAid: false,
    MedicalAidCompany: ""
  });

  useEffect(() => {
    setData(patientData);
  }, []);
  const getPatientData = () =>
 {
    axios.get('https://localhost:7135/api/Patient/GetAll')
  }

  const handleClose = () => {
    setShow(false);
    setEditingPatient(null);
    resetEditFields();
  };

  const handleConsultationModalClose = () => {
    setShowConsultationModal(false);
    setEditingConsultation(null);
    setEditConsultation({
      patientId: "",
      date: "",
      time: "",
      doctor: "",
      reason: "",
      diagnosis: "",
      prescription: "",
      notes: ""
    });
  };

  const resetEditFields = () => {
    setEditName('');
    setEditSurname('');
    setEditUsername('');
    setEditGender('');
    setEditHomeAddress('');
    setEditPhoneNumber('');
    setEditMedicalAid(false);
    setEditMedicalAidCompany('');
  };

  const handleShow = () => setShow(true);
  const handleConsultationModalShow = () => setShowConsultationModal(true);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      alert("Logged Out");
      // logout();
    }
  };

  const handleEdit = (id) => {
    const patient = data.find(item => item.id === id);
    if (patient) {
      setEditingPatient(patient);
      setEditName(patient.Name);
      setEditSurname(patient.Surname);
      setEditUsername(patient.Username);
      setEditGender(patient.Gender);
      setEditHomeAddress(patient.HomeAddress);
      setEditPhoneNumber(patient.PhoneNumber);
      setEditMedicalAid(patient.MedicalAid);
      setEditMedicalAidCompany(patient.MedicalAidCompany || '');
      handleShow();
    }
  };

  const handleEditConsultation = (id) => {
    const consultation = consultations.find(item => item.id === id);
    if (consultation) {
      setEditingConsultation(consultation);
      setEditConsultation({
        patientId: consultation.patientId,
        date: consultation.date,
        time: consultation.time,
        doctor: consultation.doctor,
        reason: consultation.reason,
        diagnosis: consultation.diagnosis,
        prescription: consultation.prescription,
        notes: consultation.notes
      });
      handleConsultationModalShow();
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      setData(data.filter(item => item.id !== id));
      // Also remove associated consultations
      setConsultations(consultations.filter(consult => consult.patientId !== id));
    }
  };

  const handleDeleteConsultation = (id) => {
    if (window.confirm("Are you sure you want to delete this consultation?")) {
      setConsultations(consultations.filter(item => item.id !== id));
    }
  };

  const handleAdd = () => setShowAddForm(true);
  const handleAddConsultation = () => {
    setNewConsultation({
      patientId: "",
      date: "",
      time: "",
      doctor: "",
      reason: "",
      diagnosis: "",
      prescription: "",
      notes: ""
    });
    setEditingConsultation(null);
    handleConsultationModalShow();
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setNewPatient({
      Name: "",
      Surname: "",
      Username: "",
      Gender: "Male",
      HomeAddress: "",
      PhoneNumber: "",
      MedicalAid: false,
      MedicalAidCompany: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPatient({
      ...newPatient,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleConsultationInputChange = (e) => {
    const { name, value } = e.target;
    setNewConsultation({
      ...newConsultation,
      [name]: value
    });
  };

  const handleEditConsultationInputChange = (e) => {
    const { name, value } = e.target;
    setEditConsultation({
      ...editConsultation,
      [name]: value
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    switch (name) {
      case 'editName': setEditName(value); break;
      case 'editSurname': setEditSurname(value); break;
      case 'editUsername': setEditUsername(value); break;
      case 'editGender': setEditGender(value); break;
      case 'editHomeAddress': setEditHomeAddress(value); break;
      case 'editPhoneNumber': setEditPhoneNumber(value); break;
      case 'editMedicalAid': setEditMedicalAid(checked); break;
      case 'editMedicalAidCompany': setEditMedicalAidCompany(value); break;
      default: break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPatientWithId = {
      ...newPatient,
      id: data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1
    };
    setData([...data, newPatientWithId]);
    handleCancel();
    alert("Patient added successfully!");
  };

  const handleConsultationSubmit = (e) => {
    e.preventDefault();
    const patient = data.find(p => p.id === parseInt(newConsultation.patientId));
    const newConsultationWithId = {
      ...newConsultation,
      id: consultations.length > 0 ? Math.max(...consultations.map(item => item.id)) + 1 : 1,
      patientName: patient ? `${patient.Name} ${patient.Surname}` : "Unknown Patient"
    };
    setConsultations([...consultations, newConsultationWithId]);
    handleConsultationModalClose();
    alert("Consultation added successfully!");
  };

  const handleUpdate = () => {
    if (editingPatient) {
      const updatedData = data.map(item =>
        item.id === editingPatient.id
          ? {
              ...item,
              Name: editName,
              Surname: editSurname,
              Username: editUsername,
              Gender: editGender,
              HomeAddress: editHomeAddress,
              PhoneNumber: editPhoneNumber,
              MedicalAid: editMedicalAid,
              MedicalAidCompany: editMedicalAid ? editMedicalAidCompany : ""
            }
          : item
      );
      setData(updatedData);
      handleClose();
      alert("Patient updated successfully!");
    }
  };

  const handleConsultationUpdate = () => {
    if (editingConsultation) {
      const patient = data.find(p => p.id === parseInt(editConsultation.patientId));
      const updatedConsultations = consultations.map(item =>
        item.id === editingConsultation.id
          ? {
              ...item,
              ...editConsultation,
              patientName: patient ? `${patient.Name} ${patient.Surname}` : "Unknown Patient"
            }
          : item
      );
      setConsultations(updatedConsultations);
      handleConsultationModalClose();
      alert("Consultation updated successfully!");
    }
  };

  const getPatientName = (patientId) => {
    const patient = data.find(p => p.id === patientId);
    return patient ? `${patient.Name} ${patient.Surname}` : "Unknown Patient";
  };

  return (
    <Fragment>
      {/* Header */}
      <Container fluid className="app-header bg-primary text-white py-3">
        <div className="header-content d-flex justify-content-between align-items-center">
          <div className="hospital-info">
            <h4 className="mb-0">Nelson Mandela Academic Hospital +</h4>
            <small className="text-white-50">Patient Management System</small>
          </div>
          <div className="user-info d-flex align-items-center">
            <span className="welcome-text">Welcome, {user?.name || "Admin"}</span>
            <span className="user-role badge bg-info ms-2">{user?.role || "Administrator"}</span>
            <button className="btn btn-outline-light btn-sm ms-3" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-1"></i> Logout
            </button>
          </div>
        </div>
      </Container>

      {/* Body with Tabs */}
      <Container className="my-4">
        <Tabs
          activeKey={activeTab}
          onSelect={(tab) => setActiveTab(tab)}
          id="patient-management-tabs"
          className="mb-3"
        >
          {/* Patients Tab */}
          <Tab eventKey="patients" title="Patient Management">
            <div className="mb-4">
              <button className="btn btn-success mb-3" onClick={handleAdd}>
                + Add New Patient
              </button>

              {showAddForm && (
                <div className="card p-4 bg-light mb-4">
                  <h5 className="mb-3">Add New Patient</h5>
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <label className="form-label">First Name *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="Name"
                            value={newPatient.Name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <label className="form-label">Last Name *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="Surname"
                            value={newPatient.Surname}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <label className="form-label">Username *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="Username"
                            value={newPatient.Username}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <label className="form-label">Gender</label>
                          <select
                            className="form-select"
                            name="Gender"
                            value={newPatient.Gender}
                            onChange={handleInputChange}
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </Col>
                    </Row>

                    <div className="mb-3">
                      <label className="form-label">Home Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="HomeAddress"
                        value={newPatient.HomeAddress}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="PhoneNumber"
                        value={newPatient.PhoneNumber}
                        onChange={handleInputChange}
                      />
                    </div>

                    <Row>
                      <Col md={6}>
                        <div className="mb-3 form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name="MedicalAid"
                            checked={newPatient.MedicalAid}
                            onChange={handleInputChange}
                          />
                          <label className="form-check-label">Has Medical Aid</label>
                        </div>
                      </Col>
                      <Col md={6}>
                        {newPatient.MedicalAid && (
                          <div className="mb-3">
                            <label className="form-label">Medical Aid Company</label>
                            <input
                              type="text"
                              className="form-control"
                              name="MedicalAidCompany"
                              value={newPatient.MedicalAidCompany}
                              onChange={handleInputChange}
                            />
                          </div>
                        )}
                      </Col>
                    </Row>

                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-primary">Add Patient</button>
                      <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Patients Table */}
            <Table striped bordered hover responsive>
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                  <th>Gender</th>
                  <th>Home Address</th>
                  <th>Phone Number</th>
                  <th>Medical Aid</th>
                  <th>Medical Aid Company</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.Name}</td>
                      <td>{item.Surname}</td>
                      <td>{item.Username}</td>
                      <td>{item.Gender}</td>
                      <td>{item.HomeAddress}</td>
                      <td>{item.PhoneNumber}</td>
                      <td>{item.MedicalAid ? "Yes" : "No"}</td>
                      <td>{item.MedicalAidCompany || "N/A"}</td>
                      <td>
                        <div className="d-flex gap-1">
                          <button className="btn btn-primary btn-sm" onClick={() => handleEdit(item.id)}>Edit</button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center py-4">No patients found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Tab>

          {/* Consultations Tab */}
          <Tab eventKey="consultations" title="Consultation Visits">
            <div className="mb-4">
              <button className="btn btn-success mb-3" onClick={handleAddConsultation}>
                + Add New Consultation
              </button>
            </div>

            {/* Consultations Table */}
            <Table striped bordered hover responsive>
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Patient</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Doctor</th>
                  <th>Reason</th>
                  <th>Diagnosis</th>
                  <th>Prescription</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {consultations.length > 0 ? (
                  consultations.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.patientName}</td>
                      <td>{item.date}</td>
                      <td>{item.time}</td>
                      <td>{item.doctor}</td>
                      <td>{item.reason}</td>
                      <td>{item.diagnosis}</td>
                      <td>{item.prescription}</td>
                      <td>{item.notes}</td>
                      <td>
                        <div className="d-flex gap-1">
                          <button className="btn btn-primary btn-sm" onClick={() => handleEditConsultation(item.id)}>Edit</button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDeleteConsultation(item.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center py-4">No consultation visits found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Tab>
        </Tabs>

        {/* Edit Patient Modal */}
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Edit Patient Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {editingPatient && (
              <Row>
                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label">First Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="editName"
                      value={editName}
                      onChange={handleEditInputChange}
                      required
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label">Last Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="editSurname"
                      value={editSurname}
                      onChange={handleEditInputChange}
                      required
                    />
                  </div>
                </Col>
                
                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label">Username *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="editUsername"
                      value={editUsername}
                      onChange={handleEditInputChange}
                      required
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <select
                      className="form-select"
                      name="editGender"
                      value={editGender}
                      onChange={handleEditInputChange}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </Col>

                <Col md={12}>
                  <div className="mb-3">
                    <label className="form-label">Home Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="editHomeAddress"
                      value={editHomeAddress}
                      onChange={handleEditInputChange}
                    />
                  </div>
                </Col>

                <Col md={12}>
                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="editPhoneNumber"
                      value={editPhoneNumber}
                      onChange={handleEditInputChange}
                    />
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="editMedicalAid"
                      checked={editMedicalAid}
                      onChange={handleEditInputChange}
                    />
                    <label className="form-check-label">Has Medical Aid</label>
                  </div>
                </Col>
                <Col md={6}>
                  {editMedicalAid && (
                    <div className="mb-3">
                      <label className="form-label">Medical Aid Company</label>
                      <input
                        type="text"
                        className="form-control"
                        name="editMedicalAidCompany"
                        value={editMedicalAidCompany}
                        onChange={handleEditInputChange}
                      />
                    </div>
                  )}
                </Col>
              </Row>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button 
              variant="primary" 
              onClick={handleUpdate}
              disabled={!editName || !editSurname || !editUsername}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Consultation Modal */}
        <Modal show={showConsultationModal} onHide={handleConsultationModalClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {editingConsultation ? 'Edit Consultation' : 'Add New Consultation'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={editingConsultation ? handleConsultationUpdate : handleConsultationSubmit}>
              <Row>
                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label">Patient *</label>
                    <select
                      className="form-select"
                      name="patientId"
                      value={editingConsultation ? editConsultation.patientId : newConsultation.patientId}
                      onChange={editingConsultation ? handleEditConsultationInputChange : handleConsultationInputChange}
                      required
                    >
                      <option value="">Select Patient</option>
                      {data.map(patient => (
                        <option key={patient.id} value={patient.id}>
                          {patient.Name} {patient.Surname}
                        </option>
                      ))}
                    </select>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label">Doctor *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="doctor"
                      value={editingConsultation ? editConsultation.doctor : newConsultation.doctor}
                      onChange={editingConsultation ? handleEditConsultationInputChange : handleConsultationInputChange}
                      required
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label">Date *</label>
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      value={editingConsultation ? editConsultation.date : newConsultation.date}
                      onChange={editingConsultation ? handleEditConsultationInputChange : handleConsultationInputChange}
                      required
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label">Time *</label>
                    <input
                      type="time"
                      className="form-control"
                      name="time"
                      value={editingConsultation ? editConsultation.time : newConsultation.time}
                      onChange={editingConsultation ? handleEditConsultationInputChange : handleConsultationInputChange}
                      required
                    />
                  </div>
                </Col>
              </Row>

              <div className="mb-3">
                <label className="form-label">Reason for Visit *</label>
                <input
                  type="text"
                  className="form-control"
                  name="reason"
                  value={editingConsultation ? editConsultation.reason : newConsultation.reason}
                  onChange={editingConsultation ? handleEditConsultationInputChange : handleConsultationInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Diagnosis</label>
                <textarea
                  className="form-control"
                  name="diagnosis"
                  rows="2"
                  value={editingConsultation ? editConsultation.diagnosis : newConsultation.diagnosis}
                  onChange={editingConsultation ? handleEditConsultationInputChange : handleConsultationInputChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Prescription</label>
                <textarea
                  className="form-control"
                  name="prescription"
                  rows="2"
                  value={editingConsultation ? editConsultation.prescription : newConsultation.prescription}
                  onChange={editingConsultation ? handleEditConsultationInputChange : handleConsultationInputChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Notes</label>
                <textarea
                  className="form-control"
                  name="notes"
                  rows="3"
                  value={editingConsultation ? editConsultation.notes : newConsultation.notes}
                  onChange={editingConsultation ? handleEditConsultationInputChange : handleConsultationInputChange}
                />
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  {editingConsultation ? 'Update Consultation' : 'Add Consultation'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleConsultationModalClose}>
                  Cancel
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </Container>
    </Fragment>
  );
};

export default MEDCRUD;