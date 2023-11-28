const getRandomInteger = (min, max) => {

  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getUniqueNumber = (min, max, previousValues) => {
  let currentValue = getRandomInteger(min, max);

  if (previousValues.length >= (max - min + 1)) {
    return null;
  }

  while (previousValues.includes(currentValue)) {
    currentValue = getRandomInteger(min, max);
  }

  previousValues.push(currentValue);

  return currentValue;
};

const cleareGallery = () => {
  document.querySelector('.pictures')
    .querySelectorAll('.picture')
    .forEach((picture) => {
      picture.remove();
    });
};

const picturesChecking = (a, b) => {
  if (a.comments > b.comments) {
    return -1;
  }
  if (a.comments < b.comments) {
    return 1;
  }
  return 0;
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

function throttle (callback, delayBetweenFrames) {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();

    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export {getUniqueNumber, cleareGallery, picturesChecking, debounce};
