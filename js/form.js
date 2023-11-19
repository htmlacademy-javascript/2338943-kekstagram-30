const MAX_LENGTH_DESCRIPTION = 140;
const MAX_QUANTITY_TAGS = 5;
const MAX_QUANTITY_SYMBOLS_TAG = 20;
const REGEX_SYMBOLS = /^[a-zа-яё0-9]{1,20}$/i;

const body = document.querySelector('body');
const formLoadingFile = document.querySelector('.img-upload__form');
const buttonLoadFile = formLoadingFile.querySelector('.img-upload__input');
const imgUploadOverlay = formLoadingFile.querySelector('.img-upload__overlay');
const buttonCancel = formLoadingFile.querySelector('.img-upload__cancel');
const fieldHashtags = formLoadingFile.querySelector('.text__hashtags');
const textAreaDescription = formLoadingFile.querySelector('.text__description');

const showForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  formLoadingFile.querySelector('.img-upload__effect-level').classList.add('hidden');
  // Поставить обработчик Escape
};

const onButtonShowForm = () => {
  showForm();
};

const closeForm = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  formLoadingFile.addEventListener('change', renderLoadedPicture, {once: true});
};

const onButtonCloseHideForm = () => {
  closeForm();
};

buttonLoadFile.addEventListener('click', onButtonShowForm);
buttonCancel.addEventListener('click', onButtonCloseHideForm);

function renderLoadedPicture (evt) {
  evt.preventDefault();
  // console.log(buttonLoadFile.files[0].name);
  // formLoadingFile.querySelector('.img-upload__preview img').src = buttonLoadFile.value;
}

formLoadingFile.addEventListener('change', renderLoadedPicture, {once: true});

const pristineValidator = new Pristine(formLoadingFile, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
  errorTextTag: 'p',
});

const validator = {
  isHashtagsValid: function (valueField) {
    const arrayHashtags = valueField.trim().toLowerCase().split(/ /);
    const newArrayHashtags = arrayHashtags.filter((tag) => tag.startsWith('#'));
    const collectionHashtags = new Set(newArrayHashtags);
    let isValid = true;

    const checkValidity = () => {

      if (arrayHashtags.length !== newArrayHashtags.length) {
        fieldHashtags.dataset.messageError = `Нужен знак "#" после пробела в "${valueField}"!`;
        isValid = false;
        return false;
      }

      if (arrayHashtags.length !== collectionHashtags.size) {
        fieldHashtags.dataset.messageError = `В "${arrayHashtags}" нельзя повторять тэги!`;
        isValid = false;
        return false;
      }

      if (arrayHashtags.length > 5) {
        fieldHashtags.dataset.messageError = `Нельзя больше ${MAX_QUANTITY_TAGS} тэгов в "${arrayHashtags}"!`;
        isValid = false;
        return false;
      }

      arrayHashtags.forEach((tag) => {
        const partTag = tag.slice(1);

        if (partTag.length === 0) {
          fieldHashtags.dataset.messageError = 'Нужны хоть какие-то символы после "#"!';
          isValid = false;
          return false;
        }

        if (partTag.length > 20) {
          fieldHashtags.dataset.messageError = `Нельзя больше ${MAX_QUANTITY_SYMBOLS_TAG} символов в тэге "${tag}"!`;
          isValid = false;
          return false;
        }

        if (REGEX_SYMBOLS.test(partTag) === false) {
          fieldHashtags.dataset.messageError = `Можно использовать только арабские цифры, буквы кириллицы и латиницы в имени тэга "${partTag}".`;
          isValid = false;
          return false;
        }
      });
    };
    checkValidity();

    return isValid;
  },

  isLengthDescriptionAcceptable: function (valueField) {
    if (valueField.length <= MAX_LENGTH_DESCRIPTION) {
      return true;
    } else {
      textAreaDescription.dataset.messageError = `Не больше ${MAX_LENGTH_DESCRIPTION} символов в описании!`;
      return false;
    }
  },
};

