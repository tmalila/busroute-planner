import React from "react";
import { Vertex, RoutesType } from "../BusRoutePage";
import { createStyles, makeStyles, Theme, Grid, Divider } from "@material-ui/core";
import Icon from '@mdi/react'
import { 
  mdiAlphaACircleOutline,
  mdiAlphaBCircleOutline,
  mdiAlphaCCircleOutline,
  mdiAlphaDCircleOutline,
  mdiAlphaECircleOutline,
  mdiAlphaFCircleOutline,
  mdiAlphaGCircleOutline,
  mdiAlphaHCircleOutline,
  mdiAlphaICircleOutline,
  mdiAlphaJCircleOutline,
  mdiAlphaKCircleOutline,
  mdiAlphaLCircleOutline,
  mdiAlphaMCircleOutline,
  mdiAlphaNCircleOutline,
  mdiAlphaOCircleOutline,
  mdiAlphaPCircleOutline,
  mdiAlphaQCircleOutline,
  mdiAlphaRCircleOutline,
  mdiCircleSmall,
  mdiTransferDown 
} from '@mdi/js'

interface Props {
  currentRouteLeg: Vertex,
  index: number,
  busRoutes: RoutesType,
  routeArray: Vertex[],
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // root: {
    //   flexGrow: 1,
    //   padding: "1rem",
    // },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    vertDivider: {
      borderLeft: "thick solid #ff0000",
      width: "1rem",
      height: "100%"
      // backgroundColor: "lightgrey",
    },
    legInfo: {
      color: "darkgrey",
    },
    legDot: {
      textAlign: "center",
    }
  }),
);

const getIconPath = (routeStop: string) => {
  if(routeStop === 'A') {
    return mdiAlphaACircleOutline;
  }
  else if(routeStop === 'B') {
    return mdiAlphaBCircleOutline;
  }
  else if(routeStop === 'C') {
    return mdiAlphaCCircleOutline;
  }
  else if(routeStop === 'D') {
    return mdiAlphaDCircleOutline;
  }
  else if(routeStop === 'E') {
    return mdiAlphaECircleOutline;
  }
  else if(routeStop === 'F') {
    return mdiAlphaFCircleOutline;
  }
  else if(routeStop === 'G') {
    return mdiAlphaGCircleOutline;
  }
  else if(routeStop === 'H') {
    return mdiAlphaHCircleOutline;
  }
  else if(routeStop === 'I') {
    return mdiAlphaICircleOutline;
  }
  else if(routeStop === 'J') {
    return mdiAlphaJCircleOutline;
  }
  else if(routeStop === 'K') {
    return mdiAlphaKCircleOutline;
  }
  else if(routeStop === 'L') {
    return mdiAlphaLCircleOutline;
  }
  else if(routeStop === 'M') {
    return mdiAlphaMCircleOutline;
  }
  else if(routeStop === 'N') {
    return mdiAlphaNCircleOutline;
  }
  else if(routeStop === 'O') {
    return mdiAlphaOCircleOutline;
  }
  else if(routeStop === 'P') {
    return mdiAlphaPCircleOutline;
  }
  else if(routeStop === 'Q') {
    return mdiAlphaQCircleOutline;
  }
  else if(routeStop === 'R') {
    return mdiAlphaRCircleOutline;
  }
  else {
    return mdiAlphaRCircleOutline;
  }
}

const getIconColor = (routeLine?:string,) => {
  if(routeLine === "keltainen") {
    return "yellow";
  }
  else if(routeLine === "punainen") {
    return "red";
  }
  else if(routeLine === "vihreä") {
    return "green";
  }
  else if(routeLine === "sininen") {
    return "dodgerblue";
  }
}

const getStopsInBetweenCount = (currentStopIndex:number, routeArray:Vertex[]) => {
  let previousStopIndex = currentStopIndex-1;
  const previousStopColor = routeArray[previousStopIndex].routeColor;
  while(routeArray[previousStopIndex].routeColor === previousStopColor) {
    previousStopIndex--;
  }
  return (currentStopIndex-previousStopIndex-1).toString();
}

const getTimeInBetween = (currentStopIndex: number, routeArray: Vertex[]) => {
  let previousStopIndex = currentStopIndex-1;
  const previousStopColor = routeArray[previousStopIndex].routeColor;
  let minutesStart = routeArray[previousStopIndex].shortestDistanceFromOrigo;
  while(routeArray[previousStopIndex].routeColor === previousStopColor) {
    previousStopIndex--;
  }
  let minutesEnd = routeArray[previousStopIndex].shortestDistanceFromOrigo;
  let minutes = (minutesStart - minutesEnd);

  return minutes.toString();
}

const getStopsInBetweenForLastLeg = (currentStopIndex: number, routeArray: Vertex[]) => {
  // Check if route has any line-changes
  const currentLegColor = routeArray[currentStopIndex].routeColor;
  if(routeArray.slice(1).every(l => l.routeColor === currentLegColor)) {
    return routeArray.length-1;
  }
  else {
    // getStopsInBetweenCount actually checks stops in between for previous node because of change UI-rendering. +1 is a hack for actually checking the current stop
    return getStopsInBetweenCount(currentStopIndex+1, routeArray);
  }
}

