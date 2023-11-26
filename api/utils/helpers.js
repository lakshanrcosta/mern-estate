import GeneratePassword from 'generate-password';

export const generateRandomPassword = (length, numbers = true, uppercase = true) => {
  return GeneratePassword.generate({
    length,
    numbers,
    uppercase
  });
};

export const generateRandomUsername = (givenNames) => {
  const names = givenNames.split(' ').join('').toLowerCase();
  const randomNumber = Math.floor(Math.random() * 90) + 10;
  return `${names}${randomNumber}`;
};
