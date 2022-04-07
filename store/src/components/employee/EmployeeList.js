import React, { useContext, useEffect, useState } from "react";
import "./Employee.scss";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { DataContext } from "../../pages/context/Context";
import axios from "axios";

const EmployeeList = () => {
  const { employeeData, setEmployeeData } = useContext(DataContext);
  const [modalIndex, setModalIndex] = useState();

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/employees/list");
      console.log("DATA EMP RESPONSE: ", response);
      setEmployeeData([...response.data]);
    };
    getData();
  }, []);

  const sortedEmployees = employeeData?.sort((a, b) =>
    a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1
  );

  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //const handleShowAlert = () => setShowAlert(true)

  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const [obj, setObj] = useState({
    name: "",
    email: "",
    address: "",
    phone: null,
  });

  useEffect(() => {
    handleClose();

    return () => {
      handleShowAlert();
    };
  }, [employeeData]);

  // handle change obj
  const handleChange = (e) => {
    setObj({ ...obj, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/employees/add", obj);

    setObj({
      name: "",
      email: "",
      address: "",
      phone: null,
    });
  };

  //handle delete
  const handleDelete = (id) => {
    let temp = [...employeeData];

    const idx = temp?.findIndex((item, index) => index === id);

    if (idx > -1) temp.splice(idx, 1);
    setEmployeeData(temp);
  };

  //handle edit
  const [editData, setEditData] = useState({});

  const handleEdit = (id) => {
    setShow(true);
    let temp = [...employeeData];
    const employee = temp?.find((item, index) => index === id);
    setModalIndex(id);
    console.log("employee : ", employee);
    setEditData({
      ...editData,
      name: employee.name,
      address: employee.address,
      phone: employee.phone,
    });

    console.log("edit Data : ", editData);
  };
  //MODAL

  const handleSubmitModal = (e) => {
    e.preventDefault();
    let temp = [...employeeData];
    const idx = temp?.findIndex((item, index) => index === modalIndex);
    console.log("idx: ", idx);
    if (idx > -1) temp.splice(idx, 1);
    setEmployeeData(temp);
    setEmployeeData([...temp, editData]);
    handleClose();
  };

  return (
    <div className="employeeList container">
      <div className="video-container mt-3">
        <iframe
          
          src="https://www.youtube.com/embed/8C8ISYGD0ns"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <form onSubmit={handleSubmit} className="formGroup">
        
        <input
          className="form-control w-50"
          placeholder="name"
          name="name"
          onChange={handleChange}
        />
        <input
          className="form-control w-50"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          className="form-control w-50"
          placeholder="address"
          name="address"
          onChange={handleChange}
        />
        <input
          className="form-control w-50"
          placeholder="phone"
          name="phone"
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-danger">
          ADD EMPLOYEE
        </button>
      </form>

      <h1>OBJ</h1>
      <div>
        <h1>{obj.name}</h1>
        <h1>{obj.address}</h1>
        <h1>{obj.phone}</h1>
      </div>

      <h1>ARRAY</h1>
      <Alert show={showAlert} variant="success">
        Employee List successfully updated!.
      </Alert>
      {sortedEmployees?.map((item, index) => {
        return (
          <div key={index} className="border border-danger w-50 m-2 p-2">
            <ul className="">
              <li>{item.name}</li>
              <li>{item.address}</li>
              <li>{item.phone}</li>
            </ul>
            <div className="d-flex justify-content-end ">
              <button
                onClick={() => handleEdit(index)}
                className="btn btn-warning me-2"
              >
                edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="btn btn-danger "
              >
                delete
              </button>
            </div>
          </div>
        );
      })}

      <h1>MODAL</h1>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title>Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmitModal(e)}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Name *"
                name="name"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                as="textarea"
                placeholder="Address *"
                name="address"
                rows={3}
                value={editData.address}
                onChange={(e) =>
                  setEditData({ ...editData, address: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Phone"
                name="phone"
                value={editData.phone}
                onChange={(e) =>
                  setEditData({ ...editData, phone: e.target.value })
                }
              />
            </Form.Group>

            <Button variant="success" type="submit" block>
              Update Employee
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close Modal
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmployeeList;
