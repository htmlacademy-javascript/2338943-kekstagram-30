import {DESCRIPTIONS, COMMENTS} from './data.js';
import {getRandomInteger, getUniqueNumber} from './util.js'

const getComments = () => {
  const comments = [];
  for (let i = 0; i <= getRandomInteger(0, 30); i++) {
    comments.push(COMMENTS[getRandomInteger(0, COMMENTS.length - 1)]);
  }
  return comments;
};

function creatObject(quantity) {

  const generatedId = getUniqueNumber(1, quantity);
  const generatedUrl = getUniqueNumber(1, quantity);

  const object = () => ({
    id: generatedId(),
    url: `photos/img-${generatedUrl()}.jpg`,
    description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
    likes: getRandomInteger(1, 200),
    comments: getComments(),
  });

  const arrayObjects = Array.from({length: quantity}, object);

  return arrayObjects;
}

console.log(creatObject(25));
