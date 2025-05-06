import React from "react";

const Overlay = ({hospitalData}) => {
  return (
    <div id='overlay'>
      <p>{hospitalData.facilityName}</p>
      <p>{hospitalData.type}</p>
      <p>{hospitalData.street}</p>
      <p>{hospitalData.city}</p>
      <p>{hospitalData.zip}</p>
    </ div>
  );
}

export default Overlay;