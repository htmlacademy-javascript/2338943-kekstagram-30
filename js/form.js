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
  formLoadingFile.querySelector('.img-upload__preview img').src = buttonLoadFile.value;
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
        fieldHashtags.dataset.messageError = `Нужен знак "#" перед "${arrayHashtags}"!`;
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
