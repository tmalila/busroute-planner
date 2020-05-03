import React, { FunctionComponent } from "react";
import { Vertex, RoutesType } from "../BusRoutePage";
import RouteLeg from "./RouteLeg";
import { Grid } from "@material-ui/core";

interface Props {
  routeStops: Vertex[],
  busRoutes: RoutesType,
}

const RouteList: React.FunctionComponent<Props> = props => {

  const { routeStops } = props;

  return (
    <div style={{ marginTop: "1rem" }}>
      {routeStops && routeStops.length > 0 &&
        (
          <>
          {routeStops.map((r, index, array) => 
            <RouteLeg currentRouteLeg={r} key={index} index={index} busRoutes={props.busRoutes} routeArray={array}></RouteLeg>
          )}
          <p>Total route time {routeStops[routeStops.length-1].shortestDistanceFromOrigo} minutes</p>
          </>
        )
      }
    </div>
  )
}

export default RouteList;