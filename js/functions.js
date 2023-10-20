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

  const string = String(srcString);
  const putToLine = (i) => outNumbers += string.at(i);
  let outNumbers = '';

  for (let i = 0; i < string.length; i++) {

    if (string.at(i) === '0') {
      putToLine(i);
    } else if (string.at(i) === '1') {
      putToLine(i);
    } else if (string.at(i) === '2') {
      putToLine(i);
    } else if (string.at(i) === '3') {
      putToLine(i);
    } else if (string.at(i) === '4') {
      putToLine(i);
    } else if (string.at(i) === '5') {
      putToLine(i);
    } else if (string.at(i) === '6') {
      putToLine(i);
    } else if (string.at(i) === '7') {
      putToLine(i);
    } else if (string.at(i) === '8') {
      putToLine(i);
    } else if (string.at(i) === '9') {
      putToLine(i);
    }
  }

  return parseInt(outNumbers);
};