const getTimeInBetweenForLastLeg = (currentStopIndex: number, routeArray: Vertex[]) => {
  // Check if route has any line-changes
  const currentLeg = routeArray[currentStopIndex];
  if(routeArray.slice(1).every(l => l.routeColor === currentLeg.routeColor)) {
    return currentLeg.shortestDistanceFromOrigo;
  }
  else {
    // getTimeInBetween actually checks time for previous node because of change UI-rendering. +1 is a hack for actually checking the current stop
    return getTimeInBetween(currentStopIndex+1, routeArray);
  }
}

const RouteLeg: React.FunctionComponent<Props> = props => {
  const { currentRouteLeg, index, routeArray } = props;
  const classes = useStyles();
  const iconPath = getIconPath(currentRouteLeg.vertex);

  // First item in array does not have the routeColor-attribute -> so get the color from the second item in array
  const iconColor = index > 0 ? getIconColor(currentRouteLeg.routeColor) : getIconColor(routeArray[index+1].routeColor);

  // If the currentRouteLeg routeColor is not the same as the previous routeLegs color -> busline change
  const isLineChange = index > 1 && currentRouteLeg.routeColor !== routeArray[index-1].routeColor; 

  return (
    <div>
      {/* First item */}
      { index === 0 && 
        <>
          <Grid container direction="row">
            <Grid item xs={12}>
              {iconPath &&
                <Icon path={iconPath}
                  size={2}
                  color={iconColor}
                />
              }
            </Grid>
          </Grid>
        </>
      }

      {/* Print ... and line info for "middle" legs */}
      { index > 1 && isLineChange &&
      <>
        <Grid container direction="row" alignItems={"center"}>
          <Grid item xs={1}>
            <Grid container direction="column">
              <Grid item xs={4} className={classes.legDot}>
                <Icon path={mdiCircleSmall}
                  size={1}
                  color={getIconColor(routeArray[index-1].routeColor)}
                />
              </Grid>
              <Grid item xs={4} className={classes.legDot}>
                <Icon path={mdiCircleSmall}
                  size={1}
                  color={getIconColor(routeArray[index-1].routeColor)}
                />
              </Grid>
              <Grid item xs={4} className={classes.legDot}>
                <Icon path={mdiCircleSmall}
                  size={1}
                  color={getIconColor(routeArray[index-1].routeColor)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={11}>
            <p className={classes.legInfo}>
              {getStopsInBetweenCount(index, routeArray)} stops - {getTimeInBetween(index, routeArray)} minutes
            </p>
          </Grid>
        </Grid> 
        <Grid container direction="row">
          <Grid item xs={12}>
            {currentRouteLeg.previousVertex &&
              <Icon path={getIconPath(currentRouteLeg.previousVertex)}
                size={2}
                color={getIconColor(routeArray[index-1].routeColor)}
              />
            }
          </Grid>
        </Grid>
        { isLineChange &&
        <>
          <Grid container direction="row" alignItems={"center"}>
            <Grid item xs={1}>
              <Grid container direction="column">
                <Grid item xs={4} className={classes.legDot}>
                  <Icon path={mdiTransferDown}
                    size={1}
                    color={"darkgrey"}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="row">
            <Grid item xs={12}>
              {currentRouteLeg.previousVertex &&
                <Icon path={getIconPath(currentRouteLeg.previousVertex)}
                  size={2}
                  color={iconColor}
                />
              }
          </Grid>
        </Grid>
        </>
        }
      </>
      }

      {/* Print last leg */}
      { index === routeArray.length-1 &&
      <>
        <Grid container direction="row" alignItems={"center"}>
          <Grid item xs={1}>
            <Grid container direction="column">
              <Grid item xs={4} className={classes.legDot}>
                <Icon path={mdiCircleSmall}
                  size={1}
                  color={iconColor}
                />
              </Grid>
              <Grid item xs={4} className={classes.legDot}>
                <Icon path={mdiCircleSmall}
                  size={1}
                  color={iconColor}
                />
              </Grid>
              <Grid item xs={4} className={classes.legDot}>
                <Icon path={mdiCircleSmall}
                  size={1}
                  color={iconColor}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={11}>
            <p style={{ color: "darkgrey" }}>
              {getStopsInBetweenForLastLeg(index, routeArray)} stops - {getTimeInBetweenForLastLeg(index, routeArray)} minutes
            </p>
          </Grid>
        </Grid> 
        <Grid container direction="row">
          <Grid item xs={12}>
            {iconPath &&
              <Icon path={iconPath}
                size={2}
                color={iconColor}
              />
            }
          </Grid>
        </Grid>
      </>
      }
    </div>
  )
}

export default RouteLeg;