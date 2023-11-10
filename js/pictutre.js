import { initCommentsList, renderComments } from "./comment.js";

const bigPicture = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const buttonClosePicture = document.querySelector('.big-picture__cancel');

const hidePicture = () => {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentsKeyDown);
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

  renderComments(dataPicture.comments);
  initCommentsList();
  renderPicture(dataPicture);
};

buttonClosePicture.addEventListener('click', onCloseBigPictureButtonClick);

export {showPicture};
