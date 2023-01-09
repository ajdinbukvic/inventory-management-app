const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const CustomError = require('./utils/customError');
const globalErrorHandler = require('./controllers/errorController');

const employeeRouter = require('./routes/employeeRoutes');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const productionProcessRouter = require('./routes/productionProcessRoutes');
const supplyRouter = require('./routes/supplyRoutes');
const supplierRouter = require('./routes/supplierRoutes');

const app = express();

// CORS
app.enable('trust proxy');
app.use(cors());
app.options('*', cors());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ROUTES
app.use('/api/employees', employeeRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/productionprocess', productionProcessRouter);
app.use('/api/supplies', supplyRouter);
app.use('/api/suppliers', supplierRouter);

// Error handling
app.all('*', (req, res, next) => {
  next(new CustomError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
