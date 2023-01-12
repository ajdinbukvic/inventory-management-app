const { Employees, Users, sequelize } = require('../models');
const asyncCatch = require('./../utils/asyncCatch');
const { validationResult } = require('express-validator');
const factory = require('./factory');

exports.getAllEmployees = factory.getAll(Employees); //automatksi popunjava i podatke iz tabele Users (bez passworda)
exports.getEmployee = factory.getOne(Employees); //automatksi popunjava i podatke iz tabele Users (bez passworda)
//kreira se u posebnoj metodi zbog dodatnog koda (kreiranje korisnika - TRANSAKCIJA)
//exports.createEmployee = factory.createOne(Employees);
exports.updateEmployee = factory.updateOne(Employees);
//exports.deleteEmployee = factory.deleteOne(Employees); //nema brisanja

exports.createEmployee = asyncCatch(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const newEmployee = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    employmentDate: req.body.employmentDate,
    email: req.body.email,
  };

  const t = await sequelize.transaction();

  try {
    const createdEmp = await Employees.create(newEmployee, { transaction: t });
    const { username, password } = req.body;
    const newUser = await Users.create(
      {
        employeeId: createdEmp.id,
        username,
        password,
      },
      { transaction: t }
    );
    await t.commit();
    res.status(201).json({
      status: 'success',
      data: {
        data: createdEmp,
      },
    });
  } catch (err) {
    await t.rollback();
  }
});