import React, { useEffect, useState } from "react";
import "./Revenue.css";
import ShopD from "../../components/Drawers/Shop";
import FooterEnd from "../../components/Footer/FooterEnd";
import { getAllOrders } from "../../api/shop";
import { BarChart } from "@mui/x-charts/BarChart";

const Revenue = () => {
  const [isExpanded, setIsExpanded] = useState([false, false, false]);
  const [orders, setOrders] = useState([]);

  const toggleExpand = (index) => {
    const updatedState = [...isExpanded];
    updatedState[index] = !updatedState[index];
    setIsExpanded(updatedState);
  };
  
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const res = await getAllOrders();
      setOrders(res.result);
    } catch (error) {
      console.log(error);
    }
  };

  // Group orders by year and month
  const groupOrdersByYearAndMonth = () => {
    const groupedData = {};

    orders.forEach(order => {
      if (order.date) {
        const orderDate = new Date(order.date);
        const year = orderDate.getFullYear();
        const month = orderDate.getMonth() + 1; // Month is zero-indexed, so add 1

        if (!groupedData[year]) groupedData[year] = Array(12).fill(0);

        // Sum up the revenue for each month
        groupedData[year][month - 1] += order.price * order.quantity;
      }
    });

    return groupedData;
  };

  // Prepare data for each year and month for the chart
  const chartDataByYear = groupOrdersByYearAndMonth();

  return (
    <div className="Revenue-container">
      {Object.entries(chartDataByYear).map(([year, monthlyData], index) => (
        <div key={index} className="revenue-section">
          <div className="revenue-header" onClick={() => toggleExpand(index)}>
            <span>{year}</span>
            <span>{isExpanded[index] ? "▲" : "▼"}</span>
          </div>
          {isExpanded[index] && (
            <div className="revenue-content">
              {orders.length > 0 ? (
                <div className="charts-container">
                  <BarChart
                    series={[{ data: monthlyData }]}
                    height={290}
                    xAxis={[
                      { data: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'], scaleType: 'band' }
                    ]}
                   
                    margin={{ top: 10, bottom: 30, left:90, right: 80 }}
                  />
                  
                </div>
              ) : (
                <p>Chưa có dữ liệu để phân tích cho năm này.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Revenue;
