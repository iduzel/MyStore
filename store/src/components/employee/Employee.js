import './Employee.scss'
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DataContext} from '../../pages/context/Context';
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EditEmployee from './EditEmployee';



const Employee = ({flag, setFlag, employee}) => {

  const { employeeData, setEmployeeData } = useContext(DataContext); 

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    useEffect(() => {
        
        handleClose();
    }, [employee])


    //handle delete
  const handleDeleteEmployee = async (id) => {
    console.log("employeeDATA FROM DeLETE: ", employeeData);
    console.log("id: ", id);

    const response = await axios.delete(`/employees/delete/${id}`);
    console.log("delete employee Response is: ", response);

    if (response.data.success) {
      console.log("delete response is success ");
      setEmployeeData(employeeData.filter((item) => item._id !== id));
    }
  };

    return (

        <>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.address}</td>
            <td>{employee.phone}</td>
            <td>{employee.department}</td>
            <td>{employee.date}</td>
            {/* <td>{employee._id}</td> */}
            <td>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Edit
                        </Tooltip>
                    }>
                    <button onClick={handleShow} className="btn text-warning btn-act" data-toggle="modal"><i className="material-icons">&#xE254;</i></button>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Delete
                        </Tooltip>
                    }>
                <button onClick={() => handleDeleteEmployee(employee._id)} className="btn text-danger btn-act" data-toggle="modal"><i className="material-icons">&#xE872;</i></button>
                </OverlayTrigger>
            </td>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className="modal-header" closeButton>
                    <Modal.Title>
                        Update Employee
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <EditEmployee theEmployee={employee} 
                 flag={flag}
                 setFlag={setFlag}
               />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close Modal
                </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default Employee;