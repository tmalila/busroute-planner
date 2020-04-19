import React, { FunctionComponent } from "react";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/MenuItem";
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

interface Props {
  busStops: string[],
  onSelectValue: (event: any) => void,
  id: string,
  title: string,
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const StopSelector: FunctionComponent<Props> = props => {
  const { busStops, onSelectValue, title, id } = props;
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id={"label"+id}>{title}</InputLabel>
        <Select id={id} required labelId={"label"+id} onChange={(e) => onSelectValue(e)}>
          {busStops.map(stop => 
          <MenuItem key={stop} value={stop}>{stop}</MenuItem> 
          )}
        </Select>
      </FormControl>
    </div>
  );
}

export default StopSelector;