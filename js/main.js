import {getPictures} from './data.js';
import {renderGallery, showErrorMessage} from './gallery.js';
import {onButtonShowForm} from './form.js';

const loadFileButton = document.querySelector('.img-upload__input');

getPictures(renderGallery, showErrorMessage);
loadFileButton.addEventListener('change', onButtonShowForm);