function getMessageErrorDescription () {
  const message = textAreaDescription.dataset.messageError;
  return message;
}

pristineValidator.addValidator(
  textAreaDescription,
  validator.isLengthDescriptionAcceptable,
  getMessageErrorDescription,
  true
);

function getMessageErrorHashtags () {
  const message = fieldHashtags.dataset.messageError;
  return message;
}

pristineValidator.addValidator(
  fieldHashtags,
  validator.isHashtagsValid,
  getMessageErrorHashtags,
  true);

formLoadingFile.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (fieldHashtags.value.length !== 0) {
    const isValid = pristineValidator.validate();

    if (isValid === true) {
      formLoadingFile.submit();
    }
  } else {
    formLoadingFile.submit();
  }
});

const sliderForm = formLoadingFile.querySelector('.effect-level__slider');
const bigImgPreview = formLoadingFile.querySelector('.img-upload__preview img');
const effectIcon = formLoadingFile.querySelector('.effects__list');

function destroySlider (sliderElement) {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
}

const stylesSlider = {
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

effectIcon.addEventListener('click', (evt) => {
  if (evt.target.closest('.effects__preview--none')) {
    destroySlider(sliderForm);
    bigImgPreview.style.filter = '';
    formLoadingFile.querySelector('.img-upload__effect-level').classList.add('hidden');
  }
  if (evt.target.closest('.effects__preview--chrome')) {
    destroySlider(sliderForm);
    noUiSlider.create(sliderForm, stylesSlider.chrome);
    sliderForm.noUiSlider.on('update', () => {
      bigImgPreview.style.filter = `grayscale(${sliderForm.noUiSlider.get()})`;
    });
    formLoadingFile.querySelector('.img-upload__effect-level').classList.remove('hidden');
  }
  if (evt.target.closest('.effects__preview--sepia')) {
    destroySlider(sliderForm);
    noUiSlider.create(sliderForm, stylesSlider.sepia);
    sliderForm.noUiSlider.on('update', () => {
      bigImgPreview.style.filter = `sepia(${sliderForm.noUiSlider.get()})`;
    });
    formLoadingFile.querySelector('.img-upload__effect-level').classList.remove('hidden');
  }
  if (evt.target.closest('.effects__preview--marvin')) {
    destroySlider(sliderForm);
    noUiSlider.create(sliderForm, stylesSlider.marvin);
    sliderForm.noUiSlider.on('update', () => {
      bigImgPreview.style.filter = `invert(${sliderForm.noUiSlider.get()}%)`;
    });
    formLoadingFile.querySelector('.img-upload__effect-level').classList.remove('hidden');
  }
  if (evt.target.closest('.effects__preview--phobos')) {
    destroySlider(sliderForm);
    noUiSlider.create(sliderForm, stylesSlider.phobos);
    sliderForm.noUiSlider.on('update', () => {
      bigImgPreview.style.filter = `blur(${sliderForm.noUiSlider.get()}px)`;
    });
    formLoadingFile.querySelector('.img-upload__effect-level').classList.remove('hidden');
  }
  if (evt.target.closest('.effects__preview--heat')) {
    destroySlider(sliderForm);
    noUiSlider.create(sliderForm, stylesSlider.heat);
    sliderForm.noUiSlider.on('update', () => {
      bigImgPreview.style.filter = `brightness(${sliderForm.noUiSlider.get()})`;
    });
    formLoadingFile.querySelector('.img-upload__effect-level').classList.remove('hidden');
  }
});

const scaleInputs = formLoadingFile.querySelector('.img-upload__scale');
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
  }

  if (evt.target.closest('.scale__control--bigger')) {
    if (scaleValue < 1) {
      scaleValue += 0.25;
      // if ()
      bigImgPreview.style = `transform: scale(${scaleValue})`;
    }
    scaleValueElement.value = `${scaleValue * 100}%`;
  }
});

