import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Input } from "antd";
const Item = Form.Item;
// Form component used to add category

class UpdateForm extends Component {
  constructor(props) {
    super(props);
    this.props.setForm(this.props.form);
  }
  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
  };

  render() {
    const { categoryName } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Item>
          {getFieldDecorator("categoryName", {
            initialValue: categoryName,
            rules: [{ required: true, message: "Category name is required!" }]
          })(<Input placeholder="Please enter name for the category"></Input>)}
        </Item>
      </Form>
    );
  }
}

export default Form.create()(UpdateForm);
