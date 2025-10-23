import React, { useState, useEffect, Fragment } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";

const AdminCRUD = () => {
  const [show, setShow] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleClose = () => {
    setShow(false);
    setEditingUser(null);
    // Clear edit fields
    setEditName("");
    setEditEmail("");
    setEditUsername("");
    setEditRole("Assistant");
    setEditStatus("Active");
    setEditDepartment("");
    setEditSpecialization("");
  };

  const handleShow = () => setShow(true);

  // State for editing user
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editRole, setEditRole] = useState("Assistant");
  const [editStatus, setEditStatus] = useState("Active");
  const [editDepartment, setEditDepartment] = useState("");
  const [editSpecialization, setEditSpecialization] = useState("");

  // Sample user data
  const usersData = [
    {
      id: 1,
      name: "Dr. John Smith",
      email: "john.smith@hospital.com",
      username: "dr.john",
      role: "Doctor",
      status: "Active",
      department: "Cardiology",
      specialization: "Cardiologist",
      joinDate: "2023-01-15",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@hospital.com",
      username: "sarah.assistant",
      role: "Assistant",
      status: "Active",
      department: "Cardiology",
      specialization: "Medical Assistant",
      joinDate: "2023-02-20",
    },
  ];

  const [data, setData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    username: "",
    role: "Assistant",
    status: "Active",
    department: "",
    specialization: "",
  });

  // Department options
  const departmentOptions = [
    "Cardiology",
    "Pediatrics",
    "Surgery",
    "Emergency",
    "Radiology",
    "Neurology",
    "Orthopedics",
    "Oncology",
    "Dermatology",
    "Psychiatry",
    "Administration",
  ];

  // Specialization options
  const doctorSpecializations = [
    "Cardiologist",
    "Pediatrician",
    "Surgeon",
    "Emergency Physician",
    "Radiologist",
    "Neurologist",
    "Orthopedic Surgeon",
    "Oncologist",
    "Dermatologist",
    "Psychiatrist",
    "General Practitioner",
  ];

  const assistantSpecializations = [
    "Medical Assistant",
    "Nurse Assistant",
    "Surgical Assistant",
    "Administrative Assistant",
    "Laboratory Assistant",
    "Radiology Assistant",
  ];

  useEffect(() => {
    setData(usersData);
  }, []);
  const getPatientData = () =>
  {
    
  }

  // Simplified logout placeholder
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      alert("You have been logged out.");
    }
  };

  const handleEdit = (id) => {
    const user = data.find((item) => item.id === id);
    if (user) {
      setEditingUser(user);
      setEditName(user.name);
      setEditEmail(user.email);
      setEditUsername(user.username);
      setEditRole(user.role);
      setEditStatus(user.status);
      setEditDepartment(user.department);
      setEditSpecialization(user.specialization || "");
      handleShow();
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const filteredData = data.filter((item) => item.id !== id);
      setData(filteredData);
      alert("User deleted successfully!");
    }
  };

  const handleAdd = () => {
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setNewUser({
      name: "",
      email: "",
      username: "",
      role: "Assistant",
      status: "Active",
      department: "",
      specialization: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const specialization =
      newUser.specialization ||
      (newUser.role === "Doctor"
        ? "General Practitioner"
        : "Medical Assistant");

    const newUserWithId = {
      ...newUser,
      specialization,
      id: data.length + 1,
      joinDate: new Date().toISOString().split("T")[0],
    };

    setData([...data, newUserWithId]);
    setShowAddForm(false);
    setNewUser({
      name: "",
      email: "",
      username: "",
      role: "Assistant",
      status: "Active",
      department: "",
      specialization: "",
    });
    alert("User added successfully!");
  };

  const handleUpdate = () => {
    if (editingUser) {
      const updatedData = data.map((item) =>
        item.id === editingUser.id
          ? {
              ...item,
              name: editName,
              email: editEmail,
              username: editUsername,
              role: editRole,
              status: editStatus,
              department: editDepartment,
              specialization: editSpecialization,
            }
          : item
      );
      setData(updatedData);
      handleClose();
      alert("User updated successfully!");
    }
  };

  const getSpecializationOptions = (role) => {
    if (role === "Doctor") {
      return doctorSpecializations;
    } else if (role === "Assistant") {
      return assistantSpecializations;
    } else {
      return ["System Administrator", "IT Support", "Manager"];
    }
  };

  return (
    <Fragment>
      {/* Header with User Info and Logout */}
      <Container fluid className="app-header admin-header bg-dark text-white py-3 mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h4 className="mb-0">Nelson Mandela Academic Hospital +</h4>
            <small className="text-white-50">Administrator Panel</small>
          </div>
          <div className="user-info d-flex align-items-center">
            <span className="welcome-text">Welcome, Admin</span>
            <span className="user-role badge bg-warning text-dark ms-2">
              Administrator
            </span>
            <button className="btn btn-outline-light ms-3" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-1"></i>
              Logout
            </button>
          </div>
        </div>
      </Container>

      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2>Hospital Staff Management</h2>
            <p className="text-muted">
              Manage Doctors, Assistants, and Administrative Staff
            </p>
          </div>
          <button className="btn btn-success" onClick={handleAdd}>
            + Add New Staff
          </button>
        </div>

        {showAddForm && (
          <div className="card p-3 bg-light mb-4">
            <h5>Add New Staff Member</h5>
            <form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={newUser.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={newUser.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Username *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      value={newUser.username}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label">Role *</label>
                    <select
                      className="form-control"
                      name="role"
                      value={newUser.role}
                      onChange={handleInputChange}
                    >
                      <option value="Assistant">Medical Assistant</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Admin">Administrator</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Department *</label>
                    <select
                      className="form-control"
                      name="department"
                      value={newUser.department}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Department</option>
                      {departmentOptions.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Specialization *</label>
                    <select
                      className="form-control"
                      name="specialization"
                      value={newUser.specialization}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Specialization</option>
                      {getSpecializationOptions(newUser.role).map((spec) => (
                        <option key={spec} value={spec}>
                          {spec}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className="form-control"
                      name="status"
                      value={newUser.status}
                      onChange={handleInputChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="On Leave">On Leave</option>
                    </select>
                  </div>
                </Col>
              </Row>
              <div className="mt-3">
                <button type="submit" className="btn btn-primary me-2">
                  Save Staff Member
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>Role</th>
              <th>Department</th>
              <th>Specialization</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    <strong>{item.name}</strong>
                    {item.role === "Doctor" && <span className="ms-1">👨‍⚕️</span>}
                    {item.role === "Assistant" && <span className="ms-1">👩‍⚕️</span>}
                  </td>
                  <td>{item.email}</td>
                  <td>{item.username}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.role === "Admin"
                          ? "bg-danger"
                          : item.role === "Doctor"
                          ? "bg-primary"
                          : "bg-success"
                      }`}
                    >
                      {item.role}
                    </span>
                  </td>
                  <td>{item.department}</td>
                  <td>{item.specialization}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.status === "Active"
                          ? "bg-success"
                          : item.status === "Inactive"
                          ? "bg-secondary"
                          : "bg-warning"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>{item.joinDate}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>{" "}
                    &nbsp;
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  Loading staff data...
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Edit User Modal */}
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Edit Staff Member Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
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
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    required
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Department</label>
                  <select
                    className="form-control"
                    value={editDepartment}
                    onChange={(e) => setEditDepartment(e.target.value)}
                    required
                  >
                    <option value="">Select Department</option>
                    {departmentOptions.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select
                    className="form-control"
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                  >
                    <option value="Assistant">Medical Assistant</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Admin">Administrator</option>
                  </select>
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Specialization</label>
                  <select
                    className="form-control"
                    value={editSpecialization}
                    onChange={(e) => setEditSpecialization(e.target.value)}
                    required
                  >
                    <option value="">Select Specialization</option>
                    {getSpecializationOptions(editRole).map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-control"
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>
              </Col>
            </Row>
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
  );
};

export default AdminCRUD;
