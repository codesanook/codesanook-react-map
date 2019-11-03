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

//https://openstreetmap.be/en/projects/howto/openlayers.html
const MyMap = () => {
    const myLocation = fromLonLat([
        // 100.517489,
        // 13.721907,
100.517462,
13.722183, 

        // 100.517467,
        // 13.722324,
    ]);

    var iconFeature = new Feature({
        geometry: new Point(myLocation),
        name: 'Null Island',
        population: 4000,
        rainfall: 500,
    });

    var iconStyle = new Style({
        image: new Icon({
            anchor: [
                0.5,//%
                40 //pixel
            ],
            anchorXUnits: IconAnchorUnits.FRACTION,
            anchorYUnits: IconAnchorUnits.PIXELS,
            src: 'icon.png',
        })
    });
    iconFeature.setStyle(iconStyle);

    var vectorLayer = new VectorLayer({
        source: new VectorSource({
            features: [iconFeature]
        })
    });

    var rasterLayer = new TileLayer({
        source: new OSM()
    });

    useEffect(() => {
        var map = new Map({
            layers: [
                rasterLayer,
                vectorLayer
            ],
            target: document.getElementById('map')!,
            view: new View({
                center: myLocation,
                zoom: 16
            })
        });

        var container = document.getElementById('popup')!;
        var content = document.getElementById('popup-content')!;
        var closer = document.getElementById('popup-closer')!;
        var popup = new Overlay({
            element: container,
            positioning: OverlayPositioning.BOTTOM_CENTER,
            offset: [0, -50]
        });
        map.addOverlay(popup);

        closer.onclick = () => {
            popup.setPosition(undefined);
        };

        map.on('singleclick', function (event) {
            if (map.hasFeatureAtPixel(event.pixel) === true) {
                //var coordinate = event.coordinate;
                //content.innerHTML = '<b>Hello world!</b><br />I am a popup.';
                popup.setPosition(myLocation);
            } else {
                popup.setPosition(undefined);
            }
        });

        content.innerHTML = '<b>Hello world!</b><br />I am a popup.';
        popup.setPosition(myLocation);


        // change mouse cursor when over marker
        map.on('pointermove', function (e) {
            var pixel = map.getEventPixel(e.originalEvent);
            var hit = map.hasFeatureAtPixel(pixel);
            var element = map.getTarget() as HTMLElement;
            element.style.cursor = hit ? 'pointer' : 'auto';
        });
    });

    return (
        <div>
            <div id="map"></div>
            <div id="popup" className="ol-popup">
                <a href="#" id="popup-closer" className="ol-popup-closer"></a>
                <div id="popup-content"></div>
            </div>
        </div>
    );
}

export default MyMap;
