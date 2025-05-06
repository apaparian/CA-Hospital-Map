import React, { useState } from "react";
import MapContainer from "./MapContainer";
import Panel from "./Panel";
import Overlay from "./Overlay";

const MainContainer = () => {
  const [month, setMonth] = useState('01');
  const [county, setCounty] = useState();
  const [populData, setPopulData] = useState({});

  return (
    <div id='main-container'>
      <Panel
        month={month}
        setMonth={setMonth}
        county={county}
        setPopulData={setPopulData}
      />
      <MapContainer
        month={month}
        county={county}
        setCounty={setCounty}
        populData={populData}
      />
    </div>
  );
};

export default MainContainer;
