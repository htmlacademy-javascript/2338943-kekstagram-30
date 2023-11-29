const MAX_LENGTH_DESCRIPTION = 140;
const MAX_QUANTITY_TAGS = 5;
const MAX_QUANTITY_SYMBOLS_TAG = 20;
const REGEX_SYMBOLS = /^[a-zа-яё0-9]{1,20}$/i;
const IMAGE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const body = document.querySelector('body');
const loadingFileForm = document.querySelector('#upload-select-image');
const loadFileButton = loadingFileForm.querySelector('.img-upload__input');
const uploadOverlayElement = loadingFileForm.querySelector('.img-upload__overlay');
const cancelButton = loadingFileForm.querySelector('.img-upload__cancel');
const hashtagsFieldElement = loadingFileForm.querySelector('.text__hashtags');
const descriptionElement = loadingFileForm.querySelector('.text__description');
const submitButton = document.querySelector('#upload-submit');
const formSliderElement = loadingFileForm.querySelector('.effect-level__slider');
const effectIcon = loadingFileForm.querySelector('.effects__list');
const stylesSlider = {
  default: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  },
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
  },
};

const updateSlider = (sliderElement) => {
  if (sliderElement.noUiSlider) {
    formSliderElement.noUiSlider.reset();
  }
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && document.activeElement !== descriptionElement && document.activeElement !== hashtagsFieldElement) {
    evt.preventDefault();
    uploadOverlayElement.classList.add('hidden');
    body.classList.remove('modal-open');
    updateSlider(formSliderElement);
    loadingFileForm.reset();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

noUiSlider.create(formSliderElement, stylesSlider.default);
const effectValue = document.querySelector('.effect-level__value');

formSliderElement.noUiSlider.on('update', () => {
  const value = Number(formSliderElement.noUiSlider.get());
  effectValue.setAttribute('value', value);
});

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const pristineValidator = new Pristine(loadingFileForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
  errorTextTag: 'p',
},
true);

