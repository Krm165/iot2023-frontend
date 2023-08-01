import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { format } from "date-fns";
import Wlevel from "./component/level-component";
import "./HomePage.css";
import WaterAnimation from "./component/water-animation";
import Chart from "./component/chart";
import Header from "./component/header";
import img from "./assets/wheat-fields-4439896_1920.jpg";

import { fetchChart, fetchData } from "./service/API.service";

const HomePage = () => {
  const host = "https://dull-shorts-seal.cyclic.cloud";
  const [data, setData] = useState([]);
  const [manualMode, setManualMode] = useState(false);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(() => {
        fetchData(host, setData);
        fetchChart(host, setChartData, format);
      }, 2500);
      return () => {
        clearInterval(interval);
      };
    }
  
  }, [manualMode]);

  const handleAddData = async (newData, temp, humi) => {
    console.log("Sending data to server:", newData);
    try {
      const response = await fetch(host + "/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ level: newData, temp: temp, humi: humi }),
      });
      const responseData = await response.json();

      setData((prevData) => {
        if (Array.isArray(prevData)) {
          return [...prevData, responseData];
        } else {
          return [responseData];
        }
      });
      setManualMode(false);
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };
  const handleUpdate = async (newData) => {
    console.log("Updating last data on the server:", newData);
    try {
      const response = await fetch(host + "/data", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ level: newData, mode: "manual" }),
      });
      const responseData = await response.json();

      setData((prevData) => {
        if (Array.isArray(prevData)) {
          const updatedData = [...prevData];
          const lastIndex = updatedData.length - 1;
          if (lastIndex >= 0) {
            updatedData[lastIndex] = responseData;
          }
          return updatedData;
        } else {
          return [responseData];
        }
      });
      setManualMode(false);
    } catch (error) {
      console.error("Error updating last data:", error);
    }
    fetchData();
  };
  const handleManual = async (newData) => {
    try {
      const response = await fetch(host + "/mode", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ level: newData, pump: "on", mode: "manual" }),
      });
      const responseData = await response.json();

      setData((prevData) => {
        if (Array.isArray(prevData)) {
          const updatedData = [...prevData];
          const lastIndex = updatedData.length - 1;
          if (lastIndex >= 0) {
            updatedData[lastIndex] = responseData;
          }
          return updatedData;
        } else {
          return [responseData];
        }
      });
      setManualMode(false);
    } catch (error) {
      console.error("Error updating last data:", error);
    }
  };
  const handleManualClick = () => {
    setManualMode(true);
  };

  const handleAutoClick = () => {
    setManualMode(false);
  };

  return (
    <>
      {/* <Header /> */}
      <div className="bg">
        <div className="container">
          <div className="data">
            <div className="ani-level">
              <WaterAnimation waterLevel={data.level} maxWaterHeight={300} />
            </div>
            <div className="level">
              <h1>{data.level} Cm</h1>
              <div className="aht">
                <h1>{data.temp} °C</h1>
                <h1>{data.humi} %</h1>
              </div>

              <div className={`manual ${manualMode ? "" : "hidden"}`}>
                {manualMode && (
                  <Wlevel
                    level={data.level}
                    // handleAddData={handleAddData}
                    handleManual={handleManual}
                  />
                )}
              </div>
              <div className="manual">
                {!manualMode && (
                  <button className="btn btn-dark" onClick={handleManualClick}>
                    MANUAL
                  </button>
                )}
              </div>
              <div className="auto">
                {manualMode && (
                  <button className="btn btn-dark" onClick={handleAutoClick}>
                    AUTO
                  </button>
                )}
              </div>
            </div>
            <div className="chart">
              {chartData.length > 0 && (
                <Chart
                  chartData={chartData}
                  dateT={chartData[0].date_time}
                  dataWL={chartData}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
