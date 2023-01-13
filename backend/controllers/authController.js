const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Users, Employees } = require('../models');
const { validationResult } = require('express-validator');
const asyncCatch = require('./../utils/asyncCatch');
const CustomError = require('./../utils/customError');
const {
  USER_INCORRECT_USERNAME_PASSWORD,
  USER_IS_FIRED,
  USER_CURRENT_PASSWORD_WRONG,
  USER_PASSWORDS_NOT_MATCHING,
} = require('../constants/userConstants');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.employeeId);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.login = asyncCatch(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const { username, password } = req.body;

  const user = await Users.findOne({
    where: { username: username },
    attributes: {
      include: ['password'],
    },
  });

  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new CustomError(USER_INCORRECT_USERNAME_PASSWORD, 401));
  }

  const employee = await Employees.findByPk(user.employeeId);

  if (employee.dismissalDate != null) {
    return next(new CustomError(USER_IS_FIRED, 401));
  }

  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

exports.isLoggedIn = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.json(false);
  }
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
};

exports.protect = asyncCatch(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new CustomError(
        'You are not logged in! Please log in to get access.',
        401
      )
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await Users.findByPk(decoded.id);
  if (!currentUser) {
    return next(
      new CustomError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new CustomError(
          'You do not have permission to perform this action',
          403
        )
      );
    }

    next();
  };
};

exports.changePassword = asyncCatch(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const user = await Users.findByPk(req.user.employeeId, {
    attributes: {
      include: ['password'],
    },
  });

  if (!(await user.comparePassword(req.body.currentPassword, user.password))) {
    return next(new CustomError(USER_CURRENT_PASSWORD_WRONG, 401));
  }

  if (req.body.password !== req.body.passwordConfirm) {
    return next(new CustomError(USER_PASSWORDS_NOT_MATCHING, 401));
  }

  user.password = await bcrypt.hash(req.body.password, 12);
  await user.save({ fields: ['password'] });

  createSendToken(user, 200, res);
});
