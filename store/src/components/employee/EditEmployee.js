import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { DataContext } from "../../pages/context/Context";
import "./Employee.scss";
import { useNavigate } from "react-router";
import axios from "axios";

const EditEmployee = ({theEmployee }) => {
  const navigate = useNavigate();
  const employee = theEmployee;

  const { flag, setFlag, updateEmployee, employeeData, setEmployeeData, userData } =
    useContext(DataContext);

  //handle edit
  const [editData, setEditData] = useState({
    name: employee.name,
    email: employee.email,
    address: employee.address,
    phone: employee.phone,
    department: employee.department,
    date: employee.date,
  });
  console.log("editData is: ", editData);

  const onInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  //MODAL
  const handleSubmitModal = async (e) => {
    e.preventDefault();

    const response = await axios.put(
      `/employees/edit/${employee._id}`,
      editData
    );

    if (response.data.success) {
      console.log("edit resp is : success");
      const temp = [...employeeData];
      temp.filter((item) => item._id !== employee._id);
      setEmployeeData([...temp, editData]);
    }

    setFlag(!flag);

    handleClose();
  };

  return (
    <Form onSubmit={handleSubmitModal}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Name *"
          name="name"
          value={editData.name}
          onChange={(e) => onInputChange(e)}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="email"
          placeholder="Email *"
          name="email"
          value={editData.email}
          onChange={(e) => onInputChange(e)}
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
          onChange={(e) => onInputChange(e)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Phone"
          name="phone"
          value={editData.phone}
          onChange={(e) => onInputChange(e)}
        />
      </Form.Group>

        <Form.Group>
        <Form.Select  name="department"
          value={editData.department}
          onChange={(e) => onInputChange(e)} aria-label="Default select example">
          <option>Department</option>
          <option value="JS">JS</option>
          <option value="Java">Java</option>
          <option value="React">React</option>
        </Form.Select>
        </Form.Group>
     
      <Form.Group>
        <Form.Control
          type="date"
          placeholder="Date"
          name="date"
          value={editData.date}
          onChange={(e) => onInputChange(e)}
        />
      </Form.Group>

      <Button variant="success" type="submit" block="true">
        Update Employee
      </Button>
    </Form>
  );
};

export default EditEmployee;
