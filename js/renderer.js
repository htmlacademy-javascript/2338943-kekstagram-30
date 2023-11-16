const miniatureSample = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

const createMiniature = ({id, url, description, comments, likes}) => {
  const miniature = miniatureSample.cloneNode(true);

  miniature.querySelector('.picture__img').src = url;
  miniature.querySelector('.picture__img').alt = description;
  miniature.querySelector('.picture__comments').textContent = comments.length;
  miniature.querySelector('.picture__likes').textContent = likes;
  miniature.dataset.miniatureId = id;

  return miniature;
};

const renderMiniature = (pictures, containerMiniatures) => {
  const miniatures = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const miniature = createMiniature(picture);
    // miniature.addEventListener('click', (evt) => {
    //   evt.preventDefault();
    //   showPicture(picture);
    // });
    miniatures.append(miniature);

  });

  containerMiniatures.append(miniatures);
};

export {renderMiniature};
