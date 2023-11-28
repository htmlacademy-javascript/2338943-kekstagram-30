const MAX_LENGTH_DESCRIPTION = 140;
const MAX_QUANTITY_TAGS = 5;
const MAX_QUANTITY_SYMBOLS_TAG = 20;
const REGEX_SYMBOLS = /^[a-zа-яё0-9]{1,20}$/i;

const body = document.querySelector('body');
const loadingFileForm = document.querySelector('.img-upload__form');
const buttonLoadFile = loadingFileForm.querySelector('.img-upload__input');
const imgUploadOverlay = loadingFileForm.querySelector('.img-upload__overlay');
const buttonCancel = loadingFileForm.querySelector('.img-upload__cancel');
const fieldHashtags = loadingFileForm.querySelector('.text__hashtags');
const textAreaDescription = loadingFileForm.querySelector('.text__description');
const submitButton = document.querySelector('#upload-submit');
const sliderForm = loadingFileForm.querySelector('.effect-level__slider');
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

const closeForm = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  destroySlider(sliderForm);

  fieldHashtags.value = '';
  textAreaDescription.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeForm();
  }
};

const showForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  loadingFileForm.querySelector('.img-upload__effect-level').classList.add('hidden');

  noUiSlider.create(sliderForm, stylesSlider.default);

  document.addEventListener('keydown', onDocumentKeydown, {once: true});
};

const onButtonShowForm = () => {
  showForm();
};

const onButtonCloseHideForm = () => {
  closeForm();
};

buttonCancel.addEventListener('click', onButtonCloseHideForm);
buttonLoadFile.addEventListener('click', onButtonShowForm);
submitButton.removeEventListener('click', onDocumentKeydown);

const pristineValidator = new Pristine(loadingFileForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
  errorTextTag: 'p',
});

