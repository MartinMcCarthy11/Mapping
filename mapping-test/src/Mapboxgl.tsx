import * as React from 'react';
import Map, { NavigationControl } from 'react-map-gl';
import './Map.css';
const accessToken =
	'pk.eyJ1IjoibWNjYXJ0bTYiLCJhIjoiY2tsNnNiMnJiMWd1eDJxbW42dnRoYTh4OCJ9.LE-b55hdWIdk7C8jlfdM9w';
export default function Mapboxgl() {
	return (
		<>
			<Map
				initialViewState={{
					longitude: -122.4,
					latitude: 37.8,
					zoom: 14,
				}}
				style={{ width: '100vw', height: '100vh' }}
				mapStyle='mapbox://styles/mapbox/streets-v9'
				mapboxAccessToken={accessToken}
			>
				<NavigationControl position='top-right' />
			</Map>
		</>
	);
}
