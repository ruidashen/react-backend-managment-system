import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Select, Input, Tree } from "antd";
import menuList from "../../config/menuConfig";

const Item = Form.Item;
// Form component used to add category

class PermissionForm extends Component {
  constructor(props) {
    super(props);
    this.treeNodes = this.getTreeNodes(menuList);

    const { menus } = this.props.role;
    this.state = {
      checkedKeys: menus
    };
  }

  static propTypes = {
    role: PropTypes.object
  };

  getTreeNodes = menuList => {
    return menuList.reduce((pre, item) => {
      pre.push({
        title: item.title,
        key: item.key,
        children: item.children ? this.getTreeNodes(item.children) : null
      });
      return pre;
    }, []);
  };

  onCheck = checkedKeys => {
    this.setState({ checkedKeys });
  };

  getMenus = () => this.state.checkedKeys;

  componentWillReceiveProps(nextProps) {
    const menus = nextProps.role.menus;
    this.setState({
      checkedKeys: menus
    });
  }

  render() {
    const { role } = this.props;
    const { checkedKeys } = this.state;
    const tree = {
      title: "System Permission",
      key: "all",
      children: this.treeNodes
    };
    return (
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
        <Item label="Role">
          <Input value={role.name} disabled></Input>
        </Item>

        <Tree
          checkable
          checkedKeys={checkedKeys}
          defaultExpandAll={true}
          onSelect={this.onSelect}
          onCheck={this.onCheck}
          treeData={tree}
        />
      </Form>
    );
  }
}

export default PermissionForm;
