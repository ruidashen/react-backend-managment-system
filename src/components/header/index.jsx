import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Icon, Modal } from "antd";
import { reqWeather } from "../../api/";
import menuList from "../../config/menuConfig";
import storageUtils from "../../utils/storeageUtils";
import memoryUtils from "../../utils/memoryUtils";
import formateDate from "../../utils/formatDateUtils";
import LinkButton from "../../components/link-button";
import "./index.less";
const { confirm } = Modal;
/*
left-nav component
*/

class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()),
    username: memoryUtils.user.username,
    temp: "location unknown",
    cityName: ""
  };
  getTime = () => {
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now());
      this.setState({ currentTime });
    }, 1000);
  };
  getWeather = () => {
    const zip = "94541,us";
    reqWeather(zip).then(data => {
      this.setState({
        temp: data.temp.toFixed(0),
        cityName: data.name
      });
    });
  };
  getTitle = () => {
    const path = this.props.location.pathname;
    let title;
    menuList.forEach(item => {
      if (item.key === path) {
        title = item.title;
      } else if (item.children) {
        const cItem = item.children.find(cItem => cItem.key === path);
        if (cItem) {
          title = cItem.title;
        }
      }
    });
    return title;
  };

  logOut = e => {
    e.preventDefault();
    confirm({
      title: "Are you sure to log out?",
      onOk: () => {
        storageUtils.removeUser();
        memoryUtils.user = {};
        this.props.history.replace("/login");
      }
    });
  };
  componentDidMount() {
    this.getTime();
    this.getWeather();
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  render() {
    const title = this.getTitle();
    return (
      <div className="header">
        <div className="header-top">
          <span>Welcome, {this.state.username}</span>
          <LinkButton onClick={this.logOut}>Log out</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{this.state.currentTime}</span>
            <Icon type="cloud" className="weather-icon" />
            <span className="city-name">Hayward</span>
            <span>{this.state.temp} &deg;C</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
