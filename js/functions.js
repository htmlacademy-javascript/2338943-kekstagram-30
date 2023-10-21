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

function isIntraday(srcStartDay, srcEndDay, srcStartMeeting, srcDuration) {

  const convertToNumbers = () => {
    startDay = srcStartDay.split(':');
    startDay[0] = Number(startDay[0]);
    startDay[1] = Number(startDay[1]);

    endDay = srcEndDay.split(':');
    endDay[0] = Number(endDay[0]);
    endDay[1] = Number(endDay[1]);

    startMeeting = srcStartMeeting.split(':');
    startMeeting[0] = Number(startMeeting[0]);
    startMeeting[1] = Number(startMeeting[1]);

  };

  const getEndMeeting = () => {

    let duration;
    duration = Number(srcDuration);
    const hoursMeeting = Math.floor(duration / 60);
    const minutesMeeting = duration % 60;

    endMeeting[0] = Number(startMeeting[0]) + hoursMeeting;
    endMeeting[1] = Number(startMeeting[1] + minutesMeeting);

    if (endMeeting[1] > 60) {
      endMeeting[0] += Math.floor(srcDuration / 60);
      endMeeting[1] = srcDuration % 60;
    }
  };

  const checkTime = () => {

    let isIntraday;

    if (endMeeting[0] >= 24) {

      isIntraday = false;
      // console.log('Встреча вне суток! Вне рабочего дня!');

    } else if (endMeeting[0] > endDay[0] || startMeeting[0] < startDay[0]) {

      isIntraday = false;
      // console.log('Встреча вне рабочего дня!');

    } else if (endMeeting[0] = endDay[0] && endMeeting[1] > endDay[1]) {

      isIntraday = false;
      // console.log('Встреча вне рабочего дня!');

    } else {

      isIntraday = true;
      // console.log(`Встреча внутри рабочего дня!`);
    }

    return isIntraday;
  };

  let startDay;
  let endDay;
  let startMeeting;
  const endMeeting = [];

  convertToNumbers();
  getEndMeeting();

  return checkTime();
}

console.log(isIntraday('08:00', '17:30', '14:00', 90));
console.log(isIntraday('8:0', '10:0', '8:0', 120));
console.log(isIntraday('08:00', '14:30', '14:00', 90));
console.log(isIntraday('14:00', '17:30', '08:0', 90));
console.log(isIntraday('8:00', '17:30', '08:00', 900));
