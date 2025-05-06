import React, { useEffect, useState } from "react";
import { months } from "../utilities/months";
import { processBirthRecords, processPopulData, saveNewBirthRecords } from "../utilities/processData";
import DataFields from "./DataFields";

const Panel = ({month, setMonth, county, setPopulData}) => {
  const [birthData, setBirthData] = useState({});
  const [editFields, setEditFields] = useState(false);

  const monthList = Object.entries(months)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map((month) => (
      <option
        key={month[0]}
        value={month[0]}
        className='month-opt'>
          {month[1]}
        </option>
    ));

  const updateField = (label, value) => {
    const newBirthData = Object.assign(birthData);
    newBirthData[county][month][label] = value;
    setBirthData(newBirthData);
  };

  useEffect(() => {
    fetch('src/data/BirthRecords.json')
      .then((res) => res.json())
      .then((res) => res.records)
      .then((res) => {
        setBirthData(processBirthRecords(res));
        setPopulData(processPopulData(res));
      });
  }, []);

  useEffect(() => {

  }, [month])


  const saveData = () => {
    fetch('src/data/BirthRecords.json')
    .then((res) => res.json())
    .then((res) => {
      const newData = saveNewBirthRecords(res, birthData)
      const blob = new Blob([JSON.stringify(newData)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      console.log(newData)
      const link = document.createElement('a');
      link.href = url;
      link.download = 'BirthRecords.json';
    
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  }

  return (
    <div id='panel'>
      {county && <div id='inner-panel'>
        {county}
        <select
          id='month-select'
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          {monthList}
        </select>
        <DataFields
          county={county}
          month={month}
          birthData={birthData}
          editFields={editFields}
          updateField={updateField}
        />
        <div id='panel-buttons'>
          <button
            id='edit-fields'
            onClick={(e) =>  setEditFields(!editFields)}
          >
            {!editFields ? 'edit fields' : 'lock fields'}
          </button>
          <button
            id='save-data'
            onClick={(e) => saveData()}
          >
            {'save file'}
          </button>
        </div>
      </div>}
    </div>
  );
};

export default Panel;
