import React, { Component } from "react";
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
  getMenuNodes(menuList) {
    return menuList.map(item => {
      if (item.children) {
        // Find an item which has the key that matches current path name.
        const cItem = item.children.find(
          childItem => childItem.key === this.props.location.pathname
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
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}></Link>
            <Icon type={item.icon}></Icon>
            <span>{item.title}</span>
          </Menu.Item>
        );
      }
    });
  }

  render() {
    const path = this.props.location.pathname;
    return (
      <div to="/" className="left-nav">
        <Link to="/" className="left-nav-header">
          <Icon type="user" className="icon" />
          <h1>React CMS</h1>
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

export default withRouter(LeftNav);
