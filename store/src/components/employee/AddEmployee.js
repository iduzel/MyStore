import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { DataContext } from "../../pages/context/Context";
import "./Employee.scss";

const AddEmployee = (props) => {
  const { employeeData, setEmployeeData } = useContext(DataContext);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    address: "",
    phone: null,
    department: "",
    date: null,
  });

  const { name, email, address, phone, department, date } = newEmployee;

  const onInputChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  // HANDLE SUBMIT - ADD EMPLOYEE
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/employees/add", newEmployee);

    if (response.data.success) {
      console.log("add response is success");
      setEmployeeData([...employeeData, newEmployee]);
    }
    setNewEmployee({
      name: "",
      email: "",
      address: "",
      phone: null,
      department: "",
      tags: [],
      date: "",
    });

    props.setFlag(!props.flag);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Name *"
          name="name"
          value={name}
          onChange={(e) => onInputChange(e)}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="email"
          placeholder="Email *"
          name="email"
          value={email}
          onChange={(e) => onInputChange(e)}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          as="textarea"
          placeholder="Address *"
          name="address"
          value={address}
          onChange={(e) => onInputChange(e)}
          //rows={3}
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Phone"
          name="phone"
          value={phone}
          onChange={(e) => onInputChange(e)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Select  name="department"
          value={department}
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
          value={date}
          onChange={(e) => onInputChange(e)}
        />
      </Form.Group>

      <Button variant="success" type="submit">
        Add New Employee
      </Button>
    </Form>
  );
};

export default AddEmployee;
