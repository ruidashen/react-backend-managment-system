import React, { Component } from "react";
import { Modal, Card, Button, Table, message } from "antd";
import { PAGE_SIZE } from "../../utils/constants";
import { reqRoles, reqAddRole, reqUpdateRole } from "../../api";
import AddForm from "./addForm";
import PermissionForm from "./permissionForm";
import storageUtils from "../../utils/storageUtils";
import formatDate from "../../utils/formatDateUtils";
import { connect } from "react-redux";
import { logout } from "../../redux/actions";
class Role extends Component {
  constructor(props) {
    super(props);
    this.initColumn();
    this.permissionFormRef = React.createRef();
  }

  state = {
    roles: [], // all roles
    role: {}, // role currently selected
    showAddForm: false,
    showPermissionForm: false,
  };

  initColumn = () => {
    this.columns = [
      {
        title: "Role Name",
        dataIndex: "name",
      },
      {
        title: "Time Created",
        dataIndex: "create_time",
        render: formatDate,
      },
      {
        title: "Time Authorized",
        dataIndex: "auth_time",
        render: formatDate,
      },
      {
        title: "Authorizer",
        dataIndex: "auth_name",
      },
    ];
  };

  onRow = (role) => {
    return {
      onClick: () => {
        this.setState({ role });
      },
    };
  };
  addRole = () => {
    this.form.validateFields(async (error, values) => {
      if (!error) {
        this.setState({ showAddForm: false });
        const { roleName } = values;
        const result = await reqAddRole(roleName);
        if (result.status === 0) {
          message.success("Role Added!");

          const role = result.data;
          this.setState((state) => ({
            roles: [...state.roles, role],
          }));
        } else {
          message.error("Request failed! Something was wrong");
        }
      }
    });
  };

  getRoles = async () => {
    const result = await reqRoles();
    if (result.status === 0) {
      const roles = result.data;
      this.setState({ roles });
    }
  };

  updateRole = async () => {
    this.setState({ showPermissionForm: false });
    const role = this.state.role;
    const menus = this.permissionFormRef.current.getMenus();
    role.menus = menus;
    const user = this.props.user;
    role.auth_name = user.username;

    const result = await reqUpdateRole(role);

    if (result.status === 0) {
      this.getRoles();
      if (role._id === user.role_id) {
        this.props.logout();
        message.info("Permission for his role has changed, please login again");
      } else {
        message.success("Role updated!");
      }
    } else {
      message.error("Request failed");
    }
  };

  componentDidMount = () => {
    this.getRoles();
  };

  render() {
    const { roles, role, showAddForm, showPermissionForm } = this.state;
    const title = (
      <span>
        <Button
          type="primary"
          onClick={() => this.setState({ showAddForm: true })}
        >
          Create Role
        </Button>{" "}
        &nbsp; &nbsp;
        <Button
          type="primary"
          disabled={!role._id}
          onClick={() => this.setState({ showPermissionForm: true })}
        >
          Set Role Permissions
        </Button>
      </span>
    );

    return (
      <Card title={title}>
        <Table
          onRow={this.onRow}
          rowSelection={{
            type: "radio",
            selectedRowKeys: [role._id],
            onSelect: (role) => {
              this.setState({ role });
            },
          }}
          bordered
          columns={this.columns}
          dataSource={roles}
          rowKey="_id"
          pagination={{
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
        />

        <Modal
          title="Add Role"
          visible={showAddForm}
          onOk={this.addRole}
          onCancel={() => {
            this.form.resetFields();
            this.setState({ showAddForm: false });
          }}
        >
          <AddForm
            setForm={(form) => {
              this.form = form;
            }}
          ></AddForm>
        </Modal>

        <Modal
          title="Set role permissions"
          visible={showPermissionForm}
          onOk={this.updateRole}
          onCancel={() => this.setState({ showPermissionForm: false })}
        >
          <PermissionForm
            role={role}
            ref={this.permissionFormRef}
          ></PermissionForm>
        </Modal>
      </Card>
    );
  }
}

export default connect((state) => ({ user: state.user }), { logout })(Role);
