import React, {ChangeEvent} from 'react';
import { Slider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    layout: {
      width: 0,
      height: 120,
      display: 'block',
      textAlign: 'left',
      marginTop: '20px',
      marginLeft: '10px',
    },
  });
  
  function RangeSlider(): JSX.Element {
    const classes = useStyles();
    const [value, setValue] = React.useState([1, 3]);
  
    const handleChange = (event: ChangeEvent<{}>, newValue: any): void => {
      setValue(newValue);
    };
  
    return (
      <div className={classes.layout}>
        <Slider
          className="preisslider"
          orientation="vertical"
          color='primary'
          max={3}
          min={1}
          step={0.1}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
        />
      </div>
    );
  }

export default RangeSlider;