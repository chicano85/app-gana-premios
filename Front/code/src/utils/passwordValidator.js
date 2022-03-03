const userEmailsIsIncluded = (email, password) => {
  const [userName, domain] = email.split('@');
  return password.includes(userName) || password.includes(domain);
};

function validatePassword(password, context) {
  const { email } = context.parent;
  const errors = [];

  if (!password) {
    return this.createError({
      message: `Password is required`,
      path: `password`
    });
  }

  if (email && userEmailsIsIncluded(email.toLowerCase(), password.toLowerCase())) {
    errors.push('Email cannot be included in password');
  }

  if (password.length < 9) {
    errors.push('Must contain 9 characters');
  }

  const lowercase = new RegExp(/^(?=.*[a-z]).{1,}$/);
  if (!lowercase.test(password)) {
    errors.push('One lowercase');
  }

  const uppercase = new RegExp(/^(?=.*[A-Z]).{1,}$/);
  if (!uppercase.test(password)) {
    errors.push('One uppercase');
  }

  const number = new RegExp(/^(?=.*[0-9]).{1,}$/);
  if (!number.test(password)) {
    errors.push('One number');
  }

  // eslint-disable-next-line no-useless-escape
  const symbols = new RegExp(/^(?=.*[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]).{1,}$/);
  if (!symbols.test(password)) {
    const chars = '-;!$%^&*()_+|~=`{}[]:"\'<>?,./';
    errors.push(`One Special Case Character of ${chars}`);
  }

  return errors.length > 0
    ? this.createError({
        message: `${errors.join(', ')}`,
        path: `password`
      })
    : true;
}

export default validatePassword;
