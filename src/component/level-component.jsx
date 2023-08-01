import React, { useState } from "react";
import { createRoot } from "react-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import "./level-component.css"

function valuetext(value) {
  return `${value}`;
}

const marks = [
  {
    value: -15,
    label: "-15 Cm",
  },
  {
    value: -10,
    label: "-10 Cm",
  },
  {
    value: -5,
    label: "-5 Cm",
  },
  {
    value: 0,
    label: "0 Cm",
  },
  {
    value: 5,
    label: "5 Cm",
  },
  {
    value: 10,
    label: "10 Cm",
  },
];

const Wlevel = (props) => {
  const [sliderValue, setSliderValue] = useState(parseInt(props.level, 10));
  const {handleManual} = props;

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
    console.log(newValue);
  };

  const handleButtonClick = () => {
    if (sliderValue !== undefined) {
      console.log("handleButton");
      // handleAddData(sliderValue, temp, humi);
      handleManual(sliderValue);
    }
  };

  return (
    <Box
      sx={{
        width: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "16px 0",
      }}
    >
      <Slider
        aria-label="Water Level"
        value={sliderValue}
        onChange={handleSliderChange}
        color={sliderValue < -5 || sliderValue > 5 ? "error" : "primary"}
        track="inverted"
        aria-labelledby="track-inverted-slider"
        getAriaValueText={valuetext}
        defaultValue={30}
        marks={marks}
        min={-15}
        max={10}
        step={5}
      />
      <div className="butt-setvl" style={{ margin: "32px 0 0 0" }}>
        <button className="btn btn-success" onClick={handleButtonClick}>
          SET NEW VALUE
        </button>
      </div>
    </Box>
  );
};

export default Wlevel;