const validator = {
  isHashtagsValid: (valueField) => {
    const arrayHashtags = valueField.trim().toLowerCase().split(/\s/);
    const newArrayHashtags = arrayHashtags.filter((tag) => tag.startsWith('#'));
    const collectionHashtags = new Set(newArrayHashtags);
    let isValid = true;

    const checkValidity = () => {

      if (arrayHashtags.length !== newArrayHashtags.length) {
        fieldHashtags.dataset.messageError = `Нужен знак "#" после пробела в "${valueField}"!`;
        isValid = false;
        return;
      }

      if (arrayHashtags.length !== collectionHashtags.size) {
        fieldHashtags.dataset.messageError = `В "${arrayHashtags}" нельзя повторять тэги!`;
        isValid = false;
        return;
      }

      if (arrayHashtags.length > 5) {
        fieldHashtags.dataset.messageError = `Нельзя больше ${MAX_QUANTITY_TAGS} тэгов в "${arrayHashtags}"!`;
        isValid = false;
        return;
      }

      arrayHashtags.forEach((tag) => {
        const partTag = tag.slice(1);

        if (partTag.length === 0) {
          fieldHashtags.dataset.messageError = 'Нужны хоть какие-то символы после "#"!';
          isValid = false;
          return;
        }

        if (partTag.length > 20) {
          fieldHashtags.dataset.messageError = `Нельзя больше ${MAX_QUANTITY_SYMBOLS_TAG} символов в тэге "${tag}"!`;
          isValid = false;
          return;
        }

        if (REGEX_SYMBOLS.test(partTag) === false) {
          fieldHashtags.dataset.messageError = `Можно использовать только арабские цифры, буквы кириллицы и латиницы в имени тэга "${partTag}".`;
          isValid = false;
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
      textAreaDescription.dataset.messageError = `Не больше ${MAX_LENGTH_DESCRIPTION} символов в описании!`;
      return false;
    }
  },
};

const getMessageErrorDescription = () => {
  const message = textAreaDescription.dataset.messageError;
  return message;
};

pristineValidator.addValidator(
  textAreaDescription,
  validator.isLengthDescriptionAcceptable,
  getMessageErrorDescription,
  true
);

const getMessageErrorHashtags = () => {
  const message = fieldHashtags.dataset.messageError;
  return message;
};

pristineValidator.addValidator(
  fieldHashtags,
  validator.isHashtagsValid,
  getMessageErrorHashtags,
  true);

const bigImgPreview = loadingFileForm.querySelector('.img-upload__preview img');
const effectIcon = loadingFileForm.querySelector('.effects__list');

const destroySlider = (sliderElement) => {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
};

const onClickIconEffect = (evt) => {
  sliderForm.noUiSlider.updateOptions(stylesSlider.default);

  if (evt.target.id === null) {
    return;
  }
  if (evt.target.id === 'effect-none') {
    bigImgPreview.style.filter = '';
    loadingFileForm.querySelector('.img-upload__effect-level').classList.add('hidden');
    return;
  }
  if (evt.target.id === 'effect-chrome') {
    sliderForm.noUiSlider.updateOptions(stylesSlider.chrome);
    sliderForm.noUiSlider.on('update', () => {
      bigImgPreview.style.filter = `grayscale(${sliderForm.noUiSlider.get()})`;
    });
    loadingFileForm.querySelector('.img-upload__effect-level').classList.remove('hidden');
    return;
  }
  if (evt.target.id === 'effect-sepia') {
    sliderForm.noUiSlider.updateOptions(stylesSlider.sepia);
    sliderForm.noUiSlider.on('update', () => {
      bigImgPreview.style.filter = `sepia(${sliderForm.noUiSlider.get()})`;
    });
    loadingFileForm.querySelector('.img-upload__effect-level').classList.remove('hidden');
    return;
  }
  if (evt.target.id === 'effect-marvin') {
    sliderForm.noUiSlider.updateOptions(stylesSlider.marvin);
    sliderForm.noUiSlider.on('update', () => {
      bigImgPreview.style.filter = `invert(${sliderForm.noUiSlider.get()}%)`;
    });
    loadingFileForm.querySelector('.img-upload__effect-level').classList.remove('hidden');
    return;
  }
  if (evt.target.id === 'effect-phobos') {
    sliderForm.noUiSlider.updateOptions(stylesSlider.phobos);
    sliderForm.noUiSlider.on('update', () => {
      bigImgPreview.style.filter = `blur(${sliderForm.noUiSlider.get()}px)`;
    });
    loadingFileForm.querySelector('.img-upload__effect-level').classList.remove('hidden');
    return;
  }
  if (evt.target.id === 'effect-heat') {
    sliderForm.noUiSlider.updateOptions(stylesSlider.heat);
    sliderForm.noUiSlider.on('update', () => {
      bigImgPreview.style.filter = `brightness(${sliderForm.noUiSlider.get()})`;
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
      bigImgPreview.style = `transform: scale(${scaleValue})`;
    }
    scaleValueElement.value = `${scaleValue * 100}%`;
    return;
  }

  if (evt.target.closest('.scale__control--bigger')) {
    if (scaleValue < 1) {
      scaleValue += 0.25;
      bigImgPreview.style = `transform: scale(${scaleValue})`;
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

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';

};

const showSuccesMessage = () => {
  const succesMessage = document
    .querySelector('#success')
    .content
    .querySelector('.success').cloneNode(true);

  document.querySelector('body').append(succesMessage);
  document.addEventListener(
    'keydown',
    (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        succesMessage.remove();
      }
    },
    {once: true}
  );
  succesMessage.addEventListener('click', onNotSuccesMessageClick);
  document.querySelector('.success__button').addEventListener(
    'click',
    () => {
      succesMessage.remove();
    },
    {once: true}
  );
  unblockSubmitButton();
  closeForm();
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
  unblockSubmitButton();

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

// const showResultMessage = (sampleClass, sampleId) => {
//   unblockSubmitButton();

//   function onMessageKeydown (evt) {
//     if (evt.key === 'Escape') {
//       evt.preventDefault();
//       document.querySelector(sampleClass).remove();
//       document.removeEventListener('keydown', onMessageKeydown, {once: true});
//       document.addEventListener('keydown', onDocumentKeydown, {once: true});
//     }
//   }
//   function onNotMessageClick (evt) {
//     if (evt.target === document.querySelector(sampleClass)) {
//       document.querySelector(sampleClass).remove();
//       document.removeEventListener('keydown', onMessageKeydown, {once: true});
//       document.addEventListener('keydown', onDocumentKeydown, {once: true});
//     }
//   }

//   const okButton = document.querySelector(`${sampleClass}__button`);
//   const message = document.querySelector(sampleId).content.querySelector(sampleClass).cloneNode(true);

//   document.querySelector('body').append(message);
//   console.log(message);

//   document.removeEventListener('keydown', onDocumentKeydown);

//   document.addEventListener('keydown', onMessageKeydown, {once: true}
//   );
//   message.addEventListener('click', onNotMessageClick);
//   okButton.addEventListener(
//     'click',
//     () => {
//       document.querySelector(sampleClass).remove();
//       document.removeEventListener('keydown', onMessageKeydown, {once: true});
//       document.addEventListener('keydown', onDocumentKeydown, {once: true});
//     } ,
//     {once: true}
//   );
// };

const onButtonSubmitClick = (onSucces, onError, evt) => {
  evt.preventDefault();

  if (fieldHashtags.value.length !== 0 && !pristineValidator.validate(fieldHashtags)) {
    return;
  }
  if (textAreaDescription.value.length !== 0 && !pristineValidator.validate(textAreaDescription)) {
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';

  fetch(
    'https://30.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: new FormData(evt.target),
    }
  )
    .then(() => {
      onSucces();
    })
    .catch(() => {
      onError();
    });
};

loadingFileForm.addEventListener('submit', (evt) => {
  onButtonSubmitClick(showSuccesMessage, showErrorMessage, evt);
});

// loadingFileForm.addEventListener('submit', (evt) => {
//   onButtonSubmitClick(
//     () => showResultMessage('.succes', '#succes'),
//     () => console.log('ошибка'),
//     evt);
// });
