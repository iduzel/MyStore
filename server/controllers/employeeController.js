const express = require('express');
const Employee = require('../models/EmployeeModel') 
const router = express.Router();

router.get('/list', async (req, res) => {
   
    try {
        
        const employees = await Employee.find()

        res.send(employees)
    } catch (error) {
        console.log('employee listing error', error.message)
        res.send(error.message)
    }
})

router.post("/add", async (req, res) => {
    try {
      console.log("employeeController/register req body is: ", req.body);
  
      const { name, email, address, phone } = req.body;
  
      if (!name || !email )
        return res.send({ success: false, errorId: 1 });
  
      const newEmployee = new Employee(req.body);
      console.log("newEmployee: ", newEmployee);
      const employee = await newEmployee.save(); 
     
  
      res.send({ success: true, employee });
    } catch (error) {
      console.log("Employee Error: ", error.message);
    }
  });

  module.exports = router;