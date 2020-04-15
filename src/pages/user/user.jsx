import React, { Component } from "react";
import { Table, Card, Button, Modal, message } from "antd";
import formateDate from "../../utils/formatDateUtils";
import LinkButton from "../../components/link-button";
import { PAGE_SIZE } from "../../utils/constants";
import { reqGetUsers, reqDeleteUser, reqAddOrUpdateUser } from "../../api";
import CreateUserForm from "./createUserForm";
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
            <LinkButton onClick={() => this.showUpdate(user)}>Modify</LinkButton>
            <LinkButton onClick={() => this.deleteUser(user)}>
              Delete
            </LinkButton>
          </span>
        ),
      },
    ];
  };
  showUpdate = (user) => {
    this.user = user;
    this.setState({
      isModalOn: true
    })
  }

  deleteUser = (user) => {
    confirm({
      title: `Do you want to delete ${user.username}?`,
      onOk: async () => {
        const result = await reqDeleteUser(user._id);
        if (result.status === 0) {
          message.success("User deleted!");
          this.getUsers();
        }
      },
    });
  };
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


  addOrUpdateUser = async () => {
    // Collect input
    const user = this.form.getFieldsValue();
    this.form.resetFields();
    if (this.user) {
      user._id = this.user._id;
    }
    // Send create user request
    const result = await reqAddOrUpdateUser(user);
    if (result.status === 0) {
      message.success('User ' + (this.user ? 'modified!' : 'created!'));
      this.getUsers();
      this.setState({ isModalOn: false });
    }
  };

  showCreate = () => {
    this.user = null;
    this.setState({ isModalOn: true });
  }

  componentDidMount = () => {
    this.getUsers();
  };
  render() {
    const { users, isModalOn, roles } = this.state;
    const user = this.user || {};
    const title = (
      <Button type="primary" onClick={() => this.setState(this.showCreate)}>
        Create User
      </Button>
    );
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
          title={user._id ? 'Modify User' : 'Create User'}
          visible={isModalOn}
          onOk={this.addOrUpdateUser}
          onCancel={() => {
            this.setState({ isModalOn: false })
            this.form.resetFields();
          }}
        >
          <CreateUserForm setForm={(form) => (this.form = form)} roles={roles} user={this.user} />
        </Modal>
      </Card >
    );
  }
}
