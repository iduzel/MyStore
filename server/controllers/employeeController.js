const express = require("express");
const Employee = require("../models/EmployeeModel");
const router = express.Router();

router.get("/list", async (req, res) => {
  try {
    const employees = await Employee.find();

    res.send(employees);
  } catch (error) {
    console.log("employee listing error", error.message);
    res.send(error.message);
  }
});

router.post("/add", async (req, res) => {
  try {
    console.log("employeeController/register req body is: ", req.body);

    const { name, email, address, phone, department, tags, date } = req.body;

    if (!name || !email) return res.send({ success: false, errorId: 1 });

    const newEmployee = new Employee(req.body);
    console.log("newEmployee: ", newEmployee);
    const employee = await newEmployee.save();

    res.send({ success: true, employee });
  } catch (error) {
    console.log("Employee Error: ", error.message);
  }
});

router.delete('/delete/:employeeid', async (req, res) => {

  try {
    console.log('req.params is: ',req.params)
    const { employeeid } = req.params
    console.log('employeeIDBBBBBBB: ', employeeid)


    const employee =  await Employee.findByIdAndDelete(employeeid)

    if( !employee) return res.sendStatus(404)
    res.send({success:true,  employee})
   
    
  } catch (error) {
    console.log('Employee DELETE Error message: ', error.message)
    res.send(error.message)
  }
})

router.put('/edit/:employeeid', async (req, res) => {

  try {
    console.log('req.params is: ',req.params)
   
    console.log('req body is', req.body);
    const { employeeid } = req.params
    console.log('employee EDIT ID: ', employeeid)

    const employee = await Employee.findByIdAndUpdate(employeeid, {
      name:req.body.name,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
      department: req.body.department,
      date: req.body.date,
      tags: req.body.tags
    })

    res.send({success: true, employee})
    
  } catch (error) {
    console.log('Employee EDIT Error message: ', error.message)
    res.send(error.message)
  }
})

module.exports = router;
