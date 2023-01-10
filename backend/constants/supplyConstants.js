const SUPPLY_NAME_REQUIRED = 'Name is required!';
const SUPPLY_QUANTITY_REQUIRED = 'Quantity is required!';
const SUPPLY_MIN_QUANTITY_REQUIRED = 'Min quantity is required!';
const SUPPLY_PRICE_REQUIRED = 'Price is required!';
const SUPPLY_UNIT_MEASURE_REQUIRED = 'Unit measure is required!';
const SUPPLY_SUPPLIER_REQUIRED = 'Supplier is required';
const SUPPLY_QUANTITY_POSITIVE = 'Quantity must be positive number!';
const SUPPLY_MIN_QUANTITY_POSITIVE = 'Min Quantity must be positive number!';
const SUPPLY_PRICE_POSITIVE = 'Price must be positive number!';
const SUPPLY_QUANTITY_VALID = 'Quantity must be valid number!';
const SUPPLY_MIN_QUANTITY_VALID = 'Min Quantity must be valid number!';
const SUPPLY_PRICE_VALID = 'Price must be valid number!';
const SUPPLY_SUPPLIER_VALID = 'Supplier ID must be valid number!';
const SUPPLY_SUPPLIER_NOT_EXISTS = (id) =>
  `Supplier with ID ${id} does not exist!`;

module.exports = {
  SUPPLY_NAME_REQUIRED,
  SUPPLY_QUANTITY_REQUIRED,
  SUPPLY_MIN_QUANTITY_REQUIRED,
  SUPPLY_PRICE_REQUIRED,
  SUPPLY_UNIT_MEASURE_REQUIRED,
  SUPPLY_SUPPLIER_REQUIRED,
  SUPPLY_QUANTITY_POSITIVE,
  SUPPLY_MIN_QUANTITY_POSITIVE,
  SUPPLY_PRICE_POSITIVE,
  SUPPLY_QUANTITY_VALID,
  SUPPLY_MIN_QUANTITY_VALID,
  SUPPLY_PRICE_VALID,
  SUPPLY_SUPPLIER_NOT_EXISTS,
  SUPPLY_SUPPLIER_VALID,
};
