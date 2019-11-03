import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import './my-map.css';

interface IProps {
    lat: number;
    lng: number;
    zoomLevel?: number;
}

//https://openstreetmap.be/en/projects/howto/openlayers.html
const MyMap = (props: IProps) => {
    const { zoomLevel = 16, lat, lng } = props;
    const location = fromLonLat([lng, lat]);
    const mapRef = useRef(null);

    useEffect(() => {
        const rasterLayer = new TileLayer({ source: new OSM() });
    });

    return (
        <>
            <div ref={mapRef} className='my-map'></div>
        </>
    );
}

function createMap(
    rasterLayer: TileLayer,
    location: number[],
    zoomLevel: number,
    mapElement: HTMLElement
): Map {
    return new Map({
        layers: [
            rasterLayer,
        ],
        target: mapElement,
        view: new View({
            center: location,
            zoom: zoomLevel
        })
    });
}

export default MyMap;
