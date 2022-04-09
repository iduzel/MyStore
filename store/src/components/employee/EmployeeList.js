import React, { useContext, useEffect, useState } from "react";
import "./Employee.scss";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { DataContext } from "../../pages/context/Context";
import axios from "axios";
import { useNavigate } from "react-router";
import Employee from "./Employee";
import AddEmployee from "./AddEmployee";

const EmployeeList = () => {
  const navigate = useNavigate();
  const [flag, setFlag] = useState();

  const { userData, setUserData, employeeData, setEmployeeData } =
    useContext(DataContext);

  useEffect(() => {
    if (!userData) navigate("/login");
    const getData = async () => {
      const response = await axios.get("/employees/list");
      console.log("DATA EMP RESPONSE: ", response);
      setEmployeeData([...response.data]);
    };
    getData();
  }, [flag]);

  const sortedEmployees = employeeData?.sort((a, b) =>
    a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1
  );

  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  useEffect(() => {
    handleClose();

    return () => {
      handleShowAlert();
    };
  }, [employeeData]);

   
  const getSearch = (e) => {
    const searchElement = e.target.value;
    console.log('getSearch: ', e.target.value);
   

 

    
  }

  return (
    <div className="employeeList container mt-2">
      {/* <div className="video-container mt-3">
        <iframe          
          src="https://www.youtube.com/embed/8C8ISYGD0ns"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div> */}

      <Alert show={showAlert} variant="success">
        Employee List successfully updated!.
      </Alert>

      <div className="table-title mt-5">
        <div className="row">
          <div className="col-sm-4">
            <h2>
              Manage <b>Employees</b>
            </h2>
          </div>
          <div className="col-sm-4 ">
            <input
            className="ps-1"
            placeholder="Search"            
            onChange={(e) => getSearch(e)}  />
          </div>
          <div className="col-sm-4">
            <Button
              onClick={handleShow}
              className="btn btn-success text-white"
              data-toggle="modal"
            >
              <i className="material-icons">&#xE147;</i>{" "}
              <span>Add New Employee</span>
            </Button>
          </div>
        </div>
      </div>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Date</th>
           {/*  <th>ID</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployees?.map((employee, index) => (
            <tr key={index}>
              <Employee employee={employee}
                        flag={flag}
                        setFlag={setFlag} />
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddEmployee flag={flag}
          setFlag={setFlag} />
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
