const VISIBLE_COMMENTS_QUANTITY = 5;
const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const closePictureButton = document.querySelector('.big-picture__cancel');

const listCommentsElement = bigPictureElement.querySelector('.social__comments');
const shownCommentsCounterElement = bigPictureElement.querySelector('.social__comment-shown-count');
const totalCommentsCounterElement = bigPictureElement.querySelector('.social__comment-total-count');
const loaderCommentsElement = bigPictureElement.querySelector('.comments-loader');

let shownCommentsQuantity = 0;
let comments = [];

const sampleComment = document
  .querySelector('#comment')
  .content
  .querySelector('.social__comment');

const createComment = ({avatar, message, name}) => {
  const newComment = sampleComment.cloneNode(true);

  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

const renderComments = () => {
  const wasCommentsQuantity = shownCommentsQuantity;
  shownCommentsQuantity += VISIBLE_COMMENTS_QUANTITY;

  if (shownCommentsQuantity >= comments.length) {
    loaderCommentsElement.classList.add('hidden');
    shownCommentsQuantity = comments.length;
  } else {
    loaderCommentsElement.classList.remove('hidden');
  }

  const htmlFragment = document.createDocumentFragment();

  for (let i = wasCommentsQuantity; i < shownCommentsQuantity; i++) {
    const comment = createComment(comments[i]);
    htmlFragment.append(comment);
  }

  listCommentsElement.append(htmlFragment);
  shownCommentsCounterElement.textContent = shownCommentsQuantity;
  totalCommentsCounterElement.textContent = comments.length;
};

const onCommentsLoaderClick = () => {
  renderComments();
};

const hidePicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentsKeyDown);
  shownCommentsQuantity = 0;
};

const onCloseBigPictureButtonClick = () => {
  hidePicture();
};

closePictureButton.addEventListener('click', onCloseBigPictureButtonClick);
loaderCommentsElement.addEventListener('click', onCommentsLoaderClick);

function onDocumentsKeyDown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hidePicture();
  }
}

const renderPicture = ({url, description, likes}) => {
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

const showPicture = (dataPicture) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentsKeyDown);

  listCommentsElement.innerHTML = '';
  comments = dataPicture.comments;
  if (comments.length > 0) {
    renderComments();
  }
  renderPicture(dataPicture);
};

export {showPicture};

