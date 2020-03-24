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
    setForm: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired, // Primary category array
    parentId: PropTypes.string.isRequired
  };
  render() {
    const { categories, parentId } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Item label="Category:">
          {getFieldDecorator("parentId", {
            initialValue: parentId
          })(
            <Select>
              <Option value="0">Primary Category</Option>
              {categories.map(c => (
                <Option value={c._id}>{c.name}</Option>
              ))}
            </Select>
          )}
        </Item>
        <Item label="Category Name:">
          {getFieldDecorator("categoryName", {
            initialValue: "",
            rules: [{ required: true, message: "Category name is required!" }]
          })(<Input placeholder="Please enter name for the category"></Input>)}
        </Item>
      </Form>
    );
  }
}

export default Form.create()(AddForm);