const showForm = () => {
  pristineValidator.reset();
  unblockSubmitButton();
  uploadOverlayElement.classList.remove('hidden');
  body.classList.add('modal-open');
  loadingFileForm.querySelector('.img-upload__effect-level').classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeForm = () => {
  uploadOverlayElement.classList.add('hidden');
  body.classList.remove('modal-open');
  updateSlider(formSliderElement);

  hashtagsFieldElement.value = '';
  descriptionElement.value = '';

  loadingFileForm.reset();
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onButtonShowForm = () => {
  showForm();
};

const onButtonCloseHideForm = () => {
  closeForm();
};

cancelButton.addEventListener('click', onButtonCloseHideForm);
loadFileButton.addEventListener('change', onButtonShowForm);
submitButton.removeEventListener('click', onDocumentKeydown);

const validator = {
  isHashtagsValid: (valueField) => {

    const arrayHashtags = valueField.trim().toLowerCase().split(/\s/);
    const newArrayHashtags = arrayHashtags.filter((tag) => tag.startsWith('#'));
    const collectionHashtags = new Set(newArrayHashtags);
    let isValid = true;

    const checkValidity = () => {
      if (arrayHashtags.length !== 0 && arrayHashtags.length !== newArrayHashtags.length) {
        hashtagsFieldElement.dataset.messageError = `Нужен знак "#" после пробела в "${valueField}"!`;
        isValid = false;
        return;
      }

      if (arrayHashtags.length !== collectionHashtags.size) {
        hashtagsFieldElement.dataset.messageError = `В "${arrayHashtags}" нельзя повторять тэги!`;
        isValid = false;
        return;
      }

      if (arrayHashtags.length > 5) {
        hashtagsFieldElement.dataset.messageError = `Нельзя больше ${MAX_QUANTITY_TAGS} тэгов в "${arrayHashtags}"!`;
        isValid = false;
        return;
      }

      arrayHashtags.forEach((tag) => {
        const partTag = tag.slice(1);

        if (partTag.length === 0) {
          hashtagsFieldElement.dataset.messageError = 'Нужны хоть какие-то символы после "#"!';
          isValid = false;
          return;
        }

        if (partTag.length > 20) {
          hashtagsFieldElement.dataset.messageError = `Нельзя больше ${MAX_QUANTITY_SYMBOLS_TAG} символов в тэге "${tag}"!`;
          isValid = false;
          return;
        }

        if (REGEX_SYMBOLS.test(partTag) === false) {
          hashtagsFieldElement.dataset.messageError = `Можно использовать только арабские цифры, буквы кириллицы и латиницы в имени тэга "${partTag}".`;
          isValid = false;
        } else {
          pristineValidator.reset();
        }
      });
    };
    checkValidity();

    return isValid;
  },

  isLengthDescriptionAcceptable: (valueField) => {
    if (valueField.length <= MAX_LENGTH_DESCRIPTION) {
      return true;
    } else {
      descriptionElement.dataset.messageError = `Не больше ${MAX_LENGTH_DESCRIPTION} символов в описании!`;
      return false;
    }
  },
};

const getMessageErrorDescription = () => {
  const message = descriptionElement.dataset.messageError;
  return message;
};

pristineValidator.addValidator(
  descriptionElement,
  validator.isLengthDescriptionAcceptable,
  getMessageErrorDescription,
  true
);

const getMessageErrorHashtags = () => {
  const message = hashtagsFieldElement.dataset.messageError;
  return message;
};

pristineValidator.addValidator(
  hashtagsFieldElement,
  validator.isHashtagsValid,
  getMessageErrorHashtags,
  true);


const fileChooserElement = loadingFileForm.querySelector('#upload-file');
const bigImgPreviewElement = loadingFileForm.querySelector('.img-upload__preview img');

fileChooserElement.addEventListener('change', () => {
  const file = fileChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = IMAGE_TYPES.some((it) => fileName.endsWith(it)
  );

  if (matches) {
    bigImgPreviewElement.src = URL.createObjectURL(file);
  }
});


const onClickIconEffect = (evt) => {
  if (!evt.target.id) {
    return;
  }
  if (evt.target.id === 'effect-none') {
    bigImgPreviewElement.style.filter = '';
    loadingFileForm.querySelector('.img-upload__effect-level').classList.add('hidden');
    return;
  }
  if (evt.target.id === 'effect-chrome') {
    formSliderElement.noUiSlider.updateOptions(stylesSlider.chrome);
    formSliderElement.noUiSlider.on('update', () => {
      bigImgPreviewElement.style.filter = `grayscale(${formSliderElement.noUiSlider.get()})`;
    });
    loadingFileForm.querySelector('.img-upload__effect-level').classList.remove('hidden');
    return;
  }
  if (evt.target.id === 'effect-sepia') {
    formSliderElement.noUiSlider.updateOptions(stylesSlider.sepia);
    formSliderElement.noUiSlider.on('update', () => {
      bigImgPreviewElement.style.filter = `sepia(${formSliderElement.noUiSlider.get()})`;
    });
    loadingFileForm.querySelector('.img-upload__effect-level').classList.remove('hidden');
    return;
  }
  if (evt.target.id === 'effect-marvin') {
    formSliderElement.noUiSlider.updateOptions(stylesSlider.marvin);
    formSliderElement.noUiSlider.on('update', () => {
      bigImgPreviewElement.style.filter = `invert(${formSliderElement.noUiSlider.get()}%)`;
    });
    loadingFileForm.querySelector('.img-upload__effect-level').classList.remove('hidden');
    return;
  }
  if (evt.target.id === 'effect-phobos') {
    formSliderElement.noUiSlider.updateOptions(stylesSlider.phobos);
    formSliderElement.noUiSlider.on('update', () => {
      bigImgPreviewElement.style.filter = `blur(${formSliderElement.noUiSlider.get()}px)`;
    });
    loadingFileForm.querySelector('.img-upload__effect-level').classList.remove('hidden');
    return;
  }
  if (evt.target.id === 'effect-heat') {
    formSliderElement.noUiSlider.updateOptions(stylesSlider.heat);
    formSliderElement.noUiSlider.on('update', () => {
      bigImgPreviewElement.style.filter = `brightness(${formSliderElement.noUiSlider.get()})`;
    });
    loadingFileForm.querySelector('.img-upload__effect-level').classList.remove('hidden');
  }
};

effectIcon.addEventListener('click', onClickIconEffect);

const scaleInputs = loadingFileForm.querySelector('.img-upload__scale');
const scaleValueElement = scaleInputs.querySelector('.scale__control--value');
let scaleValue = 1;

scaleValueElement.value = `${scaleValue * 100}%`;

scaleInputs.addEventListener('click', (evt) => {
  if (evt.target.closest('.scale__control--smaller')) {
    if (scaleValue > 0.25) {
      scaleValue -= 0.25;
      bigImgPreviewElement.style = `transform: scale(${scaleValue})`;
    }
    scaleValueElement.value = `${scaleValue * 100}%`;
    return;
  }

  if (evt.target.closest('.scale__control--bigger')) {
    if (scaleValue < 1) {
      scaleValue += 0.25;
      bigImgPreviewElement.style = `transform: scale(${scaleValue})`;
    }
    scaleValueElement.value = `${scaleValue * 100}%`;
  }
});

const onNotSuccesMessageClick = (evt) => {
  if (evt.target === document.querySelector('.success')) {
    document.querySelector('.success').remove();
    closeForm();
    document.removeEventListener('keydown', onNotSuccesMessageClick);
  }
};

const onSuccesMessageKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    document.querySelector('.success').remove();
  }
};

