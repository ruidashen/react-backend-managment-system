import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Icon, Modal } from "antd";
import { reqWeather } from "../../api/";
import formateDate from "../../utils/formatDateUtils";
import LinkButton from "../../components/link-button";
import "./index.less";
import { logout } from "../../redux/actions";
const { confirm } = Modal;
/*
left-nav component
*/

class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()),
    temp: "location unknown",
    cityName: "",
  };
  getTime = () => {
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now());
      this.setState({ currentTime });
    }, 1000);
  };
  getWeather = () => {
    const zip = "94087,us";
    reqWeather(zip).then((data) => {
      this.setState({
        temp: data.temp.toFixed(0),
        cityName: data.name,
      });
    });
  };

  logOut = (e) => {
    e.preventDefault();
    confirm({
      title: "Are you sure to log out?",
      onOk: () => {
        this.props.logout();
      },
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
    const title = this.props.headerTitle;
    return (
      <div className="header">
        <div className="header-top">
          <span>Welcome, {this.props.user.username}</span>
          <LinkButton onClick={this.logOut}>Log out</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{this.state.currentTime}</span>
            <Icon type="cloud" className="weather-icon" />
            <span className="city-name">Cupertino</span>
            <span>{this.state.temp} &deg;C</span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({ headerTitle: state.headerTitle, user: state.user }),
  { logout }
)(withRouter(Header));
