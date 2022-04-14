import React, { useState } from 'react';
import DeckGL from '@deck.gl/react';
import { LineLayer, ScatterplotLayer } from '@deck.gl/layers';
import Map, { NavigationControl } from 'react-map-gl';
import { HexagonLayer, HeatmapLayer } from '@deck.gl/aggregation-layers';
import './Map.css';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN =
	'pk.eyJ1IjoibWNjYXJ0bTYiLCJhIjoiY2tsNnNiMnJiMWd1eDJxbW42dnRoYTh4OCJ9.LE-b55hdWIdk7C8jlfdM9w';

const sourceData = './gundata.json';

const scatterplot = () =>
	new ScatterplotLayer({
		id: 'scatter',
		data: sourceData,
		opacity: 0.8,
		filled: true,
		radiusMinPixels: 2,
		radiusMaxPixels: 5,
		getPosition: (d: any) => [d.longitude, d.latitude],
		getFillColor: (d: any) =>
			d.n_killed > 0 ? [200, 0, 40, 150] : [255, 140, 0, 100],
		pickable: true,

		onClick: ({ object, x, y }) => {
			window.open(
				`https://www.gunviolencearchive.org/incident/${
					(object as any).incident_id
				}`
			);
		},
	});

const heatmap = () =>
	new HeatmapLayer({
		id: 'heat',
		data: sourceData,
		getPosition: (d: any) => [d.longitude, d.latitude],
		getWeight: (d: any) => d.n_killed + d.n_injured * 0.5,
		radiusPixels: 60,
		visible: false,
	});

const hexagon = () =>
	new HexagonLayer({
		id: 'hex',
		data: sourceData,
		getPosition: (d: any) => [d.longitude, d.latitude],
		getElevationWeight: (d: any) => d.n_killed * 2 + d.n_injured,
		elevationScale: 100,
		extruded: true,
		radius: 1609,
		opacity: 0.6,
		coverage: 0.88,
		lowerPercentile: 50,
		visible: false,
	});
// Viewport settings
const INITIAL_VIEW_STATE = {
	longitude: -100,
	latitude: 40,
	zoom: 4,
	pitch: 0,
	bearing: 0,
};

export default function Deckgl() {
	const layers = [scatterplot(), heatmap(), hexagon()];

	return (
		<DeckGL
			initialViewState={INITIAL_VIEW_STATE}
			controller={true}
			layers={layers}
			getTooltip={({ object }: any) =>
				object && {
					html: `<h2>Incident ID:${object.incident_id}</h2><div>Killed:${object.n_killed}</div><div>Injured:${object.n_injured}</div><div>Notes:${object.notes}</div>`,
					style: {
						fontSize: '0.8em',
						position: 'absolute',
						background: 'white',
						// margin: '10px',
						// padding: '10px',
						// paddingTop: '0px',
					},
				}
			}
		>
			<Map
				// initialViewState={INITIAL_VIEW_STATE}
				style={{ width: '100vw', height: '100vh' }}
				mapStyle='mapbox://styles/mapbox/dark-v10'
				mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
			>
				<NavigationControl />
			</Map>
		</DeckGL>
	);
}
