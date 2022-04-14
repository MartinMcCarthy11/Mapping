import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

function Map() {
	const [map, setMap] = useState<mapboxgl.Map>();
	const mapNode = useRef(null);

	useEffect(() => {
		const node = mapNode.current;
		// if the window object is not found, that means
		// the component is rendered on the server
		// or the dom node is not initialized, then return early
		if (typeof window === 'undefined' || node === null) return;

		// otherwise, create a map instance
		const mapboxMap = new mapboxgl.Map({
			container: node,
			accessToken:
				'pk.eyJ1IjoibWNjYXJ0bTYiLCJhIjoiY2tsNnNiMnJiMWd1eDJxbW42dnRoYTh4OCJ9.LE-b55hdWIdk7C8jlfdM9w',
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [-74.5, 40],
			zoom: 9,
		});

		setMap(mapboxMap);

		return () => {
			mapboxMap.remove();
		};
	}, []);

	// useEffect(() => {
	// 	if (!map.current) return; // wait for map to initialize
	// 	map.current.on('move', () => {
	// 		setLng(map.current.getCenter().lng.toFixed(4));
	// 		setLat(map.current.getCenter().lat.toFixed(4));
	// 		setZoom(map.current.getZoom().toFixed(2));
	// 	});
	// });

	return <div ref={mapNode} style={{ width: '100vw', height: '100vh' }} />;
}

export default Map;
