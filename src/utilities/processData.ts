import { Feature } from "ol";
import { MultiPolygon, Polygon } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Style, Stroke, Fill } from "ol/Style";

export const processBirthRecords = (res) => {
  const rawResults = {};

  res.forEach((item) => {
    const itCounty = `${[item[3]]} County`;
    const itMonth = item[2];

    if (!rawResults[itCounty]) rawResults[itCounty] = {};
    if (!rawResults[itCounty][itMonth]) rawResults[itCounty][itMonth] = {};
    rawResults[itCounty][itMonth][item[6]] = item[7];
  });
  return rawResults;
}

export const saveNewBirthRecords = (res, data) => {
  const newRecords = {};

  res.records.forEach((item) => {
    item[7] = data[`${[item[3]]} County`][item[2]][item[6]];
  });
  return res;
}

export const processPopulData = (res) => {
  const rawResults = {};

  res.filter((item) => item[6] === 'Total Population').forEach((item) => {
    const itCounty = `${[item[3]]} County`;
    const itMonth = item[2];

    if (!rawResults[itMonth]) rawResults[itMonth] = {};
    if (!rawResults[itMonth][itCounty]) rawResults[itMonth][itCounty] = item[7];
  });
  return rawResults;
}
export const getCountyLayers = (res) => (
  res.map((county) => {
    if (county.geometry.type === 'MultiPolygon') {
      return new Feature({
        geometry: new MultiPolygon(county.geometry.coordinates)
          .transform('EPSG:4326','EPSG:3857'),
        name: county.properties.NAME,
      });
     } else {
      return new Feature({
        geometry: new Polygon(county.geometry.coordinates)
          .transform('EPSG:4326','EPSG:3857'),
          name: county.properties.NAME,
      });
    }
  })
);

export const getPopulationLayers = (counties, monthData) => (
  counties.getSource().getFeatures()
    .sort((a, b) => monthData[a.get('name')] - monthData[b.get('name')])
    .map((feature, i, arr) => {
      const opacity = i / arr.length
      return new VectorLayer({
        source: new VectorSource({
          features: [feature], 
        }),
        style: new Style({
          stroke: new Stroke({
            width: 1,
            color: [100, 150, 50, 0.8]
          }),
          fill: new Fill({
            color: [100, 150, 50, opacity]
          })
        }),
        properties: { population: true }
      });
    })
);