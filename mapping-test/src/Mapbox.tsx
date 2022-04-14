import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';

mapboxgl.accessToken =
	'pk.eyJ1IjoibWNjYXJ0bTYiLCJhIjoiY2tsNnNiMnJiMWd1eDJxbW42dnRoYTh4OCJ9.LE-b55hdWIdk7C8jlfdM9w';

export default function App() {
	const mapContainerRef = useRef(null);
	const [lng, setLng] = useState(-74.5);
	const [lat, setLat] = useState(40);
	const [zoom, setZoom] = useState(6);

	// Initialize map when component mounts
	useEffect(() => {
		const map = new mapboxgl.Map({
			container: mapContainerRef.current as unknown as HTMLElement,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [lng, lat],
			zoom: zoom,
		});

		// Add navigation control (the +/- zoom buttons)
		map.addControl(new mapboxgl.NavigationControl(), 'top-right');

		map.on('move', () => {
			setLng(Number(map.getCenter().lng.toFixed(4)));
			setLat(Number(map.getCenter().lat.toFixed(4)));
			setZoom(Number(map.getZoom().toFixed(2)));
		});

		// Clean up on unmount
		return () => map.remove();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div>
			<div className='sidebarStyle'>
				Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
			</div>
			<div ref={mapContainerRef} className='map-container' />
		</div>
	);
}
