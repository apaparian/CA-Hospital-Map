import React, { useEffect, useRef, useState } from "react";
import {Feature, Map, Overlay, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from "ol/proj";
import { MultiPolygon, Polygon } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Select } from "ol/interaction";
import { GeoJSON } from 'ol/format';
import { selectCountyName, selectFacilityName, showCountyHover } from '../utilities/pointerEvents'
import { styles } from '../utilities/styles'
import { Fill, Stroke, Style } from "ol/Style";
import { getCountyLayers, getPopulationLayers } from "../utilities/processData";

interface Props {
  month: string;
  county: string;
  setCounty: React.Dispatch<React.SetStateAction<String>>;
  mapVisible: boolean;
  setMapCenter: React.Dispatch<React.SetStateAction<boolean>>;
  mapCenter: boolean;
  setFocusCounty: React.Dispatch<React.SetStateAction<boolean>>;
  focusCounty: boolean;
  setFitCounty: React.Dispatch<React.SetStateAction<boolean>>;
  fitCounty: boolean;
  setFitState: React.Dispatch<React.SetStateAction<boolean>>;
  fitState: boolean;
  setHospitalData:  React.Dispatch<React.SetStateAction<{}>>;
  populData: {};
  showPopul: boolean;
}

const center = fromLonLat([-119.5, 36]);

const MapLayer: React.FC<Props> = (props) => {
  const [map, setMap] = useState(new Map());
  const [counties, setCounties] = useState(new VectorLayer());
  const [hospitals, setHospitals] = useState(new VectorLayer());
  const [countyCenter, setCountyCenter] = useState(center);

  useEffect(() => {
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM({
            attributions: ''
          })
        })
      ],
      view: new View({
        center: center,
        zoom: 5.8
      }),
    });
    map.on('pointermove', (e) => {
      showCountyHover(e, map);
    });
    map.on('singleclick', (e) => {
      selectCountyName(e, map, props, setCountyCenter, center);
    });
    map.on('singleclick', (e) => {
      selectFacilityName(e, map, props.setHospitalData);
    });

    fetch('src/data/California_Counties.geojson')
      .then((res) => res.json())
      .then((res) => res.features)
      .then((res) => getCountyLayers(res))
      .then((res) => {
        setCounties(new VectorLayer({
            source: new VectorSource({
              features: res, 
            }),
            style: styles.countyDefault
          }));
      });

    setHospitals(new VectorLayer({
      source: new VectorSource({
        url: 'src/data/FacilityList.geojson',
        format: new GeoJSON()
      }),
      style: styles.hospitalDefault,
      zIndex: 5,
    }));

    setMap(map);

    return () => {
      map.setTarget(null);
    };
  }, []);

  useEffect(() => {
    map.addLayer(counties);
    
    map.addInteraction(new Select({
      condition: (e) => e.type === 'singleclick',
      layers: [counties],
      style: styles.countySelected,
      
    }));
    map.addInteraction(new Select({
      condition: (e) => e.type === 'pointermove',
      layers: [counties],
      style: styles.countyHighlight,
    }));
    map.addInteraction(new Select({
      condition: (e) => e.type === 'pointermove',
      layers: [hospitals],
      style: styles.hospitalHighlight,
    }));
    map.addInteraction(new Select({
      condition: (e) => e.type === 'singleclick',
      layers: [hospitals],
      style: styles.hospitalSelected,
    }));
    return () => {
      map.removeLayer(counties)
    }
  }, [counties]);
  
  useEffect(() => {
    if (counties.getSource()) {
      if (props.showPopul) {     
        map.removeLayer((counties));
        console.log(map)
        const newCountyLayers = getPopulationLayers(
          counties, props.populData[props.month]
        );
        newCountyLayers.forEach((layer) => map.addLayer(layer));

      } else {
        map.getLayers().getArray().filter((layer) => layer.get('population'))
          .forEach((layer) => map.removeLayer(layer));
        map.addLayer((counties));
      }
    }
  }, [props.showPopul])

  useEffect(() => {
    if (props.showPopul) {
      map.getLayers().getArray().filter((layer) => layer.get('population'))
        .forEach((layer) => map.removeLayer(layer));
      const newCountyLayers = getPopulationLayers(
        counties, props.populData[props.month]
      );
      newCountyLayers.forEach((layer) => map.addLayer(layer))
    }
  }, [props.month])

  useEffect(() => {
    if (props.mapVisible) map.addLayer(hospitals);
    else map.removeLayer(hospitals);
  }, [props.mapVisible])

  useEffect(() => {
    if (props.mapCenter) {
      map.setView(new View ({
        zoom: map.getView().getZoom(),
        center: center,
      }));
      props.setMapCenter(false)
    }
  }, [props.mapCenter])

  useEffect(() => {
    if (props.county && props.focusCounty) {
      map.setView(new View ({
        zoom: map.getView().getZoom(),
        center: countyCenter,
      }));
      props.setFocusCounty(false)
    }
  }, [props.focusCounty])

  useEffect(() => {
    if (props.county && props.fitCounty) {
      map.setView(new View ({
        zoom: 8,
        center: countyCenter,
      }));
      props.setFitCounty(false)
    }
  }, [props.fitCounty])
  
  useEffect(() => {
    if (props.fitState) {
      map.setView(new View ({
        zoom: 5.8,
        center: center,
      }));
      props.setFitState(false)
    }
  }, [props.fitState])

  return (
    <div id='map' />
  );
}

export default MapLayer;
