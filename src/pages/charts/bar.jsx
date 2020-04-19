import React, { Component } from "react";
import { Card, Button } from "antd";
import ReactEcharts from "echarts-for-react";
export default class BarChart extends Component {
  getOption = () => {
    return {
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          ["product", "2015", "2016", "2017"],
          ["Matcha Latte", 43.3, 85.8, 93.7],
          ["Milk Tea", 83.1, 73.4, 55.1],
          ["Cheese Cocoa", 86.4, 65.2, 82.5],
          ["Walnut Brownie", 72.4, 53.9, 39.1],
        ],
      },
      xAxis: { type: "category" },
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
    };
  };
  render() {
    return (
      <div>
        <Card>
          <Button type="primary" onClick={this.update} disabled>
            Update
          </Button>
        </Card>
        <Card title="Bar Chart">
          <ReactEcharts
            option={this.getOption()}
            style={{ height: 300 }}
          ></ReactEcharts>
        </Card>
      </div>
    );
  }
}
