import {renderMiniature} from './miniatureRenderer.js';
import {showPicture} from './pictutre.js';
import {getUniqueNumber, picturesChecking, throttle} from './util.js';

const RANDOM_PICTURE_QUANTITY = 10;
const ERROR_MESSAGE_TIMEOUT = 5000;
const THROTTLE_TIMEOUT = 500;

const renderGallery = (pictures) => {
  const containerMiniatures = document.querySelector('.pictures');

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
    });

    showPicture(dataPicture);
  });

  const filters = document.querySelector('.img-filters');
  const filterButtons = document.querySelectorAll('.img-filters__button');
  const defaultFilterButton = document.querySelector('#filter-default');
  const randomFilterButton = document.querySelector('#filter-random');
  const discussedFilterButton = document.querySelector('#filter-discussed');
  const discussedPictures = [].concat(pictures).sort(picturesChecking);
  let randomPictures = [];

  const setButtonsView = (activeButtonId) => {
    filterButtons.forEach((button) => {
      if (button.id !== activeButtonId) {
        button.classList.remove('img-filters__button--active');
      } else {
        button.classList.add('img-filters__button--active');
      }
    });
  };

  filters.classList.remove('img-filters--inactive');

  renderMiniature(pictures, containerMiniatures);

  const setDefaultFilterButton = (cb) => {
    defaultFilterButton.addEventListener('click', () => {
      setButtonsView(defaultFilterButton.id);
      renderMiniature(pictures, containerMiniatures);
      cb();
    });
  };

  setDefaultFilterButton();

  const setRandomFilterButton = (cb) => {

    randomFilterButton.addEventListener('click', () => {
      setButtonsView(randomFilterButton.id);
      const previousValues = [];
      randomPictures = [];

      for (let i = 0; i < RANDOM_PICTURE_QUANTITY; i++) {
        const number = getUniqueNumber(1, pictures.length - 1, previousValues);
        randomPictures.push(pictures[number]);
      }
      renderMiniature(randomPictures, containerMiniatures);
      cb();
    });

  };

  const setDiscussedFilterButton = (cb) => {
    discussedFilterButton.addEventListener('click', () => {
      setButtonsView(discussedFilterButton.id);
      document.querySelector('.pictures')
        .querySelectorAll('.picture')
        .forEach((picture) => {
          picture.remove();
        });
      renderMiniature(discussedPictures, containerMiniatures);
      cb();
    });
  };

  setDefaultFilterButton(throttle(
    () => renderMiniature(pictures, containerMiniatures),
    THROTTLE_TIMEOUT,
  ));
  setRandomFilterButton(throttle(
    () => renderMiniature(randomPictures, containerMiniatures),
    THROTTLE_TIMEOUT,
  ));
  setDiscussedFilterButton(throttle(
    () => renderMiniature(discussedPictures, containerMiniatures),
    THROTTLE_TIMEOUT,
  ));
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
  }, ERROR_MESSAGE_TIMEOUT);
  throw new Error('Нету фоток с сервера!');
};

export {renderGallery, showErrorGetingsData};