const showSuccesMessage = () => {
  closeForm();
  const succesMessage = document
    .querySelector('#success')
    .content
    .querySelector('.success').cloneNode(true);

  document.querySelector('body').append(succesMessage);
  document.addEventListener('keydown',onSuccesMessageKeydown, {once: true}
  );
  succesMessage.addEventListener('click', onNotSuccesMessageClick);
  document.querySelector('.success__button').addEventListener(
    'click',
    () => {
      document.removeEventListener('keydown', onSuccesMessageKeydown, {once: true});
      succesMessage.remove();
    },
    {once: true}
  );
  loadingFileForm.reset();
};

const onErrorMessageKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    document.querySelector('.error').remove();
    document.removeEventListener('keydown', onErrorMessageKeydown, {once: true});
    document.addEventListener('keydown', onDocumentKeydown, {once: true});
  }
};

const onNotErrorMessageClick = (evt) => {
  if (evt.target === document.querySelector('.error')) {
    document.querySelector('.error').remove();
    document.removeEventListener('keydown', onErrorMessageKeydown, {once: true});
    document.addEventListener('keydown', onDocumentKeydown, {once: true});
  }
};

const showErrorMessage = () => {

  const errorMessage = document
    .querySelector('#error')
    .content
    .querySelector('.error').cloneNode(true);
  document.querySelector('body').append(errorMessage);

  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onErrorMessageKeydown, {once: true}
  );

  errorMessage.addEventListener('click', onNotErrorMessageClick);

  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener(
    'click',
    () => {
      document.querySelector('.error').remove();
      document.removeEventListener('keydown', onErrorMessageKeydown, {once: true});
      document.addEventListener('keydown', onDocumentKeydown, {once: true});
    } ,
    {once: true}
  );
};

const onButtonSubmitClick = (onSuccess, onError, evt) => {
  evt.preventDefault();

  if (hashtagsFieldElement.value.length !== 0 && !pristineValidator.validate(hashtagsFieldElement)) {
    return;
  }
  if (descriptionElement.value.length !== 0 && !pristineValidator.validate(descriptionElement)) {
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';

  fetch(
    'https://30.javascript.pages.academy/kekstagram/',
    {
      method: 'POST',
      body: new FormData(evt.target),
    }
  )
    .then((responce) => {
      if (!responce.ok) {
        throw new Error();
      }
      return responce.json();
    })
    .then(() => {
      onSuccess();
    })
    .catch(() => {
      onError();
    });
};

loadingFileForm.addEventListener('submit', (evt) => {
  onButtonSubmitClick(showSuccesMessage, showErrorMessage, evt);
});
