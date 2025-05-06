import React from "react";

interface Props {
  setMapVisible: React.Dispatch<React.SetStateAction<boolean>>;
  mapVisible: boolean;
  setMapCenter: React.Dispatch<React.SetStateAction<boolean>>;
  mapCenter: boolean;
  setFocusCounty: React.Dispatch<React.SetStateAction<boolean>>;
  focusCounty: boolean;
  setFitCounty: React.Dispatch<React.SetStateAction<boolean>>;
  fitCounty: boolean;
  setFitState: React.Dispatch<React.SetStateAction<boolean>>;
  fitState: boolean;
  setShowPopul: React.Dispatch<React.SetStateAction<boolean>>;
  showPopul: boolean;
  county: string;
}

const Controls: React.FC<Props> = (props) => {
  return (
    <div id='controls'>
      <button
        id='show-density'
        onClick={(e) => props.setShowPopul(!props.showPopul)}
        disabled={!props.county && !props.showPopul}
      >{!props.showPopul ? 'show density for month' : 'show selectable counties'}</button>
      <button
        id='show-hospitals'
        onClick={(e) => props.setMapVisible(!props.mapVisible)}
      >{!props.mapVisible ? 'show hospitals' : 'hide hospitals'}</button>
      <button
        id='center-county'
        onClick={(e) => props.setFocusCounty(true)}
        disabled={!props.county}
      >center county</button>
      <button
        id='center-map'
        onClick={(e) => props.setMapCenter(true)}
      >center map</button>
      <button
        id='fit-county'
        onClick={(e) => props.setFitCounty(true)}
        disabled={!props.county}
      >fit county</button>
      <button
        id='fit-state'
        onClick={(e) => props.setFitState(true)}
      >fit state</button>
    </div>
  );
};

export default Controls;
