import {renderMiniature} from './miniature.js';
import {showPicture} from './pictutre.js';
import {getUniqueNumber, sortingSettings, debounce} from './util.js';

const RANDOM_PICTURE_QUANTITY = 10;
const ERROR_MESSAGE_TIMEOUT = 5000;
const DEBOUNCE_TIMEOUT = 500;

const renderGallery = (pictures) => {
  const miniaturesContainer = document.querySelector('.pictures');

  miniaturesContainer.addEventListener('click', (evt) => {
    const miniature = evt.target.closest('[data-miniature-id]');

    if (!miniature) {
      return;
    }
    evt.preventDefault();

    const miniatureId = +miniature.dataset.miniatureId;
    const pictureData = pictures.find(({id}) => id === miniatureId);
    showPicture(pictureData);
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
        button.classList.toggle('img-filters__button--active', false);
      } else {
        button.classList.toggle('img-filters__button--active', true);
      }
    });
  };

  filtersElement.classList.remove('img-filters--inactive');

  renderMiniature(pictures, miniaturesContainer);

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
      document.querySelectorAll('.pictures .picture').forEach(
        (picture) => {
          picture.remove();
        });
      cb();
    });
  };

  setDefaultFilterButton(debounce(
    () => renderMiniature(pictures, miniaturesContainer),
    DEBOUNCE_TIMEOUT,
  ));
  setRandomFilterButton(debounce(
    () => renderMiniature(randomPictures, miniaturesContainer),
    DEBOUNCE_TIMEOUT,
  ));
  setDiscussedFilterButton(debounce(
    () => renderMiniature(discussedPictures, miniaturesContainer),
    DEBOUNCE_TIMEOUT,
  ));
};

const showErrorMessage = () => {
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

export {renderGallery, showErrorMessage};
