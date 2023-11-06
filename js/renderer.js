const containerMiniatures = document.querySelector('.pictures');

const miniatureSample = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

const createMiniature = ({url, description, comments, likes}) => {

  const miniature = miniatureSample.cloneNode(true);
  
  miniature.querySelector('.picture__img').src = url;
  miniature.querySelector('.picture__img').alt = description;
  miniature.querySelector('.picture__comments').textContent = comments.length;
  miniature.querySelector('.picture__likes').textContent = likes;

  return miniature;
};

const renderMiniature = (pictures) => {
  
  const miniatures = document.createDocumentFragment();
  
  pictures.forEach((picture) => {
    const miniature = createMiniature(picture);
    miniatures.append(miniature);
  });

  containerMiniatures.append(miniatures);
};

export {renderMiniature};
