import React from "react";
import { AppBar, Typography, Toolbar } from "@material-ui/core";

interface Props {
  title: string,
}

const Header: React.FunctionComponent<Props> = props => {
  return (
    <AppBar style={{ background: '#444444', color: "white" }} position="static">
      <Toolbar>
        {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6">
          {props.title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;