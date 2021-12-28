// import * as L7 from '@antv/l7';
import { MapServiceEvent } from '@antv/l7';

const lightMap = 'mapbox://styles/michalskiba/ckxnqlo3ycd4j14pbznf9y047';
const darkMap = 'mapbox://styles/michalskiba/ckwpk7z3d5ia815pbwnki3hrj';

const mapScene = new L7.Scene({
	id: 'map',
	map: new L7.Mapbox({
		style: 'mapbox://styles/michalskiba/ckwpk7z3d5ia815pbwnki3hrj',
		center: [110.19382669582967, 30.258134],
		pitch: 40,
		zoom: 2.5,
		maxZoom: 8,
		minZoom: 3,
		token:
			'pk.eyJ1IjoibWljaGFsc2tpYmEiLCJhIjoiY2t3cGs1OGVqMGRvMTJ3cW9hMTBzYjZtdSJ9.P0xUwkWHMjZCzpWbmjn0nw',
	}),
});

export default mapInit = (darkTheme) => {
	fetch('https://gw.alipayobjects.com/os/rmsportal/oVTMqfzuuRFKiDwhPSFL.json')
		// fetch('./db.json')
		.then((res) => res.json())
		.then((data) => {
			const pointLayer = new L7.PointLayer({})
				.source(data.list, {
					parser: {
						type: 'json',
						x: 'j',
						y: 'w',
					},
				})
				.shape('cylinder')
				.size('t', function (level) {
					return [3, 2, level * 2 ];
				})
				.color('t', [
					'#fde7e9C',
					'#fccfd3',
					'#fab7bd',
					'#f8a0a7',
					'#f5707b',
					'#f78891',
					'#f45b69',
					'#f35865',
					'#f2404f',
					'#f02839',
				])
				.style({
					opacity: 1.0,
				});

			console.log(mapScene.getLayers());
			mapScene.removeAllLayer();
			mapScene.addLayer(pointLayer);

			if (darkTheme) {
			mapScene.setMapStyle(darkMap);
			} else {
			mapScene.setMapStyle(lightMap);
			}
		});

	// prevent scrollwheel zoom without ctrl or alt pressed
	mapScene.map.on('wheel', (event) => {
		if (event.originalEvent.ctrlKey) {
			return;
		}

		if (event.originalEvent.metaKey) {
			return;
		}

		if (event.originalEvent.altKey) {
			return;
		}

		event.preventDefault();
	});

	console.log(':D');
};

mapInit(true);
// mapScene.map.on('click', (e) => console.log(e));
