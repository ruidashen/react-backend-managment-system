import React, { Component } from "react";
import { Card, Button } from "antd";
import ReactEcharts from "echarts-for-react";
export default class LineChart extends Component {
  getOption = () => {
    return {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
        },
      ],
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
        <Card title="Line Chart">
          <ReactEcharts
            option={this.getOption()}
            style={{ height: 300 }}
          ></ReactEcharts>
        </Card>
      </div>
    );
  }
}
