import {getPictures} from './data.js';
import {renderMiniature} from './renderer.js';

const pictures = getPictures(25);

renderMiniature(pictures);
