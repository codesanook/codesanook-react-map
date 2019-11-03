import React, { useEffect } from "react";
import Map from "ol/Map";
import View from "ol/View";
import OSM from "ol/source/OSM";
import Feature from "ol/Feature";
import { fromLonLat } from "ol/proj";
import Point from "ol/geom/Point";
import Overlay from "ol/Overlay";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon"
import IconAnchorUnits from "ol/style/IconAnchorUnits";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import TileLayer from "ol/layer/Tile";
import OverlayPositioning from "ol/OverlayPositioning";
import './map.css';

interface IProps {
    title?: string;
    content?: string;
    lat: number;
    lng: number;
}

//https://openstreetmap.be/en/projects/howto/openlayers.html
const MyMap = (props: IProps) => {
    const { title = 'title', content = 'content', lat, lng } = props;
    const location = fromLonLat([lng, lat]);

    useEffect(() => {
        const vectorLayer = createVectorLayerWithMarker(location);
        const rasterLayer = new TileLayer({ source: new OSM() });
        const popup = createPopup(location);
        const map = createMap(rasterLayer, vectorLayer, popup, location);

        // Show popup when click on marker.
        map.on('singleclick', event => {
            if (map.hasFeatureAtPixel(event.pixel)) {
                popup.setPosition(location);
            } else {
                popup.setPosition(undefined);
            }
        });

        // Change mouse cursor when over marker.
        map.on('pointermove', function (e) {
            const pixel = map.getEventPixel(e.originalEvent);
            const hasFeature = map.hasFeatureAtPixel(pixel);
            const element = map.getTarget() as HTMLElement;
            element.style.cursor = hasFeature ? 'pointer' : 'auto';
        });

        const closer = document.getElementById('popup-closer')!;
        closer.onclick = (e) => {
            e.preventDefault();
            popup.setPosition(undefined);
        };

    }, [location]);

    return (
        <div>
            <div id="map"></div>
            <div id="popup" className="ol-popup">
                <span id='popup-closer' className="ol-popup-closer"> </span>
                <h4>{title}</h4>
                <p>{content} </p>
            </div>
        </div>
    );
}

function createMap(
    rasterLayer: TileLayer,
    vectorLayer: VectorLayer,
    popup: Overlay,
    location: number[]
): Map {
    return new Map({
        layers: [
            rasterLayer,
            vectorLayer
        ],
        overlays: [
            popup
        ],
        target: document.getElementById('map')!,
        view: new View({
            center: location,
            zoom: 16
        })
    });
}

function createPopup(location: number[]): Overlay {
    const container = document.getElementById('popup')!;
    return new Overlay({
        element: container,
        positioning: OverlayPositioning.BOTTOM_CENTER,
        offset: [0, -50],
        position: location
    });
}

function createVectorLayerWithMarker(location: number[]): VectorLayer {
    const iconFeature = new Feature({
        geometry: new Point(location),
        name: 'Null Island',
        population: 4000,
        rainfall: 500,
    });

    const iconStyle = new Style({
        image: new Icon({
            anchor: [
                0.5,
                40 //pixel
            ],
            anchorXUnits: IconAnchorUnits.FRACTION,
            anchorYUnits: IconAnchorUnits.PIXELS,
            src: 'icon.png',
        })
    });

    iconFeature.setStyle(iconStyle);
    return new VectorLayer({
        source: new VectorSource({
            features: [iconFeature]
        })
    });
}

export default MyMap;
