import * as L7 from '@antv/l7';

const mapScene = new L7.Scene({
	id: 'map',
	map: new L7.Mapbox({
		style: 'mapbox://styles/michalskiba/ckwpk7z3d5ia815pbwnki3hrj',
		center: [120.19382669582967, 30.258134],
		pitch: 40,
		// zoom: 5,
		maxZoom: 8,
		minZoom: 3,
		token:
			'pk.eyJ1IjoibWljaGFsc2tpYmEiLCJhIjoiY2t3cGs1OGVqMGRvMTJ3cW9hMTBzYjZtdSJ9.P0xUwkWHMjZCzpWbmjn0nw',
	}),
});


export default fetch('https://gw.alipayobjects.com/os/rmsportal/oVTMqfzuuRFKiDwhPSFL.json')
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
				return [3, 2, level * 2 + 12];
			})
			.color('t', [
				'#094D4A',
				'#146968',
				'#1D7F7E',
				'#289899',
				'#34B6B7',
				'#4AC5AF',
				'#5FD3A6',
				'#7BE39E',
				'#A1EDB8',
				'#CEF8D6',
			])
			.style({
				opacity: 1.0,
			});

		mapScene.addLayer(pointLayer);
	});

	// prevent scrollwheel zoom without ctrl or alt pressed 
	mapScene.map.on("wheel", event => {
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

mapScene.map.on('click', (e) => console.log(e));