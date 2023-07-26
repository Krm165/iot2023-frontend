import React, { useEffect, useState } from "react";
import "./water-animation.css";

const WaterAnimation = ({ waterLevel, maxWaterHeight }) => {
  const [waterHeight, setWaterHeight] = useState(0);

  useEffect(() => {
    let targetHeight = 0;
    if (waterLevel <= -15) {
      targetHeight = maxWaterHeight * 0.1;
    } else if (waterLevel <= -10) {
      targetHeight = maxWaterHeight * 0.3;
    } else if (waterLevel <= -5) {
      targetHeight = maxWaterHeight * 0.7;
    } else if (waterLevel <= 0) {
      targetHeight = maxWaterHeight * 0.9;
    } else if (waterLevel <= 5) {
      targetHeight = maxWaterHeight * 1.2;
    } else {
      targetHeight = maxWaterHeight;
    }

    setWaterHeight(targetHeight);
  }, [waterLevel, maxWaterHeight]);

  return (
    <div className="ani-container">
      <div className="glass">
        <div
          id="water"
          className={
            waterLevel === null
              ? "water"
              : waterLevel < -5
              ? "waterlow"
              : "waterhigh"
          }
          style={{ height: `${waterHeight}px` }}
        ></div>
      </div>
    </div>
  );
};

export default WaterAnimation;
