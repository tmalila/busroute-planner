import React, { FunctionComponent } from "react";
import { Vertex } from "../BusRoutePage";

interface Props {
  routeStops: Vertex[],
}

const RouteList: React.FunctionComponent<Props> = props => {

  const { routeStops } = props;

  return (
    <div>
      {routeStops.map((r, index) => 
          <p key={index}>{r.vertex} - {r.shortestDistanceFromOrigo} - {r.routeColor}</p>
      )}
    </div>
  )
}

export default RouteList;