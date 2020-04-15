import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form, Select, Input } from "antd";
const Item = Form.Item;
const Option = Select.Option;

// Form component used to create user
class CreateUserForm extends PureComponent {
  constructor(props) {
    super(props);
    this.props.setForm(this.props.form);
  }

  static propTypes = {
    setForm: PropTypes.func.isRequired,
    roles: PropTypes.array.isRequired,
    user: PropTypes.object
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { roles } = this.props;
    const user = this.props.user || {};
    return (
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 15 }}>
        <Item label="User Name:">
          {getFieldDecorator("username", {
            initialValue: user.username,
            rules: [
              {
                required: true,
                message: "User name is required!",
              },
            ],
          })(<Input placeholder="Please enter user name"></Input>)}
        </Item>
        {user._id ? null : (
          <Item label="Password:">
            {getFieldDecorator('password', {
              initialValue: user.password,
              rules: [
                {
                  required: true,
                  message: "Password is required!",
                },
              ],
            })(
              <Input placeholder="Please enter password" type="password"></Input>
            )}
          </Item>
        )}

        <Item label="Phone number:">
          {getFieldDecorator('phone', {
            initialValue: user.phone,
            rules: [
              {
                required: true,
                message: "Phone number is required!",
              },
            ],
          })(<Input placeholder="Please enter phone number"></Input>)}
        </Item>
        <Item label="Email:">
          {getFieldDecorator('email', {
            initialValue: user.email,
            rules: [
              {
                required: true,
                message: "email is required!",
              },
            ],
          })(<Input placeholder="Please enter email"></Input>)}
        </Item>
        <Item label="Role:">
          {getFieldDecorator("role_id", {
            initialValue: user.role_id,
            rules: [
              {
                required: true,
                message: "role is required!",
              },
            ],
          })(
            <Select>
              {roles.map(role => <Option key={role._id}>{role.name}</Option>)}
            </Select>
          )}
        </Item>
      </Form>
    );
  }
}

export default Form.create()(CreateUserForm);
