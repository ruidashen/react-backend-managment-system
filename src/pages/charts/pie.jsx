import React, { Component } from "react";
import { Card, Button } from "antd";
import ReactEcharts from "echarts-for-react";
export default class PieChart extends Component {
  getOption = () => {
    return {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },

      series: [
        {
          name: "Source",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "30",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 335, name: "Category1" },
            { value: 310, name: "Category2" },
            { value: 234, name: "Category3" },
            { value: 135, name: "Category4" },
            { value: 1548, name: "Category5" },
          ],
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
        <Card title="Pie Chart">
          <ReactEcharts
            option={this.getOption()}
            style={{ height: 300 }}
          ></ReactEcharts>
        </Card>
      </div>
    );
  }
}
