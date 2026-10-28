export const validateSignup = ({ email, password }) => {
  const errors = {};

  // Email validation
  if (!email || !email.trim()) {
    errors.email = 'Email address is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = 'Please enter a valid email address';
  }

  // Password validation: min 8 chars, at least 1 letter and 1 number
  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters long';
  } else if (!/[a-zA-Z]/.test(password)) {
    errors.password = 'Password must contain at least one letter';
  } else if (!/[0-9]/.test(password)) {
    errors.password = 'Password must contain at least one number';
  }

  return errors;
};

export const validateLogin = ({ email, password }) => {
  const errors = {};

  if (!email || !email.trim()) {
    errors.email = 'Email address is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = 'Please enter a valid email address';
  }

  if (!password) {
    errors.password = 'Password is required';
  }

  return errors;
};
