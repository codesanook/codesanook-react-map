import React, { useEffect } from "react";
import Map from "ol/Map";
import View from "ol/View";
import LayerTile from "ol/layer/Tile";
import LayerVector from "ol/layer/Vector";
import OSM from "ol/source/OSM";
import SourceVector from "ol/source/Vector";
import Feature from "ol/Feature";
import { fromLonLat } from "ol/proj";
import Point from "ol/geom/Point";
import Overlay from "ol/Overlay";
import './map.css';

//https://openstreetmap.be/en/projects/howto/openlayers.html
const MyMap = () => {

    const myLocation = fromLonLat([
        100.517489,
        13.721907,
    ]);

    useEffect(() => {
        var map = new Map({
            layers: [
                new LayerTile({
                    source: new OSM()
                })
            ],
            target: 'map',
            view: new View({
                center: myLocation,
                zoom: 16
            })
        });

        var layer = new LayerVector({
            source: new SourceVector({
                features: [
                    new Feature({
                        geometry: new Point(myLocation)
                    })
                ]
            })
        });
        map.addLayer(layer);

        var container = document.getElementById('popup')!;
        var content = document.getElementById('popup-content')!;
        var closer = document.getElementById('popup-closer')!;
        var overlay = new Overlay({ element: container });
        map.addOverlay(overlay);

        closer.onclick = function () {
            overlay.setPosition(undefined);
            closer.blur();
            return false;
        };

        map.on('singleclick', function (event) {
            if (map.hasFeatureAtPixel(event.pixel) === true) {
                var coordinate = event.coordinate;
                content.innerHTML = '<b>Hello world!</b><br />I am a popup.';
                overlay.setPosition(coordinate);
            } else {
                overlay.setPosition(undefined);
                closer.blur();
            }
        });

        content.innerHTML = '<b>Hello world!</b><br />I am a popup.';
        overlay.setPosition(myLocation);
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
