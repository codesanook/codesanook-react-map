import React, { useEffect, useRef } from "react";
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
import './my-map.css';

interface IProps {
    lat: number;
    lng: number;
    title?: string;
    content?: string;
    zoomLevel?: number;
}

//https://openstreetmap.be/en/projects/howto/openlayers.html
const MyMap = (props: IProps) => {
    const { title = 'title', content = 'content', zoomLevel = 16, lat, lng } = props;
    const location = fromLonLat([lng, lat]);

    const mapRef = useRef(null);
    const popupRef = useRef(null);
    const closeButtonRef = useRef(null);

    useEffect(() => {
        const rasterLayer = new TileLayer({ source: new OSM() });
        const vectorLayer = createVectorLayerWithMarker(location);
        const popup = createPopup(location, popupRef.current!, closeButtonRef.current!);


    });

    return (
        <div>
            <div ref={mapRef} className='my-map'></div>
            <div ref={popupRef} className="ol-popup">
                <span ref={closeButtonRef} className="ol-popup-closer"></span>
                <h4>{title}</h4>
                <p>{content} </p>
            </div>
        </div>
    );
}

function registerMapEvent(map: Map, popup: Overlay, location: number[]) {
    map.on('singleclick', event => {
        if (map.hasFeatureAtPixel(event.pixel)) {
            popup.setPosition(location);
        }
        else {
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
}

function registerCloseButtonEvent(closeButtonElement: HTMLElement, popup: Overlay) {
    closeButtonElement.onclick = (e) => {
        e.preventDefault();
        popup.setPosition(undefined);
    };
}

function createMap(
    rasterLayer: TileLayer,
    vectorLayer: VectorLayer,
    popup: Overlay,
    location: number[],
    zoomLevel: number,
    mapElement: HTMLElement
): Map {
    const map = new Map({
        layers: [
            rasterLayer,
            vectorLayer
        ],
        overlays: [
            popup
        ],
        target: mapElement,
        view: new View({
            center: location,
            zoom: zoomLevel
        })
    });

    // Show popup when click on marker.
    registerMapEvent(map, popup, location);
    return map;
}

function createPopup(
    location: number[],
    popupElement: HTMLElement,
    closeButtonElement: HTMLElement
): Overlay {
    const popup = new Overlay({
        element: popupElement,
        positioning: OverlayPositioning.BOTTOM_CENTER,
        offset: [0, -50],
        position: location
    });

    registerCloseButtonEvent(closeButtonElement, popup);
    return popup;
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
