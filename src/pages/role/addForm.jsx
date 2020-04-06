import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Select, Input } from "antd";
const Item = Form.Item;
const Option = Select.Option;
// Form component used to add category

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.props.setForm(this.props.form);
  }

  static propTypes = {
    setForm: PropTypes.func.isRequired
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
        <Item label="Role Name:">
          {getFieldDecorator("roleName", {
            initialValue: "",
            rules: [
              {
                required: true,
                message: "Role name is required!"
              }
            ]
          })(<Input placeholder="Please enter name for the role"></Input>)}
        </Item>
      </Form>
    );
  }
}

export default Form.create()(AddForm);
