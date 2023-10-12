const isLessThanMaxLength = (string, maxLength) => string.length <= maxLength;

const isPalindrome = (srcString) => {

  const normalizedString = srcString.replaceAll(' ', '').toLowerCase();
  let reverseString = '';

  for (let i = normalizedString.length - 1; i >= 0 ; i--) {

    reverseString += normalizedString.at(i);

  }

  return normalizedString === reverseString;
};

const getNumbers = (srcString) => {

  let outputNumbers = '';
  const normalizedString = String(srcString);

  for (let i = 0; i < normalizedString.length; i++) {

    if (normalizedString.at(i) === '0') {
      outputNumbers += normalizedString.at(i);
    } else if (normalizedString.at(i) === '1') {
      outputNumbers += normalizedString.at(i);
    } else if (normalizedString.at(i) === '2') {
      outputNumbers += normalizedString.at(i);
    } else if (normalizedString.at(i) === '3') {
      outputNumbers += normalizedString.at(i);
    } else if (normalizedString.at(i) === '4') {
      outputNumbers += normalizedString.at(i);
    } else if (normalizedString.at(i) === '5') {
      outputNumbers += normalizedString.at(i);
    } else if (normalizedString.at(i) === '6') {
      outputNumbers += normalizedString.at(i);
    } else if (normalizedString.at(i) === '7') {
      outputNumbers += normalizedString.at(i);
    } else if (normalizedString.at(i) === '8') {
      outputNumbers += normalizedString.at(i);
    } else if (normalizedString.at(i) === '9') {
      outputNumbers += normalizedString.at(i);
    }
  }

  return parseInt(outputNumbers);
};

getNumbers('s3sc4-24.5');
