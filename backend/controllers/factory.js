const asyncCatch = require('./../utils/asyncCatch');
const CustomError = require('./../utils/customError');
const { validationResult } = require('express-validator');

exports.deleteOne = (Model) =>
  asyncCatch(async (req, res, next) => {
    const obj = await Model.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!obj) {
      return next(new CustomError('No data found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  asyncCatch(async (req, res, next) => {
    const obj = await Model.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!obj) {
      return next(new CustomError('No data found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: obj,
      },
    });
  });

exports.createOne = (Model) =>
  asyncCatch(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const obj = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: obj,
      },
    });
  });

exports.getOne = (Model) =>
  asyncCatch(async (req, res, next) => {
    const obj = await Model.findByPk(req.params.id);

    if (!obj) {
      return next(new CustomError('No data found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: obj,
      },
    });
  });

exports.getAll = (Model) =>
  asyncCatch(async (req, res, next) => {
    const obj = await Model.findAll();

    res.status(200).json({
      status: 'success',
      results: obj.length,
      data: {
        data: obj,
      },
    });
  });
