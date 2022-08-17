const checkNumberIsNotAllowedHelper = (number) => {
  const groupNumber = process.env.GROUP_NUMBER || null;
  const allowedNumbers = process.env.ALLOWED_NUMBERS? process.env.ALLOWED_NUMBERS.split(','): [];
  if (groupNumber) {
    allowedNumbers.push(groupNumber);
  }
  return allowedNumbers.includes(number) === false;
}

module.exports = checkNumberIsNotAllowedHelper;
