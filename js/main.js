import {getPictures} from './data.js';
import {renderGallery} from './gallery.js';

const pictures = getPictures(25);
renderGallery(pictures);

export const QUANTITY_VISIBLE_COMMENTS = 5;

