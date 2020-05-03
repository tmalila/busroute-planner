import React, { FunctionComponent, useState } from "react";
import StopSelector from "./components/StopSelector";
import { makeStyles, Theme, createStyles, Grid, Button } from "@material-ui/core";
import RouteList from "./components/RouteList";

export interface RoadType {
  mista: string,
  mihin: string,
  kesto: number,
}

export interface RoutesType {
  keltainen: string[],
  punainen: string[],
  vihreä: string[],
  sininen: string[],
  [key: string]: string[];
}

export interface AdjListNode {
  nodeId: string,
  linkCost: number,
  routeColor: string,
}

// Adjacency list
export interface Vertex {
  vertex: string,
  shortestDistanceFromOrigo: number,
  previousVertex?: string,
  routeColor?: string,
}

interface Props {
  busStops: string[],
  busRoads: RoadType[],
  busRoutes: RoutesType,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: "1rem",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

const BusRoutePage: FunctionComponent<Props> = props => {

  const { busRoads, busRoutes } = props;
  const [startStop, setStartStop] = useState("A");
  const [endStop, setEndStop] = useState("P");
  const [queriedRoute, setQueriedRoute] = useState<Vertex[]>([]);

  const classes = useStyles();

  const dijkstraSearch = (start: string, end: string) => {

    let resultTable:Vertex[] = []; // Key A -> Shortest distance from a, previous node
    let visitedNodes: string[] = [];
    let unvisitedNodes: string[] = [];
    
    let adjList = getWeightedAdjacencyList();

    // Setup
    let startNode = adjList.get(start);
    if(startNode) {
      let firstVertex:Vertex = {
        vertex: start,
        shortestDistanceFromOrigo: 0,
      };
      resultTable.push(firstVertex);

      // Set all Nodes as unvisited and fill resulttable with all Vertexes
      adjList.forEach((value: AdjListNode[], key: string) => {
        unvisitedNodes.push(key);
        if(key !== start) {
          let tempVertex: Vertex = {
            vertex: key,
            shortestDistanceFromOrigo: 10000000000000,
          }
          resultTable.push(tempVertex);
        }
      });

      while(unvisitedNodes && unvisitedNodes.length > 0) {
        // Filter out already visited nodes and set current as the one with lowest cost
        let currentVertex = getClosestVertex(resultTable.filter(r => !visitedNodes.includes(r.vertex)));
        let currentNodeNeighbours = adjList.get(currentVertex.vertex);
        currentNodeNeighbours = currentNodeNeighbours?.filter(n => !visitedNodes.includes(n.nodeId));
        // Calculate all current nodes neighbours costs and update result table if cost is lower than previously assigned
        currentNodeNeighbours?.forEach(node => {
          const newDistance = currentVertex.shortestDistanceFromOrigo + node.linkCost;
          const resIndex = resultTable.findIndex(item => item.vertex === node.nodeId);
          // Prefer the current route color even if the distance is the same
          if(resIndex && resIndex > -1 && (newDistance < resultTable[resIndex].shortestDistanceFromOrigo 
            || (newDistance === resultTable[resIndex].shortestDistanceFromOrigo && currentVertex.routeColor === node.routeColor))) {
            resultTable[resIndex].shortestDistanceFromOrigo = newDistance;
            resultTable[resIndex].previousVertex = currentVertex.vertex;
            resultTable[resIndex].routeColor = node.routeColor;
          }
        })
        visitedNodes.push(currentVertex.vertex); // Add current node to already visited list
        unvisitedNodes = unvisitedNodes.filter(n => n !== currentVertex.vertex); // Remove current Node from unvisited-list
      }

      let resStack:Vertex[] = [];
      let endNode = resultTable.find(f => f.vertex === end);
      while(endNode?.vertex !== start) {
        if(endNode) {
          resStack.push(endNode);
          endNode = resultTable.find(f => f.vertex === endNode?.previousVertex);
        }
      }
      const lastNode = resultTable.find(f => f.vertex === resStack[resStack.length-1].previousVertex);
      if(lastNode) {
        resStack.push(lastNode);
      }
      if(resStack && resStack.length > 0) {
        setQueriedRoute(resStack.reverse());
      }
    }
  }

  const getClosestVertex = (vertices: Vertex[]) => {
    return vertices.reduce(function(prev, curr) {
      return prev.shortestDistanceFromOrigo < curr.shortestDistanceFromOrigo ? prev : curr;
    });
  }

  const getWeightedAdjacencyList = () => {
    let adjList = new Map<string, AdjListNode[]>();

    for (var route in busRoutes) {
      if (Object.prototype.hasOwnProperty.call(busRoutes, route)) {
          // items[i+1] will always exist inside this loop
          for(var i = 0; i < busRoutes[route].length-1; ++i) {
            const currentStop = busRoutes[route][i];
            const nextStop = busRoutes[route][i+1];
      
            let nextStopDistance = busRoads.find(r => r.mista === currentStop && r.mihin === nextStop)?.kesto;
            // Route distance might be specified the other way around, so check both and if still not found throw error
            if(!nextStopDistance) {
              nextStopDistance = busRoads.find(r => r.mihin === currentStop && r.mista === nextStop)?.kesto;
            }
            if(!nextStopDistance) {
              throw Error(`Could not find distance for route Start:${currentStop}, Finish: ${nextStop}`)
            }
            // Add Dictionary Node-object for Current Node and its child node
            let newAdjListNode: AdjListNode = {
              linkCost: nextStopDistance,
              nodeId: nextStop,
              routeColor: route
            }
            // Stop already exists in dictionary -> add node to existing array of nodes
            if(adjList.has(currentStop)) {
              let adjNodes = adjList.get(currentStop);
              adjNodes?.push(newAdjListNode);
            }
            else {
              const newArr = [];
              newArr.push(newAdjListNode);
              adjList.set(currentStop, newArr);
            }

            // Add Dictionary Node-object for Next Node and its parent node, aka the current node
            let newAdjListNodeNext: AdjListNode = {
              linkCost: nextStopDistance,
              nodeId: currentStop,
              routeColor: route
            }
            // Stop already exists in dictionary -> add node to existing array of nodes
            if(adjList.has(nextStop)) {
              let adjNodes = adjList.get(nextStop);
              adjNodes?.push(newAdjListNodeNext);
            }
            else {
              const newArr = [];
              newArr.push(newAdjListNodeNext);
              adjList.set(nextStop, newArr);
            }
          }
      }
    }
    return adjList;
  }

  const handleEndStopChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    var target = e.target as HTMLSelectElement;
    setEndStop(target.value);
  }

  const handleStartStopChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    var target = e.target as HTMLSelectElement;
    setStartStop(target.value);
  }

  const { busStops } = props;
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <StopSelector busStops={busStops.filter(f => f !== endStop)} id="startStops" onSelectValue={(e) => handleStartStopChange(e)} title="Choose a start station" value={startStop}></StopSelector>
        </Grid>
        <Grid item xs={12}>
          <StopSelector busStops={busStops.filter(f => f !== startStop)} id="endStops" onSelectValue={(e) => handleEndStopChange(e)} title="Choose an end station" value={endStop}></StopSelector>
        </Grid>
        <Grid item xs={12} style={{ marginTop: "1rem" }}>
          <Button variant="contained" color="primary" onClick={() => dijkstraSearch(startStop, endStop)}>SEARCH</Button>
        </Grid>
      </Grid>
      <RouteList routeStops={queriedRoute} busRoutes={busRoutes}></RouteList>
      {/* <div>
        {queriedRoute.map((r, index) => 
          <p key={index}>{r.vertex} - {r.shortestDistanceFromOrigo} - {r.routeColor}</p>
        )}
      </div> */}
    </div>
  );
};

export default BusRoutePage;