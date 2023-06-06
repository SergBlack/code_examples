const EMAIL_PATTERN_VALIDATION = /^[a-z]+_[a-z]+[0-9]?@test.com$/i;
const DOMAIN = '@test.com';

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const parseEmailToName = (email?: string | null, domain = DOMAIN, pattern = EMAIL_PATTERN_VALIDATION) => {
  if (!email || !pattern.test(email)) {
    return email;
  }

  const [fullName] = email.split(domain);
  const [firstName, lastName] = fullName.split('_').map(capitalizeFirstLetter);
  const lastNameWithoutNumber = lastName.replace(/[0-9]/g, '');

  return `${firstName} ${lastNameWithoutNumber}`;
};
