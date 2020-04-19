import React, { Component } from "react";
import { connect } from "react-redux";
import { setHeadTitle } from "../../redux/actions";
import { Menu, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
import "./index.less";
import menuList from "../../config/menuConfig";

const { SubMenu } = Menu;
/*
left-nav component
*/

class LeftNav extends Component {
  constructor(props) {
    super(props);
    this.menuNodes = this.getMenuNodes(menuList);
  }
  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname;
    return menuList.map((item) => {
      // Check if user has permission to see this path
      if (this.userHasAuth(item)) {
        if (item.children) {
          // Find an item which has the key that matches current path name.
          const cItem = item.children.find(
            (childItem) => childItem.key === path
          );
          if (cItem) {
            this.openKey = item.key;
          }
          return (
            <SubMenu
              key={item.key}
              title={
                <span>
                  <Icon type={item.icon}></Icon>
                  <span>{item.title}</span>
                </span>
              }
            >
              {this.getMenuNodes(item.children)}
            </SubMenu>
          );
        } else {
          if (item.key === path || path.indexOf(item.key) === 0) {
            this.props.setHeadTitle(item.title);
          }
          return (
            <Menu.Item key={item.key}>
              <Link
                to={item.key}
                onClick={() => this.props.setHeadTitle(item.title)}
              ></Link>
              <Icon type={item.icon}></Icon>
              <span>{item.title}</span>
            </Menu.Item>
          );
        }
      }
      return null;
    });
  };

  userHasAuth = (item) => {
    const { key, isPublic } = item;
    const user = this.props.user;
    const menus = user.role.menus;
    const username = user.username;

    /**
     * 1. If user is admin
     * 2. If current item is public
     * 3. If current user has permission to this path, look for the key in user's menu
     * 4. If current user has permission to this path's children paths.
     */

    if (username === "admin" || isPublic || menus.indexOf(key) >= 0) {
      return true;
    } else if (item.children) {
      // condition 4
      return !!item.children.find((child) => menus.indexOf(child.key) >= 0); // convert to boolean
    }

    return false;
  };
  render() {
    let path = this.props.location.pathname;
    if (path.indexOf("/product") === 0) {
      path = "/product";
    }
    return (
      <div to="/" className="left-nav">
        <Link to="/" className="left-nav-header">
          <Icon type="user" className="icon" />
          <h1 style={{ fontSize: "1em" }}>React Back End Management System</h1>
        </Link>

        <div>
          <Menu
            selectedKeys={[path]}
            defaultOpenKeys={[this.openKey]}
            mode="inline"
            theme="dark"
          >
            {this.menuNodes}
          </Menu>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ user: state.user }), { setHeadTitle })(
  withRouter(LeftNav)
);
