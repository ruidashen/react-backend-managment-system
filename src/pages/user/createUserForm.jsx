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
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 15 }}>
        <Item label="User Name:">
          {getFieldDecorator("username", {
            initialValue: "",
            rules: [
              {
                required: true,
                message: "User name is required!",
              },
            ],
          })(<Input placeholder="Please enter user name"></Input>)}
        </Item>
        <Item label="Password:">
          {getFieldDecorator("password", {
            initialValue: "",
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
        <Item label="Phone number:">
          {getFieldDecorator("phone", {
            initialValue: "",
            rules: [
              {
                required: true,
                message: "Phone number is required!",
              },
            ],
          })(<Input placeholder="Please enter phone number"></Input>)}
        </Item>
        <Item label="Email:">
          {getFieldDecorator("email", {
            initialValue: "",
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
            initialValue: "1",
            rules: [
              {
                required: true,
                message: "role is required!",
              },
            ],
          })(
            <Select>
              <Option value="1">Role1</Option>
              <Option value="2">Role2</Option>
            </Select>
          )}
        </Item>
      </Form>
    );
  }
}

export default Form.create()(CreateUserForm);
