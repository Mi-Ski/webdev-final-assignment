import * as THREE from 'three';
const normalMapSrc = require('./images/earthnormal2k.jpg');


export default headerInit = () => {
	const colorRed = new THREE.Color(getComputedStyle(document.body).getPropertyValue('--color-green').trim());
	const colorBlue = new THREE.Color(getComputedStyle(document.body).getPropertyValue('--color-purple').trim());

	const container = document.querySelector('.webgl__container');

	// Loading
	const textureLoader = new THREE.TextureLoader();
	const normalTexture = textureLoader.load(normalMapSrc);
	console.log(normalTexture);

	// Debug
	// const gui = new dat.GUI();

	// Canvas
	const canvas = document.querySelector('canvas.webgl');

	// Scene
	const scene = new THREE.Scene();

	// Objects
	const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);

	// Materials
	const materialProps = {
		color: new THREE.Color(0x000000),
		metalness: 0,
		roughness: 1,
		normalMap: normalTexture,
	};
	const material = new THREE.MeshStandardMaterial(materialProps);

	// Mesh
	const sphere = new THREE.Mesh(geometry, material);
	scene.add(sphere);

	// Lights
	const pointLight = new THREE.PointLight(0xffffff, 0.1);
	pointLight.position.x = 2;
	pointLight.position.y = 3;
	pointLight.position.z = 4;
	scene.add(pointLight);

	const pointLight2 = new THREE.PointLight(colorBlue, 2);
	pointLight2.position.set(-1.9, 1, -1.65);
	pointLight2.intensity = 10;

	scene.add(pointLight2);

	// const guiLightRed = gui.addFolder('Light 1');

	// guiLightRed.add(pointLight2.position, 'y').min(-3).max(3).step(.01)
	// guiLightRed.add(pointLight2.position, 'z').min(-3).max(3).step(.01)
	// guiLightRed.add(pointLight2.position, 'x').min(-3).max(3).step(.01)
	// guiLightRed.add(pointLight2, 'intensity').min(0).max(10).step(.01)

	// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1);
	// scene.add(pointLightHelper);

	const pointLight3 = new THREE.PointLight(colorRed, 2);
	pointLight3.position.set(2.1, -3, -2);
	pointLight3.intensity = 7;
	scene.add(pointLight3);

	// const guiLightBlue = gui.addFolder('Light 2');

	// guiLightBlue.add(pointLight3.position, 'y').min(-3).max(3).step(.01)
	// guiLightBlue.add(pointLight3.position, 'z').min(-3).max(3).step(.01)
	// guiLightBlue.add(pointLight3.position, 'x').min(-3).max(3).step(.01)
	// guiLightBlue.add(pointLight3, 'intensity').min(0).max(10).step(.01)

	// const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 1);
	// scene.add(pointLightHelper2);

	/**
	 * Sizes
	 */
	const sizes = {
		width: container.offsetWidth,
		height: container.offsetHeight,
	};

	window.addEventListener('resize', () => {
		// Update sizes
		sizes.width = window.innerWidth;
		sizes.height = window.innerHeight;

		// Update camera
		camera.aspect = sizes.width / sizes.height;
		camera.updateProjectionMatrix();

		// Update renderer
		renderer.setSize(sizes.width, sizes.height);
		// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	});

	/**
	 * Camera
	 */
	// Base camera
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

	// Controls
	// const controls = new OrbitControls(camera, canvas)
	// controls.enableDamping = true

	/**
	 * Renderer
	 */
	const renderer = new THREE.WebGLRenderer({
		canvas: canvas,
		alpha: true,
	});
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

	/**
	 * Animate
	 */
	const scrollHandler = () => {
		sphere.scale.set(
			1 + window.scrollY * 0.01,
			1 + window.scrollY * 0.01,
			1 + window.scrollY * 0.01
		);
		pointLight3.intensity = 4 - window.scrollY * 0.04;
		pointLight2.intensity = 1 - window.scrollY * 0.01;
	};
	window.addEventListener('scroll', scrollHandler);

	const mouseMoveHandler = (e) => {
		// make center of the screen X,Y(0,0)
		mouseX = e.clientX - windowHalfX;
		mouseY = e.clientY - windowHalfY;
	};

	document.addEventListener('mousemove', mouseMoveHandler);
	let mouseX = 0;
	let mouseY = 0;
	let targetX = 0;
	let targetY = 0;
	const windowHalfX = window.innerWidth / 2;
	const windowHalfY = window.innerHeight / 2;

	const clock = new THREE.Clock();

	const tick = () => {
		targetX = mouseX * 0.001;
		targetY = mouseY * 0.001;

		const elapsedTime = clock.getElapsedTime();

		// Update objects
		sphere.rotation.y = 0.5 * elapsedTime;

		sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y);
		sphere.rotation.x += 0.5 * (targetY - sphere.rotation.x);
		sphere.position.z += 0.8 * (targetY - sphere.rotation.x);

		// shpere.rotation.x

		// Update Orbital Controls
		// controls.update()

		// Render
		renderer.render(scene, camera);

		// Call tick again on the next frame
		window.requestAnimationFrame(tick);
	};

	tick();
};
