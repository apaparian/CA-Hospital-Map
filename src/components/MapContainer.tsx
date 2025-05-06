import React, { useState } from "react";
import MapLayer from "./MapLayer";
import Controls from "./Controls";
import Overlay from "./Overlay";

const MapContainer = ({month, county, setCounty, populData}) => {
  const [hospitalData, setHospitalData] = useState({});
  const [mapVisible, setMapVisible] = useState(false);
  const [mapCenter, setMapCenter] = useState(false);
  const [focusCounty, setFocusCounty] = useState(false);
  const [fitCounty, setFitCounty] = useState(false);
  const [fitState, setFitState] = useState(false);
  const [showPopul, setShowPopul] = useState(false);

  return (
    <div id='map-container'>
      <MapLayer
        month={month}
        county={county}
        setCounty={setCounty}
        mapVisible={mapVisible}
        setMapCenter={setMapCenter}
        mapCenter={mapCenter}
        focusCounty={focusCounty}
        setFocusCounty={setFocusCounty}
        fitCounty={fitCounty}
        setFitCounty={setFitCounty}
        fitState={fitState}
        setFitState={setFitState}
        setHospitalData={setHospitalData}
        populData={populData}
        showPopul={showPopul}
      />
      <Controls
        setMapVisible={setMapVisible}
        mapVisible={mapVisible}
        setMapCenter={setMapCenter}
        mapCenter={mapCenter}
        focusCounty={focusCounty}
        setFocusCounty={setFocusCounty}
        fitCounty={fitCounty}
        setFitCounty={setFitCounty}
        county={county}
        fitState={fitState}
        setFitState={setFitState}
        showPopul={showPopul}
        setShowPopul={setShowPopul}
      />
      <Overlay
        hospitalData={hospitalData}
      />
      <div id='info' >{county}</div>
      <div id='hospital-info'></div>
    </div>
  );
};

export default MapContainer;
