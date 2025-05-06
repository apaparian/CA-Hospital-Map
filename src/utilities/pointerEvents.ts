import { getCenter } from "ol/extent";
import Overlay from "ol/Overlay";

export const showCountyHover = (e, map) => {
  const info = document.getElementById('info');
  const mapLayer = document.getElementById('map');

  let currFeature;
  const feature = map.forEachFeatureAtPixel(e.pixel, (feature) => {
    if (feature.get('name')) return feature
  });
  if (feature) {
    info.style.left = `${e.pixel[0] + mapLayer.offsetLeft}px`;
    info.style.top = `${e.pixel[1] + mapLayer.offsetTop}px`;

    if (feature !== currFeature) {
      info.style.visibility = 'visible';
      info.innerText = feature.get('name');
    }
  } else {
    info.style.visibility = 'hidden';
  }
  currFeature = feature;
}

export const selectCountyName = (e, map, props, setCountyCenter, center) => {
  const feature = map.forEachFeatureAtPixel(e.pixel, (feature) => {
    if (feature.get('name')) return feature;
  });
  if (feature) {
    props.setCounty(feature.get('name'));
    setCountyCenter(getCenter(feature.getGeometry().getExtent()));
  } else {
    props.setCounty(null);
    setCountyCenter(center);
  }
};

export const selectFacilityName = (e, map, setHospitalData) => {
  const feature = map.forEachFeatureAtPixel(e.pixel, (feature) => {
    if (feature.get('FacilityName')) return feature;
  })
  const hostpitalInfo = document.getElementById('hospital-info');
  const hospitalDisplay = document.getElementById('overlay');

  if (feature) {
    const facilityName = feature.get('FacilityName');
    const hospitalData = {
      facilityName: facilityName,
      type: feature.get('LicenseType'),
      street: feature.get('StreetNbr') + ' ' + feature.get('StreetName'),
      city: feature.get('City') + ', CA',
      zip: feature.get('Zip'),
    }

    hospitalDisplay.style.visibility = 'visible';
    hostpitalInfo.style.visibility = 'visible';
    hostpitalInfo.innerText = facilityName;

    map.addOverlay(new Overlay({
        id: facilityName,
        element: hostpitalInfo,
        position: getCenter(feature.getGeometry().getExtent()),
        offset: [3, -15]
    }));

    setHospitalData(hospitalData);
  } else {
    hospitalDisplay.style.visibility = 'hidden'
    hostpitalInfo.style.visibility = 'hidden'
    setHospitalData({});
  };
};
