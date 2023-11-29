import {renderMiniature} from './miniature.js';
import {showPicture} from './pictutre.js';
import {getUniqueNumber, sortingSettings, debounce} from './util.js';

const RANDOM_PICTURE_QUANTITY = 10;
const ERROR_MESSAGE_TIMEOUT = 5000;
const DEBOUNCE_TIMEOUT = 500;

const renderGallery = (pictures) => {
  const containerMiniatures = document.querySelector('.pictures');

  containerMiniatures.addEventListener('click', (evt) => {
    const miniature = evt.target.closest('[data-miniature-id]');

    if (!miniature) {
      return;
    }
    evt.preventDefault();

    const IdMiniature = +miniature.dataset.miniatureId;
    const dataPicture = pictures.find(({id}) => id === IdMiniature);
    showPicture(dataPicture);
  });

  const filtersElement = document.querySelector('.img-filters');
  const filterButtons = document.querySelectorAll('.img-filters__button');
  const defaultFilterButton = document.querySelector('#filter-default');
  const randomFilterButton = document.querySelector('#filter-random');
  const discussedFilterButton = document.querySelector('#filter-discussed');
  const discussedPictures = [].concat(pictures).sort(sortingSettings);
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

  filtersElement.classList.remove('img-filters--inactive');

  renderMiniature(pictures, containerMiniatures);

  const setDefaultFilterButton = (cb) => {
    defaultFilterButton.addEventListener('click', () => {
      setButtonsView(defaultFilterButton.id);
      cb();
    });
  };

  const setRandomFilterButton = (cb) => {

    randomFilterButton.addEventListener('click', () => {
      setButtonsView(randomFilterButton.id);
      randomPictures = [];
      const previousValues = [];
      for (let i = 0; i < RANDOM_PICTURE_QUANTITY; i++) {
        const number = getUniqueNumber(0, pictures.length - 1, previousValues);
        randomPictures.push(pictures[number]);
      }
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
      cb();
    });
  };

  setDefaultFilterButton(debounce(
    () => renderMiniature(pictures, containerMiniatures),
    DEBOUNCE_TIMEOUT,
  ));
  setRandomFilterButton(debounce(
    () => renderMiniature(randomPictures, containerMiniatures),
    DEBOUNCE_TIMEOUT,
  ));
  setDiscussedFilterButton(debounce(
    () => renderMiniature(discussedPictures, containerMiniatures),
    DEBOUNCE_TIMEOUT,
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
};

export {renderGallery, showErrorGetingsData};
