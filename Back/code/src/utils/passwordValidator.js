// Private functions
const userEmailsIsIncluded = (email, password) => {
  const [userName, domain] = email.split('@');
  return password.includes(userName) || password.includes(domain);
};

// Public functions
const validatePasswordPattern = (email, password) => {
  const errors = [];
  if (email && userEmailsIsIncluded(email, password)) {
    errors.push('La contraseña no puede contener ninguna parte del email');
  }

  if (password.length < 9) {
    errors.push('La contraseña debe contener al menos 9 caracteres');
  }

  const number = new RegExp(/^(?=.*[0-9]).{1,}$/);
  if (!number.test(password)) {
    errors.push('La contraseña debe incluir un número');
  }

  const lowercase = new RegExp(/^(?=.*[a-z]).{1,}$/);
  if (!lowercase.test(password)) {
    errors.push('La contraseña no incluye una letra en minúscula');
  }

  const uppercase = new RegExp(/^(?=.*[A-Z]).{1,}$/);
  if (!uppercase.test(password)) {
    errors.push('La contraseña no incluye una letra en mayúscula');
  }

  // Supported symbols : [-!$%^&*()_+|~=`{}[]:";'<>?,./]
  // eslint-disable-next-line no-useless-escape
  const symbols = new RegExp(/^(?=.*[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]).{1,}$/);
  if (!symbols.test(password)) {
    errors.push('La contraseña no incluye un símbolo');
  }

  if (errors.length > 0) {
    return {
      status: false,
      errors,
    };
  }

  return { status: true };
};

module.exports = {
  validatePasswordPattern,
};
