const bigPicture = document.querySelector('.big-picture');

const ListComments = bigPicture.querySelector('.social__comments');
const quantityShownComments = bigPicture.querySelector('.social__comment-count');
const quantityTotalComments = bigPicture.querySelector('.social__comment-total-count');
const loaderComments = bigPicture.querySelector('.comments-loader');

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

const renderComments = (comments) => {
  const htmlFragment = document.createDocumentFragment();

  comments.forEach((item) => {
    const comment = createComment(item);
    htmlFragment.append(comment);
  });
  ListComments.innerHTML = '';
  ListComments.append(htmlFragment);
};

const initCommentsList = () => {
  quantityShownComments.classList.add('hidden');
  loaderComments.classList.add('hidden');
};

export {renderComments, initCommentsList};
