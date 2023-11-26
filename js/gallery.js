import {renderMiniature} from './miniatureRenderer.js';
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
    const dataPicture = pictures.find((picture) => {
      if (picture.id === IdMiniature) {
        return picture.id;
      }
    // const dataPicture = pictures.find(({id}) => id === IdMiniature);
    });

    showPicture(dataPicture);
  });

  renderMiniature(pictures, containerMiniatures);
};

const showErrorGetingsData = () => {
  document.querySelector('body').append(
    document
    .querySelector('#data-error')
    .content
    .querySelector('.data-error').cloneNode(true)
  );

  setTimeout(() => {
    document.querySelector('.data-error').remove();
  }, 5000);
};

// const sampleErrorMessage = document
//   .querySelector('#data-error')
//   .content
//   .querySelector('.data-error');

// const showErrorGetingsData = () => {
//   const messageError = sampleErrorMessage.cloneNode(true);
//   document.querySelector('body').append(messageError);
//   setTimeout(() => {
//     document.querySelector('.data-error').remove();
//   }, 5000);
// };

export {renderGallery, showErrorGetingsData};
