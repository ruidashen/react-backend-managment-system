import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ProductHome from "./home";
import ProductDetail from "./detail";
import ProductUpdate from "./addupdate";
import "./product.less";

export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route exact component={ProductHome} path="/product"></Route>
        <Route component={ProductDetail} path="/product/detail"></Route>
        <Route component={ProductUpdate} path="/product/addupdate"></Route>
        <Redirect to="/product"></Redirect>
      </Switch>
    );
  }
}
