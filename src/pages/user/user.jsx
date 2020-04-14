import React, { Component } from "react";
import { Table, Card, Button, Modal } from "antd";
import formateDate from "../../utils/formatDateUtils";
import LinkButton from "../../components/link-button";
import { PAGE_SIZE } from "../../utils/constants";
import { reqGetUsers } from "../../api";
const { confirm } = Modal;

export default class User extends Component {
  constructor(props) {
    super(props);
    this.initColums();
  }
  state = {
    users: [],
    roles: [],
    isModalOn: false,
  };

  initRoleNames = (roles) => {
    const roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name;
      return pre;
    }, {});
    this.roleNames = roleNames;
  };

  initColums = () => {
    this.columns = [
      {
        title: "User Name",
        dataIndex: "username",
      },
      {
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "Phone",
        dataIndex: "phone",
      },
      {
        title: "Time Created",
        dataIndex: "create_time",
        render: formateDate,
      },
      {
        title: "Role",
        dataIndex: "role_id",
        render: (role_id) => this.roleNames[role_id],
      },
      {
        title: "Action",
        render: (user) => (
          <span>
            <LinkButton>Modify</LinkButton>
            <LinkButton onClick={this.deleteUser}>Delete</LinkButton>
          </span>
        ),
      },
    ];
  };

  deleteUser = async () => {
    confirm({
      title: 'Do you Want to delete this user?',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  getUsers = async () => {
    const result = await reqGetUsers();
    if (result.status === 0) {
      const { users, roles } = result.data;
      this.initRoleNames(roles);
      this.setState({
        users,
        roles,
      });
    }
  };

  addOrUpdateUser = () => { };

  componentDidMount = () => {
    this.getUsers();
  };
  render() {
    const { users, isModalOn } = this.state;
    const title = <Button type="primary">Create User</Button>;
    return (
      <Card title={title}>
        <Table
          bordered
          columns={this.columns}
          dataSource={users}
          rowKey="_id"
          pagination={{
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
        />
        <Modal
          title="Add Category"
          visible={isModalOn}
          onOk={this.addOrUpdateUser}
          onCancel={() => this.setState({ isModalOn: false })}
        >
          <div>Add or Update</div>
        </Modal>
      </Card>
    );
  }
}
