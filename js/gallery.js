import {renderMiniature} from './renderer.js';
import {showPicture} from './pictutre.js';

const containerMiniatures = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  containerMiniatures.addEventListener('click', (evt) => {
    const miniature = evt.target.closest('[data-miniature-id]');

    if (!miniature) {
      return;
    }

    evt.preventDefault();

    const IdMiniature = +miniature.dataset.miniatureId;
    // const dataPicture = pictures.find(({id}) => id === IdMiniature);
    const dataPicture = pictures.find((picture) => {
      if (picture.id === IdMiniature) {
        return picture.id;
      }
    });

    showPicture(dataPicture);
  });

  renderMiniature(pictures, containerMiniatures);
};

export {renderGallery};
