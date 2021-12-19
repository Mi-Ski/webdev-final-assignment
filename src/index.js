import './styles/main.scss';
import 'remixicon/fonts/remixicon.css';
import headerInit from './threejs-header.js';
import './l7-data-map.js';

const logoDark = require('./images/logo-dark.svg');
const logoLight = require('./images/logo-light.svg');
const dmSwitch = document.querySelector('#darkmodeSwitch');
const sidebarSVGlogo = document.querySelector('.sidebar__svg'); 

window.onload = () => {
	dmSwitch.checked = true;
} 

document.querySelector('.button__show-sidebar').addEventListener('click', () => {
	document.querySelector('.sidebar').classList.toggle('sidebar--visible');
})

// darkmode button handler
dmSwitch.addEventListener('change', (e) => {

	document.querySelectorAll('.landing-logo').forEach(el => {
		el.classList.toggle('invert');
	})

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
