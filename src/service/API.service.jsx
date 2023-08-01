export const fetchData = async (host, setData) => {
    try {
      const response = await fetch("http://" + host + "/data");
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
  
      const jsonData = await response.json();
      console.log("Data received from the server:", jsonData);
  
      if (jsonData && jsonData.status === "Success" && jsonData.data) {
        setData(jsonData.data);
      } else {
        console.error("Error fetching data: Invalid server response format.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  export const fetchChart = async (host, setChartData, format) => {
    try {
      const response = await fetch("http://" + host + "/chart");
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const jsonData = await response.json();
      // console.log("Data received from the server:", jsonData);
      // console.log("Data received from the server:", jsonData.status);
      // console.log("Data received from the server:", jsonData.data);
  
      if (jsonData && jsonData.status === "Success" && jsonData.data) {
        const formattedData = jsonData.data.map((dataPoint) => {
          const validDate = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(
            dataPoint.date_time
          );
          const date_time = validDate
            ? dataPoint.date_time
            : format(new Date(dataPoint.date_time), "yyyy-MM-dd HH:mm:ss");
          return { ...dataPoint, date_time };
        });
        setChartData(formattedData);
      } else {
        console.error("Error fetching data: Invalid server response format.");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  
  