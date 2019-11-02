import React, { useEffect } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import OSM from 'ol/source/OSM';
import * as proj from "ol/proj";
import { Icon, Style } from 'ol/style';

import './map.css'
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';

const MyMap = () => {

    useEffect(() => {
        const coordinate =
            proj.fromLonLat([
                100.517489,
                13.721907,
            ]);

        var iconFeature = new Feature({
            geometry: new Point(coordinate),
            name: 'Null Island',
            population: 4000,
            rainfall: 500
        });

        var iconStyle = new Style({
            image: new Icon({
                anchor: [
                    0.5,
                    40
                ],
                anchorXUnits: IconAnchorUnits.FRACTION,
                anchorYUnits: IconAnchorUnits.PIXELS,
                src: '/icon.png',
            })
        });

        iconFeature.setStyle(iconStyle);

        var vectorSource = new VectorSource({
            features: [iconFeature]
        });

        var vectorLayer = new VectorLayer({
            source: vectorSource
        });

        var rasterLayer = new TileLayer({
            source: new OSM()
        });

        var map = new Map({
            target: 'map',
            layers: [
                rasterLayer,
                vectorLayer
            ],
            view: new View({
                center: coordinate,
                zoom: 16
            })
        });
    });
    return (
        <div id='map'></div>
    )
};

export default MyMap;
