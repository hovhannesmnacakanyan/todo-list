const PasswordValidator = require('password-validator');

class ValidationService {
  whitespaceValidator(string = '', field) {
    const trimmedString = string.trim();

    if (!trimmedString) {
      throw new Error(`${field} is required!!!`);
    }

    return true;
  }

  emailValidator(email) {
    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = regexp.test(String(email).toLowerCase());

    if (!isValidEmail) {
      throw new Error(`Email is not valid!!!`);
    }

    return true;
  }

  passwordValidator(password) {
    const schema = new PasswordValidator();

    schema
      .is()
      .min(4)
      .is()
      .max(50)
      .has()
      .uppercase()
      .has()
      .lowercase()
      .has()
      .digits()
      .has()
      .not()
      .spaces();

    const errorsList = {
      min: '| Minimum length 4 |',
      max: '| Maximum length 50 |',
      uppercase: '| Must have uppercase letters |',
      lowercase: '| Must have lowercase letters |',
      digits: '| Must have at least 1 digit |',
      spaces: '| Should not have spaces |',
    };

    const errorsArray = schema.validate(password, { list: true });

    if (errorsArray.length) {
      let errorMessage = 'Password ';
      errorsArray.forEach(error => {
        errorMessage += errorsList[error];
      });
      throw new Error(errorMessage);
    }

    return true;
  }
}

module.exports = ValidationService;
