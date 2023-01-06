const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
//const { sign } = require('jsonwebtoken');
const {
  Employees,
  Users,
  ProductionProcess,
  ProductionProcessItem,
  Supplies,
  sequelize,
} = require('../models');

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
    const { username, password, role } = req.body;
    const resultUser = await Users.create(
      {
        employeeId: createdEmp.id,
        username: username,
        password: password,
        role: role,
      },
      { transaction: t }
    );
    await t.commit();
    // const sve = await ProductionProcessItem.findAll({
    //   attributes: [
    //     'productionProcessId',
    //     [
    //       sequelize.fn('sum'),
    //       sequelize.col(ProductionProcessItem.quantity * Supplies.price),
    //       'total',
    //     ],
    //   ],
    //   include: [
    //     {
    //       model: ProductionProcess,
    //       attributes: ['id'],
    //       include: [
    //         {
    //           model: Supplies,
    //           attributes: ['price'],
    //         },
    //       ],
    //     },
    //   ],
    //   group: ['productionProcessId'],
    // });
    // const results = await sequelize.query(
    //   `SELECT p.id, SUM(pi.quantity * s.price) AS total FROM dbzalihe_177.production_process as p
    // INNER JOIN dbzalihe_177.production_process_item as pi ON p.id = pi.productionProcessId
    // INNER JOIN dbzalihe_177.supplies AS s ON pi.supplyId = s.id
    // WHERE p.id = 1
    // GROUP BY p.id`,
    //   {
    //     type: sequelize.QueryTypes.SELECT,
    //   }
    // );
    const proces = await ProductionProcess.create({
      name: 'test',
      startDate: new Date(),
      endDate: new Date(),
    });
    const data1 = await ProductionProcessItem.create({
      productionProcessId: proces.id,
      supplyId: 2,
      quantity: 350,
    });
    const data2 = await ProductionProcessItem.create({
      productionProcessId: proces.id,
      supplyId: 3,
      quantity: 600,
    });
    const results = await sequelize.query(
      `SELECT p.id, SUM(pi.quantity * s.price) AS total FROM dbzalihe_177.production_process as p 
    INNER JOIN dbzalihe_177.production_process_item as pi ON p.id = pi.productionProcessId
    INNER JOIN dbzalihe_177.supplies AS s ON pi.supplyId = s.id
    WHERE p.id = ${proces.id}
    GROUP BY p.id`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
    console.log(results[0].total);
    const updated = await ProductionProcess.update(
      { price: results[0].total },
      { where: { id: proces.id } },
      { returning: true }
    );
    return res.status(201).json(updated);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
