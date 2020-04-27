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
    return "cyan";
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
  console.log("routeleg: ", currentRouteLeg.vertex);
  console.log("islinechange: ", isLineChange);

  return (
    <div>
      {/* First item */}
      {index === 0 && 
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
          <Grid container direction="row" alignItems={"center"}>
            <Grid item xs={1}>
              <Grid container direction="column">
                <Grid item xs={4}>
                  <Icon path={mdiCircleSmall}
                    size={1}
                    color={iconColor}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Icon path={mdiCircleSmall}
                    size={1}
                    color={iconColor}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Icon path={mdiCircleSmall}
                    size={1}
                    color={iconColor}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={11}>
              Hello number of stops
            </Grid>
          </Grid>
        </>
      }
      {isLineChange && 
      <>
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
        <Grid container direction="row" alignItems={"center"}>
          <Grid item xs={1}>
            <Grid container direction="column">
              <Grid item xs={4}>
                <Icon path={mdiTransferDown}
                  size={1}
                  color={"lightGrey"}
                />
              </Grid>
            </Grid>
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
        {index !== routeArray.length-1 && 
          <Grid container direction="row" alignItems={"center"}>
            <Grid item xs={1}>
              <Grid container direction="column">
                <Grid item xs={4}>
                  <Icon path={mdiCircleSmall}
                    size={1}
                    color={iconColor}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Icon path={mdiCircleSmall}
                    size={1}
                    color={iconColor}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Icon path={mdiCircleSmall}
                    size={1}
                    color={iconColor}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={11}>
              Hello number of stops
            </Grid>
          </Grid>
        }
        
      </>
      }
      
      
      {/* <Grid container direction="row">
        <Grid item xs={1} justify={"center"}>
          <Grid container direction="column">
            <Grid item xs={4}>
              <Icon path={mdiCircleSmall}
                size={1}
                color="lightgrey"
              />
            </Grid>
            <Grid item xs={4}>
              <Icon path={mdiCircleSmall}
                size={1}
                color="lightgrey"
              />
            </Grid>
            <Grid item xs={4}>
              <Icon path={mdiCircleSmall}
                size={1}
                color="lightgrey"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}
    </div>
  )
}

export default RouteLeg;