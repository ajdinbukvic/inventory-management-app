const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
//const { sign } = require('jsonwebtoken');
const { Employees, Users, sequelize } = require('../models');

router.post('/create', async (req, res) => {
  const employee = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    email: req.body.email,
    employmentDate: req.body.employmentDate,
  };

  const t = await sequelize.transaction();
  try {
    const createdEmp = await Employees.create(employee, { transaction: t });
    const { username, password } = req.body;
    let hash = await bcrypt.hash(password, 10);
    const resultUser = await Users.create(
      {
        employeeId: createdEmp.id,
        username: username,
        password: hash,
      },
      { transaction: t }
    );
    await t.commit();
    return res.status(201).json(createdEmp);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
