import './styles/main.scss';
import 'remixicon/fonts/remixicon.css';
import headerInit from './threejs-header.js';
// main data map init
import './l7-data-map.js';

const sidebarSVGlogo = document.querySelector('.sidebar__svg'); 
const logoDark = require('./images/logo-dark.svg');
const logoLight = require('./images/logo-light.svg');

document.querySelector('.button__show-sidebar').addEventListener('click', () => {
	document.querySelector('.sidebar').classList.toggle('sidebar--visible');
	console.log(22);
})

// darkmode button handler
document.querySelector('#darkmodeSwitch').addEventListener('change', (e) => {
	if (e.target.checked) {
		document.body.setAttribute('data-theme', 'dark');
		sidebarSVGlogo.src = logoLight;
	} else {
		document.body.removeAttribute('data-theme');
		sidebarSVGlogo.src = logoDark;
	}
	headerInit();
});

// three js header init
headerInit();
