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
    <div>
      {routeStops.map((r, index) => 
          <RouteLeg routeLeg={r} key={index} index={index} busRoutes={props.busRoutes}></RouteLeg>
      )}
    </div>
  )
}

export default RouteList;