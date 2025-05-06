import React, { useEffect, useState } from "react";

const DataFields = ({county, month, birthData, editFields, updateField}) => {
  const [rows, setRows] = useState([<div />]);

  useEffect(() => {
    if (birthData[county]) {
      const preData = Object.entries(birthData[county][month]).map((entry, i) => (
        <div key={county+month+i} className='data-row'>
          <p className='label' key={'label' + i}>{entry[0]}</p>
          {!editFields
            ? <p className='value' key={'value' + i}>{entry[1] || 0}</p>
            : <input
              key={'input' + Number(entry[1] || 0) + i}
              className='input'
              onChange={(e) => { updateField(entry[0], e.target.value) }}
              defaultValue={Number(entry[1] || 0)} 
              pattern='^\d+$'
            />
          }
        </div>
      ))
      const unaccounted = Object.values(birthData[county][month])
        .reduce((acc:number, curr:number) => acc - curr);
      preData.push(
        <div key='unaccounted' className='data-row'>
          <p key='unacc-label' className='label'>Unaccounted</p>
          <p key='unacc-value' className='value'>{unaccounted}</p>
        </div>
      );
      setRows(preData)
    }
  }, [county, month, editFields, birthData[county][month]]);

  return (
    <div id='data-table'>{rows}</div>
  );
};

export default DataFields;