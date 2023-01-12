const PRODUCT_NAME_REQUIRED = 'Name is required!';
const PRODUCT_IMAGE_URL_REQUIRED = 'Image URL is required!';
const PRODUCT_MARGIN_REQUIRED = 'Margin is required!';
const PRODUCT_PRODUCTION_PROCESS_REQUIRED = 'Production process is requeired!';
const PRODUCT_MARGIN_VALID = 'Margin must be valid number!';
const PRODUCT_MARGIN_POSITIVE_BETWEEN =
  'Margin must be positive number between 1-100!';
const PRODUCT_IMAGE_URL_VALID = 'Image URL must be valid!';
const PRODUCT_PRODUCTION_PROCESS_VALID =
  'Production process ID must be valid number!';
const PRODUCT_PRODUCTION_PROCESS_NOT_EXISTS = (id) =>
  `Production process with ID ${id} does not exist!`;

module.exports = {
  PRODUCT_NAME_REQUIRED,
  PRODUCT_IMAGE_URL_REQUIRED,
  PRODUCT_MARGIN_REQUIRED,
  PRODUCT_PRODUCTION_PROCESS_REQUIRED,
  PRODUCT_MARGIN_VALID,
  PRODUCT_MARGIN_POSITIVE_BETWEEN,
  PRODUCT_IMAGE_URL_VALID,
  PRODUCT_PRODUCTION_PROCESS_NOT_EXISTS,
  PRODUCT_PRODUCTION_PROCESS_VALID,
};
