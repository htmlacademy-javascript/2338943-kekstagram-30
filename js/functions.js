function isLessThanMaxLength(string, maxLength) {
  return string.length <= maxLength;
}

function isPalindrome(srcString) {
  let normalizeString = (srcString.replaceAll(' ', '')).toLowerCase();
  let reverseString = '';
  for (let i = normalizeString.length - 1; i >= 0 ; i--) {
    reverseString += normalizeString.at(i);
    console.log(i + 'reverseString: ' + reverseString);
  }
  return normalizeString === reverseString;
}

function getNumbers(srcString) {
  let outputNumbers = '';
  let normalizeString = Number.isNaN(srcString) ? srcString : String(srcString);

  for (let i = 0; i < normalizeString.length; i++) {
    switch (normalizeString.at(i)) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
        outputNumbers += normalizeString.at(i);
    }
  }
  return +parseInt(outputNumbers);
}

getNumbers('s3sc4-24.5');
