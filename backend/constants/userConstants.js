const USER_USERNAME_REQUIRED = 'Username is required!';
const USER_PASSWORD_REQUIRED = 'Password is required!';
const USER_INCORRECT_USERNAME_PASSWORD = 'Username or password is wrong!';
const USER_IS_FIRED = 'You cannot use application anymore!';
const USER_CURRENT_PASSWORD_WRONG = 'Your current password is wrong!';
const USER_PASSWORDS_NOT_MATCHING =
  'Password and password confirm must be same!';
USER_ALREADY_EXISTS = (username) =>
  `User with username ${username} already exists.`;

module.exports = {
  USER_USERNAME_REQUIRED,
  USER_PASSWORD_REQUIRED,
  USER_ALREADY_EXISTS,
  USER_INCORRECT_USERNAME_PASSWORD,
  USER_IS_FIRED,
  USER_CURRENT_PASSWORD_WRONG,
  USER_PASSWORDS_NOT_MATCHING,
};
