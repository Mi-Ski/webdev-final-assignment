import './styles/main.scss';
import 'remixicon/fonts/remixicon.css'
import headerInit from './threejs-header.js'
// main data map init
import './l7-data-map.js';

// three js header init
headerInit();

// darkmode button handler
document.querySelector('#darkmodeSwitch').addEventListener('change', e => {
	(e.target.checked) ? document.body.setAttribute('data-theme', 'dark') : document.body.removeAttribute('data-theme');
	headerInit();
})
