import React, { useEffect, useState } from "react";
import "./water-animation.css";

const WaterAnimation = ({ waterLevel, maxWaterHeight }) => {
  const [waterHeight, setWaterHeight] = useState(0);

  useEffect(() => {
    const factors = [-15, -10, -5, 0, 5, 10];
    const targetHeights = [0.063, 0.28, 0.495, 0.715, 0.935, 1.157];

    let targetHeight = maxWaterHeight;
    for (let i = 0; i < factors.length; i++) {
      if (waterLevel <= factors[i]) {
        targetHeight = maxWaterHeight * targetHeights[i];
        break;
      }
    }

    setWaterHeight(targetHeight);
  }, [waterLevel, maxWaterHeight]);


  return (
    <div className="ani-container">
      <div className="glass">
        <div
          id="water"
          className={
            waterLevel === null ||waterLevel === ""
              ? "water"
              : waterLevel < -5
              ? "waterlow"
              : "waterhigh"
          }
          style={{ height: `${waterHeight}px` }}
        ></div>
        <div className="Cmlevel">
          <h3> 10 Cm</h3>
          <h3> 5 Cm</h3>
          <h3> 0 Cm</h3>
          <h3>-5 Cm</h3>
          <h3>-10 Cm</h3>
          <h3>-15 Cm</h3>
        </div>
      </div>
    </div>
  );
};

export default WaterAnimation;
