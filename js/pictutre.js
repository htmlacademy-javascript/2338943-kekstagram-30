import {QUANTITY_VISIBLE_COMMENTS} from './main.js';

const bigPicture = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const buttonClosePicture = document.querySelector('.big-picture__cancel');

const listComments = bigPicture.querySelector('.social__comments');
const counterShownComments = bigPicture.querySelector('.social__comment-shown-count');
const counterTotalComments = bigPicture.querySelector('.social__comment-total-count');
const loaderComments = bigPicture.querySelector('.comments-loader');

const sampleComment = document
  .querySelector('#comment')
  .content
  .querySelector('.social__comment');

let quantityShownComments = 0;
let comments = [];

const createComment = ({avatar, message, name}) => {
  const newComment = sampleComment.cloneNode(true);

  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

const renderComments = () => {
  quantityShownComments += QUANTITY_VISIBLE_COMMENTS;

  if (quantityShownComments >= comments.length) {
    loaderComments.classList.add('hidden');
    quantityShownComments = comments.length;
  } else {
    loaderComments.classList.remove('hidden');
  }

  const htmlFragment = document.createDocumentFragment();
  for (let i = 0; i < quantityShownComments; i++) {
    const comment = createComment(comments[i]);
    htmlFragment.append(comment);
  }
  // comments.forEach((item) => {
  //   const comment = createComment(item);
  //   htmlFragment.append(comment);
  // });

  listComments.innerHTML = '';
  listComments.append(htmlFragment);

  counterShownComments.textContent = quantityShownComments;
  counterTotalComments.textContent = comments.length;
};

const onClickLoaderComments = () => renderComments();

const hidePicture = () => {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentsKeyDown);
  quantityShownComments = 0;
};

const onCloseBigPictureButtonClick = () => {
  hidePicture();
};

function onDocumentsKeyDown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hidePicture();
  }
}

const renderPicture = ({url, description, likes}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const showPicture = (dataPicture) => {
  bigPicture.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentsKeyDown);

  comments = dataPicture.comments;
  if (comments.length > 0) {
    renderComments();
  }
  renderPicture(dataPicture);
};

buttonClosePicture.addEventListener('click', onCloseBigPictureButtonClick);
loaderComments.addEventListener('click', onClickLoaderComments);

export {showPicture};
