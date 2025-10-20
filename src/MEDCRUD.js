import React, { useState, useEffect, Fragment } from "react";
import { useAuth } from './AuthContext';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.css';
import './MEDCRUD.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';

const MEDCRUD = () => {
    const { user, logout } = useAuth();
    
    const [show, setShow] = useState(false);
    const [editingPatient, setEditingPatient] = useState(null);

    const handleClose = () => {
        setShow(false);
        setEditingPatient(null);
    }
    
    const handleShow = () => setShow(true);

    const [editName, setEditName] = useState('')
    const [editSurname, setEditSurname] = useState('')
    const [editUsername, setEditUsername] = useState('')
    const [editGender, setEditGender] = useState('')
    const [editHomeAddress, setEditHomeAddress] = useState('')
    const [editPhoneNumber, setEditPhoneNumber]= useState('')
    const [editMedicalAid, setEditMedicalAid] = useState(false)
    const [editMedicalAidCompany, setEditMedicalAidCompany] = useState('')

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
    ]

    const [data, setData] = useState([])
    const [showAddForm, setShowAddForm] = useState(false)
    const [newPatient, setNewPatient] = useState({
        Name: "",
        Surname: "",
        Username: "",
        Gender: "Male",
        HomeAddress: "",
        PhoneNumber: "",
        MedicalAid: false,
        MedicalAidCompany: ""
    })

    useEffect(() => {
        setData(patientData);
    }, [])

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            logout();
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
    }

    const handleDelete = (id) => {
        if(window.confirm("Are you sure you want to delete this entry?") === true) {
            const filteredData = data.filter(item => item.id !== id);
            setData(filteredData);
        }
    }

    const handleAdd = () => {
        setShowAddForm(true)
    }

    const handleCancel = () => {
        setShowAddForm(false)
        setNewPatient({
            Name: "",
            Surname: "",
            Username: "",
            Gender: "Male",
            HomeAddress: "",
            PhoneNumber: "",
            MedicalAid: false,
            MedicalAidCompany: ""
        })
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setNewPatient({
            ...newPatient,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newPatientWithId = {
            ...newPatient,
            id: data.length + 1
        }
        setData([...data, newPatientWithId])
        setShowAddForm(false)
        setNewPatient({
            Name: "",
            Surname: "",
            Username: "",
            Gender: "Male",
            HomeAddress: "",
            PhoneNumber: "",
            MedicalAid: false,
            MedicalAidCompany: ""
        })
        alert("Patient added successfully!")
    }

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
                        MedicalAidCompany: editMedicalAid ? editMedicalAidCompany : null
                    }
                    : item
            );
            setData(updatedData);
            handleClose();
            alert("Patient updated successfully!");
        }
    }
    
    return(
        <Fragment>
            {/* Header with User Info and Logout */}
            <Container fluid className="app-header">
                <div className="header-content">
                    <div className="hospital-info">
                        <h4 className="mb-0">Nelson Mandela Academic Hospital +</h4>
                        <small className="text-white-50">Patient Management System</small>
                    </div>
                    <div className="user-info">
                        <span className="welcome-text">Welcome, {user?.name}</span>
                        <span className="user-role badge bg-info ms-2">{user?.role}</span>
                        <button 
                            className="logout-btn ms-3"
                            onClick={handleLogout}
                        >
                            <i className="bi bi-box-arrow-right me-1"></i>
                            Logout
                        </button>
                    </div>
                </div>
            </Container>

            <Container>
                <div className="mb-4">
                    <button 
                        className="btn btn-success mb-3"
                        onClick={handleAdd}
                    >
                        + Add New Patient
                    </button>

                    {showAddForm && (
                        <div className="card p-3 bg-light">
                            <h5>Add New Patient</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-2">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                placeholder="First Name"
                                                name="Name"
                                                value={newPatient.Name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                placeholder="Last Name"
                                                name="Surname"
                                                value={newPatient.Surname}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                placeholder="Username"
                                                name="Username"
                                                value={newPatient.Username}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <select
                                                className="form-control form-control-sm"
                                                name="Gender"
                                                value={newPatient.Gender}
                                                onChange={handleInputChange}
                                            >
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-2">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                placeholder="Home Address"
                                                name="HomeAddress"
                                                value={newPatient.HomeAddress}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                placeholder="Phone Number"
                                                name="PhoneNumber"
                                                value={newPatient.PhoneNumber}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-2 form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                name="MedicalAid"
                                                checked={newPatient.MedicalAid}
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-check-label">Has Medical Aid</label>
                                        </div>
                                        {newPatient.MedicalAid && (
                                            <div className="mb-2">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    placeholder="Medical Aid Company"
                                                    name="MedicalAidCompany"
                                                    value={newPatient.MedicalAidCompany}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <button type="submit" className="btn btn-primary btn-sm me-2">
                                        Save Patient
                                    </button>
                                    <button type="button" className="btn btn-secondary btn-sm" onClick={handleCancel}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>

                <Table striped bordered hover>
                    <thead>
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
                        {data && data.length > 0 ?
                            data.map((item, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.Name}</td>
                                        <td>{item.Surname}</td>
                                        <td>{item.Username}</td>
                                        <td>{item.Gender}</td>
                                        <td>{item.HomeAddress}</td>
                                        <td>{item.PhoneNumber}</td>
                                        <td>{item.MedicalAid ? "Yes" : "No"}</td>
                                        <td>{item.MedicalAidCompany || "N/A"}</td>
                                        <td>
                                            <button className="btn btn-primary btn-sm" onClick={() => handleEdit(item.id)}>Edit</button> &nbsp;
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <td colSpan="10" className="text-center">Loading patient data...</td>
                            </tr>
                        } 
                    </tbody>
                </Table>

                {/* Edit Patient Modal */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Patient Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col md={6}>
                                <div className="mb-3">
                                    <label className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="Name"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        required
                                    />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="mb-3">
                                    <label className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="Surname"
                                        value={editSurname}
                                        onChange={(e) => setEditSurname(e.target.value)}
                                        required
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="Username"
                                        value={editUsername}
                                        onChange={(e) => setEditUsername(e.target.value)}
                                        required
                                    />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="mb-3">
                                    <label className="form-label">Gender</label>
                                    <select
                                        className="form-control"
                                        name="Gender"
                                        value={editGender}
                                        onChange={(e) => setEditGender(e.target.value)}
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <div className="mb-3">
                                    <label className="form-label">Home Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="HomeAddress"
                                        value={editHomeAddress}
                                        onChange={(e) => setEditHomeAddress(e.target.value)}
                                        required
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <div className="mb-3">
                                    <label className="form-label">Phone Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="PhoneNumber"
                                        value={editPhoneNumber}
                                        onChange={(e) => setEditPhoneNumber(e.target.value)}
                                        required
                                    />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="MedicalAid"
                                        checked={editMedicalAid}
                                        onChange={(e) => setEditMedicalAid(e.target.checked)}
                                    />
                                    <label className="form-check-label">Has Medical Aid</label>
                                </div>
                            </Col>
                        </Row>
                        {editMedicalAid && (
                            <Row>
                                <Col md={12}>
                                    <div className="mb-3">
                                        <label className="form-label">Medical Aid Company</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="MedicalAidCompany"
                                            value={editMedicalAidCompany}
                                            onChange={(e) => setEditMedicalAidCompany(e.target.value)}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleUpdate}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </Fragment>
    )
}

export default MEDCRUD;