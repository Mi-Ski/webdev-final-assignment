import * as THREE from 'three';
const loader = new THREE.TextureLoader();
const particleTexture = loader.load('../particle.png');

const canvas = document.querySelector('canvas.webgl');
const particlesCount = 5000;

const scene = new THREE.Scene();
const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
const particlesGeometry = new THREE.BufferGeometry();

const positionArray = new Float32Array(particlesCount * 3);
for (let i = 0; i <= particlesCount; i++) {
	positionArray[i] = (Math.random() - 0.5) * (Math.random() * 3);
}

particlesGeometry.setAttribute(
	'position',
	new THREE.BufferAttribute(positionArray, 3)
);

const material = new THREE.PointsMaterial({
	size: 0.004,
	color: 0x888888,
});

const particleMaterial = new THREE.PointsMaterial({
	size: 0.012,
	map: particleTexture,
	transparent: true,
	color: 0x999999,
});

const sphere = new THREE.Points(geometry, material);
const particleMesh = new THREE.Points(particlesGeometry, particleMaterial);
scene.add(sphere, particleMesh);

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

const sizes = {
	width: window.innerWidth / 0.9,
	height: window.innerHeight,
};

window.addEventListener('resize', () => {
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);


const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

let mouseX, mouseY;
mouseX = mouseY = 1000;

const animateParticles = (e) => {
	mouseY = e.clientY;
	mouseX = e.clientX;
};

document
	.querySelector('.webgl__container')
	.addEventListener('mousemove', animateParticles);

window.addEventListener('scroll', () => {
	sphere.scale.x = 1 + window.scrollY * .004;
	sphere.scale.y = 1 + window.scrollY * .004;
	sphere.scale.z = 1 + window.scrollY * .004;
});

const clock = new THREE.Clock();

export default tick = () => {
	const elapsedTime = clock.getElapsedTime();

	sphere.rotation.y = 0.1 * elapsedTime;
	particleMesh.rotation.x = -mouseY * (1 * 0.00008);
	particleMesh.rotation.y = -mouseX * (1 * 0.00008);

	renderer.render(scene, camera);

	window.requestAnimationFrame(tick);
};

tick();
