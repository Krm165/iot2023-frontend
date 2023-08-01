import React from "react";
import { format } from "date-fns";
import "./chart.css";
import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { colors } from "@mui/material";

const Chart = ({ chartData, dateT, dataWL }) => {
  const formattedDate = dataWL.map((item) => ({
    ...item,
    date_time: format(new Date(item.date_time), "dd-MM-yy HH:mm"),
  }));

  return (
    <>
      <div className="chart-container">
        <div className="WL" style={{ margin: 16 }}>
          <h3>WaterLevel (Cm) : Date_Time</h3>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={formattedDate}
            margin={{ top: 10, right: 0, left: 16, bottom: 100 }}
            padding={{ right: 32 }}
          >
            <defs>
              <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6699FF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6699FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date_time"
              tickCount={10}
              angle={-45}
              textAnchor="end"
            />
            <YAxis domain={[-20, 15]} tickCount={8} />
            <CartesianGrid strokeDasharray="2 2" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="level"
              stroke="#6699FF"
              fillOpacity={1}
              fill="url(#colorLevel)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <div className="WL" style={{ margin: 16 }}>
          <div>
            <h4>
              <span style={{ color: "#FF6666" }}>Temperature (°C)</span> ,
              <span style={{ color: "#99CC33" }}> Humidity (%)</span> :
              Date_Time
            </h4>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={formattedDate}
            margin={{ top: 10, right: 0, left: 16, bottom: 100 }}
            padding={{ right: 32 }}
          >
            <defs>
            <linearGradient id="colorHumi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="50%" stopColor="#99CC33" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#99CC33" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="50%" stopColor="#FF6666" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FF6666" stopOpacity={0} />
              </linearGradient>

            </defs>
            <XAxis
              dataKey="date_time"
              tickCount={10}
              angle={-45}
              textAnchor="end"
            />
            <YAxis domain={[0, 100]} tickCount={5} />

            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="temp"
              stackId="1"
              stroke="#FF6666"
              fill="url(#colorTemp)"
            />
            <Area
              type="monotone"
              dataKey="humi"
              stackId="1"
              stroke="#99CC33"
              fill="url(#colorHumi)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Chart;
