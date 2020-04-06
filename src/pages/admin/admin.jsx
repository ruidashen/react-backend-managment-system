import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import memoryUtils from "../../utils/memoryUtils";
import LeftNav from "../../components/left-nav";
import Header from "../../components/header";
import Home from "../home/home";
import Category from "../category/category";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";
import BarChart from "../charts/bar";
import PieChart from "../charts/pie";
import LineChart from "../charts/line";
const { Footer, Sider, Content } = Layout;

/*
  admin page 
 */
export default class Admin extends Component {
  render() {
    const user = memoryUtils.user;
    if (!user || !user._id) {
      return <Redirect to="/login"></Redirect>;
    }
    return (
      <Layout style={{ minHeight: "100%" }}>
        <Sider>
          <LeftNav></LeftNav>
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{ margin: "20px", backgroundColor: "#fff" }}>
            <Switch>
              <Route path="/home" component={Home}></Route>
              <Route path="/category" component={Category}></Route>
              <Route path="/product" component={Product}></Route>
              <Route path="/role" component={Role}></Route>
              <Route path="/user" component={User}></Route>
              <Route path="/charts/pie" component={PieChart}></Route>
              <Route path="/charts/line" component={LineChart}></Route>
              <Route path="/charts/bar" component={BarChart}></Route>
              <Redirect to="/home"></Redirect>
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center", color: "#cccccc" }}>
            &copy;Ruida Shen
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
