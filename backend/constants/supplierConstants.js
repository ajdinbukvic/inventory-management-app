const SUPPLIER_NAME_REQUIRED = 'Name is required!';
const SUPPLIER_UID_REQUIRED = 'UID is required!';
const SUPPLIER_VAT_REQUIRED = 'VAT number is required!';
const SUPPLIER_PHONE_NUMBER_REQUIRED = 'Phone number is required!';
const SUPPLIER_CONTACT_PERSON_REQUIRED = 'Contact person is required!';
const SUPPLIER_START_DATE_REQUIRED = 'Start date is required!';
const SUPPLIER_EMAIL_REQUIRED = 'Email is required!';
SUPPLIER_EMAIL_ALREADY_EXISTS = (email) =>
  `Supplier with email ${email} already exists.`;
SUPPLIER_UID_ALREADY_EXISTS = (uid) =>
  `Supplier with UID ${uid} already exists.`;
SUPPLIER_VAT_ALREADY_EXISTS = (vat) =>
  `Supplier with VAT ${vat} already exists.`;

module.exports = {
  SUPPLIER_NAME_REQUIRED,
  SUPPLIER_UID_REQUIRED,
  SUPPLIER_VAT_REQUIRED,
  SUPPLIER_PHONE_NUMBER_REQUIRED,
  SUPPLIER_CONTACT_PERSON_REQUIRED,
  SUPPLIER_START_DATE_REQUIRED,
  SUPPLIER_EMAIL_REQUIRED,
  SUPPLIER_EMAIL_ALREADY_EXISTS,
  SUPPLIER_UID_ALREADY_EXISTS,
  SUPPLIER_VAT_ALREADY_EXISTS,
};
