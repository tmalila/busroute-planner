import React, { FunctionComponent } from "react";

interface Props {
  busStops: string[],
  onSelectValue: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  id: string,
  title: string,
}

const StopSelector: FunctionComponent<Props> = props => {
  const { busStops, onSelectValue, title, id } = props;

  return (
    <div>
        <label htmlFor="stopsend">{title} </label>
        <select id={id} onChange={(e) => onSelectValue(e)}>
          {busStops.map(stop => 
           <option key={stop} value={stop}>{stop}</option> 
          )}
        </select>
      </div>
  );
}

export default StopSelector;