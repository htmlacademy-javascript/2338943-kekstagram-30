import {getPictures} from './data.js';
import {renderGallery} from './gallery.js';

const pictures = getPictures(25);
renderGallery(pictures);

export const VISIBLE_COMMENTS_QUANTITY = 5;
